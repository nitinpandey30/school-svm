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
import { getNotices } from "../../api/notice.api";
import { getEvents } from "../../api/event.api";

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

  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [noticeResponse, eventResponse] = await Promise.all([
          getNotices(),
          getEvents(),
        ]);

        // Backend response: { message, data: [...] }
        setNotices((noticeResponse?.data || noticeResponse || []).slice(0, 3));

        setEvents((eventResponse?.data || eventResponse || []).slice(0, 3));
      } catch (error) {
        console.error("Home data error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
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
        <section className="relative h-[450px] sm:h-[550px] lg:h-[650px] overflow-hidden">
          {/* Image */}
          <img
            src={slides[currentSlide].image}
            alt="School"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Previous */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10
    w-10 h-10 sm:w-12 sm:h-12 rounded-full
    bg-black/30 hover:bg-black/60 text-white
    flex items-center justify-center transition"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10
    w-10 h-10 sm:w-12 sm:h-12 rounded-full
    bg-black/30 hover:bg-black/60 text-white
    flex items-center justify-center transition"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 rounded-full transition-all ${
                  currentSlide === index ? "w-8 bg-white" : "w-2.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        </section>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all ${
                currentSlide === index ? "w-8 bg-white" : "w-2.5 bg-white/50"
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

      {/* ================= ABOUT + NOTICES + EVENTS ================= */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-6 items-stretch">
            {/* ================= LEFT : NOTICES ================= */}
            <div className="lg:col-span-3 bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200">
                <div className="w-9 h-9 bg-red-800 text-white rounded flex items-center justify-center">
                  <CalendarDays size={20} />
                </div>

                <h2 className="text-lg font-bold text-slate-800">
                  News & Announcements
                </h2>
              </div>

              {loading ? (
                <div className="p-6 text-sm text-slate-500">
                  Loading notices...
                </div>
              ) : notices.length === 0 ? (
                <div className="p-6 text-sm text-slate-500">
                  No notices available.
                </div>
              ) : (
                notices.map((notice) => (
                  <div
                    key={notice._id}
                    className="px-5 py-5 border-b border-slate-200"
                  >
                    <div className="flex gap-3">
                      <div className="w-11 h-14 shrink-0 bg-red-800 text-white rounded flex flex-col items-center justify-center">
                        <span className="text-[10px]">
                          {new Date(notice.date)
                            .toLocaleDateString("en-IN", {
                              month: "short",
                            })
                            .toUpperCase()}
                        </span>

                        <span className="text-lg font-bold">
                          {new Date(notice.date).getDate()}
                        </span>
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-bold text-blue-700">
                          {new Date(notice.date).toLocaleDateString("en-IN")}
                        </p>

                        <h3 className="text-sm font-semibold text-slate-800 mt-2 leading-6">
                          {notice.title}
                        </h3>

                        <p className="text-xs text-slate-500 mt-2 leading-5 line-clamp-2">
                          {notice.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}

              <div className="px-5 py-4">
                <Link
                  to="/notices"
                  className="text-sm font-semibold text-red-800 hover:text-red-600"
                >
                  VIEW ALL →
                </Link>
              </div>
            </div>

            {/* ================= CENTER : ABOUT SCHOOL ================= */}
            <div className="lg:col-span-6 bg-white border border-slate-200 shadow-md">
              {/* Heading */}
              <div className="text-center px-5 pt-5">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                  About Our School
                </h2>

                <div className="w-16 h-1 bg-red-800 mx-auto mt-3 mb-5"></div>
              </div>

              {/* School Image */}
              <div className="px-5">
                <div className="h-56 sm:h-64 overflow-hidden">
                  <img
                    src="/school-building.jpg"
                    alt="School Building"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* About Content */}
              <div className="px-5 py-5">
                <p className="text-sm sm:text-base text-slate-600 leading-7">
                  Shaheed Uttam Chand Saraswati Vidya Mandir Inter College,
                  Banbasa is committed to providing quality education while
                  nurturing discipline, character, creativity and confidence
                  among students.
                </p>

                <p className="text-sm sm:text-base text-slate-600 leading-7 mt-3">
                  Our aim is to create an environment where students can learn,
                  grow and develop into responsible and successful citizens.
                </p>

                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-red-800 hover:text-red-600"
                >
                  READ MORE
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
            {/* ================= RIGHT : EVENTS ================= */}
            <div className="lg:col-span-3 bg-white border border-slate-200 shadow-sm">
              {/* Heading */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200">
                <div className="w-9 h-9 bg-red-800 text-white rounded flex items-center justify-center">
                  <CalendarDays size={20} />
                </div>

                <h2 className="text-lg font-bold text-slate-800">
                  Upcoming Events
                </h2>
              </div>

              {loading ? (
                <div className="p-6 text-sm text-slate-500">
                  Loading events...
                </div>
              ) : events.length === 0 ? (
                <div className="p-6 text-sm text-slate-500">
                  No upcoming events.
                </div>
              ) : (
                events.map((event) => (
                  <div
                    key={event._id}
                    className="px-5 py-5 border-b border-slate-200"
                  >
                    <div className="flex gap-3">
                      {/* Date Box */}
                      <div className="w-11 h-14 shrink-0 bg-red-800 text-white rounded flex flex-col items-center justify-center">
                        <span className="text-[10px]">
                          {new Date(event.date)
                            .toLocaleDateString("en-IN", {
                              month: "short",
                            })
                            .toUpperCase()}
                        </span>

                        <span className="text-lg font-bold">
                          {new Date(event.date).getDate()}
                        </span>
                      </div>

                      {/* Event Details */}
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-blue-700">
                          {new Date(event.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>

                        <h3 className="text-sm font-semibold text-slate-800 mt-2 leading-6">
                          {event.title}
                        </h3>

                        <p className="text-xs text-slate-500 mt-2 leading-5 line-clamp-2">
                          {event.shortDescription}
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          📍 {event.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* View All */}
              <div className="px-5 py-4">
                <Link
                  to="/events"
                  className="text-sm font-semibold text-red-800 hover:text-red-600"
                >
                  VIEW ALL →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SCHOOL LOCATION ================= */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-10">
            <p className="text-red-800 font-semibold mb-2">FIND US</p>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Visit Our School
            </h2>

            <p className="mt-3 text-slate-500">
              Find us at Shaheed Uttam Chand Saraswati Vidya Mandir Inter
              College, Pachpokariya, Banbasa.
            </p>
          </div>

          {/* Map */}
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md">
            <iframe
              title="Shaheed Uttam Chand Saraswati Vidya Mandir Inter College Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1745.0921734872222!2d80.06190385955706!3d28.981907846797736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a054f31cbfcd55%3A0xd101e5d10b174ed7!2sShaheed%20Uttam%20Chand%20Saraswati%20Vidya%20Mandir%20Inter%20College%20Pachpokariya!5e0!3m2!1sen!2sin!4v1787756511316!5m2!1sen!2sin"
              className="w-full h-[350px] sm:h-[450px] border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
