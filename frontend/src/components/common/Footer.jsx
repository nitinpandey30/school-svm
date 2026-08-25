import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* School Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                S
              </div>

              <div>
                <h2 className="text-white font-bold">School Name</h2>
                <p className="text-xs text-slate-400">
                  Excellence in Education
                </p>
              </div>
            </div>

            <p className="text-sm leading-6 text-slate-400">
              Providing quality education and building a strong foundation for
              the future of our students.
            </p>

            <div className="flex gap-3 mt-5">
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-800 hover:bg-blue-600 transition"
              >
                 <FaFacebookF size={16} />
              </a>

              <a
                href="#"
                className="p-2 rounded-lg bg-slate-800 hover:bg-pink-600 transition"
              >
                <FaInstagram size={17} />
              </a>

              <a
                href="#"
                className="p-2 rounded-lg bg-slate-800 hover:bg-red-600 transition"
              >
                 <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>

              <Link to="/about" className="hover:text-white transition">
                About
              </Link>

              <Link to="/notices" className="hover:text-white transition">
                Notices
              </Link>

              <Link to="/events" className="hover:text-white transition">
                Events
              </Link>

              <Link to="/fees" className="hover:text-white transition">
                Fee Structure
              </Link>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Useful Links</h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link to="/gallery" className="hover:text-white transition">
                Gallery
              </Link>

              <Link to="/contact" className="hover:text-white transition">
                Contact Us
              </Link>

            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>

            <div className="flex flex-col gap-4 text-sm">
              <div className="flex gap-3">
                <MapPin size={18} className="text-blue-500 shrink-0 mt-0.5" />
                <span>School Road, Dehradun, Uttarakhand</span>
              </div>

              <div className="flex gap-3">
                <Phone size={18} className="text-blue-500 shrink-0" />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex gap-3">
                <Mail size={18} className="text-blue-500 shrink-0" />
                <span>info@school.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} School Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
