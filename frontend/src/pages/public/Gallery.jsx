import { useEffect, useState } from "react";
import { CalendarDays, Image as ImageIcon, X } from "lucide-react";
import { getGallery } from "../../api/gallery.api";

function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  /* ================= FETCH GALLERY ================= */

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await getGallery();

        setGallery(data.gallery || data.data || data);
      } catch (error) {
        console.error(error);
        setError("Unable to load gallery");
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  /* ================= OPEN ALBUM ================= */

  const openAlbum = (album) => {
    setSelectedAlbum(album);
    setSelectedImage(0);
    document.body.style.overflow = "hidden";
  };

  /* ================= CLOSE ALBUM ================= */

  const closeAlbum = () => {
    setSelectedAlbum(null);
    setSelectedImage(0);
    document.body.style.overflow = "auto";
  };

  /* ================= ESC KEY ================= */

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeAlbum();
      }
    };

    if (selectedAlbum) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedAlbum]);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <section className="py-16 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-pulse">
            <div className="w-14 h-14 mx-auto rounded-xl bg-slate-200 mb-4" />

            <div className="h-4 w-32 bg-slate-200 rounded mx-auto" />

            <div className="h-10 w-48 bg-slate-200 rounded mx-auto mt-3" />

            <div className="h-4 w-80 bg-slate-200 rounded mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse"
              >
                <div className="aspect-video bg-slate-200" />

                <div className="p-5 space-y-3">
                  <div className="h-5 w-2/3 bg-slate-200 rounded" />

                  <div className="h-4 w-1/2 bg-slate-200 rounded" />

                  <div className="h-4 w-24 bg-slate-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ================= ERROR ================= */

  if (error) {
    return (
      <section className="min-h-[60vh] bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-14 h-14 mx-auto rounded-xl bg-red-100 text-red-800 flex items-center justify-center">
            <ImageIcon size={28} />
          </div>

          <h2 className="text-xl font-semibold text-slate-800 mt-5">
            Unable to Load Gallery
          </h2>

          <p className="text-red-500 mt-2">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* ================= GALLERY ================= */}

      <section className="py-16 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}

          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="w-14 h-14 mx-auto rounded-xl bg-red-100 text-red-800 flex items-center justify-center mb-4">
              <ImageIcon size={28} />
            </div>

            <p className="text-blue-700 font-semibold tracking-wide">
              SCHOOL MOMENTS
            </p>

            <h1 className="text-4xl font-bold text-slate-900 mt-2">Gallery</h1>

            <p className="text-slate-500 mt-4 leading-6">
              Explore memorable moments, activities and events from Shaheed
              Uttam Chand Saraswati Vidya Mandir Inter College.
            </p>
          </div>

          {/* Empty State */}

          {gallery.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
              <ImageIcon size={45} className="mx-auto text-slate-300" />

              <h2 className="text-lg font-semibold text-slate-700 mt-4">
                No Albums Available
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                School gallery albums will appear here when available.
              </p>
            </div>
          ) : (
            /* Albums */

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((album) => {
                const imageCount = album.images?.length || 0;
                const coverImage = album.images?.[0]?.url;

                return (
                  <article
                    key={album._id}
                    onClick={() => openAlbum(album)}
                    className="group bg-white rounded-2xl overflow-hidden border border-slate-200 cursor-pointer hover:shadow-xl transition duration-300"
                  >
                    {/* Cover Image */}

                    <div className="relative aspect-video overflow-hidden bg-slate-100">
                      {coverImage ? (
                        <img
                          src={coverImage}
                          alt={album.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon size={45} className="text-slate-300" />
                        </div>
                      )}

                      {/* Overlay */}

                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />

                      {/* Image Count */}

                      <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
                        {imageCount} {imageCount === 1 ? "Photo" : "Photos"}
                      </div>
                    </div>

                    {/* Album Info */}

                    <div className="p-5">
                      <h2 className="text-xl font-semibold text-slate-900 line-clamp-1">
                        {album.title}
                      </h2>

                      {album.date && (
                        <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
                          <CalendarDays size={16} />

                          <span>
                            {new Date(album.date).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      )}

                      <p className="text-sm text-red-800 font-semibold mt-4">
                        View Album →
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ================= ALBUM MODAL ================= */}

      {selectedAlbum && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 p-4 sm:p-8 overflow-y-auto"
          onClick={closeAlbum}
        >
          <div
            className="max-w-6xl mx-auto min-h-full flex flex-col justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}

            <div className="flex items-center justify-between gap-4 mb-5">
              <div className="min-w-0">
                <h2 className="text-2xl sm:text-3xl font-bold text-white truncate">
                  {selectedAlbum.title}
                </h2>

                {selectedAlbum.date && (
                  <p className="text-sm text-slate-300 mt-1">
                    {new Date(selectedAlbum.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>

              <button
                onClick={closeAlbum}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition shrink-0"
                aria-label="Close gallery"
              >
                <X size={24} />
              </button>
            </div>

            {/* Main Image */}

            <div className="bg-black rounded-xl overflow-hidden">
              {selectedAlbum.images?.[selectedImage]?.url && (
                <img
                  src={selectedAlbum.images[selectedImage].url}
                  alt={`${selectedAlbum.title} ${selectedImage + 1}`}
                  className="w-full max-h-[65vh] object-contain"
                />
              )}
            </div>

            {/* Thumbnails */}

            {selectedAlbum.images?.length > 0 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 mt-5">
                {selectedAlbum.images.map((image, index) => (
                  <button
                    key={image._id || index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === index
                        ? "border-red-500"
                        : "border-transparent hover:border-white/50"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${selectedAlbum.title} ${index + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Gallery;
