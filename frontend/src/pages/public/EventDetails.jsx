import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
} from "lucide-react";

import { getEventById } from "../../api/event.api";

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getEventById(id);

        setEvent(response?.event || null);

      } catch (error) {
        console.error("Event details error:", error);

        setError(
          error?.response?.data?.message ||
            "Unable to load event"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);


  // ================= LOADING =================

  if (loading) {
    return (
      <section className="min-h-screen bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 animate-pulse">

            <div className="h-72 sm:h-[450px] bg-slate-200" />

            <div className="p-6 sm:p-8 space-y-4">

              <div className="h-4 w-28 bg-slate-200 rounded" />

              <div className="h-9 w-2/3 bg-slate-200 rounded" />

              <div className="h-4 w-full bg-slate-200 rounded" />

              <div className="h-4 w-5/6 bg-slate-200 rounded" />

            </div>

          </div>

        </div>
      </section>
    );
  }


  // ================= ERROR =================

  if (error || !event) {
    return (
      <section className="min-h-[70vh] bg-slate-50 flex items-center justify-center">

        <div className="text-center px-4">

          <CalendarDays
            size={48}
            className="mx-auto text-red-300 mb-4"
          />

          <h1 className="text-2xl font-bold text-slate-800">
            Event Not Found
          </h1>

          <p className="text-slate-500 mt-2">
            {error || "This event does not exist."}
          </p>

          <Link
            to="/events"
            className="inline-flex items-center gap-2 mt-6 bg-red-800 text-white px-5 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            <ArrowLeft size={18} />
            Back to Events
          </Link>

        </div>

      </section>
    );
  }


  const eventDate = event.date
    ? new Date(event.date)
    : null;


  return (
    <section className="py-12 sm:py-16 bg-slate-50 min-h-screen">

      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Back */}

        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-sm font-semibold text-red-800 hover:text-red-600 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Events
        </Link>


        {/* Event Card */}

        <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md">


          {/* ================= POSTER ================= */}

          {event.imageUrl && (
            <div className="w-full bg-slate-100">

              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full max-h-[600px] object-contain"
              />

            </div>
          )}


          {/* ================= HEADER ================= */}

          <div className="bg-red-900 text-white px-6 py-7 sm:px-8">

            <p className="text-red-200 text-xs sm:text-sm font-semibold uppercase tracking-wider">
              School Event
            </p>

            <h1 className="text-2xl sm:text-4xl font-bold mt-2">
              {event.title}
            </h1>

          </div>


          {/* ================= CONTENT ================= */}

          <div className="p-6 sm:p-8">

            {event.shortDescription && (
              <p className="text-lg font-semibold text-slate-700 leading-7">
                {event.shortDescription}
              </p>
            )}


            {event.description && (
              <div className="mt-5">

                <h2 className="text-lg font-bold text-slate-800 mb-2">
                  About This Event
                </h2>

                <p className="text-slate-600 leading-7 whitespace-pre-line">
                  {event.description}
                </p>

              </div>
            )}


            {/* ================= DETAILS ================= */}

            <div className="border-t border-slate-200 mt-8 pt-7 grid sm:grid-cols-2 gap-6">


              {/* Date */}

              {eventDate &&
                !isNaN(eventDate.getTime()) && (
                  <div className="flex items-center gap-4">

                    <div className="w-11 h-11 rounded-xl bg-red-50 text-red-800 flex items-center justify-center shrink-0">
                      <CalendarDays size={20} />
                    </div>

                    <div>

                      <p className="text-xs text-slate-400">
                        Event Date
                      </p>

                      <p className="font-semibold text-slate-800 mt-1">
                        {eventDate.toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>

                    </div>

                  </div>
                )}


              {/* Location */}

              {event.location && (
                <div className="flex items-center gap-4">

                  <div className="w-11 h-11 rounded-xl bg-red-50 text-red-800 flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>

                  <div>

                    <p className="text-xs text-slate-400">
                      Location
                    </p>

                    <p className="font-semibold text-slate-800 mt-1">
                      {event.location}
                    </p>

                  </div>

                </div>
              )}

            </div>

          </div>

        </article>

      </div>

    </section>
  );
}

export default EventDetails;