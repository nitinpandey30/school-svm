import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { sendMessage } from "../../api/contact.api";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await sendMessage(formData);

      setSuccess("Your message has been sent successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to send message. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-slate-50 min-h-screen">
    <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-blue-600 font-semibold">GET IN TOUCH</p>

          <h1 className="text-4xl font-bold text-slate-900 mt-2">Contact Us</h1>

          <p className="text-slate-500 mt-4 leading-7">
            Have a question or need more information? Feel free to contact our
            school office.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
{/* Contact Information */}
<div className="space-y-4">

  <ContactCard
    icon={<MapPin size={22} className="text-red-400 shrink-0 mt-0.5" />}
    title="Our Address"
    text="Shaheed Uttam Chand Saraswati Vidhya Mandir Inter College, Pachpokariya, Banbasa, Champawat, Uttarakhand, India"
  />

  <ContactCard
    icon={<Phone size={22} className="text-red-400 shrink-0" />}
    title="Phone"
    text="School Office"
  />

  <ContactCard
    icon={<Mail size={22} className="text-red-400 shrink-0" />}
    title="Email"
    text="School Office Email"
  />

  <ContactCard
    icon={<Clock size={22} className="text-red-400 shrink-0" />}
    title="Office Hours"
    text="Monday - Saturday, 9:00 AM - 3:00 PM"
  />

</div>


          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Send Us a Message
            </h2>

            <p className="text-slate-500 mt-2">
              Fill out the form below and our school office will get back to
              you.
            </p>

            {success && (
              <div className="mt-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
                {success}
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Enter subject"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Write your message..."
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-red-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition"
              >
                <Send size={18} />

                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon, title, text }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 flex gap-4">
      <div className="w-11 h-11 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-slate-900">
          {title}
        </h3>

        <p className="text-sm text-slate-500 mt-1 leading-6">
          {text}
        </p>
      </div>
    </div>
  );
}


export default Contact;
