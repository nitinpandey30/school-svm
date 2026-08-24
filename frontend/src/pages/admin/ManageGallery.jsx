import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Upload } from "lucide-react";

import {
  getGallery,
  createGallery,
  updateGallery,
  deleteGallery,
  deleteGalleryImage,
} from "../../api/gallery.api";

function ManageGallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [existingImages, setExistingImages] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
  });

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const fetchGallery = async () => {
    try {
      const response = await getGallery();
      setGallery(response.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    setImages(selectedFiles);

    const previews = selectedFiles.map((file) => URL.createObjectURL(file));

    setPreviewImages(previews);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
    });

    setImages([]);
    setPreviewImages([]);
    setEditingId(null);
    setShowForm(false);
    setExistingImages([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingId && images.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    setSaving(true);

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("date", formData.date);

      images.forEach((image) => {
        data.append("images", image);
      });

      if (editingId) {
        await updateGallery(editingId, data);
      } else {
        await createGallery(data);
      }
      resetForm();
      fetchGallery();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Something went wrong.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
  setEditingId(item._id);

  setFormData({
    title: item.title || "",
    date: item.date
      ? new Date(item.date).toISOString().split("T")[0]
      : "",
  });

  setExistingImages(item.images || []);
  setImages([]);
  setPreviewImages([]);

  setShowForm(true);
};

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this gallery album?",
    );

    if (!confirmed) return;

    try {
      await deleteGallery(id);
      fetchGallery();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Unable to delete gallery.",
      );
    }
  };

  const handleRemoveImage = async (imageId) => {
  const confirmed = window.confirm(
    "Are you sure you want to remove this image?"
  );

  if (!confirmed) return;

  try {
    const response = await deleteGalleryImage(
      editingId,
      imageId
    );

    setExistingImages(response.gallery.images);

    setGallery((prev) =>
      prev.map((item) =>
        item._id === editingId
          ? response.gallery
          : item
      )
    );
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
        error.response?.data?.error ||
        "Unable to delete image."
    );
  }
};

  return (
    <div className="p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Gallery
          </h1>

          <p className="text-slate-500 mt-2">
            Manage school events and photo albums.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingId(null);

            setFormData({
              title: "",
              date: "",
            });

            setImages([]);
            setPreviewImages([]);

            setShowForm(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
        >
          <Plus size={19} />
          Add Gallery
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              {editingId ? "Edit Gallery" : "Add Gallery"}
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
                Album Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Example: Annual Day 2026"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Date
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

            {editingId && existingImages.length > 0 && (
  <div>
    <p className="text-sm font-medium text-slate-700 mb-3">
      Existing Images
    </p>

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {existingImages.map((image) => (
        <div
          key={image._id}
          className="relative aspect-square rounded-lg overflow-hidden bg-slate-100"
        >
          <img
            src={image.url}
            alt={formData.title}
            className="w-full h-full object-cover"
          />

          <button
            type="button"
            onClick={() => handleRemoveImage(image._id)}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  </div>
)}

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {editingId ? "Add New Images (Optional)" : "Images"}
              </label>

              <label className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition">
                <Upload className="text-blue-600 mb-3" size={30} />

                <span className="font-medium text-slate-700">
                  Choose Images
                </span>

                <span className="text-sm text-slate-400 mt-1">
                  You can select multiple images
                </span>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Preview */}
            {previewImages.length > 0 && (
              <div>
                <p className="text-sm font-medium text-slate-700 mb-3">
                  Selected Images
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {previewImages.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-lg overflow-hidden bg-slate-100"
                    >
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium"
              >
                {saving
                  ? "Uploading..."
                  : editingId
                    ? "Update Gallery"
                    : "Create Gallery"}
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

      {/* Gallery Albums */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="font-semibold text-slate-900">Gallery Albums</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-500">
            Loading gallery...
          </div>
        ) : gallery.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No gallery albums found.
          </div>
        ) : (
          <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((item) => (
              <div
                key={item._id}
                className="border border-slate-200 rounded-xl overflow-hidden bg-white"
              >
                {/* Album Images */}
                <div className="grid grid-cols-2 h-48 bg-slate-100">
                  {item.images?.slice(0, 4).map((image) => (
                    <img
                      key={image._id}
                      src={image.url}
                      alt={item.title}
                      className="w-full h-24 object-cover"
                    />
                  ))}
                </div>

                {/* Album Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {item.images?.length || 0} images
                  </p>

                  <p className="text-xs text-slate-400 mt-2">
                    {item.date ? new Date(item.date).toLocaleDateString() : ""}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 text-sm font-medium"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 text-sm font-medium"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageGallery;
