import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

import {
  getNotices,
  createNotice,
  updateNotice,
  deleteNotice,
} from "../../api/notice.api";

function ManageNotices() {
  const [notices, setNotices] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
  });

  const fetchNotices = async () => {
    try {
      const data = await getNotices();

      setNotices(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      category: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      if (editingId) {
        await updateNotice(editingId, formData);
      } else {
        await createNotice(formData);
      }

      resetForm();
      fetchNotices();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (notice) => {
    setEditingId(notice._id);

    setFormData({
      title: notice.title || "",
      description: notice.description || "",
      date: notice.date
        ? new Date(notice.date).toISOString().split("T")[0]
        : "",
      category: notice.category || "",
    });

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this notice?",
    );

    if (!confirmed) return;

    try {
      await deleteNotice(id);

      fetchNotices();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Unable to delete notice.");
    }
  };

  return (
    <div className="p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Notices
          </h1>

          <p className="text-slate-500 mt-2">
            Create and manage school notices.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingId(null);

            setFormData({
              title: "",
              description: "",
              date: "",
              category: "",
            });
            setShowForm(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
        >
          <Plus size={19} />
          Add Notice
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              {editingId ? "Edit Notice" : "Add New Notice"}
            </h2>

            <button
              onClick={resetForm}
              className="text-slate-400 hover:text-slate-700"
            >
              <X size={21} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Notice Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter notice title"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Write notice details..."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none resize-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Notice Date
              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full sm:w-auto px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select category</option>
                <option value="General">General</option>
                <option value="Academic">Academic</option>
                <option value="Exam">Exam</option>
                <option value="Holiday">Holiday</option>
                <option value="Admission">Admission</option>
                <option value="Important">Important</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Notice"
                    : "Create Notice"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Notices */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="font-semibold text-slate-900">All Notices</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-500">
            Loading notices...
          </div>
        ) : notices.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No notices found.
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {notices.map((notice) => (
              <div
                key={notice._id}
                className="p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
              >
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-900">
                    {notice.title}
                  </h3>

                  <p className="text-sm text-slate-500 mt-2 leading-6">
                    {notice.description}
                  </p>

                  {notice.date && (
                    <p className="text-xs text-slate-400 mt-3">
                      {new Date(notice.date).toLocaleDateString()}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleEdit(notice)}
                    className="p-2 rounded-lg text-blue-600 hover:bg-blue-50"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(notice._id)}
                    className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageNotices;
