import fs from 'fs'
import dns from 'dns/promises'
import net from 'net'
import tls from 'tls'
import dotenv from 'dotenv'

const dotenvLocal = '.env.local'
if (fs.existsSync(dotenvLocal)) dotenv.config({ path: dotenvLocal })
else dotenv.config()

const uri = process.env.MONGODB_URI
if (!uri) {
  console.error('MONGODB_URI not set')
  process.exit(1)
}

console.log('[diagnose] node', process.version)
console.log('[diagnose] openssl', process.versions.openssl)
console.log('[diagnose] uri', uri.replace(/:\/\/([^:@]+):([^@]+)@/, '://<user>:<pass>@'))

function parseSrvHost(uri) {
  const m = uri.match(/mongodb\+srv:\/\/[^@]+@?([^/\?]+)/)
  if (!m) return null
  return m[1]
}

async function tryConnect(host, port = 27017, timeout = 8000) {
  return new Promise((resolve) => {
    const start = Date.now()
    const socket = net.connect({ host, port }, () => {
      socket.end()
      resolve({ ok: true, time: Date.now() - start })
    })
    socket.on('error', (err) => resolve({ ok: false, error: String(err) }))
    socket.setTimeout(timeout, () => {
      socket.destroy()
      resolve({ ok: false, error: 'timeout' })
    })
  })
}

async function tryTls(host, port = 27017, rejectUnauthorized = true, timeout = 8000) {
  return new Promise((resolve) => {
    const start = Date.now()
    const socket = tls.connect({ host, port, servername: host, rejectUnauthorized, timeout }, () => {
      const cert = socket.getPeerCertificate()
      socket.end()
      resolve({ ok: true, time: Date.now() - start, cert: !!cert && Object.keys(cert).length ? cert.subject : null })
    })
    socket.on('error', (err) => resolve({ ok: false, error: String(err) }))
    socket.setTimeout(timeout, () => {
      socket.destroy()
      resolve({ ok: false, error: 'timeout' })
    })
  })
}

async function run() {
  try {
    const srvHost = parseSrvHost(uri)
    if (!srvHost) {
      console.log('[diagnose] URI is not mongodb+srv, cannot resolve SRV')
      return
    }

    console.log('[diagnose] SRV host:', srvHost)

    let srv
    try {
      srv = await dns.resolveSrv('_mongodb._tcp.' + srvHost)
      console.log('[diagnose] SRV records:')
      srv.forEach((r, i) => console.log(i, r))
    } catch (e) {
      console.error('[diagnose] failed to resolve SRV:', e)
      return
    }

    for (const r of srv) {
      const target = r.name
      console.log('\n[diagnose] testing target', target, 'port', r.port)

      // Resolve target to A/AAAA
      try {
        const addrs = await dns.lookup(target, { all: true })
        console.log('[diagnose] addresses:', addrs.map(a=>a.address).join(', '))
      } catch (e) {
        console.error('[diagnose] dns.lookup failed for', target, e)
      }

      const tcp = await tryConnect(target, r.port)
      console.log('[diagnose] tcp:', tcp)

      const tlsGood = await tryTls(target, r.port, true)
      console.log('[diagnose] tls (rejectUnauthorized=true):', tlsGood)

      const tlsInsecure = await tryTls(target, r.port, false)
      console.log('[diagnose] tls (rejectUnauthorized=false):', tlsInsecure)
    }
  } catch (e) {
    console.error('[diagnose] unexpected error', e)
  }
}

run()
