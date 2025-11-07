import Image from "next/image"

export default function AboutSection() {
  return (
    <section className="w-full py-8 md:py-16 lg:py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Main About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-center mb-12 md:mb-20">
          <div className="space-y-5 md:space-y-7 flex flex-col justify-center">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-3 md:mb-4">About Gyanjoti</h2>
              <div className="w-16 md:w-20 h-1 bg-yellow-400 mx-auto lg:mx-0"></div>
            </div>
            <div className="space-y-4 md:space-y-5">
              <p className="text-base md:text-lg lg:text-xl text-slate-700 leading-relaxed font-medium">
                <span className="font-bold">GyanJyoti</span> is a leading Nepali e-learning platform offering
                high-quality video courses, interactive quizzes, and downloadable PDFs designed for secondary-level
                students.
              </p>
              <p className="text-base md:text-lg lg:text-xl text-slate-700 leading-relaxed font-medium">
                It enhances academic performance by providing engaging online lessons and essential study materials that
                make learning more effective and enjoyable.
              </p>
              <p className="text-base md:text-lg lg:text-xl text-slate-700 leading-relaxed font-medium">
                With integrated tools—including courses, quizzes, study materials, and the intelligent Gyan AI
                Assistant—GyanJyoti delivers real-time learning support, helping students strengthen their understanding
                and achieve academic excellence.
              </p>
            </div>
          </div>
          <div className="hidden lg:flex relative rounded-xl overflow-hidden shadow-lg">
            <Image
              src="assets/students.svg"
              alt="Gyanjoti Learning Platform"
              loading="lazy"
              width={500}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Mission and Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mb-12 md:mb-20">
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border-t-4 border-blue-600 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center mb-5 md:mb-6">
              <div className="w-14 md:w-16 h-14 md:h-16 bg-blue-600 rounded-full flex items-center justify-center mb-3 md:mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 md:h-8 w-7 md:w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-600">Our Vision</h3>
              <div className="w-12 md:w-16 h-1 bg-yellow-400 mt-3 md:mt-4"></div>
            </div>
            <div className="space-y-3 md:space-y-4">
              <p className="text-base md:text-lg text-slate-700 leading-relaxed text-center font-medium">
                To revolutionize education by making quality learning accessible to every student, regardless of their
                location or background.
              </p>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed text-center font-medium">
                We envision a world where educational barriers are eliminated, and every learner has the tools they need
                to succeed in an increasingly complex and competitive global environment.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border-t-4 border-pink-600 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center mb-5 md:mb-6">
              <div className="w-14 md:w-16 h-14 md:h-16 bg-pink-600 rounded-full flex items-center justify-center mb-3 md:mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 md:h-8 w-7 md:w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-pink-600">Our Mission</h3>
              <div className="w-12 md:w-16 h-1 bg-yellow-400 mt-3 md:mt-4"></div>
            </div>
            <div className="space-y-3 md:space-y-4">
              <p className="text-base md:text-lg text-slate-700 leading-relaxed text-center font-medium">
                To provide an innovative educational platform that connects students, teachers, and parents in a
                collaborative learning environment.
              </p>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed text-center font-medium">
                We strive to enhance academic performance through personalized learning experiences, timely
                interventions, and effective communication, creating a supportive ecosystem that nurtures the full
                potential of every student.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-12 md:mb-20">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-3 md:mb-4">Our Core Values</h2>
            <div className="w-20 md:w-24 h-1 bg-yellow-400 mx-auto"></div>
            <p className="text-base md:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto mt-4 md:mt-5 font-medium">
              These principles guide everything we do at Gyanjoti, from product development to customer support.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {[
              {
                title: "Excellence",
                color: "yellow",
                description:
                  "We strive for excellence in all aspects of our educational platform, constantly improving to provide the best learning experience for every user.",
              },
              {
                title: "Collaboration",
                color: "blue",
                description:
                  "We believe in the power of collaboration between students, teachers, and parents to create a supportive learning environment that fosters growth and achievement.",
              },
              {
                title: "Innovation",
                color: "pink",
                description:
                  "We embrace innovation and technology to transform traditional education and make learning more engaging, effective, and accessible to all.",
              },
              {
                title: "Accessibility",
                color: "yellow",
                description:
                  "We are committed to making quality education accessible to all students, regardless of their geographical location or socioeconomic status.",
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className={`bg-white p-5 md:p-6 rounded-lg shadow-sm border-l-4 ${
                  value.color === "yellow"
                    ? "border-yellow-600"
                    : value.color === "blue"
                      ? "border-blue-600"
                      : "border-pink-600"
                } hover:shadow-md transition-shadow`}
              >
                <h3
                  className={`text-lg md:text-xl font-bold ${
                    value.color === "yellow"
                      ? "text-yellow-600"
                      : value.color === "blue"
                        ? "text-blue-600"
                        : "text-pink-600"
                  } mb-3`}
                >
                  {value.title}
                </h3>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed font-medium">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Section */}
        <div>
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-3 md:mb-4">
              Leadership Perspectives
            </h2>
            <div className="w-20 md:w-24 h-1 bg-yellow-400 mx-auto"></div>
            <p className="text-base md:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto mt-4 md:mt-5 font-medium">
              Hear from our visionary leaders who are transforming education in Nepal
            </p>
          </div>

          <div className="space-y-8 md:space-y-10">
            {/* Executive Director */}
            <article className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Image - Hidden on mobile */}
                <div className="hidden md:flex relative bg-gradient-to-br from-blue-50 to-blue-100 p-6 md:p-8 items-center justify-center">
                  <div className="relative">
                    <Image
                      src="/assets/Director.png?height=300&width=300"
                      loading="lazy"
                      width={220}
                      height={220}
                      alt="Sushant Gautam - Executive Director"
                      className="rounded-full border-4 border-white shadow-lg object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="mb-5 md:mb-6">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Sushant Gautam</h3>
                    <p className="text-sm md:text-base text-blue-600 font-semibold uppercase tracking-wide">
                      Executive Director At GyanJyoti
                    </p>
                    <div className="w-12 md:w-16 h-1 bg-blue-600 mt-3 md:mt-4"></div>
                  </div>

                  <blockquote className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed italic mb-5 md:mb-6 font-medium">
                    In just two years, our journey in higher education has
                      been both inspiring and impactful. GyanJyoti, built here
                      in Nepal and powered by Nexolinx, is more than just a
                      platform — it&apos;s a growing community of learners and
                      educators. Our goal is simple: to make quality education
                      accessible, meaningful, and transformative for everyone.
                  </blockquote>

                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            {/* Team Leader */}
            <article className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col justify-center order-2 md:order-1">
                  <div className="mb-5 md:mb-6">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Shishir Pandey</h3>
                    <p className="text-sm md:text-base text-pink-600 font-semibold uppercase tracking-wide">
                      Team Leader At GyanJyoti
                    </p>
                    <div className="w-12 md:w-16 h-1 bg-pink-600 mt-3 md:mt-4"></div>
                  </div>

                  <blockquote className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed italic mb-5 md:mb-6 font-medium">
                    At Gyanjyoti, we&apos;re reimagining education through
                      interactive simulations, AI-powered support, and
                      project-based learning. As a passionate innovator in
                      science and sustainability, I lead this mission to make
                      quality education accessible to all. We&apos;re not just
                      teaching&mdash;we&apos;re inspiring students to think,
                      question, and create. With technology as our tool and
                      curiosity as our compass, we&apos;re lighting the path for
                      tomorrow&apos;s changemakers.
                  </blockquote>

                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Image - Hidden on mobile */}
                <div className="hidden md:flex relative bg-gradient-to-br from-pink-50 to-pink-100 p-6 md:p-8 items-center justify-center order-1 md:order-2">
                  <div className="relative">
                    <Image
                      src="/assets/team-leader.png?height=300&width=300"
                      loading="lazy"
                      width={220}
                      height={220}
                      alt="Shishir Pandey - Team Leader"
                      className="rounded-full border-4 border-white shadow-lg object-cover"
                    />
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
