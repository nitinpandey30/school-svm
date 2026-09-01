import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Image as ImageIcon,
  PartyPopper,
} from "lucide-react";

import { getEvents } from "../../api/event.api";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();

        const data = response?.events || response?.data || response || [];

        setEvents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Events error:", error);
        setError(
          error?.response?.data?.message ||
            "Unable to load events"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}

        <div className="mb-10 sm:mb-12">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-red-100 text-red-800 flex items-center justify-center">
              <PartyPopper size={23} />
            </div>

            <div>
              <p className="text-blue-700 text-xs sm:text-sm font-semibold uppercase tracking-wide">
                School Activities
              </p>

              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-1">
                Events
              </h1>
            </div>

          </div>

          <p className="text-slate-500 mt-4 max-w-2xl leading-6">
            Explore upcoming and recent events, activities and programs
            happening at Shaheed Uttam Chand Saraswati Vidya Mandir
            Inter College.
          </p>

        </div>


        {/* ================= LOADING ================= */}

        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {[1, 2, 3, 4, 5, 6].map((item) => (
              <EventSkeleton key={item} />
            ))}

          </div>
        )}


        {/* ================= ERROR ================= */}

        {!loading && error && (
          <div className="bg-white border border-red-100 rounded-2xl py-16 text-center">

            <CalendarDays
              size={44}
              className="mx-auto text-red-300 mb-4"
            />

            <h2 className="text-xl font-semibold text-slate-800">
              Something went wrong
            </h2>

            <p className="text-red-500 mt-2">
              {error}
            </p>

          </div>
        )}


        {/* ================= EMPTY ================= */}

        {!loading && !error && events.length === 0 && (
          <div className="bg-white border border-dashed border-slate-300 rounded-2xl py-20 text-center">

            <CalendarDays
              size={46}
              className="mx-auto text-slate-300"
            />

            <h2 className="text-lg font-semibold text-slate-700 mt-4">
              No Events Available
            </h2>

            <p className="text-slate-500 text-sm mt-2">
              There are no upcoming events available at the moment.
            </p>

          </div>
        )}


        {/* ================= EVENTS GRID ================= */}

        {!loading && !error && events.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {events.map((event) => {

              const eventDate = event.date
                ? new Date(event.date)
                : null;

              const validDate =
                eventDate &&
                !isNaN(eventDate.getTime());

              return (
                <article
                  key={event._id}
                  className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300"
                >

                  {/* ================= POSTER ================= */}

                  <Link
                    to={`/events/${event._id}`}
                    className="block relative aspect-[16/9] bg-slate-100 overflow-hidden"
                  >

                    {event.imageUrl ? (
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon
                          size={42}
                          className="text-slate-300"
                        />
                      </div>
                    )}

                    {/* Date Badge */}

                    

                  </Link>


                  {/* ================= CONTENT ================= */}

                  <div className="p-5">

                    {/* Date */}

                    {validDate && (
                      <p className="text-xs font-semibold text-blue-700">
                        {eventDate.toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    )}


                    {/* Title */}

                    <Link
                      to={`/events/${event._id}`}
                      className="block"
                    >
                      <h2 className="text-lg font-bold text-slate-900 mt-2 line-clamp-2 group-hover:text-red-800 transition">
                        {event.title}
                      </h2>
                    </Link>


                    {/* Short Description */}

                    {event.shortDescription && (
                      <p className="text-sm text-slate-500 leading-6 mt-2 line-clamp-2">
                        {event.shortDescription}
                      </p>
                    )}


                    {/* Location */}

                    {event.location && (
                      <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">

                        <MapPin
                          size={16}
                          className="text-red-700 shrink-0"
                        />

                        <span className="truncate">
                          {event.location}
                        </span>

                      </div>
                    )}


                    {/* Details */}

                    <div className="border-t border-slate-100 mt-5 pt-4">

                      <Link
                        to={`/events/${event._id}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-red-800 hover:text-red-600 transition"
                      >
                        View Details
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-1 transition"
                        />
                      </Link>

                    </div>

                  </div>

                </article>
              );
            })}

          </div>
        )}

      </div>
    </section>
  );
}


/* =================================================
   EVENT SKELETON
================================================= */

function EventSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden animate-pulse">

      {/* Poster */}

      <div className="aspect-[16/9] bg-slate-200" />

      {/* Content */}

      <div className="p-5 space-y-3">

        <div className="h-3 w-28 bg-slate-200 rounded" />

        <div className="h-5 w-4/5 bg-slate-200 rounded" />

        <div className="h-3 w-full bg-slate-200 rounded" />

        <div className="h-3 w-3/4 bg-slate-200 rounded" />

        <div className="h-4 w-32 bg-slate-200 rounded mt-4" />

        <div className="border-t border-slate-100 pt-4 mt-4">
          <div className="h-4 w-28 bg-slate-200 rounded" />
        </div>

      </div>

    </div>
  );
}

export default Events;