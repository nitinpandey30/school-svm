import {
  Bell,
  CalendarDays,
  IndianRupee,
  Images,
  Mail,
  ArrowRight,
  ChartBar,
  House,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const cards = [
     {
      title: "Heroes",
      description: "Update Hero",
      icon: House,
      path: "/admin/heroes",
    },
     {
      title: "Stats",
      description: "Update Stats",
      icon: ChartBar,
      path: "/admin/stats",
    },
    {
      title: "Notices",
      description: "Manage school notices",
      icon: Bell,
      path: "/admin/notices",
    },
    {
      title: "Events",
      description: "Manage school events",
      icon: CalendarDays,
      path: "/admin/events",
    },
    {
      title: "Fee Structure",
      description: "Manage class-wise fees",
      icon: IndianRupee,
      path: "/admin/fees",
    },
    {
      title: "Gallery",
      description: "Manage school gallery",
      icon: Images,
      path: "/admin/gallery",
    },
   
    {
      title: "Messages",
      description: "View contact messages",
      icon: Mail,
      path: "/admin/messages",
    },
  ];

  return (
    <div className="p-6 sm:p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          Manage your school website from here.
        </p>
      </div>


      {/* Welcome */}
      <div className="bg-blue-600 rounded-xl p-6 text-white mb-8">
        <h2 className="text-xl font-semibold">
          Welcome to the Admin Panel
        </h2>

        <p className="text-blue-100 mt-2 text-sm">
          Use the options below to manage notices, events, fees,
          gallery and messages.
        </p>
      </div>


      {/* Management Cards */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Quick Access
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <button
                key={card.path}
                onClick={() => navigate(card.path)}
                className="text-left bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition group"
              >
                <div className="flex items-start justify-between">

                  <div className="w-11 h-11 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Icon size={22} />
                  </div>

                  <ArrowRight
                    size={19}
                    className="text-slate-400 group-hover:text-blue-600 transition"
                  />

                </div>

                <h3 className="text-lg font-semibold text-slate-900 mt-5">
                  {card.title}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  {card.description}
                </p>

              </button>
            );
          })}

        </div>
      </div>

    </div>
  );
}

export default Dashboard;