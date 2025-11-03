import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="max-w-7xl  mx-auto py-12 md:py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Main About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-8 flex flex-col justify-center px-4 lg:px-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4 font-heading">
                About Gyanjoti
              </h2>
              <div className="w-20 h-1 bg-yellow-400 mx-auto lg:mx-0 mb-6"></div>
            </div>
            <p className="text-slate-700 leading-relaxed text-lg font-body">
              <span className="font-semibold">GyanJyoti</span> is a leading
              Nepali e&mdash;learning platform offering high&mdash;quality video
              courses, interactive quizzes, and downloadable PDFs designed for
              secondary&mdash;level students.
            </p>
            <p className="text-slate-700 leading-relaxed text-lg font-body">
              It enhances academic performance by providing engaging online
              lessons and essential study materials that make learning more
              effective and enjoyable.
            </p>
            <p className="text-slate-700 leading-relaxed text-lg font-body">
              With integrated tools&mdash;including courses, quizzes, study
              materials, and the intelligent Gyan AI Assistant&mdash;GyanJyoti
              delivers real-time learning support, helping students strengthen
              their understanding and achieve academic excellence.
            </p>
          </div>
          <div className="relative rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300 mx-auto lg:mx-0 max-w-md lg:max-w-full">
            <Image
              src="assets/students.svg"
              alt="Gyanjoti Learning Platform"
              loading="lazy"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 to-transparent opacity-60"></div>
          </div>
        </div>

        {/* Mission and Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          <div className="bg-white p-10 rounded-xl shadow-lg border-t-4 border-blue-600 transform hover:translate-y-[-5px] transition-transform duration-300">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
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
              <h3 className="text-2xl font-bold text-blue-600 font-heading">
                Our Vision
              </h3>
              <div className="w-16 h-1 bg-yellow-400 mt-3 mb-6"></div>
            </div>
            <p className="text-slate-700 leading-relaxed text-lg text-center font-body">
              To revolutionize education by making quality learning accessible
              to every student, regardless of their location or background.
            </p>
            <p className="text-slate-700 leading-relaxed text-lg text-center mt-4 font-body">
              We envision a world where educational barriers are eliminated, and
              every learner has the tools they need to succeed in an
              increasingly complex and competitive global environment.
            </p>
            <div className="mt-6 flex justify-center">
              <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                Empowering Through Education
              </span>
            </div>
          </div>

          <div className="bg-white p-10 rounded-xl shadow-lg border-t-4 border-pink-600 transform hover:translate-y-[-5px] transition-transform duration-300">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-pink-600 font-heading">
                Our Mission
              </h3>
              <div className="w-16 h-1 bg-yellow-400 mt-3 mb-6"></div>
            </div>
            <p className="text-slate-700 leading-relaxed text-lg text-center font-body">
              To provide an innovative educational platform that connects
              students, teachers, and parents in a collaborative learning
              environment.
            </p>
            <p className="text-slate-700 leading-relaxed text-lg text-center mt-4 font-body">
              We strive to enhance academic performance through personalized
              learning experiences, timely interventions, and effective
              communication, creating a supportive ecosystem that nurtures the
              full potential of every student.
            </p>
            <div className="mt-6 flex justify-center">
              <span className="inline-block px-4 py-2 bg-pink-50 text-pink-600 rounded-full text-sm font-medium">
                Transforming Education Together
              </span>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4 font-heading">
              Our Core Values
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg font-body">
              These principles guide everything we do at Gyanjoti, from product
              development to customer support.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-yellow-400 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-yellow-600 mb-4 font-heading">
                Excellence
              </h3>
              <p className="text-slate-700 font-body">
                We strive for excellence in all aspects of our educational
                platform, constantly improving to provide the best learning
                experience for every user.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-blue-600 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-blue-600 mb-4 font-heading">
                Collaboration
              </h3>
              <p className="text-slate-700 font-body">
                We believe in the power of collaboration between students,
                teachers, and parents to create a supportive learning
                environment that fosters growth and achievement.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-pink-600 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-pink-600 mb-4 font-heading">
                Innovation
              </h3>
              <p className="text-slate-700 font-body">
                We embrace innovation and technology to transform traditional
                education and make learning more engaging, effective, and
                accessible to all.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-yellow-400 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-yellow-600 mb-4 font-heading">
                Accessibility
              </h3>
              <p className="text-slate-700 font-body">
                We are committed to making quality education accessible to all
                students, regardless of their geographical location or
                socioeconomic status.
              </p>
            </div>
          </div>
        </div>

        {/* Leadership Testimonials Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4 font-heading">
              Leadership Perspectives
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg font-body">
              Hear from our visionary leaders who are transforming education in
              Nepal
            </p>
          </div>

          <div className="space-y-16">
            {/* Executive Director Testimonial */}
            <article className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 hover:shadow-3xl transition-all duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 p-12 flex items-center justify-center">
                  <div className="relative">
                    <Image
                      src="/assets/Director.png?height=400&width=400"
                      loading="lazy"
                      width={280}
                      height={280}
                      alt="Sushant Gautam - Executive Director at GyanJyoti"
                      className="rounded-full border-8 border-white shadow-2xl object-cover"
                    />
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute top-8 left-8 w-20 h-20 bg-blue-200 rounded-full opacity-30"></div>
                  <div className="absolute bottom-8 right-8 w-16 h-16 bg-yellow-300 rounded-full opacity-40"></div>
                </div>

                {/* Content Section */}
                <div className="p-12 flex flex-col justify-center">
                  <div className="mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 font-heading">
                      Sushant Gautam
                    </h3>
                    <p className="text-blue-600 font-semibold text-lg uppercase tracking-wide mb-4">
                      Executive Director At GyanJyoti
                    </p>
                    <div className="w-20 h-1 bg-blue-600 mb-6"></div>
                  </div>

                  <div className="relative mb-8">
                    <div className="text-blue-600 text-6xl font-serif absolute -top-6 -left-4 opacity-20">
                      &quot;
                    </div>
                    <blockquote className="text-gray-700 text-lg md:text-xl leading-relaxed italic pl-8 font-body">
                      In just two years, our journey in higher education has
                      been both inspiring and impactful. GyanJyoti, built here
                      in Nepal and powered by Nexolinx, is more than just a
                      platform — it&apos;s a growing community of learners and
                      educators. Our goal is simple: to make quality education
                      accessible, meaningful, and transformative for everyone.
                    </blockquote>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-600 font-medium"></span>
                  </div>
                </div>
              </div>
            </article>

            {/* Team Leader Testimonial */}
            <article className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 hover:shadow-3xl transition-all duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Content Section - Reversed Order */}
                <div className="p-12 flex flex-col justify-center order-2 lg:order-1">
                  <div className="mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 font-heading">
                      Shishir Pandey
                    </h3>
                    <p className="text-pink-600 font-semibold text-lg uppercase tracking-wide mb-4">
                      Team Leader At GyanJyoti
                    </p>
                    <div className="w-20 h-1 bg-pink-600 mb-6"></div>
                  </div>

                  <div className="relative mb-8">
                    <div className="text-pink-600 text-6xl font-serif absolute -top-6 -left-4 opacity-20">
                      &quot;
                    </div>
                    <blockquote className="text-gray-700 text-lg md:text-xl leading-relaxed italic pl-8 font-body">
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
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-600 font-medium">
                      Innovation Expert
                    </span>
                  </div>
                </div>

                {/* Image Section - Reversed Order */}
                <div className="relative bg-gradient-to-br from-pink-50 to-pink-100 p-12 flex items-center justify-center order-1 lg:order-2">
                  <div className="relative">
                    <Image
                      src="/assets/team-leader.png?height=400&width=400"
                      loading="lazy"
                      width={280}
                      height={280}
                      alt="Shishir Pandey - Team Leader at GyanJyoti"
                      className="rounded-full border-8 border-white shadow-2xl object-cover"
                    />
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute top-8 right-8 w-20 h-20 bg-pink-200 rounded-full opacity-30"></div>
                  <div className="absolute bottom-8 left-8 w-16 h-16 bg-yellow-300 rounded-full opacity-40"></div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
