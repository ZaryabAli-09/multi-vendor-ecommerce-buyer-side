import { logout } from "../features/userSlice.js";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function logoutUser() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/buyer/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const result = await response.json();
        alert(result.message);
        return;
      }

      const result = await response.json();
      dispatch(logout());
      toast.success(result.message);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="flex flex-col justify-center items-center h-96 px-4">
      <h1 className=" text-center text-3xl font-medium">
        Are you sure you want to logout?
      </h1>
      <button
        className="text-2xl px-8 py-3 bg-black mb-5 text-white block mx-auto mt-8 rounded-md"
        onClick={logoutUser}
      >
        Yes, I'm sure
      </button>
    </main>
  );
}

export default Logout;
