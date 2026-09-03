import { useEffect, useState } from "react";
import { Save, Loader2, BarChart3, AlertCircle, CheckCircle, Calendar, Users, Award, Trophy, Info } from "lucide-react";
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
  <section className="w-full min-h-screen bg-slate-50">
    
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">

      {/* ================= HEADER ================= */}
      <div className="mb-8 sm:mb-10">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
            <BarChart3 size={24} />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
              School Statistics
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Manage the key metrics displayed on your homepage.
            </p>
          </div>
        </div>
      </div>

      {/* ================= ALERTS ================= */}
      {error && (
        <div className="mb-6 p-4 sm:p-5 rounded-xl bg-red-50 border border-red-200">
          <div className="flex gap-3">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-900 text-sm sm:text-base">
                Unable to save changes
              </p>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 sm:p-5 rounded-xl bg-green-50 border border-green-200 animate-in fade-in duration-300">
          <div className="flex gap-3">
            <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-green-900 text-sm sm:text-base">
                Statistics updated successfully
              </p>
              <p className="text-green-700 text-sm mt-1">Your changes are now live on the homepage.</p>
            </div>
          </div>
        </div>
      )}

      {/* ================= FORM ================= */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        <form onSubmit={handleSubmit}>

          <div className="p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">

              {/* Years of Excellence */}
              <div className="space-y-2">
                <label htmlFor="yearsOfExcellence" className="block text-sm font-semibold text-slate-900">
                  Years of Excellence
                </label>
                <p className="text-xs text-slate-500">
                  e.g., "25+", "30 Years"
                </p>
                <input
                  id="yearsOfExcellence"
                  type="text"
                  name="yearsOfExcellence"
                  value={stats.yearsOfExcellence}
                  onChange={handleChange}
                  placeholder="25+"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 outline-none transition-all duration-150 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-slate-400"
                />
              </div>

              {/* Students */}
              <div className="space-y-2">
                <label htmlFor="students" className="block text-sm font-semibold text-slate-900">
                  Students
                </label>
                <p className="text-xs text-slate-500">
                  e.g., "1000+", "1,500+"
                </p>
                <input
                  id="students"
                  type="text"
                  name="students"
                  value={stats.students}
                  onChange={handleChange}
                  placeholder="1000+"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 outline-none transition-all duration-150 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-slate-400"
                />
              </div>

              {/* Teachers */}
              <div className="space-y-2">
                <label htmlFor="teachers" className="block text-sm font-semibold text-slate-900">
                  Teachers
                </label>
                <p className="text-xs text-slate-500">
                  e.g., "50+", "75"
                </p>
                <input
                  id="teachers"
                  type="text"
                  name="teachers"
                  value={stats.teachers}
                  onChange={handleChange}
                  placeholder="50+"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 outline-none transition-all duration-150 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-slate-400"
                />
              </div>

              {/* Achievements */}
              <div className="space-y-2">
                <label htmlFor="achievements" className="block text-sm font-semibold text-slate-900">
                  Achievements
                </label>
                <p className="text-xs text-slate-500">
                  e.g., "100+", "150"
                </p>
                <input
                  id="achievements"
                  type="text"
                  name="achievements"
                  value={stats.achievements}
                  onChange={handleChange}
                  placeholder="100+"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 outline-none transition-all duration-150 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-slate-400"
                />
              </div>

            </div>

            {/* Preview Cards */}
            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-4">
                Preview
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { label: 'Years', value: stats.yearsOfExcellence, icon: Calendar },
                  { label: 'Students', value: stats.students, icon: Users },
                  { label: 'Teachers', value: stats.teachers, icon: Award },
                  { label: 'Achievements', value: stats.achievements, icon: Trophy }
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
                      <Icon size={18} className="text-slate-400 mb-2" />
                      <p className="text-xs text-slate-600 font-medium">{stat.label}</p>
                      <p className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                        {stat.value || '—'}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ================= FOOTER ================= */}
          <div className="px-6 sm:px-8 lg:px-10 py-5 bg-slate-50 border-t border-slate-200 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">

            

            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-150 transform hover:scale-105 active:scale-95"
            >
              {saving ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span className="hidden sm:inline">Updating...</span>
                  <span className="sm:hidden">Saving...</span>
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

      {/* Info Section */}
      <div className="mt-8 p-4 sm:p-6 rounded-xl bg-blue-50 border border-blue-200">
        <div className="flex gap-3">
          <Info size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">Pro Tip:</p>
            <p>Use symbols like "+" to indicate "and more" (e.g., "1000+"). This data is displayed prominently on your homepage, so make sure values are accurate and engaging.</p>
          </div>
        </div>
      </div>

    </div>
  </section>
);
}

export default ManageStats;