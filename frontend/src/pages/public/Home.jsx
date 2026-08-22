import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Users,
  Trophy,
} from "lucide-react";

function Home() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-150 flex items-center">
            <div className="max-w-3xl py-20">
              <p className="text-blue-400 font-semibold mb-4">
                WELCOME TO OUR SCHOOL
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Shaping Young Minds for a
                <span className="text-blue-400"> Brighter Future</span>
              </h1>

              <p className="mt-6 text-lg text-slate-300 max-w-2xl leading-8">
                We believe in providing quality education, nurturing creativity,
                building character, and preparing students for a successful
                future.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
                >
                  Discover More
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/contact"
                  className="px-6 py-3 border border-slate-600 hover:bg-slate-800 rounded-lg font-medium transition"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
            <div className="p-6 text-center border-b lg:border-b-0 lg:border-r border-slate-100">
              <GraduationCap className="mx-auto text-blue-600 mb-2" size={30} />
              <h3 className="text-2xl font-bold text-slate-900">25+</h3>
              <p className="text-sm text-slate-500">Years of Excellence</p>
            </div>

            <div className="p-6 text-center border-b lg:border-b-0 lg:border-r border-slate-100">
              <Users className="mx-auto text-blue-600 mb-2" size={30} />
              <h3 className="text-2xl font-bold text-slate-900">1000+</h3>
              <p className="text-sm text-slate-500">Students</p>
            </div>

            <div className="p-6 text-center border-r border-slate-100">
              <BookOpen className="mx-auto text-blue-600 mb-2" size={30} />
              <h3 className="text-2xl font-bold text-slate-900">50+</h3>
              <p className="text-sm text-slate-500">Teachers</p>
            </div>

            <div className="p-6 text-center">
              <Trophy className="mx-auto text-blue-600 mb-2" size={30} />
              <h3 className="text-2xl font-bold text-slate-900">100+</h3>
              <p className="text-sm text-slate-500">Achievements</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-blue-600 font-semibold mb-3">
                ABOUT OUR SCHOOL
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Education Beyond the Classroom
              </h2>

              <p className="mt-5 text-slate-600 leading-7">
                Our school is committed to creating an environment where every
                student gets the opportunity to learn, grow and discover their
                potential.
              </p>

              <p className="mt-4 text-slate-600 leading-7">
                Through academics, sports, cultural activities and practical
                learning, we help students develop confidence, discipline and
                leadership skills.
              </p>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 mt-6 text-blue-600 font-semibold hover:text-blue-700"
              >
                Learn More
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="h-80 lg:h-96 rounded-2xl bg-slate-100 flex items-center justify-center">
              <GraduationCap size={100} className="text-slate-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Notices & Events Preview */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Notices */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-blue-600 text-sm font-semibold">LATEST</p>

                  <h2 className="text-2xl font-bold text-slate-900">Notices</h2>
                </div>

                <Link
                  to="/notices"
                  className="text-sm text-blue-600 font-medium"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="p-4 rounded-lg bg-slate-50 hover:bg-blue-50 transition"
                  >
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-700 flex flex-col items-center justify-center shrink-0">
                        <span className="text-xs">AUG</span>
                        <span className="font-bold">22</span>
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-900">
                          School Notice Title
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          Important information for students and parents.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Events */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-blue-600 text-sm font-semibold">
                    UPCOMING
                  </p>

                  <h2 className="text-2xl font-bold text-slate-900">Events</h2>
                </div>

                <Link
                  to="/events"
                  className="text-sm text-blue-600 font-medium"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="p-4 rounded-lg bg-slate-50 hover:bg-blue-50 transition"
                  >
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                        <CalendarDays size={22} />
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-900">
                          Upcoming School Event
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          Join us for an exciting school event.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-blue-600 font-semibold mb-3">HAVE QUESTIONS?</p>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            We Would Love to Hear From You
          </h2>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Get in touch with us for admissions, general enquiries, school
            information and more.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 mt-7 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
          >
            Contact Us
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
