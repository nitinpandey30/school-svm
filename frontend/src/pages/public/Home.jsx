import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Users,
  Trophy,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
    {
      image: "/school-hero.jpg",
      
    },
    {
      image: "/school-hero-2.jpg",
      title: "Learn. Grow. Achieve.",
      subtitle: "Building Knowledge, Character and Confidence",
    },
    {
      image: "/school-hero-3.jpg",
      title: "A Place to Learn and Grow",
      subtitle: "Education Beyond the Classroom",
    },
  ];

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  return (
    <div className="bg-white">

      {/* ================= HERO ================= */}
      <section className="relative h-[520px] sm:h-[600px] lg:h-[680px] overflow-hidden">

        {/* Background Image */}
        <img
          src={slides[currentSlide].image}
          alt="School campus"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">

          <div className="max-w-3xl text-white">

            {/* <p className="text-blue-300 font-semibold tracking-wide uppercase mb-4">
              Welcome to Our School
            </p> */}

            {/* <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              {slides[currentSlide].title}
            </h1>

            <p className="mt-5 text-xl sm:text-2xl text-slate-200 font-medium">
              {slides[currentSlide].subtitle}
            </p> */}

            <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl leading-7">
              We believe in providing quality education, nurturing creativity,
              building character and preparing every student for a successful
              future.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">

              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
              >
                Discover More
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/40 text-white rounded-lg font-semibold transition"
              >
                Contact Us
              </Link>

            </div>
          </div>
        </div>

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center transition"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center transition"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all ${
                currentSlide === index
                  ? "w-8 bg-white"
                  : "w-2.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>


      {/* ================= STATS ================= */}
      <section className="relative -mt-12 z-20">
        <div className="max-w-6xl mx-auto px-4">

          <div className="grid grid-cols-2 lg:grid-cols-4 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden">

            <div className="p-6 text-center border-b lg:border-b-0 lg:border-r border-slate-100">
              <GraduationCap
                className="mx-auto text-blue-600 mb-2"
                size={30}
              />

              <h3 className="text-2xl font-bold text-slate-900">
                25+
              </h3>

              <p className="text-sm text-slate-500">
                Years of Excellence
              </p>
            </div>

            <div className="p-6 text-center border-b lg:border-b-0 lg:border-r border-slate-100">
              <Users
                className="mx-auto text-blue-600 mb-2"
                size={30}
              />

              <h3 className="text-2xl font-bold text-slate-900">
                1000+
              </h3>

              <p className="text-sm text-slate-500">
                Students
              </p>
            </div>

            <div className="p-6 text-center border-r border-slate-100">
              <BookOpen
                className="mx-auto text-blue-600 mb-2"
                size={30}
              />

              <h3 className="text-2xl font-bold text-slate-900">
                50+
              </h3>

              <p className="text-sm text-slate-500">
                Teachers
              </p>
            </div>

            <div className="p-6 text-center">
              <Trophy
                className="mx-auto text-blue-600 mb-2"
                size={30}
              />

              <h3 className="text-2xl font-bold text-slate-900">
                100+
              </h3>

              <p className="text-sm text-slate-500">
                Achievements
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* ================= ABOUT PREVIEW ================= */}
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
              <GraduationCap
                size={100}
                className="text-slate-300"
              />
            </div>

          </div>
        </div>
      </section>


      {/* ================= NOTICES & EVENTS ================= */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-8">

            {/* Notices */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">

              <div className="flex items-center justify-between mb-6">

                <div>
                  <p className="text-blue-600 text-sm font-semibold">
                    LATEST
                  </p>

                  <h2 className="text-2xl font-bold text-slate-900">
                    Notices
                  </h2>
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
                        <span className="text-xs">
                          AUG
                        </span>

                        <span className="font-bold">
                          22
                        </span>
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

                  <h2 className="text-2xl font-bold text-slate-900">
                    Events
                  </h2>
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


      {/* ================= CTA ================= */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">

          <p className="text-blue-600 font-semibold mb-3">
            HAVE QUESTIONS?
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            We Would Love to Hear From You
          </h2>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Get in touch with us for admissions, general enquiries,
            school information and more.
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
