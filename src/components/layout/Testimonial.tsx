"use client"
import HeroVideoDialog from "../magicui/hero-video-dialog"

const Testimonials = () => {
  const testimonials = [
  {
    id: 1,
    name: "Amit Kafle",
    school: "Everest English Boarding School",
    content:
      "Absolutely love this website! It's like a study buddy that's always there to help me. The MCQs, notes, and videos are super helpful. It's like having a teacher with me 24/7. Highly recommended!",
  },
  {
    id: 2,
    name: "Sakhxyam Pangeni",
    school: "New Horizon English Boarding School",
    content:
      "This website has changed the way I study. The notes are so easy to understand, and the quizzes help me prepare for exams. I love how I can practice whenever I want, and it's so much fun too!",
  },
  {
    id: 3,
    name: "Aaditya Dhakal",
    school: "Shree Sharada Secondary School",
    content:
      "Learning through this platform is easy as a breeze! The notes and quizzes are very straightforward and easy to comprehend. I use it every day to study and practice my skills. This is an awesome application that I would most definitely endorse!!",
  },
  {
    id: 4,
    name: "Jinisha Basyal",
    school: "Polestar Wisdom Boarding School",
    content:
      "Your site on education is very helpful for understanding the difficult topics very easily-as this comprises a lot more resources in the form of videos and quizzes, and notes. I feel much more at ease with my studies now because of that. Thank you very much to the team.",
    featured: true,
  },
];


  return (
    <section className="w-full bg-gradient-to-b from-[#f5f5f5] to-white py-8 md:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight mb-2">
            Trusted by Students
            <br />
            <span className="inline-flex gap-2">
              <span className="text-[#275cc3]">Across</span>
              <span className="text-[#e20869]">Nepal</span>
            </span>
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-[#275cc3] via-[#f1ab0f] to-[#e20869] mx-auto mt-3 rounded-full"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mt-4">
            Real stories from real students who transformed their learning experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {testimonials.slice(0, 3).map((testimonial) => (
            <div
              key={testimonial.id}
              className="group bg-white rounded-xl p-4 md:p-5 border border-gray-100 hover:border-[#275cc3] hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className="mb-3 inline-block">
                <div className="relative">
                  <svg className="w-8 h-8 text-[#f1ab0f]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-4.716-5-7-5C5.37 4.5 3 7.5 3 9.972C3 16.5 6 21 3 21z" />
                  </svg>
                  <div className="absolute inset-0 bg-[#f1ab0f] opacity-10 blur-md group-hover:opacity-20 transition-opacity -z-10"></div>
                </div>
              </div>

              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4 line-clamp-4 font-medium">
                {testimonial.content}
              </p>

              <div className="border-t border-gray-100 pt-3">
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">{testimonial.name}</h3>
                <p className="text-[#275cc3] text-xs md:text-sm font-medium mt-1">{testimonial.school}</p>
              </div>
            </div>
          ))}

          <div className="md:col-span-2 lg:col-span-3 bg-gradient-to-br from-[#275cc3] via-[#1d3f8f] to-[#e20869] rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 min-h-72">
              <div className="relative bg-gray-900 aspect-video md:aspect-auto group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#275cc3]/20 to-transparent z-10"></div>
                <HeroVideoDialog
                  className="block w-full h-full relative z-0"
                  animationStyle="from-center"
                  videoSrc="/assets/video/gyanjyoti.mp4"
                  thumbnailAlt="Student Testimonial Video"
                  thumbnailSrc="/assets/testimonialthumbnail.jpg"
                />
              </div>

              <div className="p-4 md:p-5 lg:p-6 flex flex-col justify-center bg-white relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#f1ab0f]/10 to-transparent rounded-bl-full"></div>

                <div className="relative z-10">
                  <svg className="w-7 h-7 text-[#f1ab0f] mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-4.716-5-7-5C5.37 4.5 3 7.5 3 9.972C3 16.5 6 21 3 21z" />
                  </svg>

                  <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4 font-medium">
                    {testimonials[3].content}
                  </p>

                  <div className="border-t border-gray-200 pt-3">
                    <h3 className="font-bold text-gray-900 text-base md:text-lg">{testimonials[3].name}</h3>
                    <p className="text-[#275cc3] text-sm md:text-base font-semibold mt-1">{testimonials[3].school}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
