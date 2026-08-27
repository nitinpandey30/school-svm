import { useEffect, useState } from "react";
import { CalendarDays, Bell } from "lucide-react";
import { getNotices } from "../../api/notice.api";

function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await getNotices();

        setNotices(data.data || data);
      } catch (error) {
        console.error(error);
        setError("Unable to load notices");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-slate-50 min-h-screen">
        <div className="max-w-5xl mx-auto px-4">
          <div className="animate-pulse space-y-5">

            <div className="h-8 w-40 bg-slate-200 rounded" />
            <div className="h-4 w-72 bg-slate-200 rounded" />

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white border border-slate-200 rounded-xl p-6"
              >
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-200 shrink-0" />

                  <div className="flex-1 space-y-3">
                    <div className="h-5 w-1/2 bg-slate-200 rounded" />
                    <div className="h-4 w-full bg-slate-200 rounded" />
                    <div className="h-4 w-24 bg-slate-200 rounded" />
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center bg-slate-50">
        <div className="text-center px-4">
          <Bell
            size={42}
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* ================= HEADER ================= */}
        <div className="mb-10">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-800 flex items-center justify-center">
              <Bell size={24} />
            </div>

            <div>
              <p className="text-blue-700 text-sm font-semibold tracking-wide">
                SCHOOL UPDATES
              </p>

              <h1 className="text-4xl font-bold text-slate-900 mt-1">
                Notices
              </h1>
            </div>

          </div>

          <p className="text-slate-500 mt-4 max-w-2xl leading-6">
            Stay updated with the latest announcements, important
            information and updates from Shaheed Uttam Chand
            Saraswati Vidya Mandir Inter College.
          </p>

        </div>


        {/* ================= EMPTY STATE ================= */}
        {notices.length === 0 ? (

          <div className="bg-white border border-dashed border-slate-300 rounded-2xl py-20 text-center">

            <Bell
              size={42}
              className="mx-auto text-slate-300"
            />

            <h2 className="text-lg font-semibold text-slate-700 mt-4">
              No Notices Available
            </h2>

            <p className="text-slate-500 text-sm mt-2">
              There are no new notices available at the moment.
            </p>

          </div>

        ) : (

          /* ================= NOTICE LIST ================= */
          <div className="space-y-5">

            {notices.map((notice) => (

              <article
                key={notice._id}
                className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 hover:shadow-md transition"
              >

                <div className="flex gap-4">

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-red-800 flex items-center justify-center shrink-0">
                    <CalendarDays size={22} />
                  </div>


                  {/* Content */}
                  <div className="flex-1 min-w-0">

                    <div className="flex flex-wrap items-start justify-between gap-3">

                      <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                        {notice.title}
                      </h2>

                      <span className="text-xs font-semibold bg-red-50 text-red-800 px-3 py-1.5 rounded-full shrink-0">
                        {notice.category}
                      </span>

                    </div>


                    {/* Description */}
                    <p className="text-slate-600 mt-3 leading-7">
                      {notice.description}
                    </p>


                    {/* Date */}
                    {notice.date && (
                      <div className="flex items-center gap-2 mt-4 text-sm text-slate-400">

                        <CalendarDays size={15} />

                        <span>
                          {new Date(notice.date).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>

                      </div>
                    )}

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}

export default Notices;
