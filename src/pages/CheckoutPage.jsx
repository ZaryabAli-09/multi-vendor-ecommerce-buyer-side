import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdOutlineStorefront } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [codLoading, setCodLoading] = useState(false);
  const [orderData, setOrderData] = useState({
    orderItems: [],
    paymentMethod: "cash on delivery",
    shippingAddress: {
      street: "",
      city: "",
      state: "",
      country: "Pakistan",
    },
  });
  const [productDetails, setProductDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Calculate order totals
  const orderTotals = productDetails.reduce(
    (totals, item) => {
      if (item.error) return totals;

      const price =
        item.variantDetails.discountedPrice || item.variantDetails.price;
      const originalPrice = item.variantDetails.price;
      const quantity = item.quantity;

      return {
        totalQuantity: totals.totalQuantity + quantity,
        subtotal: totals.subtotal + originalPrice * quantity,
        total: totals.total + price * quantity,
        discount: totals.discount + (originalPrice - price) * quantity,
      };
    },
    { totalQuantity: 0, subtotal: 0, total: 0, discount: 0 }
  );

  // Pakistan provinces
  const pakistanProvinces = [
    "Punjab",
    "Sindh",
    "Khyber Pakhtunkhwa",
    "Balochistan",
    "Gilgit-Baltistan",
    "Azad Jammu and Kashmir",
    "Islamabad Capital Territory",
  ];

  // Parse order items from URL params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const orderItemsParam = searchParams.get("orderItems");

    if (orderItemsParam) {
      try {
        const parsedItems = JSON.parse(decodeURIComponent(orderItemsParam));
        setOrderData((prev) => ({
          ...prev,
          orderItems: parsedItems.orderItems,
        }));
        fetchProductDetails(parsedItems.orderItems);
      } catch (error) {
        console.error("Error parsing order items:", error);
        toast.error("Failed to load order items");
        setIsLoading(false);
      }
    }
  }, [location.search]);

  // Fetch product details for each item
  const fetchProductDetails = async (orderItems) => {
    try {
      setIsLoading(true);
      const details = await Promise.all(
        orderItems.map(async (item) => {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/product/single/seller/${
                item.product
              }`
            );
            if (!response.ok) {
              throw new Error("Product not found");
            }
            const product = await response.json();

            // Find the specific variant
            const variant = product.data.variants.find(
              (v) => v._id === item.variantId
            );

            if (!variant) {
              throw new Error("Variant not found");
            }

            return {
              ...item,
              productName: product.data.name,
              variantDetails: variant,
              seller: product.data.seller,
            };
          } catch (error) {
            console.error(`Error fetching product ${item.product}:`, error);
            toast.error(`Failed to load product ${item.product}`);
            return {
              ...item,
              error: true,
            };
          }
        })
      );

      setProductDetails(details);
    } catch (error) {
      console.error("Error fetching product details:", error);
      toast.error("Failed to load product details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        [name]: value,
      },
    }));
  };

  const handlePaymentChange = (e) => {
    setOrderData((prev) => ({
      ...prev,
      paymentMethod: e.target.value,
    }));
  };
  // Handle order creation
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { orderItems, paymentMethod, shippingAddress } = orderData;
    if (
      !shippingAddress ||
      !shippingAddress.street ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.country
    ) {
      return toast.error(
        "Please provide a complete shipping address to proceed."
      );
    }
    if (!orderItems || orderItems.length === 0) {
      toast.error("No items in your order. Please add items to proceed.");
      return;
    }
    if (!paymentMethod || paymentMethod === "") {
      toast.error("Please select a payment method to proceed with the order.");
      return;
    }

    if (paymentMethod === "cash on delivery") {
      try {
        setCodLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/order/new`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            // Include credentials for cookie-based authentication

            body: JSON.stringify({
              orderItems,
              paymentMethod,
              shippingAddress,
            }),
          }
        );
        const data = await response.json();
        if (!response.ok) {
          setCodLoading(false);
          throw new Error(data.message || "Failed to create order");
        }

        setTimeout(() => {
          setCodLoading(false);
          toast.success("Order created successfully!");

          navigate(`/my-orders`);
        }, 2000); // Simulate a delay for the success message
      } catch (error) {
        toast.error(
          error.message || "Failed to create order. Please try again later."
        );
      }
    }

    // stripe checkout
    else if (paymentMethod === "card") {
      try {
        const stripe = await loadStripe(
          "pk_test_51RPVnSGaJuPBuYoQVO2jcPE9pxicogaLCOJ6K9VEQD8Txbi089t0YVAhxPd8NlVmRf7DKlK8NJAUeKOEpG9fgjhq001mZN1Omz"
        );

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/order/checkout-session`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            credentials: "include",
            // Include credentials for cookie-based authentication

            body: JSON.stringify({
              orderItems,
              paymentMethod,
              shippingAddress,
            }),
          }
        );

        const session = await response.json();

        if (!response.ok) {
          throw new Error(session.message);
        }

        const result = stripe.redirectToCheckout({
          sessionId: session.sessionId,
        });

        if (result.error) {
          toast.error(result.error.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  if (codLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-xl">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">
              Processing Your Order
            </h3>
            <p className="text-gray-600 text-center">
              Please wait while we process your Cash on Delivery Order Placed.
              This may take a few moments...
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-6">
              <div
                className="bg-black h-2 rounded-full animate-pulse"
                style={{ width: "70%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Order Items History</h2>
          <div className="flex items-center mb-4 bg-green-500 w-fit p-2 rounded-md text-white">
            <MdOutlineStorefront className="text-xl mr-2" />
            <span className="font-semibold">
              {productDetails[0]?.seller?.brandName || "Unknown Seller"}
            </span>
          </div>
          {productDetails.length === 0 ? (
            <p className="text-gray-500">No items in your order</p>
          ) : (
            <div className="space-y-3">
              {productDetails.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start border-b pb-3 last:border-0"
                >
                  {item.error ? (
                    <div className="text-red-500 text-sm">
                      Error loading product {item.product}
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden mr-3 flex-shrink-0">
                        {item.variantDetails.images?.[0]?.url ? (
                          <img
                            src={item.variantDetails.images[0].url}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                            No Image
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">
                          {item.productName}
                        </h3>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-xs text-gray-600">
                          <span>Qty: {item.quantity}</span>
                          {item.variantDetails.size && (
                            <span>Size: {item.variantDetails.size}</span>
                          )}
                          {item.variantDetails.color && (
                            <span className="flex items-center">
                              Color:{" "}
                              <span
                                className="w-3 h-3 rounded-full border border-gray-300 ml-1"
                                style={{
                                  backgroundColor: item.variantDetails.color,
                                }}
                              />
                            </span>
                          )}
                        </div>
                        <div className="mt-1">
                          <span className="font-medium text-sm">
                            Rs.{" "}
                            {(
                              (item.variantDetails.discountedPrice ||
                                item.variantDetails.price) * item.quantity
                            ).toLocaleString()}
                          </span>
                          {item.variantDetails.discountedPrice && (
                            <span className="text-xs text-gray-500 line-through ml-1">
                              Rs.{" "}
                              {(
                                item.variantDetails.price * item.quantity
                              ).toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Shipping Address Form */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <select
                  name="country"
                  value={orderData.shippingAddress.country}
                  onChange={handleAddressChange}
                  className="w-full p-2 border rounded-md text-sm"
                  disabled
                >
                  <option value="Pakistan">Pakistan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Province/State
                </label>
                <select
                  name="state"
                  value={orderData.shippingAddress.state}
                  onChange={handleAddressChange}
                  className="w-full p-2 border rounded-md text-sm"
                  required
                >
                  <option value="">Select Province</option>
                  {pakistanProvinces.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={orderData.shippingAddress.city}
                  onChange={handleAddressChange}
                  className="w-full p-2 border rounded-md text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  name="street"
                  value={orderData.shippingAddress.street}
                  onChange={handleAddressChange}
                  className="w-full p-2 border rounded-md text-sm"
                  required
                />
              </div>
            </form>
          </div>
        </div>

        {/* Payment and Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow h-fit sticky top-4">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-3 mb-4 text-sm">
            <div className="flex justify-between">
              <span>Items ({orderTotals.totalQuantity}):</span>
              <span>Rs. {orderTotals.subtotal.toLocaleString()}</span>
            </div>
            {orderTotals.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount:</span>
                <span>-Rs. {orderTotals.discount.toLocaleString()}</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between font-medium">
              <span>Total:</span>
              <span>Rs. {orderTotals.total.toLocaleString()}</span>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4 mt-6">Payment Method</h2>

          <div className="space-y-3 mb-6">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="payment"
                value="cash on delivery"
                checked={orderData.paymentMethod === "cash on delivery"}
                onChange={handlePaymentChange}
                className="h-4 w-4"
              />
              <span className="text-sm">Cash on Delivery</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={orderData.paymentMethod === "card"}
                onChange={handlePaymentChange}
                className="h-4 w-4"
              />
              <span className="text-sm">Credit/Debit Card</span>
            </label>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-black hover:bg-gray-800 text-white py-2 rounded-md text-base font-semibold transition-colors disabled:cursor-not-allowed disabled:bg-gray-300"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
