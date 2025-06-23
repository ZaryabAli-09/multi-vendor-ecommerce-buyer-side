import { Outlet } from "react-router-dom";

// components
import FullHeader from "./FullHeader.jsx";

function WithoutFooterLayout() {
  return (
    <>
      <FullHeader />
      <Outlet />
    </>
  );
}

export default WithoutFooterLayout;
