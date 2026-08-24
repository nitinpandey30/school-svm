import { useEffect, useState } from "react";
import { Mail, Phone, Trash2, User, CalendarDays } from "lucide-react";
import { getContacts, deleteContact } from "../../api/contact.api";

function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getContacts();

        setMessages(response.data || []);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.error ||
            "Unable to load messages."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) return;

    try {
      await deleteContact(id);

      setMessages((prev) =>
        prev.filter((message) => message._id !== id)
      );
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Unable to delete message."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-slate-500">Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Messages
        </h1>

        <p className="text-slate-500 mt-1">
          Messages received from the school contact form.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!error && messages.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Mail
            size={45}
            className="mx-auto text-slate-300 mb-3"
          />

          <h2 className="text-lg font-semibold text-slate-800">
            No messages
          </h2>

          <p className="text-slate-500 mt-1">
            There are no messages from visitors right now.
          </p>
        </div>
      )}

      {/* Messages */}
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className="bg-white rounded-xl border border-slate-200 p-5"
          >
            {/* Top */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                    <User size={18} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-900">
                      {message.name}
                    </h2>

                    <p className="text-sm text-slate-500">
                      {message.email}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleDelete(message._id)}
                className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-sm font-medium"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col sm:flex-row gap-3 mt-5 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>{message.phone}</span>
              </div>

              {message.createdAt && (
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} />

                  <span>
                    {new Date(message.createdAt).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>
              )}
            </div>

            {/* Message */}
            <div className="mt-5 pt-5 border-t border-slate-100">
              <p className="text-sm font-semibold text-slate-800">
                {message.subject}
              </p>

              <p className="text-slate-600 mt-2 leading-7 whitespace-pre-wrap">
                {message.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageMessages;

