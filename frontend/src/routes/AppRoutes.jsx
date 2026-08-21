import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";

function AppRoutes() {
  return (
    <Routes>

      {/* Public Website */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/notices" element={<h1>Notices</h1>} />
        <Route path="/events" element={<h1>Events</h1>} />
        <Route path="/faculty" element={<h1>Faculty</h1>} />
        <Route path="/gallery" element={<h1>Gallery</h1>} />
        <Route path="/contact" element={<h1>Contact</h1>} />
      </Route>

      {/* Admin */}
      <Route path="/admin/login" element={<h1>Admin Login</h1>} />
      <Route path="/admin/dashboard" element={<h1>Dashboard</h1>} />

    </Routes>
  );
}

export default AppRoutes;