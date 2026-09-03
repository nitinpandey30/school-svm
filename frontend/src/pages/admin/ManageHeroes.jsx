import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  X,
  Image as ImageIcon,
  Upload,
} from "lucide-react";

import {
  getAllHeroes,
  createHero,
  updateHero,
  deleteHero,
} from "../../api/hero.api";

function ManageHeroes() {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingHero, setEditingHero] = useState(null);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
    isActive: true,
    order: 0,
    image: null,
  });

  const [preview, setPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ================= FETCH HEROES =================

  const fetchHeroes = async () => {
    try {
      setLoading(true);

      const response = await getAllHeroes();

      const data = response?.heroes || response?.data || response || [];

      setHeroes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Hero fetch error:", error);
      setError("Unable to load heroes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  // ================= OPEN ADD =================

  const openAddModal = () => {
    setEditingHero(null);

    setForm({
      title: "",
      subtitle: "",
      buttonText: "",
      buttonLink: "",
      isActive: true,
      order: 0,
      image: null,
    });

    setPreview("");
    setError("");
    setShowModal(true);
  };

  // ================= OPEN EDIT =================

  const openEditModal = (hero) => {
    setEditingHero(hero);

    setForm({
      title: hero.title || "",
      subtitle: hero.subtitle || "",
      buttonText: hero.buttonText || "",
      buttonLink: hero.buttonLink || "",
      isActive: hero.isActive ?? true,
      order: hero.order ?? 0,
      image: null,
    });

    setPreview(hero.imageUrl || "");
    setError("");
    setShowModal(true);
  };

  // ================= CLOSE MODAL =================

  const closeModal = () => {
    if (submitting) return;

    setShowModal(false);
    setEditingHero(null);
    setPreview("");
    setError("");
  };

  // ================= INPUT CHANGE =================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ================= IMAGE CHANGE =================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // 5MB validation
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }

    // Image validation
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image");
      return;
    }

    setError("");

    setForm((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Image required only while creating
    if (!editingHero && !form.image) {
      setError("Hero image is required");
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("subtitle", form.subtitle);
      formData.append("buttonText", form.buttonText);
      formData.append("buttonLink", form.buttonLink);
      formData.append("isActive", form.isActive);
      formData.append("order", form.order);

      if (form.image) {
        formData.append("image", form.image);
      }

      if (editingHero) {
        await updateHero(editingHero._id, formData);
      } else {
        await createHero(formData);
      }

      closeModal();
      await fetchHeroes();
    } catch (error) {
      console.error("Hero submit error:", error);

      setError(
        error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ================= DELETE =================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this hero?",
    );

    if (!confirmed) return;

    try {
      await deleteHero(id);

      setHeroes((prev) => prev.filter((hero) => hero._id !== id));
    } catch (error) {
      console.error("Delete hero error:", error);

      alert(error?.response?.data?.message || "Unable to delete hero");
    }
  };

  // ================= TOGGLE ACTIVE =================

  const handleToggleActive = async (hero) => {
    try {
      const formData = new FormData();

      formData.append("isActive", !hero.isActive);

      await updateHero(hero._id, formData);

      setHeroes((prev) =>
        prev.map((item) =>
          item._id === hero._id
            ? {
                ...item,
                isActive: !item.isActive,
              }
            : item,
        ),
      );
    } catch (error) {
      console.error("Toggle hero error:", error);

      alert(error?.response?.data?.message || "Unable to update hero");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* ================= HEADER ================= */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-semibold text-red-800">
            WEBSITE MANAGEMENT
          </p>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Hero Management
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Manage homepage hero slides and their content.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red-800 hover:bg-red-700 text-white px-5 py-3 rounded-lg font-semibold transition shrink-0"
        >
          <Plus size={19} />
          Add Hero
        </button>
      </div>

      {/* ================= ERROR ================= */}

      {error && !showModal && (
        <div className="mb-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm break-words">
          {error}
        </div>
      )}

      {/* ================= LOADING ================= */}

      {loading ? (
        <HeroSkeleton />
      ) : heroes.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-300 rounded-xl py-16 sm:py-20 px-4 text-center">
          <ImageIcon size={45} className="mx-auto text-slate-300 mb-4" />

          <h2 className="font-semibold text-slate-700">No heroes available</h2>

          <p className="text-sm text-slate-500 mt-1">
            Add your first homepage hero slide.
          </p>
        </div>
      ) : (
        /* ================= HERO LIST ================= */

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {heroes.map((hero) => (
            <div
              key={hero._id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition min-w-0"
            >
              {/* IMAGE */}

              <div className="relative aspect-video bg-slate-100">
                <img
                  src={hero.imageUrl}
                  alt={hero.title || "Hero"}
                  className="w-full h-full object-cover"
                />

                {/* ACTIVE BADGE */}

                <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                  <span
                    className={`text-[11px] sm:text-xs font-semibold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full ${
                      hero.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {hero.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* ORDER */}

                <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-black/70 text-white text-[11px] sm:text-xs font-semibold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                  Order: {hero.order}
                </div>
              </div>

              {/* CONTENT */}

              <div className="p-4 sm:p-5 min-w-0">
                <h2 className="font-bold text-base sm:text-lg text-slate-900 line-clamp-1">
                  {hero.title || "Untitled Hero"}
                </h2>

                <p className="text-sm text-slate-500 mt-2 line-clamp-2 min-h-[40px]">
                  {hero.subtitle || "No subtitle"}
                </p>

                {hero.buttonText && (
                  <div className="mt-4 inline-flex max-w-full bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded truncate">
                    Button: {hero.buttonText}
                  </div>
                )}

                {/* ACTIONS */}

                <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleToggleActive(hero)}
                    className="flex-1 min-w-0 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-medium transition"
                  >
                    {hero.isActive ? (
                      <>
                        <EyeOff size={16} />
                        <span>Disable</span>
                      </>
                    ) : (
                      <>
                        <Eye size={16} />
                        <span>Enable</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => openEditModal(hero)}
                    className="w-10 h-10 shrink-0 flex items-center justify-center rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
                    title="Edit hero"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    onClick={() => handleDelete(hero._id)}
                    className="w-10 h-10 shrink-0 flex items-center justify-center rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition"
                    title="Delete hero"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= MODAL ================= */}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 p-3 sm:p-4 flex items-center justify-center overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-xl sm:rounded-2xl shadow-2xl max-h-[95vh] overflow-y-auto">
            {/* MODAL HEADER */}

            <div className="flex items-start justify-between gap-4 px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-200">
              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  {editingHero ? "Edit Hero" : "Add Hero"}
                </h2>

                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {editingHero
                    ? "Update your homepage hero slide."
                    : "Create a new homepage hero slide."}
                </p>
              </div>

              <button
                onClick={closeModal}
                className="w-9 h-9 shrink-0 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5">
              {/* IMAGE */}

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Hero Image {!editingHero && "*"}
                </label>

                <label className="block cursor-pointer">
                  <div className="border-2 border-dashed border-slate-300 hover:border-red-400 rounded-xl overflow-hidden transition">
                    {preview ? (
                      <div className="relative">
                        <img
                          src={preview}
                          alt="Hero preview"
                          className="w-full aspect-video object-cover"
                        />

                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                          <div className="bg-white rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-2">
                            <Upload size={16} />
                            Change Image
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-video flex flex-col items-center justify-center text-slate-400 px-4 text-center">
                        <Upload size={30} />

                        <p className="text-sm font-medium mt-2">
                          Click to upload image
                        </p>

                        <p className="text-xs mt-1">JPG, PNG, WEBP — Max 5MB</p>
                      </div>
                    )}
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* TITLE */}

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Learn. Grow. Achieve."
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500"
                />
              </div>

              {/* SUBTITLE */}

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Subtitle
                </label>

                <textarea
                  name="subtitle"
                  value={form.subtitle}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Building Knowledge, Character and Confidence"
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 resize-none"
                />
              </div>

              {/* BUTTON */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Button Text
                  </label>

                  <input
                    type="text"
                    name="buttonText"
                    value={form.buttonText}
                    onChange={handleChange}
                    placeholder="Discover More"
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Button Link
                  </label>

                  <input
                    type="text"
                    name="buttonLink"
                    value={form.buttonLink}
                    onChange={handleChange}
                    placeholder="/about"
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  />
                </div>
              </div>

              {/* ACTIVE + ORDER */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-start gap-3 border border-slate-200 rounded-lg px-4 py-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                    className="w-4 h-4 mt-0.5 accent-red-800 shrink-0"
                  />

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-700">
                      Active
                    </p>

                    <p className="text-xs text-slate-500">
                      Show this slide on homepage
                    </p>
                  </div>
                </label>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Display Order
                  </label>

                  <input
                    type="number"
                    name="order"
                    min="0"
                    value={form.order}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  />
                </div>
              </div>

              {/* ERROR */}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg break-words">
                  {error}
                </div>
              )}

              {/* FOOTER */}

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={submitting}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium transition disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-red-800 hover:bg-red-700 text-white font-semibold transition disabled:opacity-60"
                >
                  {submitting
                    ? "Saving..."
                    : editingHero
                      ? "Update Hero"
                      : "Create Hero"}
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

function HeroSkeleton() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 animate-pulse">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="bg-white border border-slate-200 rounded-xl overflow-hidden"
        >
          <div className="aspect-video bg-slate-200" />

          <div className="p-5 space-y-3">
            <div className="h-5 bg-slate-200 rounded w-3/4" />

            <div className="h-4 bg-slate-200 rounded w-full" />

            <div className="h-4 bg-slate-200 rounded w-2/3" />

            <div className="flex gap-2 pt-3">
              <div className="h-10 bg-slate-200 rounded flex-1" />

              <div className="h-10 w-10 bg-slate-200 rounded" />

              <div className="h-10 w-10 bg-slate-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ManageHeroes;
