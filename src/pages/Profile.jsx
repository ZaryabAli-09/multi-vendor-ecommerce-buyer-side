import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import toast from "react-hot-toast";

function Profile() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { email } = useSelector((state) => state.user); // Only using email from Redux

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    province: "",
    city: "",
    remainingAddress: "",
    notes: "",
  });

  // Fetch profile data when component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/buyer/profile`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const result = await response.json();
        console.log(result);
        // Update form data with API response
        setFormData({
          name: result.data.name || "",
          phoneNumber: result.data.phoneNumber || "",
          province: result.data?.province || "",
          city: result.data?.city || "",
          remainingAddress: result.data?.remainingAddress || "",
          notes: result.data?.notes || "",
        });

        // Update Redux store with complete data
        dispatch(
          login({
            ...result.data,
            province: result.data.address?.province,
            city: result.data.address?.city,
            remainingAddress: result.data.address?.remainingAddress,
            notes: result.data.address?.notes,
          })
        );
      } catch (error) {
        console.error("Profile fetch error:", error);
        toast.error("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleProfileUpdate(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/buyer/profile`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        toast.error(result.message);
        return;
      }

      const result = await response.json();
      toast.success(result.message);

      // Update Redux store with new data
      dispatch(
        login({
          ...result.data,
          province: result.data.address?.province,
          city: result.data.address?.city,
          remainingAddress: result.data.address?.remainingAddress,
          notes: result.data.address?.notes,
        })
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  }

  if (isLoading) {
    return (
      <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        <div className="text-center">
          <p>Loading profile data...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          My Profile
        </h1>
        <p className="text-gray-600 mt-2">Update your personal information</p>
      </div>

      <form
        onSubmit={handleProfileUpdate}
        className="bg-white rounded-lg shadow-md p-6 sm:p-8 md:p-10 max-w-4xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Email (readonly) */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Country (readonly) */}
          <div className="space-y-2">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              value="Pakistan"
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Province */}
          <div className="space-y-2">
            <label
              htmlFor="province"
              className="block text-sm font-medium text-gray-700"
            >
              Province
            </label>
            <input
              type="text"
              id="province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* City */}
          <div className="space-y-2">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Address */}
        <div className="mt-6 space-y-2">
          <label
            htmlFor="remainingAddress"
            className="block text-sm font-medium text-gray-700"
          >
            Full Address (mention street, house number, etc.)
          </label>
          <input
            type="text"
            id="remainingAddress"
            name="remainingAddress"
            value={formData.remainingAddress}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Notes */}
        <div className="mt-6 space-y-2">
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700"
          >
            Additional Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-8 text-right">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors w-full sm:w-auto"
          >
            Update Profile
          </button>
        </div>
      </form>
    </main>
  );
}

export default Profile;
