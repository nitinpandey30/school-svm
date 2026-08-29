import {
  LayoutDashboard,
  Bell,
  CalendarDays,
  IndianRupee,
  Images,
  Mail,
  LogOut,
  ChartBar,
  House
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function AdminSidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Heroes",
      path: "/admin/heroes",
      icon: House,
    },
    {
      name: "Stats",
      path: "/admin/stats",
      icon: ChartBar
    },
    {
      name: "Notices",
      path: "/admin/notices",
      icon: Bell,
    },
    {
      name: "Events",
      path: "/admin/events",
      icon: CalendarDays,
    },
    {
      name: "Fee Structure",
      path: "/admin/fees",
      icon: IndianRupee,
    },
    {
      name: "Gallery",
      path: "/admin/gallery",
      icon: Images,
    },
    {
      name: "Messages",
      path: "/admin/messages",
      icon: Mail,
    },
   
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col">

      {/* Logo / School Name */}
      <div className="px-6 py-5 border-b border-slate-200">
        <h1 className="text-lg font-bold text-slate-900">
          School Admin
        </h1>

        <p className="text-xs text-slate-500 mt-1">
          Administration Panel
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              <Icon size={19} />

              <span>{item.name}</span>
            </NavLink>
          );
        })}

      </nav>

      {/* User + Logout */}
      <div className="border-t border-slate-200 p-4">

        <div className="mb-3 px-2">
          <p className="text-sm font-medium text-slate-900">
            {user?.name || "Administrator"}
          </p>

          <p className="text-xs text-slate-500 mt-1">
            {user?.email}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition"
        >
          <LogOut size={19} />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default AdminSidebar;