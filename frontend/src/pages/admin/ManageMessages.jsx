import { useEffect, useState } from "react";
import { Mail, Phone, Trash2, CalendarDays, AlertCircle } from "lucide-react";
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
  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
    
    {/* Header */}
    <div className="border-b border-slate-200 pb-6 sm:pb-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
            <Mail size={20} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Messages
          </h1>
        </div>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Messages received from the school contact form.
        </p>
      </div>
    </div>

    {/* Error Alert */}
    {error && (
      <div className="p-4 sm:p-5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm sm:text-base">
        <div className="flex gap-3">
          <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      </div>
    )}

    {/* Empty State */}
    {!error && messages.length === 0 && (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
            <Mail size={32} className="text-slate-400" />
          </div>
        </div>
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
          No messages yet
        </h2>
        <p className="text-slate-600 mt-2 text-sm sm:text-base">
          Messages from visitors will appear here.
        </p>
      </div>
    )}

    {/* Messages List */}
    {!error && messages.length > 0 && (
      <div className="space-y-4 sm:space-y-5">
        {messages.map((message) => (
          <div
            key={message._id}
            className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            {/* Header Section */}
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                    {message.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-900 text-sm sm:text-base truncate">
                      {message.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 truncate">
                      {message.email}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(message._id)}
                  className="w-full sm:w-auto px-3 py-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 active:bg-red-200 text-sm font-medium transition-colors duration-150 flex items-center justify-center gap-2"
                  title="Delete message"
                >
                  <Trash2 size={16} />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            </div>

            {/* Contact Details */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 bg-slate-50 border-b border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-slate-400 flex-shrink-0" />
                  <span className="break-all">{message.phone}</span>
                </div>
                {message.createdAt && (
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} className="text-slate-400 flex-shrink-0" />
                    <time dateTime={new Date(message.createdAt).toISOString()}>
                      {new Date(message.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                )}
              </div>
            </div>

            {/* Message Content */}
            <div className="px-4 sm:px-6 py-4 sm:py-5">
              <div className="space-y-3">
                {message.subject && (
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Subject
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-slate-900 mt-1">
                      {message.subject}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Message
                  </p>
                  <div className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-wrap break-words max-h-96 overflow-y-auto">
                    {message.message}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

  </div>
);
}

export default ManageMessages;

