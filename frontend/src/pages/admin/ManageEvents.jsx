import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../../api/event.api";

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    shortDescription: "",
    date: "",
    location: "",
  });

  const fetchEvents = async () => {
    try {
      const response = await getEvents();

      setEvents(response.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
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
      shortDescription: "",
      date: "",
      location: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      if (editingId) {
        await updateEvent(editingId, formData);
      } else {
        await createEvent(formData);
      }

      resetForm();
      fetchEvents();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (event) => {
    setEditingId(event._id);

    setFormData({
      title: event.title || "",
      description: event.description || "",
      shortDescription: event.shortDescription || "",
      date: event.date
        ? new Date(event.date).toISOString().split("T")[0]
        : "",
      location: event.location || "",
    });

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) return;

    try {
      await deleteEvent(id);
      fetchEvents();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Unable to delete event."
      );
    }
  };

  return (
    <div className="p-6 sm:p-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Events
          </h1>

          <p className="text-slate-500 mt-2">
            Create and manage school events.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingId(null);

            setFormData({
              title: "",
              description: "",
              shortDescription: "",
              date: "",
              location: "",
            });

            setShowForm(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
        >
          <Plus size={19} />
          Add Event
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              {editingId ? "Edit Event" : "Add New Event"}
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
                Event Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter event title"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Short Description
              </label>

              <input
                type="text"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                required
                placeholder="Enter a short description"
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
                placeholder="Write event details..."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none resize-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Date + Location */}
            <div className="grid sm:grid-cols-2 gap-5">

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Event Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="Enter event location"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

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
                    ? "Update Event"
                    : "Create Event"}
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

      {/* Events List */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="font-semibold text-slate-900">
            All Events
          </h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-500">
            Loading events...
          </div>
        ) : events.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No events found.
          </div>
        ) : (
          <div className="divide-y divide-slate-200">

            {events.map((event) => (
              <div
                key={event._id}
                className="p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
              >

                <div className="min-w-0">

                  <h3 className="font-semibold text-slate-900">
                    {event.title}
                  </h3>

                  <p className="text-sm text-slate-600 mt-2">
                    {event.shortDescription}
                  </p>

                  <p className="text-sm text-slate-500 mt-2">
                    {event.description}
                  </p>

                  <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-400">
                    <span>
                      📅{" "}
                      {event.date
                        ? new Date(event.date).toLocaleDateString()
                        : "No date"}
                    </span>

                    <span>
                      📍 {event.location}
                    </span>
                  </div>

                </div>

                <div className="flex items-center gap-2 shrink-0">

                  <button
                    onClick={() => handleEdit(event)}
                    className="p-2 rounded-lg text-blue-600 hover:bg-blue-50"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(event._id)}
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

export default ManageEvents;