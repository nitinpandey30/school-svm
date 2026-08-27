import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { getFees } from "../../api/fee.api";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showFees, setShowFees] = useState(false);
  const [fees, setFees] = useState([]);
  const [showNavbar, setShowNavbar] = useState(true);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Notices", path: "/notices" },
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact Us", path: "/contact" },
  ];

  // ================= FETCH FEE STRUCTURES =================
  useEffect(() => {
    const fetchFees = async () => {
      try {
        const data = await getFees();

        const feeList = data?.fees || [];

        // Latest academic year first
        feeList.sort((a, b) => {
          const yearA = parseInt(a.academicYear?.split("-")[0]) || 0;
          const yearB = parseInt(b.academicYear?.split("-")[0]) || 0;

          return yearB - yearA;
        });

        setFees(feeList);
      } catch (error) {
        console.error("Unable to load fee structures:", error);
      }
    };

    fetchFees();
  }, []);

  // ================= NAVBAR SCROLL =================
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 10) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
        setIsOpen(false);
        setShowFees(false);
      } else {
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
              className="absolute right-0 top-0 h-full w-[420px] object-contain opacity-[0.15] pointer-events-none"
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

      {/* ================= DESKTOP / MOBILE NAVBAR ================= */}

      <nav className="bg-[#7f211c] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ================= DESKTOP ================= */}

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

            {/* ================= FEE STRUCTURE ================= */}

            <div className="relative group">

              <button
                type="button"
                className="px-4 lg:px-5 py-3 text-sm font-medium border-r border-white/10 flex items-center gap-1 hover:bg-[#681a17] transition"
              >
                Fee Structure

                <ChevronDown
                  size={15}
                  className="group-hover:rotate-180 transition-transform duration-200"
                />
              </button>

              {/* Dropdown */}
              <div
                className="absolute left-0 top-full w-60 bg-white text-slate-700
                border border-slate-200 shadow-lg rounded-b-lg
                invisible opacity-0 translate-y-1
                group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
                transition-all duration-200"
              >
                {fees.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-slate-500">
                    No fee structure available
                  </div>
                ) : (
                  fees.map((fee) => (
                    <a
                      key={fee._id}
                      href={fee.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="block px-4 py-3 text-sm border-b border-slate-100 last:border-b-0 hover:bg-slate-50 hover:text-[#7f211c] transition"
                    >
                      Fee Structure {fee.academicYear}
                    </a>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* ================= MOBILE HEADER ================= */}

          <div className="md:hidden flex items-center justify-between py-2">

            <span className="text-sm font-semibold">
              School Menu
            </span>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-black/10 transition"
              aria-label="Toggle navigation"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>

          {/* ================= MOBILE MENU ================= */}

          {isOpen && (
            <div className="md:hidden border-t border-white/20 py-2">

              <div className="flex flex-col">

                {/* Normal Links */}
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

                {/* ================= MOBILE FEE STRUCTURE ================= */}

                <button
                  type="button"
                  onClick={() => setShowFees(!showFees)}
                  className="px-4 py-3 text-sm font-medium flex items-center justify-between rounded-md hover:bg-black/10 transition"
                >
                  <span>Fee Structure</span>

                  <ChevronDown
                    size={17}
                    className={`transition-transform duration-200 ${
                      showFees ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showFees && (
                  <div className="ml-4 border-l border-white/20">

                    {fees.length === 0 ? (
                      <p className="px-4 py-3 text-sm text-white/60">
                        No fee structure available
                      </p>
                    ) : (
                      fees.map((fee) => (
                        <a
                          key={fee._id}
                          href={fee.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => {
                            setIsOpen(false);
                            setShowFees(false);
                          }}
                          className="block px-4 py-3 text-sm text-white/90 hover:bg-black/10 transition"
                        >
                          Fee Structure {fee.academicYear}
                        </a>
                      ))
                    )}

                  </div>
                )}

              </div>
            </div>
          )}

        </div>
      </nav>
    </header>
  );
}

export default Navbar;

