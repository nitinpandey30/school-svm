import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
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
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-slate-500">Loading notices...</p>
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
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-10">
          <p className="text-blue-600 font-semibold">SCHOOL UPDATES</p>

          <h1 className="text-4xl font-bold text-slate-900 mt-2">Notices</h1>

          <p className="text-slate-500 mt-3">
            Stay updated with the latest announcements from our school.
          </p>
        </div>

        {notices.length === 0 ? (
          <div className="text-center py-16 border border-dashed rounded-xl">
            <p className="text-slate-500">No notices available right now.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notices.map((notice) => (
              <div
                key={notice._id}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition"
              >
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <CalendarDays size={22} />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap justify-between gap-2">
                      <h2 className="text-lg font-semibold text-slate-900">
                        {notice.title}
                      </h2>

                      {notice.category && (
                        <span className="text-xs font-medium bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                          {notice.category}
                        </span>
                      )}
                    </div>

                    <p className="text-slate-600 mt-2 leading-6">
                      {notice.description}
                    </p>

                    {notice.date && (
                      <p className="text-sm text-slate-400 mt-3">
                        {new Date(notice.date).toLocaleDateString()}
                      </p>
                    )}
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

export default Notices;
