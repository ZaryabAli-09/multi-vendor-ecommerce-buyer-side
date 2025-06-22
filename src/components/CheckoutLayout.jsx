import { Outlet } from "react-router-dom";

import CheckoutHeader from "./CheckoutHeader.jsx";

function CheckoutLayout() {
  return (
    <>
      <CheckoutHeader />
      <Outlet />
    </>
  );
}

export default CheckoutLayout;
