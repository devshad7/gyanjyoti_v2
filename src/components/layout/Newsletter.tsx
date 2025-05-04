import { Input } from "../ui/input"
import { Button } from "../ui/button"

const Newsletter = () => {
  return (
    <section className="relative overflow-hidden py-10"> {/* Reduced padding */}
      {/* Background elements */}
      <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-blue-600 opacity-10 blur-3xl"></div> {/* Reduced size */}
      <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-pink-600 opacity-10 blur-3xl"></div> {/* Reduced size */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-amber-500 opacity-5 blur-3xl"></div> {/* Reduced size */}

      <div className="relative max-w-xl mx-auto text-center px-4">
        <div className="flex justify-center mb-4"> {/* Reduced margin */}
          <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-lg"> {/* Reduced size */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white" // Reduced size
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 via-pink-600 to-amber-500 bg-clip-text text-transparent">
          Subscribe Newsletter
        </h2> 
        
        <p className="text-gray-600 mb-6 text-base"> 
          You learn today and earn tomorrow. The roots of education are bitter but the fruits are sweet.
        </p>

        <div className="flex flex-col sm:flex-row gap-2 relative z-10"> 
          <Input
            placeholder="Enter Your Email Address"
            className="flex-1 border-2 border-gray-200 focus-visible:ring-blue-600 focus-visible:border-blue-600 h-10 px-4 rounded-lg shadow-sm"
          />
          <Button className="bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 transition-all duration-300 h-10 px-6 rounded-lg font-medium text-white shadow-md"> {/* Reduced height */}
            Subscribe
          </Button>
        </div>

        <div className="flex justify-center mt-6 space-x-4"> 
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          <span className="w-2 h-2 rounded-full bg-pink-600"></span>
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
