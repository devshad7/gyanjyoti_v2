import { MongoClient } from "mongodb"
import os from "os"

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
let options: Record<string, any> = {}
// For MongoDB Atlas (mongodb+srv://), do NOT set tlsAllowInvalidCertificates
// Only set this option for local/self-hosted MongoDB
if (
  process.env.NODE_ENV === "development" &&
  uri &&
  !uri.startsWith("mongodb+srv://")
) {
  options = {
    tlsAllowInvalidCertificates: true,
  }
}

// Optional: allow an explicit debug override for TLS to help diagnose
// environments that are failing the TLS handshake. ONLY enable this for
// local debugging. Do NOT enable in production.
if (process.env.DEBUG_MONGO_TLS === '1' || process.env.DEBUG_MONGO_TLS === 'true') {
  console.warn('[mongo] WARNING: DEBUG_MONGO_TLS is enabled — allowing invalid TLS certificates for diagnosis. DO NOT use in production')
  options = {
    ...options,
    tlsAllowInvalidCertificates: true,
    // tlsInsecure is an alias used in some environments — ensure both are set
    tlsInsecure: true,
  }
}

// Add sensible timeouts and server selection tuning to make transient
// network/TLS issues easier to tolerate. These can be tuned per env.
options = {
  // How long to block waiting for server selection (in ms)
  serverSelectionTimeoutMS: Number(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS || 30000),
  // How long to wait for initial connection (in ms)
  connectTimeoutMS: Number(process.env.MONGODB_CONNECT_TIMEOUT_MS || 10000),
  // Socket inactivity timeout
  socketTimeoutMS: Number(process.env.MONGODB_SOCKET_TIMEOUT_MS || 45000),
  ...options,
}

// Helpful debug output for TLS issues
const debugConnInfo = () => {
  try {
    // mask credentials in uri for logging
    const safeUri = uri.replace(/:\/\/([^:@]+):([^@]+)@/, '://<user>:<pass>@')
    console.info("[mongo] connecting to:", safeUri)
    console.info("[mongo] node version:", process.version)
    // OpenSSL version detected by Node
    console.info("[mongo] openssl versions:", process.versions.openssl)
    console.info("[mongo] platform:", process.platform, os.arch())
    console.info("[mongo] options:", options)
  } catch (err) {
    console.warn("[mongo] failed to print debug info", err)
  }
}

let client: MongoClient | undefined
let clientPromise: Promise<MongoClient>

debugConnInfo()

const makeClientPromise = async () => {
  const maxAttempts = Number(process.env.MONGODB_CONNECT_RETRIES || 3)
  let attempt = 0
  while (attempt < maxAttempts) {
    attempt++
    try {
      console.info(`[mongo] connect attempt ${attempt}/${maxAttempts}`)
      client = new MongoClient(uri, options)
      const c = await client.connect()
      console.info('[mongo] connected on attempt', attempt)
      return c
    } catch (err) {
      console.error(`[mongo] connection error attempt ${attempt}:`, err)
      // on last attempt, rethrow
      if (attempt >= maxAttempts) {
        throw err
      }
      // wait a bit before retrying (exponential backoff)
      const delay = 500 * Math.pow(2, attempt - 1)
      console.info(`[mongo] retrying in ${delay}ms`)
      await new Promise((r) => setTimeout(r, delay))
    }
  }
  // should not reach here
  throw new Error('Failed to create mongo client')
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = makeClientPromise()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  clientPromise = makeClientPromise()
}

export default clientPromise
