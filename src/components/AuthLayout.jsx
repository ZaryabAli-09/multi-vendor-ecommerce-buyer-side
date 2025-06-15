import { Outlet } from "react-router-dom";

import MinimalHeader from "./MinimalHeader.jsx";

function AuthLayout() {
  return (
    <>
      <MinimalHeader />
      <Outlet />
    </>
  );
}

export default AuthLayout;
