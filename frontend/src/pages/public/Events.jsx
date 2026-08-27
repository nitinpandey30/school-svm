import { useEffect, useState } from "react";
import { CalendarDays, MapPin } from "lucide-react";
import { getEvents } from "../../api/event.api";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();

        setEvents(data.data || data);
      } catch (error) {
        console.error(error);
        setError("Unable to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <section className="py-16 bg-slate-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <div className="animate-pulse space-y-6">

            <div className="h-8 w-40 bg-slate-200 rounded" />
            <div className="h-4 w-80 bg-slate-200 rounded" />

            <div className="grid md:grid-cols-2 gap-6 mt-10">

              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="bg-white border border-slate-200 rounded-2xl p-6"
                >
                  <div className="flex gap-4">

                    <div className="w-12 h-12 rounded-xl bg-slate-200 shrink-0" />

                    <div className="flex-1 space-y-3">
                      <div className="h-5 w-1/2 bg-slate-200 rounded" />
                      <div className="h-4 w-full bg-slate-200 rounded" />
                      <div className="h-4 w-3/4 bg-slate-200 rounded" />
                    </div>

                  </div>
                </div>
              ))}

            </div>

          </div>

        </div>
      </section>
    );
  }

  /* ================= ERROR ================= */

  if (error) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center bg-slate-50">

        <div className="text-center px-4">

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

      </section>
    );
  }

  return (
    <section className="py-16 bg-slate-50 min-h-screen">

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ================= HEADER ================= */}

        <div className="mb-10">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-800 flex items-center justify-center">
              <CalendarDays size={24} />
            </div>

            <div>

              <p className="text-blue-700 text-sm font-semibold tracking-wide">
                SCHOOL ACTIVITIES
              </p>

              <h1 className="text-4xl font-bold text-slate-900 mt-1">
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


        {/* ================= EMPTY STATE ================= */}

        {events.length === 0 ? (

          <div className="bg-white border border-dashed border-slate-300 rounded-2xl py-20 text-center">

            <CalendarDays
              size={44}
              className="mx-auto text-slate-300"
            />

            <h2 className="text-lg font-semibold text-slate-700 mt-4">
              No Events Available
            </h2>

            <p className="text-slate-500 text-sm mt-2">
              There are no upcoming events available at the moment.
            </p>

          </div>

        ) : (

          /* ================= EVENT LIST ================= */

          <div className="grid md:grid-cols-2 gap-6">

            {events.map((event) => {

              const eventDate = event.date
                ? new Date(event.date)
                : null;

              return (
                <article
                  key={event._id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition"
                >

                  {/* Top Section */}

                  <div className="bg-red-900 text-white p-5">

                    <div className="flex items-center gap-3">

                      <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                        <CalendarDays size={22} />
                      </div>

                      <div className="min-w-0">

                        <p className="text-red-200 text-xs font-semibold uppercase tracking-wide">
                          School Event
                        </p>

                        <h2 className="text-lg sm:text-xl font-bold mt-1 truncate">
                          {event.title}
                        </h2>

                      </div>

                    </div>

                  </div>


                  {/* Content */}

                  <div className="p-6">

                    {event.shortDescription && (
                      <p className="text-slate-700 font-medium leading-6">
                        {event.shortDescription}
                      </p>
                    )}

                    {event.description && (
                      <p className="text-sm text-slate-500 mt-3 leading-6">
                        {event.description}
                      </p>
                    )}


                    {/* Event Details */}

                    <div className="border-t border-slate-100 mt-5 pt-5 space-y-3">

                      {eventDate && !isNaN(eventDate.getTime()) && (
                        <div className="flex items-center gap-3 text-sm text-slate-600">

                          <div className="w-9 h-9 rounded-lg bg-red-50 text-red-800 flex items-center justify-center shrink-0">
                            <CalendarDays size={17} />
                          </div>

                          <div>
                            <p className="text-xs text-slate-400">
                              Date
                            </p>

                            <p className="font-medium">
                              {eventDate.toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                          </div>

                        </div>
                      )}


                      {event.location && (
                        <div className="flex items-center gap-3 text-sm text-slate-600">

                          <div className="w-9 h-9 rounded-lg bg-red-50 text-red-800 flex items-center justify-center shrink-0">
                            <MapPin size={17} />
                          </div>

                          <div>
                            <p className="text-xs text-slate-400">
                              Location
                            </p>

                            <p className="font-medium">
                              {event.location}
                            </p>
                          </div>

                        </div>
                      )}

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

export default Events;

