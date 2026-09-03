import { useEffect, useRef, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  Image as ImageIcon,
  CalendarDays,
  MapPin,
  GripVertical,
} from "lucide-react";

import {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../../api/event.api";

function ManageEvents() {
  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [poster, setPoster] = useState(null);
  const [posterPreview, setPosterPreview] = useState("");

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    description: "",
    date: "",
    location: "",
    isActive: true,
    order: 0,
  });

  // =================================================
  // FETCH EVENTS
  // =================================================

  const fetchEvents = async () => {
    try {
      setLoading(true);

      const response = await getAllEvents();

      const data = response?.events || response?.data || response || [];

      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch events error:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // =================================================
  // FORM CHANGE
  // =================================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =================================================
  // POSTER CHANGE
  // =================================================

  const handlePosterChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // 5MB validation
    if (file.size > 5 * 1024 * 1024) {
      alert("Poster size must be less than 5MB.");
      e.target.value = "";
      return;
    }

    // Image validation
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      e.target.value = "";
      return;
    }

    setPoster(file);

    const previewUrl = URL.createObjectURL(file);

    setPosterPreview(previewUrl);
  };

  // =================================================
  // RESET FORM
  // =================================================

  const resetForm = () => {
    if (posterPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(posterPreview);
    }

    setFormData({
      title: "",
      shortDescription: "",
      description: "",
      date: "",
      location: "",
      isActive: true,
      order: 0,
    });

    setPoster(null);
    setPosterPreview("");
    setEditingId(null);
    setShowForm(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =================================================
  // OPEN CREATE FORM
  // =================================================

  const openCreateForm = () => {
    resetForm();
    setShowForm(true);
  };

  // =================================================
  // OPEN EDIT FORM
  // =================================================

  const handleEdit = (event) => {
    setEditingId(event._id);

    setFormData({
      title: event.title || "",
      shortDescription: event.shortDescription || "",
      description: event.description || "",
      date: event.date ? new Date(event.date).toISOString().split("T")[0] : "",
      location: event.location || "",
      isActive: event.isActive ?? true,
      order: event.order ?? 0,
    });

    setPoster(null);
    setPosterPreview(event.imageUrl || "");

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =================================================
  // SUBMIT
  // =================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingId && !poster) {
      alert("Please upload an event poster.");
      return;
    }

    try {
      setSaving(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("shortDescription", formData.shortDescription);
      data.append("description", formData.description);
      data.append("date", formData.date);
      data.append("location", formData.location);
      data.append("isActive", String(formData.isActive));
      data.append("order", String(formData.order || 0));

      // Only send poster if selected
      if (poster) {
        data.append("image", poster);
      }

      if (editingId) {
        await updateEvent(editingId, data);
      } else {
        await createEvent(data);
      }

      alert(
        editingId
          ? "Event updated successfully."
          : "Event created successfully.",
      );

      resetForm();

      await fetchEvents();
    } catch (error) {
      console.error("Save event error:", error);

      alert(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Unable to save event.",
      );
    } finally {
      setSaving(false);
    }
  };

  // =================================================
  // DELETE
  // =================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?\n\nThe event poster will also be removed.",
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      await deleteEvent(id);

      setEvents((prev) => prev.filter((event) => event._id !== id));

      alert("Event deleted successfully.");
    } catch (error) {
      console.error("Delete event error:", error);

      alert(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Unable to delete event.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =================================================
  // REMOVE SELECTED POSTER
  // =================================================

  const removePoster = () => {
    if (posterPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(posterPreview);
    }

    setPoster(null);

    // If editing, keep old image preview.
    // If creating, remove preview completely.
    const currentEvent = events.find((event) => event._id === editingId);

    setPosterPreview(editingId ? currentEvent?.imageUrl || "" : "");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =================================================
  // RENDER
  // =================================================

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* =================================================
        HEADER
    ================================================= */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
            Administration
          </p>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 break-words">
            Event Management
          </h1>

          <p className="text-sm sm:text-base text-slate-500 mt-2">
            Create, update and manage school events.
          </p>
        </div>

        <button
          onClick={openCreateForm}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-red-800 hover:bg-red-700 text-white rounded-xl font-semibold transition shadow-sm shrink-0"
        >
          <Plus size={19} />
          Add Event
        </button>
      </div>

      {/* =================================================
        FORM
    ================================================= */}

      {showForm && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm mb-6 sm:mb-8 overflow-hidden">
          {/* Form Header */}

          <div className="px-4 sm:px-6 py-4 border-b border-slate-200 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-slate-900">
                {editingId ? "Edit Event" : "Create New Event"}
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Add event information and poster.
              </p>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="w-9 h-9 shrink-0 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="p-4 sm:p-6 space-y-5 sm:space-y-6"
          >
            {/* =================================================
              POSTER
          ================================================= */}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Event Poster
                {!editingId && <span className="text-red-500 ml-1">*</span>}
              </label>

              <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-5">
                {/* Preview */}

                <div className="relative aspect-[16/10] md:aspect-[4/3] bg-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                  {posterPreview ? (
                    <>
                      <img
                        src={posterPreview}
                        alt="Event poster preview"
                        className="w-full h-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={removePoster}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition"
                        title="Remove poster"
                      >
                        <X size={16} />
                      </button>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 px-4 text-center">
                      <ImageIcon size={40} />

                      <p className="text-sm mt-2">No poster selected</p>
                    </div>
                  )}
                </div>

                {/* Upload */}

                <div className="flex flex-col justify-center">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 rounded-xl p-5 sm:p-6 text-center cursor-pointer hover:border-red-400 hover:bg-red-50/30 transition"
                  >
                    <Upload size={30} className="mx-auto text-slate-400" />

                    <p className="font-semibold text-slate-700 mt-3 break-words">
                      {poster ? poster.name : "Upload event poster"}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      PNG, JPG or WEBP · Maximum 5MB
                    </p>

                    <span className="inline-block mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium text-slate-700">
                      Choose Image
                    </span>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handlePosterChange}
                    className="hidden"
                  />

                  {editingId && (
                    <p className="text-xs text-slate-400 mt-2">
                      Leave the image unchanged if you don't want to replace the
                      current poster.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* =================================================
              TITLE
          ================================================= */}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Event Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                maxLength={150}
                placeholder="e.g. Annual Sports Day"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 transition"
              />
            </div>

            {/* =================================================
              SHORT DESCRIPTION
          ================================================= */}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Short Description
              </label>

              <input
                type="text"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                required
                maxLength={250}
                placeholder="A short summary shown on event cards"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 transition"
              />

              <p className="text-xs text-slate-400 mt-1">
                Keep this short. It appears on the Events page.
              </p>
            </div>

            {/* =================================================
              DESCRIPTION
          ================================================= */}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Write complete details about the event..."
                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none resize-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 transition"
              />
            </div>

            {/* =================================================
              DATE + LOCATION
          ================================================= */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Event Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="e.g. School Auditorium"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 transition"
                />
              </div>
            </div>

            {/* =================================================
              STATUS + ORDER
          ================================================= */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Active */}

              <div className="border border-slate-200 rounded-xl p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800">Event Status</p>

                    <p className="text-xs text-slate-400 mt-1">
                      Active events are visible publicly.
                    </p>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleChange}
                      className="sr-only peer"
                    />

                    <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition" />

                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5" />
                  </label>
                </div>

                <p
                  className={`text-xs font-semibold mt-3 ${
                    formData.isActive ? "text-green-600" : "text-slate-400"
                  }`}
                >
                  {formData.isActive ? "Active" : "Inactive"}
                </p>
              </div>

              {/* Order */}

              <div className="border border-slate-200 rounded-xl p-4">
                <label className="block font-semibold text-slate-800 mb-2">
                  Display Order
                </label>

                <div className="flex items-center gap-3">
                  <GripVertical size={19} className="text-slate-400 shrink-0" />

                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700"
                  />
                </div>

                <p className="text-xs text-slate-400 mt-2">
                  Lower numbers appear first.
                </p>
              </div>
            </div>

            {/* =================================================
              FORM BUTTONS
          ================================================= */}

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={resetForm}
                disabled={saving}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-800 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold transition"
              >
                {saving
                  ? editingId
                    ? "Updating..."
                    : "Creating..."
                  : editingId
                    ? "Update Event"
                    : "Create Event"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* =================================================
        EVENTS LIST
    ================================================= */}

      {!showForm && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          {/* List Header */}

          <div className="px-4 sm:px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-900">All Events</h2>

              {!loading && (
                <p className="text-xs text-slate-400 mt-1">
                  {events.length} {events.length === 1 ? "event" : "events"}
                </p>
              )}
            </div>
          </div>

          {/* Loading */}

          {loading && (
            <div className="divide-y divide-slate-100">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="p-4 sm:p-5 flex gap-4 animate-pulse">
                  <div className="w-24 sm:w-28 h-20 rounded-xl bg-slate-200 shrink-0" />

                  <div className="flex-1 space-y-3 min-w-0">
                    <div className="h-4 w-1/3 bg-slate-200 rounded" />
                    <div className="h-3 w-2/3 bg-slate-200 rounded" />
                    <div className="h-3 w-1/2 bg-slate-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty */}

          {!loading && events.length === 0 && (
            <div className="py-16 sm:py-20 text-center px-5">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 mx-auto flex items-center justify-center">
                <CalendarDays size={28} className="text-slate-400" />
              </div>

              <h3 className="font-semibold text-slate-700 mt-4">
                No events found
              </h3>

              <p className="text-sm text-slate-400 mt-1">
                Create your first school event to get started.
              </p>

              <button
                onClick={openCreateForm}
                className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 bg-red-800 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition"
              >
                <Plus size={17} />
                Add Event
              </button>
            </div>
          )}

          {/* Events */}

          {!loading && events.length > 0 && (
            <div className="divide-y divide-slate-100">
              {events.map((event) => {
                const eventDate = event.date ? new Date(event.date) : null;

                const validDate = eventDate && !isNaN(eventDate.getTime());

                return (
                  <div
                    key={event._id}
                    className="p-4 sm:p-5 hover:bg-slate-50/70 transition"
                  >
                    <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 lg:items-center">
                      {/* Poster */}

                      <div className="w-full lg:w-36 h-48 sm:h-56 lg:h-24 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        {event.imageUrl ? (
                          <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon size={28} className="text-slate-300" />
                          </div>
                        )}
                      </div>

                      {/* Info */}

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold text-slate-900 break-words">
                            {event.title}
                          </h3>

                          <span
                            className={`text-[11px] font-semibold px-2 py-1 rounded-full shrink-0 ${
                              event.isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {event.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>

                        {event.shortDescription && (
                          <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                            {event.shortDescription}
                          </p>
                        )}

                        <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-xs text-slate-400">
                          {validDate && (
                            <span className="inline-flex items-center gap-1.5">
                              <CalendarDays size={14} />

                              {eventDate.toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          )}

                          {event.location && (
                            <span className="inline-flex items-center gap-1.5 max-w-full">
                              <MapPin size={14} className="shrink-0" />

                              <span className="break-words">
                                {event.location}
                              </span>
                            </span>
                          )}

                          <span>Order: {event.order ?? 0}</span>
                        </div>
                      </div>

                      {/* Actions */}

                      <div className="flex items-center gap-2 lg:self-center">
                        <button
                          onClick={() => handleEdit(event)}
                          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 transition text-sm font-semibold"
                        >
                          <Pencil size={16} />

                          <span className="hidden sm:inline">Edit</span>
                        </button>

                        <button
                          onClick={() => handleDelete(event._id)}
                          disabled={deletingId === event._id}
                          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-red-700 bg-red-50 hover:bg-red-100 disabled:opacity-50 transition text-sm font-semibold"
                        >
                          <Trash2 size={16} />

                          <span className="hidden sm:inline">
                            {deletingId === event._id
                              ? "Deleting..."
                              : "Delete"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ManageEvents;
