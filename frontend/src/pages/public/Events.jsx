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

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-slate-500">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">

        <div className="mb-10">
          <p className="text-blue-600 font-semibold">
            SCHOOL ACTIVITIES
          </p>

          <h1 className="text-4xl font-bold text-slate-900 mt-2">
            Events
          </h1>

          <p className="text-slate-500 mt-3">
            Explore upcoming and recent events happening at our school.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-16 border border-dashed rounded-xl">
            <p className="text-slate-500">
              No events available right now.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">

            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition"
              >
                <div className="flex gap-4">

                  <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <CalendarDays size={22} />
                  </div>

                  <div className="flex-1">

                    <h2 className="text-xl font-semibold text-slate-900">
                      {event.title}
                    </h2>

                    {event.shortDescription && (
                      <p className="text-slate-600 mt-2">
                        {event.shortDescription}
                      </p>
                    )}

                    {event.description && (
                      <p className="text-sm text-slate-500 mt-2 leading-6">
                        {event.description}
                      </p>
                    )}

                    <div className="flex flex-col gap-2 mt-4 text-sm text-slate-500">

                      {event.date && (
                        <div className="flex items-center gap-2">
                          <CalendarDays size={16} />
                          <span>
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                        </div>
                      )}

                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          <span>{event.location}</span>
                        </div>
                      )}

                    </div>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}

export default Events;