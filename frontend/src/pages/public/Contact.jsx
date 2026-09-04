import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // Remove alerts while user is typing
    if (success) setSuccess("");
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await sendMessage(formData);

      setSuccess(
        "Your message has been sent successfully. Our school office will get back to you soon.",
      );

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
          "Unable to send your message. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-slate-50 min-h-screen">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="max-w-3xl">
            <p className="text-red-800 font-bold text-sm tracking-wide uppercase">
              Get In Touch
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mt-2">
              Contact Our School
            </h1>

            <div className="w-16 h-1 bg-red-800 mt-5" />

            <p className="text-slate-500 mt-5 text-base sm:text-lg leading-7 max-w-2xl">
              Have a question, enquiry or need more information? Our school
              office is always happy to assist parents, students and visitors.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          CONTACT SECTION
      ===================================================== */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* =================================================
              CONTACT INFORMATION
          ================================================= */}

          <div className="lg:col-span-1">
            <div className="mb-6">
              <p className="text-red-800 font-semibold text-sm uppercase tracking-wide">
                School Office
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                We’re Here to Help
              </h2>

              <p className="text-slate-500 mt-3 leading-6">
                For admissions, school information, general enquiries or any
                other assistance, please feel free to contact us.
              </p>
            </div>

            <div className="space-y-4">
              <ContactCard
                icon={<MapPin size={21} />}
                title="Our Address"
                text="Shaheed Uttam Chand Saraswati Vidhya Mandir Inter College, Pachpokariya, Banbasa, Champawat, Uttarakhand, India"
              />

              <ContactCard
                icon={<Phone size={21} />}
                title="Phone"
                text="School Office"
              />

              <ContactCard
                icon={<Mail size={21} />}
                title="Email"
                text="School Office Email"
              />

              <ContactCard
                icon={<Clock size={21} />}
                title="Office Hours"
                text="Monday - Saturday, 9:00 AM - 3:00 PM"
              />
            </div>
          </div>

          {/* =================================================
              CONTACT FORM
          ================================================= */}

          <div className="lg:col-span-2">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              {/* Form Header */}

              <div className="px-6 sm:px-8 py-6 border-b border-slate-200">
                <p className="text-red-800 text-sm font-semibold uppercase tracking-wide">
                  Send Enquiry
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  Send Us a Message
                </h2>

                <p className="text-slate-500 text-sm mt-2">
                  Fill in the details below and our school office will respond
                  as soon as possible.
                </p>
              </div>

              {/* Alerts */}

              {success && (
                <div className="mx-6 sm:mx-8 mt-6 flex gap-3 p-4 rounded-xl bg-green-50 border border-green-200">
                  <CheckCircle
                    size={20}
                    className="text-green-600 shrink-0 mt-0.5"
                  />

                  <p className="text-sm text-green-700 leading-6">
                    {success}
                  </p>
                </div>
              )}

              {error && (
                <div className="mx-6 sm:mx-8 mt-6 flex gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
                  <AlertCircle
                    size={20}
                    className="text-red-600 shrink-0 mt-0.5"
                  />

                  <p className="text-sm text-red-700 leading-6">
                    {error}
                  </p>
                </div>
              )}

              {/* Form */}

              <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-8 space-y-5"
              >
                {/* Name + Email */}

                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField
                    label="Full Name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />

                  <FormField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* Phone + Subject */}

                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField
  label="Phone Number"
  name="phone"
  type="tel"
  value={formData.phone}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    handleChange({
      target: { name: "phone", value },
    });
  }}
  placeholder="Enter your phone number"
  maxLength={10}
  inputMode="numeric"
  pattern="[0-9]{10}"
  required
/>

                  <FormField
                    label="Subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is your enquiry about?"
                    required
                  />
                </div>

                {/* Message */}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Message
                    </label>

                    <span className="text-xs text-slate-400">
                      {formData.message.length}/1000
                    </span>
                  </div>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    maxLength={1000}
                    rows={7}
                    placeholder="Write your message or enquiry..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 outline-none resize-none focus:ring-2 focus:ring-red-800/10 focus:border-red-800 transition"
                  />
                </div>

                {/* Submit */}

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-800 hover:bg-red-700 disabled:bg-red-400 text-white rounded-xl font-semibold transition"
                  >
                    <Send size={17} />

                    {loading ? "Sending Message..." : "Send Message"}

                    {!loading && <ArrowRight size={17} />}
                  </button>

                  <p className="text-xs text-slate-400 mt-3">
                    Your information will only be used to respond to your
                    enquiry.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

       {/* =====================================================
    MAP / LOCATION
===================================================== */}

<div className="mt-12 sm:mt-16">
  <div className="mb-6">
    <p className="text-red-800 font-semibold text-sm uppercase tracking-wide">
      Find Us
    </p>

    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
      School Location
    </h2>
  </div>

  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d599.4199616946665!2d80.06172545785388!3d28.98172783854216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a054f31cbfcd55%3A0xd101e5d10b174ed7!2sShaheed%20Uttam%20Chand%20Saraswati%20Vidya%20Mandir%20Inter%20College%20Pachpokariya!5e0!3m2!1sen!2sin!4v1788361586495!5m2!1sen!2sin"
      className="w-full h-80 sm:h-96 border-0"
      allowFullScreen
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
      title="Shaheed Uttam Chand Saraswati Vidya Mandir Inter College Location"
    />
  </div>
</div>
      </div>
    </section>
  );
}

/* =========================================================
   CONTACT CARD
========================================================= */

function ContactCard({ icon, title, text }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 flex gap-4 hover:shadow-sm transition">
      <div className="w-11 h-11 rounded-xl bg-red-50 text-red-800 flex items-center justify-center shrink-0">
        {icon}
      </div>

      <div className="min-w-0">
        <h3 className="font-semibold text-slate-900">{title}</h3>

        <p className="text-sm text-slate-500 mt-1 leading-6 break-words">
          {text}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   FORM FIELD
========================================================= */

function FormField({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  required,
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-red-800/10 focus:border-red-800 transition"
      />
    </div>
  );
}

export default Contact;