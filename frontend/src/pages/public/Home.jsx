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
  Image as ImageIcon,
  MapPin,
  Bell,
} from "lucide-react";

import { useEffect, useState } from "react";

import { getHeroes } from "../../api/hero.api";
import { getNotices } from "../../api/notice.api";
import { getEvents } from "../../api/event.api";
import { getGallery } from "../../api/gallery.api";
import { getStats } from "../../api/stat.api";

function Home() {
  /* =====================================================
     HERO
  ===================================================== */

  const [heroes, setHeroes] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadingHeroes, setLoadingHeroes] = useState(true);

  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  /* =====================================================
     NOTICES
  ===================================================== */

  const [notices, setNotices] = useState([]);
  const [loadingNotices, setLoadingNotices] = useState(true);

  /* =====================================================
     EVENTS
  ===================================================== */

  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  /* =====================================================
     GALLERY
  ===================================================== */

  const [gallery, setGallery] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [galleryDirection, setGalleryDirection] = useState("right");
  const [galleryPage, setGalleryPage] = useState(0);

  const galleryPerPage = 3;

  const galleryStart = galleryPage * galleryPerPage;

  const visibleGallery = gallery.slice(
    galleryStart,
    galleryStart + galleryPerPage,
  );

  const hasNextGallery = galleryStart + galleryPerPage < gallery.length;

  const hasPrevGallery = galleryPage > 0;

  /* =====================================================
     FETCH HEROES
  ===================================================== */

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await getHeroes();

        const data = response?.heroes || [];

        setHeroes(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Hero error:", error);
        setHeroes([]);
      } finally {
        setLoadingHeroes(false);
      }
    };

    fetchHeroes();
  }, []);

  /* =====================================================
     HERO AUTO SLIDER
  ===================================================== */

  useEffect(() => {
    if (heroes.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroes.length]);

  /* =====================================================
     HERO NEXT
  ===================================================== */

  const nextSlide = () => {
    if (heroes.length === 0) return;

    setCurrentSlide((prev) => (prev + 1) % heroes.length);
  };

  /* =====================================================
     HERO PREVIOUS
  ===================================================== */

  const prevSlide = () => {
    if (heroes.length === 0) return;

    setCurrentSlide((prev) => (prev - 1 + heroes.length) % heroes.length);
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getStats();

        setStats(response?.stats || null);
      } catch (error) {
        console.error("Stats error:", error);
        setStats(null);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  /* =====================================================
     FETCH NOTICES
  ===================================================== */

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await getNotices();

        const data = response?.data || response || [];

        setNotices(Array.isArray(data) ? data.slice(0, 3) : []);
      } catch (error) {
        console.error("Notice error:", error);
        setNotices([]);
      } finally {
        setLoadingNotices(false);
      }
    };

    fetchNotices();
  }, []);

  /* =====================================================
     FETCH EVENTS
  ===================================================== */

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();

        const data = response?.events || [];

        setEvents(Array.isArray(data) ? data.slice(0, 3) : []);
      } catch (error) {
        console.error("Event error:", error);
        setEvents([]);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchEvents();
  }, []);

  /* =====================================================
     FETCH GALLERY
  ===================================================== */

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await getGallery();

        const data = response?.gallery || response?.data || response || [];

        setGallery(Array.isArray(data) ? data.slice(0, 6) : []);
      } catch (error) {
        console.error("Gallery error:", error);
        setGallery([]);
      } finally {
        setLoadingGallery(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div className="bg-white">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative h-[450px] sm:h-[550px] lg:h-[650px] overflow-hidden">
        {loadingHeroes ? (
          <HeroSkeleton />
        ) : heroes.length === 0 ? (
          <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
            <p className="text-slate-500">No hero content available.</p>
          </div>
        ) : (
          <>
            {/* Hero Image */}

            <img
              src={heroes[currentSlide]?.imageUrl}
              alt={heroes[currentSlide]?.title || "School campus"}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}

            <div className="absolute inset-0 bg-black/45" />

            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

            {/* Hero Content */}

            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12">
                <div className="max-w-xl text-white">
                  {heroes[currentSlide]?.subtitle && (
                    <p className="text-sm sm:text-base font-semibold text-red-300 mb-3">
                      {heroes[currentSlide].subtitle}
                    </p>
                  )}

                  {heroes[currentSlide]?.title && (
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                      {heroes[currentSlide].title}
                    </h1>
                  )}

                  {heroes[currentSlide]?.buttonText && (
                    <Link
                      to={heroes[currentSlide]?.buttonLink || "/about"}
                      className="inline-flex items-center gap-2 mt-7 bg-red-800 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                    >
                      {heroes[currentSlide].buttonText}

                      <ArrowRight size={18} />
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Previous Button */}

            {heroes.length > 1 && (
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-10
                w-10 h-10 sm:w-12 sm:h-12 rounded-full
                bg-black/30 hover:bg-black/60 text-white
                flex items-center justify-center transition"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Next Button */}

            {heroes.length > 1 && (
              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-10
                w-10 h-10 sm:w-12 sm:h-12 rounded-full
                bg-black/30 hover:bg-black/60 text-white
                flex items-center justify-center transition"
              >
                <ChevronRight size={24} />
              </button>
            )}

            {/* Dots */}

            {heroes.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                {heroes.map((hero, index) => (
                  <button
                    key={hero._id}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all ${
                      currentSlide === index
                        ? "w-8 bg-white"
                        : "w-2.5 bg-white/60"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* ================= STATS ================= */}

      <section className="relative -mt-12 z-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden">
            {loadingStats ? (
              <>
                <StatSkeleton />
                <StatSkeleton />
                <StatSkeleton />
                <StatSkeleton />
              </>
            ) : stats ? (
              <>
                <Stat
                  icon={<GraduationCap size={30} />}
                  value={stats.yearsOfExcellence}
                  label="Years of Excellence"
                />

                <Stat
                  icon={<Users size={30} />}
                  value={stats.students}
                  label="Students"
                />

                <Stat
                  icon={<BookOpen size={30} />}
                  value={stats.teachers}
                  label="Teachers"
                />

                <Stat
                  icon={<Trophy size={30} />}
                  value={stats.achievements}
                  label="Achievements"
                />
              </>
            ) : (
              <div className="col-span-2 lg:col-span-4 p-8 text-center text-slate-500">
                Stats unavailable
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
    NOTICES + ABOUT + EVENTS
===================================================== */}

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-6 items-stretch">
            {/* =================================================
          NOTICES
      ================================================= */}

            <div className="lg:col-span-3 bg-white border border-slate-200 shadow-sm lg:h-[560px] flex flex-col">
              {/* HEADER */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200 shrink-0">
                <div className="w-9 h-9 bg-red-800 text-white rounded flex items-center justify-center shrink-0">
                  <Bell size={20} />
                </div>

                <h2 className="text-lg font-bold text-slate-800">
                  News & Announcements
                </h2>
              </div>

              {/* NOTICE CONTENT */}
              <div className="flex-1 overflow-hidden">
                {loadingNotices ? (
                  <NoticeSkeleton />
                ) : notices.length === 0 ? (
                  <div className="p-6 text-sm text-slate-500">
                    No notices available.
                  </div>
                ) : (
                  notices.slice(0, 3).map((notice) => (
                    <div
                      key={notice._id}
                      className="px-5 py-5 border-b border-slate-200"
                    >
                      <div className="flex gap-3">
                        <DateBox date={notice.date} />

                        <div className="min-w-0">
                          <p className="text-xs font-bold text-blue-700">
                            {formatDate(notice.date)}
                          </p>

                          <h3 className="text-sm font-semibold text-slate-800 mt-2 leading-6 line-clamp-2">
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
              </div>

              {/* FOOTER */}
              <div className="px-5 py-4 border-t border-slate-200 shrink-0">
                <Link
                  to="/notices"
                  className="text-sm font-semibold text-red-800 hover:text-red-600 transition"
                >
                  VIEW ALL →
                </Link>
              </div>
            </div>

            {/* =================================================
          ABOUT
      ================================================= */}

            <div className="lg:col-span-6 bg-white border border-slate-200 shadow-md lg:h-[560px] flex flex-col">
              {/* HEADER */}
              <div className="text-center px-5 pt-5 shrink-0">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                  About Our School
                </h2>

                <div className="w-16 h-1 bg-red-800 mx-auto mt-3 mb-5" />
              </div>

              {/* IMAGE */}
              <div className="px-5 shrink-0">
                <div className="h-52 sm:h-56 overflow-hidden">
                  <img
                    src="/school-building.jpg"
                    alt="School Building"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* ABOUT CONTENT */}
              <div className="px-5 py-5 flex-1 overflow-hidden">
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
                  className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-red-800 hover:text-red-600 transition"
                >
                  READ MORE
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>

            {/* =================================================
          EVENTS
      ================================================= */}

            <div className="lg:col-span-3 bg-white border border-slate-200 shadow-sm lg:h-[560px] flex flex-col">
              {/* HEADER */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200 shrink-0">
                <div className="w-9 h-9 bg-red-800 text-white rounded flex items-center justify-center shrink-0">
                  <CalendarDays size={20} />
                </div>

                <h2 className="text-lg font-bold text-slate-800">
                  Upcoming Events
                </h2>
              </div>

              {/* EVENTS CONTENT */}
              <div className="flex-1 overflow-y-auto">
                {loadingEvents ? (
                  <EventSkeleton />
                ) : events.length === 0 ? (
                  <div className="p-6 text-sm text-slate-500">
                    No upcoming events.
                  </div>
                ) : (
                  events.slice(0, 2).map((event) => (
                    <div
                      key={event._id}
                      className="px-5 py-4 border-b border-slate-200"
                    >
                      {/* ================= POSTER ================= */}

                      {event.imageUrl && (
                        <Link
                          to={`/events/${event._id}`}
                          className="block w-full h-28 overflow-hidden rounded-lg bg-slate-100 group"
                        >
                          <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            loading="lazy"
                          />
                        </Link>
                      )}

                      {/* ================= EVENT INFO ================= */}

                      <div className="flex gap-3 mt-3">
                        <DateBox date={event.date} />

                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-blue-700">
                            {formatDate(event.date)}
                          </p>

                          <h3 className="text-sm font-semibold text-slate-800 mt-1 leading-5 line-clamp-2">
                            {event.title}
                          </h3>

                          {event.shortDescription && (
                            <p className="text-xs text-slate-500 mt-1 leading-5 line-clamp-2">
                              {event.shortDescription}
                            </p>
                          )}

                          {event.location && (
                            <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
                              <MapPin size={13} />

                              <span className="truncate">{event.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* FOOTER */}
              <div className="px-5 py-4 border-t border-slate-200 shrink-0">
                <Link
                  to="/events"
                  className="text-sm font-semibold text-red-800 hover:text-red-600 transition"
                >
                  VIEW ALL →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
    GALLERY
===================================================== */}

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ================= HEADER ================= */}

          <div className="text-center mb-10">
            <p className="text-red-800 font-semibold">SCHOOL MOMENTS</p>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
              Our Gallery
            </h2>

            <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
              Explore memorable moments, activities and events from our school.
            </p>
          </div>

          {/* ================= CONTENT ================= */}

          {loadingGallery ? (
            <GallerySkeleton />
          ) : gallery.length === 0 ? (
            <div className="text-center py-16 border border-dashed rounded-xl">
              <ImageIcon size={42} className="mx-auto text-slate-300 mb-3" />

              <p className="text-slate-500">
                No gallery albums available right now.
              </p>
            </div>
          ) : (
            <div className="relative">
              {/* ================= LEFT ARROW ================= */}

              {hasPrevGallery && (
                <button
                  type="button"
                  onClick={() => {
                    setGalleryDirection("left");
                    setGalleryPage((prev) => prev - 1);
                  }}
                  className="
              absolute
              left-0
              top-1/2
              -translate-y-1/2
              -translate-x-1/2
              z-10
              w-10
              h-10
              rounded-full
              bg-white
              border
              border-slate-200
              shadow-md
              flex
              items-center
              justify-center
              text-slate-700
              hover:bg-red-800
              hover:text-white
              hover:border-red-800
              transition
            "
                  aria-label="Previous gallery"
                >
                  <ChevronLeft size={21} />
                </button>
              )}

              {/* ================= GALLERY GRID ================= */}

              <div
                key={galleryPage}
                className={`
    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4
    animate-gallery-slide
    ${
      galleryDirection === "right"
        ? "gallery-slide-right"
        : "gallery-slide-left"
    }
  `}
              >
                {visibleGallery.map((album) => (
                  <Link
                    to="/gallery"
                    key={album._id}
                    className="
                group
                relative
                aspect-video
                overflow-hidden
                rounded-xl
                bg-slate-100
              "
                  >
                    <img
                      src={album.images?.[0]?.url}
                      alt={album.title}
                      className="
                  w-full
                  h-full
                  object-cover
                  group-hover:scale-105
                  transition
                  duration-500
                "
                      loading="lazy"
                    />

                    {/* Overlay */}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* Album Info */}

                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold text-sm sm:text-base truncate">
                        {album.title}
                      </h3>

                      <p className="text-white/75 text-xs mt-1">
                        {album.images?.length || 0} Photos
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* ================= RIGHT ARROW ================= */}

              {hasNextGallery && (
                <button
                  type="button"
                  onClick={() => {
                    setGalleryDirection("right");
                    setGalleryPage((prev) => prev + 1);
                  }}
                  className="
              absolute
              right-0
              top-1/2
              -translate-y-1/2
              translate-x-1/2
              z-10
              w-10
              h-10
              rounded-full
              bg-white
              border
              border-slate-200
              shadow-md
              flex
              items-center
              justify-center
              text-slate-700
              hover:bg-red-800
              hover:text-white
              hover:border-red-800
              transition
            "
                  aria-label="Next gallery"
                >
                  <ChevronRight size={21} />
                </button>
              )}
            </div>
          )}

          {/* ================= VIEW FULL GALLERY ================= */}

          {gallery.length > 0 && !loadingGallery && (
            <div className="text-center mt-8">
              <Link
                to="/gallery"
                className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-red-800
            hover:text-red-600
          "
              >
                VIEW FULL GALLERY
                <ArrowRight size={17} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          LOCATION
      ===================================================== */}

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md">
            <iframe
              title="Shaheed Uttam Chand Saraswati Vidya Mandir Inter College Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1745.0921734872222!2d80.06190385955706!3d28.981907846797736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a054f31cbfcd55%3A0xd101e5d10b174ed7!2sShaheed%20Uttam%20Chand%20Saraswati%20Vidya%20Mandir%20Inter%20College%20Pachpokariya!5e0!3m2!1sen!2sin!4v1787756511316!5m2!1sen!2sin"
              className="w-full h-[350px] sm:h-[450px] border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   STAT COMPONENT
========================================================= */

function StatSkeleton() {
  return (
    <div className="p-6 text-center animate-pulse border-b lg:border-b-0 lg:border-r border-slate-100">
      <div className="w-8 h-8 mx-auto bg-slate-200 rounded-full mb-3" />

      <div className="h-7 w-16 bg-slate-200 rounded mx-auto" />

      <div className="h-4 w-28 bg-slate-200 rounded mx-auto mt-2" />
    </div>
  );
}

function Stat({ icon, value, label }) {
  return (
    <div className="p-6 text-center border-b lg:border-b-0 lg:border-r border-slate-100 last:border-r-0">
      <div className="flex justify-center text-blue-600 mb-2">{icon}</div>

      <h3 className="text-2xl font-bold text-slate-900">{value}</h3>

      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}

/* =========================================================
   DATE BOX
========================================================= */

function DateBox({ date }) {
  const parsedDate = new Date(date);

  return (
    <div className="w-11 h-14 shrink-0 bg-red-800 text-white rounded flex flex-col items-center justify-center">
      <span className="text-[10px]">
        {parsedDate
          .toLocaleDateString("en-IN", {
            month: "short",
          })
          .toUpperCase()}
      </span>

      <span className="text-lg font-bold">{parsedDate.getDate()}</span>
    </div>
  );
}

/* =========================================================
   DATE FORMAT
========================================================= */

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* =========================================================
   HERO SKELETON
========================================================= */

function HeroSkeleton() {
  return (
    <div className="absolute inset-0 bg-slate-200 animate-pulse">
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12">
          <div className="max-w-xl space-y-4">
            <div className="h-4 w-72 bg-slate-300 rounded" />

            <div className="h-12 w-full bg-slate-300 rounded" />

            <div className="h-12 w-4/5 bg-slate-300 rounded" />

            <div className="h-10 w-36 bg-slate-300 rounded-lg mt-6" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   NOTICE SKELETON
========================================================= */

function NoticeSkeleton() {
  return (
    <div className="p-5 space-y-5 animate-pulse">
      {[1, 2, 3].map((item) => (
        <div key={item} className="flex gap-3 pb-5 border-b border-slate-200">
          <div className="w-11 h-14 shrink-0 bg-slate-200 rounded" />

          <div className="flex-1 space-y-2">
            <div className="h-3 w-24 bg-slate-200 rounded" />

            <div className="h-4 w-full bg-slate-200 rounded" />

            <div className="h-3 w-4/5 bg-slate-200 rounded" />

            <div className="h-3 w-3/5 bg-slate-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   EVENT SKELETON
========================================================= */

function EventSkeleton() {
  return (
    <div className="p-5 space-y-5 animate-pulse">
      {[1, 2, 3].map((item) => (
        <div key={item} className="flex gap-3 pb-5 border-b border-slate-200">
          <div className="w-11 h-14 shrink-0 bg-slate-200 rounded" />

          <div className="flex-1 space-y-2">
            <div className="h-3 w-28 bg-slate-200 rounded" />

            <div className="h-4 w-full bg-slate-200 rounded" />

            <div className="h-3 w-4/5 bg-slate-200 rounded" />

            <div className="h-3 w-2/3 bg-slate-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   GALLERY SKELETON
========================================================= */

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="aspect-video bg-slate-200 rounded-xl" />
      ))}
    </div>
  );
}

export default Home;
