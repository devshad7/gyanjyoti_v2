import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-white py-16">
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
                <h3 className="text-xl font-bold text-blue-600">GyanJyoti</h3>
              </div>
            </div>
            <p className="text-gray-600 mb-5">
              Join the highest, tempur vita nulla. Phasellus laoreet, nunc elitr
              condimentum lorem ipsum dolor.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
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
                href="#"
                className="w-9 h-9 rounded-full bg-pink-600 hover:bg-pink-700 transition-colors flex items-center justify-center text-white"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-amber-500 hover:bg-amber-600 transition-colors flex items-center justify-center text-white"
              >
                <span className="sr-only">YouTube</span>
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                    clipRule="evenodd"
                  />
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
                  href="/process"
                  className="text-gray-600 hover:text-pink-600 transition-colors"
                >
                  Our Process
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-600 hover:text-pink-600 transition-colors"
                >
                  Services
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-5 text-pink-600">Community</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/premium"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Go Premium
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Team Plans
                </Link>
              </li>
              <li>
                <Link
                  href="/refer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Refer a Friend
                </Link>
              </li>
              <li>
                <Link
                  href="/gift"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Gift Cards
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
                  href="/newsletter"
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
          <div className="absolute bottom-0 right-0">
            <p className="text-sm bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent font-medium">
              Designed and Developed by Nexolinx
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
