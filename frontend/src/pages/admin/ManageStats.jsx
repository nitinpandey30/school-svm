import { useEffect, useState } from "react";
import { Save, Loader2, BarChart3 } from "lucide-react";
import { getStats, updateStats } from "../../api/stat.api";

function ManageStats() {
  const [stats, setStats] = useState({
    yearsOfExcellence: "",
    students: "",
    teachers: "",
    achievements: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ================= FETCH STATS =================

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getStats();

        if (response?.stats) {
          setStats({
            yearsOfExcellence: response.stats.yearsOfExcellence || "",
            students: response.stats.students || "",
            teachers: response.stats.teachers || "",
            achievements: response.stats.achievements || "",
          });
        }
      } catch (error) {
        console.error("Stats fetch error:", error);
        setError("Unable to load statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // ================= INPUT CHANGE =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStats((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSuccess("");
    setError("");
  };

  // ================= UPDATE STATS =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await updateStats(stats);

      setSuccess("Statistics updated successfully.");

    } catch (error) {
      console.error("Stats update error:", error);

      setError(
        error?.response?.data?.error ||
          "Unable to update statistics."
      );
    } finally {
      setSaving(false);
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2
          size={30}
          className="animate-spin text-blue-600"
        />
      </div>
    );
  }

  return (
    <section className="p-4 sm:p-6 lg:p-8">

      {/* ================= HEADER ================= */}

      <div className="mb-8">
        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <BarChart3 size={23} />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              School Statistics
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Manage the statistics displayed on the homepage.
            </p>
          </div>

        </div>
      </div>

      {/* ================= FORM ================= */}

      <div className="max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-sm">

        <form onSubmit={handleSubmit}>

          <div className="p-6 sm:p-8 space-y-6">

            {/* Years */}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Years of Excellence
              </label>

              <input
                type="text"
                name="yearsOfExcellence"
                value={stats.yearsOfExcellence}
                onChange={handleChange}
                placeholder="e.g. 25+"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Students */}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Students
              </label>

              <input
                type="text"
                name="students"
                value={stats.students}
                onChange={handleChange}
                placeholder="e.g. 1000+"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Teachers */}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Teachers
              </label>

              <input
                type="text"
                name="teachers"
                value={stats.teachers}
                onChange={handleChange}
                placeholder="e.g. 50+"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Achievements */}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Achievements
              </label>

              <input
                type="text"
                name="achievements"
                value={stats.achievements}
                onChange={handleChange}
                placeholder="e.g. 100+"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Error */}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            {/* Success */}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">
                {success}
              </div>
            )}

          </div>

          {/* ================= FOOTER ================= */}

          <div className="px-6 sm:px-8 py-5 bg-slate-50 border-t border-slate-200 rounded-b-2xl flex justify-end">

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-5 py-3 rounded-lg font-semibold transition"
            >
              {saving ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Update Statistics
                </>
              )}
            </button>

          </div>

        </form>

      </div>

    </section>
  );
}

export default ManageStats;