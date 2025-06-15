import { Outlet } from "react-router-dom";

// components
import FullHeader from "./FullHeader.jsx";
import Footer from "./Footer.jsx";

function MainLayout() {
  return (
    <>
      <FullHeader />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
