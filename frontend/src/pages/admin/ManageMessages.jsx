import { useEffect, useState } from "react";
import { Mail,  Trash2,  AlertCircle, Eye, X } from "lucide-react";
import { getContacts, deleteContact } from "../../api/contact.api";

function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [readMessages, setReadMessages] = useState(() => {
    return JSON.parse(localStorage.getItem("readMessages")) || [];
  });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getContacts();
        setMessages(response.data || []);
      } catch (error) {
        console.error(error);
        setError(
          error.response?.data?.error || "Unable to load messages."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleView = (message) => {
    setSelectedMessage(message);

    if (!readMessages.includes(message._id)) {
      const updatedReadMessages = [...readMessages, message._id];
      setReadMessages(updatedReadMessages);
      localStorage.setItem(
        "readMessages",
        JSON.stringify(updatedReadMessages)
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) return;

    try {
      await deleteContact(id);
      setMessages((prev) => prev.filter((message) => message._id !== id));
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
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Mail size={20} />
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
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
            <p className="break-words">{error}</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!error && messages.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-100 flex items-center justify-center">
              <Mail size={30} className="text-slate-400" />
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
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                !readMessages.includes(message._id)
                  ? "bg-blue-50/40 border-blue-200"
                  : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-md"
              }`}
            >
              {/* Header Section — only name, email, badge, actions */}
              <div className="px-4 sm:px-6 py-4 sm:py-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                      {message.name?.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <h3 className="font-semibold text-slate-900 text-sm sm:text-base break-words">
                          {message.name}
                        </h3>

                        {!readMessages.includes(message._id) && (
                          <span className="shrink-0 text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                            New
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-500 break-all">
                        {message.email}
                      </p>

                      {message.createdAt && (
                        <p className="text-xs text-slate-400 mt-0.5">
                          {new Date(message.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => handleView(message)}
                      className="flex-1 sm:flex-none px-3 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 active:bg-blue-200 text-sm font-medium transition-colors duration-150 flex items-center justify-center gap-2"
                      title="View message"
                    >
                      <Eye size={16} />
                      <span>View</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(message._id)}
                      className="flex-1 sm:flex-none px-3 py-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 active:bg-red-200 text-sm font-medium transition-colors duration-150 flex items-center justify-center gap-2"
                      title="Delete message"
                    >
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      )}

      {/* View Message Modal — full details show only here */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/60 p-3 sm:p-4 flex items-center justify-center">

          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl sm:rounded-2xl shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-200">

              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Message Details
                </h2>

                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Contact form message
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="w-9 h-9 shrink-0 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
              >
                <X size={19} />
              </button>

            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 space-y-5">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Name
                  </p>

                  <p className="text-sm sm:text-base font-medium text-slate-900 mt-1 break-words">
                    {selectedMessage.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Email
                  </p>

                  <p className="text-sm sm:text-base font-medium text-slate-900 mt-1 break-all">
                    {selectedMessage.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Phone
                  </p>

                  <p className="text-sm sm:text-base font-medium text-slate-900 mt-1 break-all">
                    {selectedMessage.phone}
                  </p>
                </div>

                {selectedMessage.createdAt && (
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Date
                    </p>

                    <p className="text-sm sm:text-base font-medium text-slate-900 mt-1">
                      {new Date(
                        selectedMessage.createdAt
                      ).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                )}

              </div>

              {selectedMessage.subject && (
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Subject
                  </p>

                  <p className="text-sm sm:text-base font-semibold text-slate-900 mt-1 break-words">
                    {selectedMessage.subject}
                  </p>
                </div>
              )}

              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Message
                </p>

                <div className="mt-2 p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-wrap break-words">
                  {selectedMessage.message}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-4 sm:px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3 sm:justify-end">

              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  handleDelete(selectedMessage._id);
                  setSelectedMessage(null);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium flex items-center justify-center gap-2"
              >
                <Trash2 size={16} />
                Delete Message
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default ManageMessages;