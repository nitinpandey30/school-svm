import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

function PublicLayout() {
  return (
    <>
      <Navbar />

      <main className="pt-[105px]">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
export default PublicLayout;
