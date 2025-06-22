// react hooks
import { useEffect, useState } from "react";

// dependencies
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

// action
import { login } from "./features/userSlice.js";

// components
import MainLayout from "./components/MainLayout.jsx";
import AuthLayout from "./components/AuthLayout.jsx";

// pages
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import Login from "./pages/Login.jsx";
import UserCart from "./pages/UserCart.jsx";
import GuestCart from "./pages/GuestCart.jsx";
import UserWishlist from "./pages/UserWishlist.jsx";
import GuestWishlist from "./pages/GuestWishlist.jsx";
import Profile from "./pages/Profile.jsx";
import Product from "./pages/Product.jsx";
import Logout from "./pages/Logout.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Store from "./pages/Store.jsx";
import BrowsingHistory from "./pages/BrowsingHistory.jsx";
import ProductList from "./pages/ProductList.jsx";
import MyMessages from "./pages/MyMessages.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import FAQs from "./pages/Faqs.jsx";
import SupportAndDisputes from "./pages/SupportAndDisputes.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";
import SellerList from "./pages/AllStores.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import CheckoutLayout from "./components/CheckoutLayout.jsx";
import SuccessPage from "./pages/StripePaymentSuccess.jsx";
import FailurePage from "./pages/StripePaymentFailure.jsx";

function App() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "wishlist",
          element: isUserLoggedIn ? <UserWishlist /> : <GuestWishlist />,
        },
        {
          path: "cart",
          element: isUserLoggedIn ? <UserCart /> : <GuestCart />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "products/single/:productId",
          element: <Product />,
        },
        {
          path: "products/single/:productId/:variantId",
          element: <Product />,
        },
        {
          path: "auth/logout",
          element: <Logout />,
        },
        {
          path: "store/:storeId",
          element: <Store />,
        },
        {
          path: "browsing-history",
          element: <BrowsingHistory />,
        },
        {
          path: "my-orders",
          element: <MyOrders />,
        },
        {
          path: "/products/:category/:subcategory?/:subsubcategory?",
          element: <ProductList />,
        },

        {
          path: "/my-messages/:sellerId?",
          element: <MyMessages />,
        },
        {
          path: "about",
          element: <AboutUs />,
        },
        {
          path: "faq",
          element: <FAQs />,
        },
        {
          path: "support",
          element: <SupportAndDisputes />,
        },
        {
          path: "privacy-policy",
          element: <PrivacyPolicy />,
        },
        {
          path: "terms-of-service",
          element: <TermsOfService />,
        },
        {
          path: "sellers",
          element: <SellerList />,
        },
      ],
    },

    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "verify-email",
          element: <VerifyEmail />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
      ],
    },
    {
      path: "/order",
      element: <CheckoutLayout />,
      children: [
        {
          path: "checkout",
          element: <CheckoutPage />,
        },
        {
          path: "payment-success",
          element: <SuccessPage />,
        },
        {
          path: "payment-failure",
          element: <FailurePage />,
        },
      ],
    },
  ]);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/buyer/profile`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          const result = await response.json();
          // console.log(result);
          return;
        }

        const result = await response.json();
        console.log(result.data);
        dispatch(login({ ...result.data }));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserProfile();
  }, []);

  if (isLoading) {
    return <></>;
  } else {
    return (
      <>
        <Toaster></Toaster>

        <RouterProvider router={router} />
      </>
    );
  }
}

export default App;
