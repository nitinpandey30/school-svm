import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      <AdminSidebar />

      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;