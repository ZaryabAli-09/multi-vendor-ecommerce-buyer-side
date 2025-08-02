import { Link } from "react-router-dom";

function CheckoutHeader() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Back Button (Left) */}
          <Link to="/cart" className="text-gray-600 hover:text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </Link>

          {/* Centered Title with Badge */}
          <div className="flex items-center">
            <h1 className="text-lg font-semibold text-gray-800 mr-2">
              SmartStyler
            </h1>
            <div className="flex items-center bg-blue-50 px-2 py-1 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-blue-600 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs font-medium text-blue-600">
                Secure Checkout
              </span>
            </div>
          </div>

          {/* Empty div for balance */}
          <div className="w-6"></div>
        </div>
      </div>
    </header>
  );
}

export default CheckoutHeader;
