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
              <span className="font-semibold">Gyanjoti</span> is a multiple
              award-winning academic platform developed in Nepal and used
              globally by students, parents and educators.
            </p>
            <p className="text-slate-700 leading-relaxed text-lg font-body">
              It helps enhance academic performance by delivering online lessons
              and resources, and managing assignments. It also provides a
              collaborative environment where teachers can share educational
              content and track student progress, while parents monitor their
              progress.
            </p>
            <p className="text-slate-700 leading-relaxed text-lg font-body">
              Furthermore, GyanJyoti&apos;s Chatroom feature enables effective
              collaboration between students, teachers, parents and school
              leaders to ensure everyone is informed about the student&apos;s
              progress and can provide support as needed. The platform
              personalizes direction and timely intervention, leading to better
              academic outcomes.
            </p>
          </div>
          <div className="relative rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300 mx-auto lg:mx-0 max-w-md lg:max-w-full">
            <Image
              src="assets/students.svg"
              alt="Gyanjoti Learning Platform"
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

        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full lg:w-1/2">
            <Image
              src="/assets/Director.png?height=600&width=500"
              width={500}
              height={600}
              alt="Testimonial person"
              className="mx-auto"
            />
          </div>

          <div className="w-full lg:w-1/2 space-y-6">
            <div className="text-[#2196F3] text-8xl font-serif">&quot;</div>

            <p className="text-gray-700 text-lg">
              Our mission to transform the nation through education is the
              result of our two decades of experience in higher education. This
              globally proven platform, designed in Nepal and led by the best
              minds from Singapore and Cambridge, is our guiding light to a
              brighter future. We will begin with secondary education first and
              then work our way through the entire learning spectrum. Thanks to
              a special combination of smart and an easy-to-use platform, we're
              on track to making an impact on individual learners, educators,
              educational institutions and the education system as a whole!
            </p>

            <div className="pt-4">
              <p className="text-[#E91E63] font-semibold">— Sushant Gautam</p>
              <p className="text-gray-600">Executive Director of GyanJyoti</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
