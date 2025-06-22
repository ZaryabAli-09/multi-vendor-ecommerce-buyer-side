import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiXCircle, FiShoppingBag, FiHome, FiCreditCard } from "react-icons/fi";

const FailurePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const errorMessage = searchParams.get("message") || "Payment failed";
    toast.error(errorMessage);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Failure Header */}
        <div className="bg-red-50 rounded-t-lg p-6 border border-red-100">
          <div className="flex flex-col md:flex-row items-center">
            <div className="bg-red-100 p-3 rounded-full mb-4 md:mb-0 md:mr-6">
              <FiXCircle className="h-10 w-10 text-red-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Payment Unsuccessful
              </h1>
              <p className="text-red-700 mt-1">
                We couldn't process your payment.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {searchParams.get("message") ||
                  "Please try again or use a different payment method."}
              </p>
            </div>
          </div>
        </div>

        {/* Failure Details */}
        <div className="bg-white rounded-b-lg shadow-sm divide-y divide-gray-200 mt-4">
          {/* Error Details */}
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900">
              What went wrong?
            </h2>
            <div className="mt-4 space-y-3">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <FiXCircle className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-700">
                    {searchParams.get("message") ||
                      "Your payment could not be processed. This might be due to:"}
                  </p>
                  <ul className="mt-2 list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Insufficient funds in your account</li>
                    <li>Card issuer declined the transaction</li>
                    <li>Incorrect card details entered</li>
                    <li>Technical issue with the payment processor</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Actions */}
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900">
              What can you do?
            </h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FiCreditCard className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">
                      Try a different payment method
                    </h3>
                    <p className="mt-1 text-sm text-blue-700">
                      Use another card or try Cash on Delivery if available.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FiShoppingBag className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-800">
                      Check your order
                    </h3>
                    <p className="mt-1 text-sm text-gray-700">
                      Review your cart items before trying again.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
            <button
              onClick={() => navigate("/cart")}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition flex items-center justify-center"
            >
              <FiShoppingBag className="mr-2" /> Back to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailurePage;
