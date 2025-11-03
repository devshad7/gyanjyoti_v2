import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
  <footer className="relative py-8 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 -z-10 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-yellow-400 opacity-10 rounded-full blur-3xl hidden sm:block"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-600 opacity-10 rounded-full blur-3xl hidden sm:block"></div>
        <div className="absolute top-1/3 left-1/4 w-40 h-80 bg-pink-500 opacity-10 rounded-full blur-2xl hidden md:block"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-yellow-50"></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-3 mb-5">
                <div className="relative w-16 h-16">
                  {" "}
                  {/* Adjust the width and height here */}
                  <Image
                    src="/assets/Gyan_logo.png?height=300&width=300"
                    alt="GyanJyoti Logo"
                    fill
                    className="object-contain"
                  />
                </div>
               <span className="tracking-tight md:block hidden">
                <span className="text-[#275cc3] text-xl font-bold">Gyan</span>
                <span className="text-[#e20869] text-xl font-bold">Jyoti</span>
              </span>
              </div>
            </div>
            <p className="text-gray-600 mb-5">
              An educational website that provides access to various
              school-level books, science fiction, and mind games.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/NexoLinx"
                className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center text-white"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/nexolinx011/"
                className="w-9 h-9 rounded-full bg-pink-600 hover:bg-pink-700 transition-colors flex items-center justify-center text-white"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.344 3.608 1.319.975.975 1.257 2.242 1.319 3.608.058 1.266.07 1.645.07 4.84s-.012 3.574-.07 4.84c-.062 1.366-.344 2.633-1.319 3.608-.975.975-2.242 1.257-3.608 1.319-1.266.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.344-3.608-1.319-.975-.975-1.257-2.242-1.319-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.574.07-4.84c.062-1.366.344-2.633 1.319-3.608.975-.975 2.242-1.257 3.608-1.319C8.416 2.175 8.796 2.163 12 2.163zm0 1.838c-3.17 0-3.548.012-4.796.07-1.006.047-1.555.216-1.918.362a3.601 3.601 0 0 0-1.313.857 3.601 3.601 0 0 0-.857 1.313c-.146.363-.315.912-.362 1.918-.058 1.248-.07 1.626-.07 4.796s.012 3.548.07 4.796c.047 1.006.216 1.555.362 1.918.2.5.476.952.857 1.313.361.381.813.657 1.313.857.363.146.912.315 1.918.362 1.248.058 1.626.07 4.796.07s3.548-.012 4.796-.07c1.006-.047 1.555-.216 1.918-.362a3.601 3.601 0 0 0 1.313-.857 3.601 3.601 0 0 0 .857-1.313c.146-.363.315-.912.362-1.918.058-1.248.07-1.626.07-4.796s-.012-3.548-.07-4.796c-.047-1.006-.216-1.555-.362-1.918a3.601 3.601 0 0 0-.857-1.313 3.601 3.601 0 0 0-1.313-.857c-.363-.146-.912-.315-1.918-.362-1.248-.058-1.626-.07-4.796-.07zm0 4.838a5.163 5.163 0 1 1 0 10.326 5.163 5.163 0 0 1 0-10.326zm0 1.838a3.325 3.325 0 1 0 0 6.65 3.325 3.325 0 0 0 0-6.65zm6.406-2.007a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/nexolinx/"
                className="w-9 h-9 rounded-full bg-amber-500 hover:bg-amber-600 transition-colors flex items-center justify-center text-white"
              >
                <span className="sr-only">Linkedin</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14C2.239 0 1 1.239 1 3v18c0 1.761 1.239 3 3 3h14c1.761 0 3-1.239 3-3V3c0-1.761-1.239-3-3-3zm-11 19H5V9h3v10zm-1.5-11.268c-.966 0-1.75-.804-1.75-1.732S5.534 4.268 6.5 4.268c.965 0 1.75.804 1.75 1.732s-.785 1.732-1.75 1.732zM19 19h-3v-5.604c0-3.036-4-2.804-4 0V19h-3V9h3v1.337c1.396-2.586 7-2.777 7 2.476V19z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-5 text-blue-600">Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-pink-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-pink-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="text-gray-600 hover:text-pink-600 transition-colors"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-gray-600 hover:text-pink-600 transition-colors"
                >
                  Blogs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-5 text-pink-600">Community</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/material"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Study Materials
                </Link>
              </li>
              <li>
                <Link
                  href="/gyan-quest"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Gyan Quest
                </Link>
              </li>
              <li>
                <Link
                  href="/gyan-ai"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Gyan AI
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Gyan Verse
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-5 text-amber-500">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/support"
                  className="text-gray-600 hover:text-amber-500 transition-colors"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-amber-500 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-amber-500 transition-colors"
                >
                  Newsletter
                </Link>
              </li>
              <li>
                <Link
                  href="/management"
                  className="text-gray-600 hover:text-amber-500 transition-colors"
                >
                  User Management
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative border-t border-gray-100 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600">
              GyanJyoti © 2025. All right Reserved
            </p>
          </div>
          <div className="absolute bottom-10 right-20">
            <p className="text-md bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent font-medium">
              Designed and Developed by&nbsp;
              <a className="text-blue-600 underline" href="https://www.nexolinx.com">Nexolinx</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
