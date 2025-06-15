import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  FiMail,
  FiPhone,
  FiHome,
  FiDollarSign,
  FiUser,
  FiShoppingBag,
  FiCalendar,
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
} from "react-icons/fi";
import {
  BsBank2,
  BsCheckCircleFill,
  BsExclamationCircleFill,
  BsClockFill,
} from "react-icons/bs";

function StoreAbout({ storeId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [sellerDetails, setSellerDetails] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchSellerDetails = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/seller/details/${storeId}`,
        { credentials: "include" }
      );
      const data = await response.json();

      if (response.ok) {
        setSellerDetails(data.data.seller);
        setTopProducts(data.data.topProducts);
        setRecentProducts(data.data.recentProducts);
        setTotalProducts(data.data.totalProducts);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch seller details");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerDetails();
  }, [storeId]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <BsCheckCircleFill className="text-green-500 mr-1" />;
      case "pending":
        return <BsClockFill className="text-yellow-500 mr-1" />;
      default:
        return <BsExclamationCircleFill className="text-red-500 mr-1" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  if (isLoading) {
    return (
      <main className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </main>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {sellerDetails && (
        <>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800">
                {sellerDetails.brandName}
              </h1>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {totalProducts} Products
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Brand Info Column */}
            <div className="md:col-span-1 space-y-4">
              {/* Brand Card */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-40 bg-gray-200">
                  <img
                    src={
                      sellerDetails.coverImage?.url ||
                      "https://placehold.co/600x400?text=No+Cover+Image"
                    }
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 text-center relative">
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                    <img
                      src={sellerDetails.logo?.url || "/placeholder-logo.jpg"}
                      alt="Logo"
                      className="w-24 h-24 rounded-full border-4 border-white object-cover"
                    />
                  </div>
                  <h2 className="mt-12 text-xl font-semibold text-gray-800">
                    {sellerDetails.brandName}
                  </h2>
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(
                      sellerDetails.status
                    )}`}
                  >
                    {getStatusIcon(sellerDetails.status)}
                    {sellerDetails.status}
                  </div>
                  <p className="mt-3 text-gray-600">
                    {sellerDetails.brandDescription ||
                      "No description provided"}
                  </p>

                  <div className="border-t border-gray-200 mt-4 pt-4 space-y-2 text-left">
                    <div className="flex items-center text-gray-700">
                      <FiMail className="mr-2 text-gray-500" />
                      <span>{sellerDetails.email}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FiPhone className="mr-2 text-gray-500" />
                      <span>{sellerDetails.contactNumber || "N/A"}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FiHome className="mr-2 text-gray-500" />
                      <span>{sellerDetails.businessAddress || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bank Details */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                  <BsBank2 className="mr-2" />
                  Bank Details
                </h3>
                <div className="border-t border-gray-200 pt-3 space-y-2">
                  <p className="text-gray-700">
                    <strong>Bank:</strong>{" "}
                    {sellerDetails.bankDetails?.bankName || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Account #:</strong>{" "}
                    {sellerDetails.bankDetails?.accountNumber || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Holder:</strong>{" "}
                    {sellerDetails.bankDetails?.accountHolderName || "N/A"}
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Social Links
                </h3>
                <div className="border-t border-gray-200 pt-3">
                  {sellerDetails.socialLinks?.instagram ||
                  sellerDetails.socialLinks?.facebook ||
                  sellerDetails.socialLinks?.twitter ||
                  sellerDetails.socialLinks?.linkedin ? (
                    <div className="flex space-x-4">
                      {sellerDetails.socialLinks?.instagram && (
                        <a
                          href={sellerDetails.socialLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-pink-600"
                        >
                          <FiInstagram size={20} />
                        </a>
                      )}
                      {sellerDetails.socialLinks?.facebook && (
                        <a
                          href={sellerDetails.socialLinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-blue-600"
                        >
                          <FiFacebook size={20} />
                        </a>
                      )}
                      {sellerDetails.socialLinks?.twitter && (
                        <a
                          href={sellerDetails.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-blue-400"
                        >
                          <FiTwitter size={20} />
                        </a>
                      )}
                      {sellerDetails.socialLinks?.linkedin && (
                        <a
                          href={sellerDetails.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-blue-700"
                        >
                          <FiLinkedin size={20} />
                        </a>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500">No social links provided</p>
                  )}
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div className="md:col-span-3 space-y-6">
              {/* Top Selling Products */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FiShoppingBag className="mr-2" />
                  Top Selling Products
                </h3>
                <div className="border-t border-gray-200 pt-4">
                  {topProducts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {topProducts.map((product) => (
                        <div
                          key={product._id}
                          className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                        >
                          <div className="h-80 bg-gray-200">
                            <img
                              src={
                                product.images?.[0]?.url ||
                                product.variants?.[0]?.images?.[0]?.url ||
                                "/placeholder-product.jpg"
                              }
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-3">
                            <h4 className="font-medium text-gray-800 truncate">
                              {product.name}
                            </h4>
                            <div className="flex justify-between items-center mt-2">
                              <div className="flex items-center">
                                Rs.{" "}
                                <span className="text-gray-700">
                                  {product.variants?.[0]?.discountedPrice ||
                                    product.variants?.[0]?.price ||
                                    product.price}
                                </span>
                                {product.variants?.[0]?.discountedPrice && (
                                  <span className="ml-2 text-sm text-red-500 line-through">
                                    {product.variants?.[0]?.price}
                                  </span>
                                )}
                              </div>
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                {product.sold || 0} sold
                              </span>
                            </div>
                            <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                              <span>
                                {product.variants?.length || 0} variants
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-6">
                      No top selling products found
                    </p>
                  )}
                </div>
              </div>

              {/* Recent Products */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FiCalendar className="mr-2" />
                  Recently Added Products
                </h3>
                <div className="border-t border-gray-200 pt-4">
                  {recentProducts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {recentProducts.map((product) => (
                        <div
                          key={product._id}
                          className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                        >
                          <div className="h-80 bg-gray-200">
                            <img
                              src={
                                product.images?.[0]?.url ||
                                product.variants?.[0]?.images?.[0]?.url ||
                                "/placeholder-product.jpg"
                              }
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-3">
                            <h4 className="font-medium text-gray-800 truncate">
                              {product.name}
                            </h4>
                            <div className="flex justify-between items-center mt-2">
                              <div className="flex items-center">
                                Rs.{" "}
                                <span className="text-gray-700">
                                  {product.variants?.[0]?.price ||
                                    product.price}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500">
                                {new Date(
                                  product.createdAt
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-6">
                      No recent products found
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default StoreAbout;
