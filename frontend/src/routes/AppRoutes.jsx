import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/public/Home";
import Notices from "../pages/public/Notices";
import Events from "../pages/public/Events";
import Gallery from "../pages/public/Gallery";
import Contact from "../pages/public/Contact";
import About from "../pages/public/About";
import Login from "../pages/admin/Login";
import ProtectedRoute from "./ProtectedRoutes";
import Dashboard from "../pages/admin/Dashboard";
import AdminLayout from "../layouts/AdminLayout";
import ManageNotices from "../pages/admin/ManageNotices";
import ManageEvents from "../pages/admin/ManageEvents";
import ManageFees from "../pages/admin/ManageFees";
import ManageGallery from "../pages/admin/ManageGallery";
import ManageMessages from "../pages/admin/ManageMessages";


function AppRoutes() {
  return (
    <Routes>
      {/* Public Website */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/events" element={<Events />} />
       
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Admin */}
      <Route path="/admin/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="notices" element={<ManageNotices />} />
        <Route path="events" element={<ManageEvents />} />
        <Route path="fees" element={<ManageFees />} />
        <Route path="gallery" element={<ManageGallery />} />
        <Route path="messages" element={<ManageMessages />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
