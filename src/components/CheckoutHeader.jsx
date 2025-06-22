import { Link } from "react-router-dom";

function CheckoutHeader() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div className="mb-4">
            <Link to="/" className="text-2xl font-bold tracking-wide">
              WEARLY
            </Link>
          </div>

          {/* Progress Steps */}
          <div className="w-full max-w-md">
            <div className="flex items-center justify-between relative">
              {/* Progress line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>

              {/* Steps */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mb-1">
                  1
                </div>
                <span className="text-xs text-gray-500">Shipping</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mb-1">
                  2
                </div>
                <span className="text-xs text-gray-500">Payment</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mb-1">
                  3
                </div>
                <span className="text-xs text-gray-500">Confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default CheckoutHeader;
