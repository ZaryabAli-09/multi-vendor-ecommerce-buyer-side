import { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { CgSearch } from "react-icons/cg";
import { BsPerson } from "react-icons/bs";
import { BsCart2 } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";

import ProfileDropDown from "./ProfileDropDown.jsx";
import NavbarSearch from "./NavbarSearch.jsx";

import CategoryNavigation from "./CategoryNavigation.jsx";

function FullHeader() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const cartItemsCount = useSelector((state) => state.user.cartItemsCount);
  const wishlistItemsCount = useSelector(
    (state) => state.user.wishlistItemsCount
  );

  const [isProfileDDVisible, setIsProfileDDVisible] = useState(false);

  const searchInputRef = useRef();

  const productNames = [
    "Shoes",
    "Jeans",
    "T-Shirts",
    "Jackets",
    "Bags",
    "Perfumes",
    "Glasses",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomProduct =
        productNames[Math.floor(Math.random() * productNames.length)];

      searchInputRef.current.placeholder = `Search for ${randomProduct}`;
    }, 5 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <header className="hidden lg:flex items-center justify-between px-8 border-b-[1px] shadow-sm">
        <Link to="/" className="text-xl lg:text-3xl font-bold">
          SmartStyler
        </Link>

        <CategoryNavigation />

        <NavbarSearch searchInputRef={searchInputRef} />

        <div
          className={`flex items-center ${isLoggedIn ? "gap-x-5" : "gap-x-8"}`}
        >
          {isLoggedIn && (
            <div
              className="relative py-4"
              onMouseEnter={() => setIsProfileDDVisible(true)}
              onMouseLeave={() => setIsProfileDDVisible(false)}
            >
              <Link to="/profile" className=" text-[30px]">
                <BsPerson />
              </Link>

              <ProfileDropDown isProfileDDVisible={isProfileDDVisible} />
            </div>
          )}

          {!isLoggedIn && (
            <Link to="/auth/login" className="text-xl font-semibold">
              Login
            </Link>
          )}

          {!isLoggedIn && (
            <Link to="/auth/signup" className="text-xl font-semibold">
              Signup
            </Link>
          )}

          <Link to="/cart" className="flex gap-x-1">
            <BsCart2 className="text-[27px]" />
            <span className="text-lg font-semibold">{cartItemsCount}</span>
          </Link>

          <Link to="/wishlist" className="flex gap-x-1">
            <FiHeart className="text-[23.5px] relative top-[2.5px]" />
            <span className="text-lg font-semibold relative top-[1px]">
              {wishlistItemsCount}
            </span>
          </Link>
        </div>
      </header>

      <div>
        <header className=" lg:hidden lg:bg-slate-400 flex items-center justify-between px-8  shadow-sm">
          <div className="flex items-center gap-x-4">
            <CategoryNavigation />
            <Link to="/" className="text-xl lg:text-3xl font-bold">
              SmartStyler
            </Link>
          </div>

          {/* <NavbarSearch searchInputRef={searchInputRef} /> */}

          <div
            className={`flex items-center ${
              isLoggedIn ? "gap-x-5" : "gap-x-8"
            }`}
          >
            {isLoggedIn && (
              <div
                className="relative py-4"
                onMouseEnter={() => setIsProfileDDVisible(true)}
                onMouseLeave={() => setIsProfileDDVisible(false)}
              >
                <Link to="/profile" className=" text-[30px]">
                  <BsPerson />
                </Link>

                <ProfileDropDown isProfileDDVisible={isProfileDDVisible} />
              </div>
            )}

            {!isLoggedIn && (
              <Link to="/auth/login" className="text-xl font-semibold">
                Login
              </Link>
            )}

            {!isLoggedIn && (
              <Link to="/auth/signup" className="text-xl font-semibold">
                Signup
              </Link>
            )}

            {isLoggedIn && (
              <Link to="/cart" className="flex gap-x-1">
                <BsCart2 className="text-[27px]" />
                <span className="text-lg font-semibold">{cartItemsCount}</span>
              </Link>
            )}
            {isLoggedIn && (
              <Link to="/wishlist" className="flex gap-x-1">
                <FiHeart className="text-[23.5px] relative top-[2.5px]" />
                <span className="text-lg font-semibold relative top-[1px]">
                  {wishlistItemsCount}
                </span>
              </Link>
            )}
          </div>
        </header>
        <div className="lg:hidden bg-white shadow-sm px-4 py-2 border-b-[1px]">
          <div className="w-full flex justify-center">
            <div className="max-w-md w-full">
              <NavbarSearch searchInputRef={searchInputRef} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FullHeader;
