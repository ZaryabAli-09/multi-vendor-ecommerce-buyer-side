import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  FiEye,
  FiPackage,
  FiCalendar,
  FiDollarSign,
  FiTruck,
  FiCreditCard,
  FiMapPin,
  FiUser,
} from "react-icons/fi";
import { MdCancel, MdCheckCircle, MdPending } from "react-icons/md";

const MyOrders = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/order/my`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await res.json();
      if (res.ok) {
        setLoading(false);
        setOrders(result.data);
      } else {
        setLoading(false);
        throw new Error(result.message || "Failed to fetch orders");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "An error occurred while fetching orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const openOrderDetailModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <MdCheckCircle className="text-green-500" />;
      case "cancelled":
        return <MdCancel className="text-red-500" />;
      default:
        return <MdPending className="text-yellow-500" />;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <main className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </main>
    );
  }

  return (
    <main className="px-4 md:px-6 mb-10 max-w-7xl mx-auto">
      <h1 className="text-center py-7 text-2xl md:text-3xl font-bold flex items-center justify-center gap-2">
        <FiPackage className="text-primary" /> My Orders
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Order ID</th>
              <th className="py-3 px-4 text-left hidden md:table-cell">
                <div className="flex items-center gap-1">
                  <FiCalendar /> Date
                </div>
              </th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-right">
                <div className="flex items-center justify-end gap-1"></div>
              </th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={order._id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 font-medium text-sm truncate max-w-[120px]">
                    {order._id}
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right font-medium">
                    Rs. {order.totalAmount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => openOrderDetailModal(order)}
                      className="text-primary hover:text-primary-dark flex items-center justify-end gap-1 w-full"
                    >
                      <FiEye /> <span className="hidden sm:inline">View</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  No orders found. Start shopping to see your orders here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <FiPackage /> Order Details
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-700 flex items-center gap-2">
                      <FiUser /> Customer Information
                    </h3>
                    <p className="mt-1">
                      {selectedOrder.orderBy?.name || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedOrder.orderBy?.email || "N/A"}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700 flex items-center gap-2">
                      <FiMapPin /> Shipping Address
                    </h3>
                    <p className="mt-1">
                      {selectedOrder.shippingAddress?.street || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedOrder.shippingAddress?.city},{" "}
                      {selectedOrder.shippingAddress?.state},{" "}
                      {selectedOrder.shippingAddress?.country}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-700 flex items-center gap-2">
                      <FiCreditCard /> Payment Method
                    </h3>
                    <p className="mt-1 capitalize">
                      {selectedOrder.paymentMethod || "N/A"}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700 flex items-center gap-2">
                      <FiCalendar /> Order Date
                    </h3>
                    <p className="mt-1">
                      {formatDate(selectedOrder.createdAt)}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700 flex items-center gap-2">
                      <FiTruck /> Order Status
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusIcon(selectedOrder.status)}
                      <span className="capitalize">{selectedOrder.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-700 mb-3">Order Items</h3>
                <div className="space-y-4">
                  {selectedOrder.orderItems.map((item, index) => {
                    const productAvailable =
                      item.product && typeof item.product === "object";
                    const productName = productAvailable
                      ? item.product.name
                      : item.productName;
                    const productImage = productAvailable
                      ? item.product?.images?.[0] || item.productImage
                      : item.productImage;

                    return (
                      <div
                        key={index}
                        className="flex border-b pb-4 last:border-0"
                      >
                        <div className="flex-shrink-0 h-20 w-20 rounded-md overflow-hidden border border-gray-200">
                          <img
                            src={productImage}
                            alt={productName}
                            className="h-full w-full object-cover object-center"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/80";
                            }}
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between text-base">
                            <h4 className="font-medium">{productName}</h4>
                            <p className="ml-4">
                              Rs. {item.priceAtPurchase.toLocaleString()}
                            </p>
                          </div>
                          <div className="flex mt-1 text-sm text-gray-600">
                            <p>Qty: {item.quantity}</p>
                            {item.variantSize && (
                              <p className="ml-2">Size: {item.variantSize}</p>
                            )}
                            {item.variantColor && (
                              <div className="ml-2 flex items-center">
                                Color:
                                <span
                                  className="inline-block w-4 h-4 rounded-full ml-1 border border-gray-300"
                                  style={{ backgroundColor: item.variantColor }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-700">Total Amount</h3>
                  <p className="text-lg font-bold">
                    Rs. {selectedOrder.totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default MyOrders;
