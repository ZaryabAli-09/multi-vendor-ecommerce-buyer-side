// ❌ Remove this line
// import WithoutHeaderAndFooterLayout from "./WithoutFooterLayout.jsx";

import { Outlet } from "react-router-dom";
import ReelsHeader from "./ReelsHeader.jsx";

function WithoutHeaderAndFooterLayout() {
  return (
    <>
      {/* <ReelsHeader /> */}
      <Outlet />
    </>
  );
}

export default WithoutHeaderAndFooterLayout;
