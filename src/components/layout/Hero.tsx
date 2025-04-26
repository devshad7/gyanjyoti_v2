import { Button } from "@/components/ui/button";

const heroImage = "/assets/image.png";

const Hero = () => {
  return (
    <section className="relative max-w-7xl mx-auto overflow-hidden min-h-auto flex items-center justify-center py-8 md:py-18 px-2 sm:px-4 md:px-8 font-sans rounded-lg">
      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-yellow-400 opacity-10 rounded-full blur-3xl hidden sm:block"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-600 opacity-10 rounded-full blur-3xl hidden sm:block"></div>
        <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-pink-500 opacity-10 rounded-full blur-2xl hidden md:block"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-yellow-50"></div>
      </div>

      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-8 items-center">
        {/* Left Content */}
        <div className="z-10 w-full px-2 sm:px-4 md:px-0">
          <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-blue-800 bg-blue-100 rounded-full animate-fade-in">
            Transforming Education
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight tracking-tight animate-fade-in">
            Illuminate Your <span className="text-blue-600">Learning</span>{" "}
            Journey with <span className="text-pink-600">GyanJyoti</span>
          </h1>
          <p className="text-gray-600 mb-8 max-w-xl text-base sm:text-lg font-normal animate-fade-in">
            Access high-quality courses, interactive lessons, and expert
            mentorship to expand your knowledge and skills in a supportive
            digital learning environment.
          </p>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full animate-fade-in">
            <Button className="relative bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md shadow-md hover:shadow-lg hover:shadow-blue-200/40 hover:translate-y-[-2px] transition-all duration-300 font-semibold cursor-pointer transform-gpu overflow-hidden group w-full sm:w-auto">
              <span className="relative z-10">Start Learning</span>
              <span
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-blue-700 group-hover:scale-105 transition-transform duration-300 ease-out"
                aria-hidden="true"
              ></span>
              <span
                className="absolute inset-0 w-0 h-full bg-gradient-to-r from-pink-600 to-blue-600 group-hover:w-full transition-all duration-500 ease-out"
                aria-hidden="true"
              ></span>
            </Button>
            <Button
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-md hover:bg-blue-50 hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 font-semibold cursor-pointer transform-gpu w-full sm:w-auto"
            >
              Explore Courses
            </Button>
          </div>
        </div>
        {/* Right Image and Cards */}
        <div className="relative">
          <div className="re z-10">
            <div className="relative ">
              <img
                src={heroImage}
                alt="Student with books"
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
