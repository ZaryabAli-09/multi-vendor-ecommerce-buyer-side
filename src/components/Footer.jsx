// Footer.js
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: adds smooth scrolling
    });
  };
  return (
    <footer className="bg-gray-100 text-gray-800 py-8 px-4 ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and about */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold">WEARLY</span>
            </div>
            <p className="text-sm">
              WEARLY is a multivendor ecommerce platform where independent
              sellers can showcase their fashion products to customers
              worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  onClick={scrollToTop}
                  className="hover:text-gray-600 transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/sellers"
                  onClick={scrollToTop}
                  className="hover:text-gray-600 transition"
                >
                  Sellers
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={scrollToTop}
                  className="hover:text-gray-600 transition"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/support"
                  onClick={scrollToTop}
                  className="hover:text-gray-600 transition"
                >
                  Support & Disputes
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  onClick={scrollToTop}
                  className="hover:text-gray-600 transition"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy-policy"
                  onClick={scrollToTop}
                  className="hover:text-gray-600 transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  onClick={scrollToTop}
                  className="hover:text-gray-600 transition"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  to={import.meta.env.VITE_SELLER_URL}
                  className="hover:text-gray-600 transition"
                >
                  Become a Seller
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-6 text-sm text-center">
          <p>© {new Date().getFullYear()} WEARLY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
