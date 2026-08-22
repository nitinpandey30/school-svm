import { useEffect, useState } from "react";
import { CalendarDays, Image as ImageIcon, X } from "lucide-react";
import { getGallery } from "../../api/gallery.api";

function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

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

  const openAlbum = (album) => {
    setSelectedAlbum(album);
    setSelectedImage(0);
  };

  const closeAlbum = () => {
    setSelectedAlbum(null);
    setSelectedImage(0);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-slate-500">Loading gallery...</p>
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
    <>
      <section className="py-16 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="w-14 h-14 mx-auto rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
              <ImageIcon size={28} />
            </div>

            <p className="text-blue-600 font-semibold">SCHOOL MOMENTS</p>

            <h1 className="text-4xl font-bold text-slate-900 mt-2">Gallery</h1>

            <p className="text-slate-500 mt-4">
              Explore memorable moments and activities from our school.
            </p>
          </div>

          {/* Empty State */}
          {gallery.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed">
              <ImageIcon size={45} className="mx-auto text-slate-300 mb-3" />

              <p className="text-slate-500">No albums available right now.</p>
            </div>
          ) : (
            /* Albums */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((album) => (
                <div
                  key={album._id}
                  onClick={() => openAlbum(album)}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200 cursor-pointer hover:shadow-xl transition"
                >
                  {/* Cover Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={album.imageUrl?.[0]}
                      alt={album.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />

                    {/* Image Count */}
                    <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                      {album.imageUrl?.length || 0} Photos
                    </div>
                  </div>

                  {/* Album Info */}
                  <div className="p-5">
                    <h2 className="text-xl font-semibold text-slate-900">
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

                    <p className="text-sm text-blue-600 font-medium mt-4">
                      View Album →
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Album Modal */}
      {selectedAlbum && (
        <div
          className="fixed inset-0 z-100 bg-black/80 p-4 sm:p-8 overflow-y-auto"
          onClick={closeAlbum}
        >
          <div
            className="max-w-6xl mx-auto min-h-full flex flex-col justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
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
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                <X size={24} />
              </button>
            </div>

            {/* Main Image */}
            <div className="bg-black rounded-xl overflow-hidden">
              <img
                src={selectedAlbum.imageUrl?.[selectedImage]}
                alt={selectedAlbum.title}
                className="w-full max-h-[65vh] object-contain"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 mt-5">
              {selectedAlbum.imageUrl?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${selectedAlbum.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Gallery;
