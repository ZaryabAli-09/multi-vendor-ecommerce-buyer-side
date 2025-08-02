import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { login } from "../features/userSlice.js";
import toast from "react-hot-toast";
import GoogleLogin from "../components/GoogleLogin.jsx";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required("Email is required")
    .email("Email must be a valid email")
    .matches(/\./, "Email must be a valid email"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~\\]).{8,}$/,
      "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character"
    ),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function changePasswordVisibility() {
    setIsPasswordVisible((prevIsPasswordVisible) => !prevIsPasswordVisible);
  }

  async function onSubmit(data) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/buyer/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
          }),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        toast.error(result.message);
        return;
      }

      const result = await response.json();

      dispatch(
        login({
          name: result.data.name,
          id: result.data.id,
          cartItemsCount: result.data.cartItemsCount,
          wishlistItemsCount: result.data.wishlistItemsCount,
        })
      );

      toast.success(result.message);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <main className="bg-[#F6F6F4] min-h-screen flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl py-8 px-6 md:py-12 md:px-12 border border-gray-300 rounded-xl">
        <h1 className="text-3xl md:text-4xl font-semibold mb-2">
          Login to your account
        </h1>

        <p className="mb-6 md:mb-7 ml-1">
          Don't have an account yet?{" "}
          <Link to="/auth/signup" className="text-blue-500 underline">
            Signup
          </Link>
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5 md:mb-7">
            <label
              className="mb-2 block text-lg md:text-xl font-semibold"
              htmlFor="email"
            >
              Email
            </label>

            <input
              type="text"
              placeholder="Enter your email"
              id="email"
              {...register("email")}
              className={`${
                errors.email ? "border-2 border-red-500" : "border border-black"
              } focus:outline-none w-full px-3 py-2 md:px-4 md:py-3 rounded`}
            />

            {errors.email && (
              <p className="mt-1 md:mt-2 text-red-600 font-medium text-sm md:text-base">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-5 md:mb-7">
            <label
              className="mb-2 block text-lg md:text-xl font-semibold"
              htmlFor="password"
            >
              Password
            </label>

            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter your password"
                id="password"
                {...register("password")}
                className={`${
                  errors.password
                    ? "border-red-600 border-2"
                    : "border-black border"
                } focus:outline-none w-full px-3 py-2 md:px-4 md:py-3 rounded`}
              />

              <button
                type="button"
                className="text-xl md:text-2xl absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={changePasswordVisibility}
              >
                {isPasswordVisible ? <IoMdEyeOff /> : <IoMdEye />}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 md:mt-2 text-red-600 font-medium text-sm md:text-base">
                {errors.password.message}
              </p>
            )}

            <Link
              to="/auth/forgot-password"
              className="text-blue-500 block my-3 md:my-4 ml-1 underline text-sm md:text-base"
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="bg-black text-white w-full md:w-auto px-6 py-2 md:px-16 md:py-3 text-lg md:text-2xl rounded-md block mx-auto"
          >
            Login
          </button>
          <div className="text-center text-gray-500 my-3 md:my-4">or</div>
          <div className="flex items-center justify-center">
            <GoogleLogin />
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;
