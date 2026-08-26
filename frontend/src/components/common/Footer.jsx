import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* ================= SCHOOL INFO ================= */}
          <div>
            {/* Logo + School Name */}
            <Link to="/" className="flex items-center gap-3 mb-5">
              {/* School Logo */}
              <div className="w-14 h-14 shrink-0 bg-white rounded-full p-1">
                <img
                  src="/school-logo.png"
                  alt="School Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>

              {/* Name */}
              <div>
                <h2 className="text-white font-bold text-base leading-tight">
                  शहीद उत्तम चन्द सरस्वती
                  <br />
                  विद्या मंदिर इंटर कॉलेज
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                  Shaheed Uttam Chand Saraswati Vidhya Mandir Inter College
                </p>
              </div>
            </Link>

            {/* Description */}
            <p className="text-sm leading-6 text-slate-400 max-w-sm">
              Nurturing young minds through quality education, discipline, and
              holistic development for a brighter future.
            </p>

            {/* Social Media */}
            <div className="flex gap-3 mt-5">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition"
                aria-label="Facebook"
              >
                <FaFacebookF size={16} />
              </a>

              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition"
                aria-label="Instagram"
              >
                <FaInstagram size={17} />
              </a>

              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition"
                aria-label="YouTube"
              >
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-5">Quick Links</h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link
                to="/"
                className="text-slate-400 hover:text-red-400 transition"
              >
                Home
              </Link>

              <Link
                to="/about"
                className="text-slate-400 hover:text-red-400 transition"
              >
                About Us
              </Link>

              <Link
                to="/notices"
                className="text-slate-400 hover:text-red-400 transition"
              >
                Notices
              </Link>

              <Link
                to="/events"
                className="text-slate-400 hover:text-red-400 transition"
              >
                Events
              </Link>

          
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-white font-semibold mb-5">Explore</h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link
                to="/gallery"
                className="text-slate-400 hover:text-red-400 transition"
              >
                Gallery
              </Link>

              <Link
                to="/contact"
                className="text-slate-400 hover:text-red-400 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-5">Contact Us</h3>

            <div className="flex flex-col gap-4 text-sm">
              {/* Address */}
              <div className="flex gap-3">
                <MapPin size={18} className="text-red-400 shrink-0 mt-0.5" />

                <span className="text-slate-400 leading-6">
                  Pachpokariya, Banbasa
                  <br />
                  Champawat, Uttarakhand
                </span>
              </div>

              {/* Phone */}
              <div className="flex gap-3">
                <Phone size={18} className="text-red-400 shrink-0" />

                <span className="text-slate-400">Contact School Office</span>
              </div>

              {/* Email */}
              <div className="flex gap-3">
                <Mail size={18} className="text-red-400 shrink-0" />

                <span className="text-slate-400">School Office</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-sm text-slate-500">
          <p>© {currentYear} S.U.C.S.V.M.I.C. Banbasa. All Rights Reserved.</p>

          <p>Shaheed Uttam Chand Saraswati Vidhya Mandir Inter College</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
