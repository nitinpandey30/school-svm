import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Notices", path: "/notices" },
    { name: "Events", path: "/events" },
    { name: "Fee Structure", path: "/fees" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact Us", path: "/contact" },
  ];

  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Top of page -> always show
    if (currentScrollY <= 10) {
      setShowNavbar(true);
    }
    // Scrolling down -> hide
    else if (currentScrollY > lastScrollY) {
      setShowNavbar(false);
      setIsOpen(false);
    }
    // Scrolling up -> show
    else {
      setShowNavbar(true);
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  return (
    <header
  className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200
    transition-transform duration-300 ease-in-out
    ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
>
      {/* ================= SCHOOL HEADER ================= */}

      <div className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative min-h-[105px] flex items-center justify-between gap-4 overflow-hidden">
            {/* Saraswati Background Watermark */}
            <img
              src="/saraswati-watermark.png"
              alt=""
              className="absolute right-0 top-0 h-full w-105  object-contain opacity-[0.15] pointer-events-none "
            />

            {/* Logo + School Name */}
            <Link
              to="/"
              className="relative z-10 flex items-center gap-4 min-w-0"
            >
              {/* School Logo */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                <img
                  src="/school-logo.png"
                  alt="School Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* School Information */}
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-red-800 leading-tight">
                  शहीद उत्तम चन्द सरस्वती विद्या मंदिर इंटर कॉलेज
                </h1>

                <h2 className="text-sm sm:text-lg lg:text-xl font-semibold text-blue-900 mt-1 leading-tight">
                  SHAHEED UTTAM CHAND SARASWATI VIDHYA MANDIR INTER COLLEGE
                </h2>

                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Banbasa, Champawat, Uttarakhand
                </p>
              </div>
            </Link>

            {/* Right Side Emblem */}
            <div className="relative z-10 hidden sm:flex w-16 h-16 lg:w-20 lg:h-20 shrink-0 rounded-full overflow-hidden border-2 border-slate-200">
              <img
                src="/school-emblem.png"
                alt="School Emblem"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* ================= DESKTOP NAVBAR ================= */}
      <nav className="bg-[#7f211c] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex items-center justify-center">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 lg:px-5 py-3 text-sm font-medium border-r border-white/10 transition ${
                    isActive
                      ? "bg-[#5f1714] text-white"
                      : "hover:bg-[#681a17] text-white/95"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* ================= MOBILE HEADER ================= */}
          <div className="md:hidden flex items-center justify-between py-2">
            <span className="text-sm font-semibold">School Menu</span>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-black/10 transition"
              aria-label="Toggle navigation"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* ================= MOBILE NAVIGATION ================= */}
          {isOpen && (
            <div className="md:hidden border-t border-white/20 py-2">
              <div className="flex flex-col">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-3 text-sm font-medium rounded-md transition ${
                        isActive
                          ? "bg-[#5f1714] text-white"
                          : "text-white/95 hover:bg-black/10"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
