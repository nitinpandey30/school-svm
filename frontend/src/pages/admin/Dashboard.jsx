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
  <div className="p-4 sm:p-6 lg:p-8">

    {/* Header */}
    <div className="mb-6 sm:mb-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
        Dashboard
      </h1>

      <p className="text-sm sm:text-base text-slate-500 mt-2">
        Manage your school website from here.
      </p>
    </div>


    {/* Welcome */}
    <div className="bg-blue-600 rounded-xl p-4 sm:p-6 text-white mb-6 sm:mb-8">
      <h2 className="text-lg sm:text-xl font-semibold">
        Welcome to the Admin Panel
      </h2>

      <p className="text-blue-100 mt-2 text-sm leading-relaxed">
        Use the options below to manage notices, events, fees,
        gallery and messages.
      </p>
    </div>


    {/* Management Cards */}
    <div>
      <h2 className="text-lg font-semibold text-slate-900 mb-4">
        Quick Access
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <button
              key={card.path}
              onClick={() => navigate(card.path)}
              className="
                w-full
                text-left
                bg-white
                border border-slate-200
                rounded-xl
                p-4 sm:p-5
                hover:border-blue-300
                hover:shadow-sm
                transition
                group
              "
            >
              <div className="flex items-start justify-between gap-3">

                <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Icon size={21} />
                </div>

                <ArrowRight
                  size={19}
                  className="shrink-0 text-slate-400 group-hover:text-blue-600 transition"
                />

              </div>

              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mt-4 sm:mt-5 break-words">
                {card.title}
              </h3>

              <p className="text-sm text-slate-500 mt-1 leading-relaxed">
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