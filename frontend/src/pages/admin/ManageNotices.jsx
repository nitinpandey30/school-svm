import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  CalendarDays,
  FileText,
} from "lucide-react";

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

  const [showModal, setShowModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
  });

  // ================= FETCH NOTICES =================

  const fetchNotices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getNotices();

      const data = response?.data || response || [];

      setNotices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Notice fetch error:", error);
      setError("Unable to load notices.");
      setNotices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // ================= FORM CHANGE =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= RESET =================

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      category: "",
    });

    setEditingNotice(null);
    setShowModal(false);
    setError("");
  };

  // ================= OPEN ADD =================

  const openAddModal = () => {
    setEditingNotice(null);

    setFormData({
      title: "",
      description: "",
      date: "",
      category: "",
    });

    setError("");
    setShowModal(true);
  };

  // ================= OPEN EDIT =================

  const openEditModal = (notice) => {
    setEditingNotice(notice);

    setFormData({
      title: notice.title || "",
      description: notice.description || "",
      date: notice.date
        ? new Date(notice.date).toISOString().split("T")[0]
        : "",
      category: notice.category || "",
    });

    setError("");
    setShowModal(true);
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.title.trim()) {
      setError("Notice title is required.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Notice description is required.");
      return;
    }

    if (!formData.date) {
      setError("Notice date is required.");
      return;
    }

    if (!formData.category) {
      setError("Please select a category.");
      return;
    }

    try {
      setSaving(true);

      if (editingNotice) {
        const response = await updateNotice(
          editingNotice._id,
          formData
        );

        const updatedNotice =
          response?.notice || response?.data || response;

        setNotices((prev) =>
          prev.map((notice) =>
            notice._id === editingNotice._id
              ? updatedNotice
              : notice
          )
        );
      } else {
        const response = await createNotice(formData);

        const newNotice =
          response?.notice || response?.data || response;

        if (newNotice?._id) {
          setNotices((prev) => [newNotice, ...prev]);
        } else {
          await fetchNotices();
        }
      }

      resetForm();
    } catch (error) {
      console.error("Notice save error:", error);

      setError(
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // ================= DELETE =================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmed) return;

    try {
      await deleteNotice(id);

      setNotices((prev) =>
        prev.filter((notice) => notice._id !== id)
      );
    } catch (error) {
      console.error("Notice delete error:", error);

      alert(
        error?.response?.data?.message ||
          "Unable to delete notice."
      );
    }
  };

  // ================= FORMAT DATE =================

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // ================= CATEGORY STYLE =================

  const getCategoryStyle = (category) => {
    switch (category) {
      case "Important":
        return "bg-red-100 text-red-700";

      case "Exam":
        return "bg-purple-100 text-purple-700";

      case "Academic":
        return "bg-blue-100 text-blue-700";

      case "Holiday":
        return "bg-green-100 text-green-700";

      case "Admission":
        return "bg-orange-100 text-orange-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>
          <p className="text-sm font-semibold text-red-800">
            WEBSITE MANAGEMENT
          </p>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Notice Management
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Create, update and manage school notices.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-red-800 hover:bg-red-700 text-white rounded-lg font-semibold transition"
        >
          <Plus size={19} />
          Add Notice
        </button>

      </div>

      {/* ================= ERROR ================= */}

      {error && !showModal && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* ================= CONTENT ================= */}

      {loading ? (

        <NoticeManagementSkeleton />

      ) : notices.length === 0 ? (

        <div className="bg-white border border-dashed border-slate-300 rounded-xl py-20 text-center">

          <FileText
            size={45}
            className="mx-auto text-slate-300 mb-4"
          />

          <h2 className="font-semibold text-slate-700">
            No notices found
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Create your first school notice.
          </p>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 bg-red-800 hover:bg-red-700 text-white rounded-lg text-sm font-semibold"
          >
            <Plus size={17} />
            Add Notice
          </button>

        </div>

      ) : (

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

          {/* TABLE HEADER */}

          <div className="px-5 sm:px-6 py-4 border-b border-slate-200 flex items-center justify-between">

            <div>
              <h2 className="font-semibold text-slate-900">
                All Notices
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                {notices.length} notice
                {notices.length !== 1 ? "s" : ""}
              </p>
            </div>

          </div>

          {/* NOTICE LIST */}

          <div className="divide-y divide-slate-200">

            {notices.map((notice) => (

              <div
                key={notice._id}
                className="p-5 sm:p-6 hover:bg-slate-50 transition"
              >

                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

                  {/* CONTENT */}

                  <div className="flex gap-4 min-w-0">

                    {/* ICON */}

                    <div className="w-11 h-11 shrink-0 rounded-lg bg-red-50 text-red-800 flex items-center justify-center">
                      <FileText size={20} />
                    </div>

                    {/* DETAILS */}

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="font-semibold text-slate-900">
                          {notice.title}
                        </h3>

                        {notice.category && (
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getCategoryStyle(
                              notice.category
                            )}`}
                          >
                            {notice.category}
                          </span>
                        )}

                      </div>

                      <p className="text-sm text-slate-600 mt-2 leading-6 max-w-3xl">
                        {notice.description}
                      </p>

                      {notice.date && (
                        <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">
                          <CalendarDays size={14} />
                          <span>
                            {formatDate(notice.date)}
                          </span>
                        </div>
                      )}

                    </div>

                  </div>

                  {/* ACTIONS */}

                  <div className="flex items-center gap-2 shrink-0">

                    <button
                      onClick={() => openEditModal(notice)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium transition"
                    >
                      <Pencil size={16} />
                      <span className="hidden sm:inline">
                        Edit
                      </span>
                    </button>

                    <button
                      onClick={() => handleDelete(notice._id)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-sm font-medium transition"
                    >
                      <Trash2 size={16} />
                      <span className="hidden sm:inline">
                        Delete
                      </span>
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      )}

      {/* ================= MODAL ================= */}

      {showModal && (

        <div className="fixed inset-0 z-50 bg-black/60 p-4 flex items-center justify-center">

          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl max-h-[95vh] overflow-y-auto">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">

              <div>

                <h2 className="text-xl font-bold text-slate-900">
                  {editingNotice
                    ? "Edit Notice"
                    : "Add New Notice"}
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  {editingNotice
                    ? "Update the selected school notice."
                    : "Create a new announcement for students."}
                </p>

              </div>

              <button
                onClick={resetForm}
                disabled={saving}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 disabled:opacity-50"
              >
                <X size={20} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >

              {/* TITLE */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Notice Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter notice title"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-red-200 focus:border-red-600"
                />

              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Write notice details..."
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none resize-none focus:ring-2 focus:ring-red-200 focus:border-red-600"
                />

              </div>

              {/* DATE + CATEGORY */}

              <div className="grid sm:grid-cols-2 gap-4">

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Notice Date
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-red-200 focus:border-red-600"
                  />

                </div>

                <div>

                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-red-200 focus:border-red-600"
                  >
                    <option value="">
                      Select category
                    </option>

                    <option value="General">
                      General
                    </option>

                    <option value="Academic">
                      Academic
                    </option>

                    <option value="Exam">
                      Exam
                    </option>

                    <option value="Holiday">
                      Holiday
                    </option>

                    <option value="Admission">
                      Admission
                    </option>

                    <option value="Important">
                      Important
                    </option>

                  </select>

                </div>

              </div>

              {/* ERROR */}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* BUTTONS */}

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">

                <button
                  type="button"
                  onClick={resetForm}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium transition disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-lg bg-red-800 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold transition"
                >
                  {saving
                    ? "Saving..."
                    : editingNotice
                    ? "Update Notice"
                    : "Create Notice"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}


// ================= SKELETON =================

function NoticeManagementSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden animate-pulse">

      <div className="px-6 py-4 border-b border-slate-200">
        <div className="h-5 bg-slate-200 rounded w-32" />
        <div className="h-3 bg-slate-200 rounded w-20 mt-2" />
      </div>

      {[1, 2, 3, 4].map((item) => (

        <div
          key={item}
          className="p-6 border-b border-slate-200"
        >

          <div className="flex gap-4">

            <div className="w-11 h-11 bg-slate-200 rounded-lg shrink-0" />

            <div className="flex-1 space-y-3">

              <div className="h-5 bg-slate-200 rounded w-2/5" />

              <div className="h-3 bg-slate-200 rounded w-full" />

              <div className="h-3 bg-slate-200 rounded w-4/5" />

              <div className="h-3 bg-slate-200 rounded w-28" />

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}

export default ManageNotices;