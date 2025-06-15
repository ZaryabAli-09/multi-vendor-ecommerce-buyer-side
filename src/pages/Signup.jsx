// Design inspiration from https://login.mailchimp.com/signup/?locale=en

import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import GoogleLogin from "../components/GoogleLogin";

const signupSchema = Yup.object().shape({
  fullName: Yup.string()
    .trim()
    .required("Full Name is required")
    .min(3, "Full Name should be minimum 3 characters")
    .matches(
      /^[a-zA-Z ]+$/,
      "Full Name cannot contain numbers or special characters"
    ),
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

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function changePasswordVisibility() {
    setIsPasswordVisible((prevIsPasswordVisible) => !prevIsPasswordVisible);
  }

  async function onSubmit(data) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/buyer/auth/register`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.fullName,
            email: data.email,
            password: data.password,
          }),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        toast.error(result.message, {
          duration: 7000,
        });
        return;
      }

      const result = await response.json();
      toast.success(result.message, {
        duration: 7000,
      });
      // sessionStorage.setItem("email", result.data.email);
      navigate("/auth/verify-email");
    } catch (error) {
      console.log(error);
      alert(error.message);
      console.log(error);
    }
  }

  return (
    <main className="bg-[#F6F6F4] pb-7">
      <div className="bg-white w-[60%] py-12 px-12 border-[1px] border-gray-300 mx-auto rounded-xl">
        <h1 className="text-4xl font-semibold mb-2">Create a new account</h1>

        <p className="mb-7 ml-1">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-7">
            <label className="mb-2 block text-xl font-semibold" htmlFor="name">
              Full Name
            </label>

            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              {...register("fullName")}
              className={`${
                errors.fullName
                  ? "border-red-600 border-[2px]"
                  : "border-black border-[1px]"
              } focus:outline-none w-[100%] px-2 py-3 rounded-[3px]`}
            />

            {errors.fullName && (
              <p className="mt-2 text-red-600 font-medium">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className="mb-7">
            <label className="mb-2 block text-xl font-semibold" htmlFor="email">
              Email
            </label>

            <input
              type="text"
              placeholder="Enter your email"
              id="email"
              {...register("email")}
              className={`${
                errors.email
                  ? "border-red-600 border-[2px]"
                  : "border-black border-[1px]"
              } focus:outline-none w-[100%] px-2 py-3 rounded-[3px]`}
            />

            {errors.email && (
              <p className="mt-2 text-red-600 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-7">
            <label
              className="mb-2 block text-xl font-semibold"
              htmlFor="password"
            >
              Password
            </label>

            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Create a new password"
                id="password"
                {...register("password")}
                className={`${
                  errors.password
                    ? "border-red-600 border-[2px]"
                    : "border-black border-[1px]"
                } focus:outline-none w-[100%] px-2 py-3 rounded-[3px]`}
              />

              <button
                type="button"
                className="text-2xl absolute right-3 top-[50%] translate-y-[-48%]"
                onClick={changePasswordVisibility}
              >
                {isPasswordVisible ? <IoMdEyeOff /> : <IoMdEye />}
              </button>
            </div>

            {errors.password && (
              <p className="mt-2 text-red-600 font-medium">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-black text-white px-16 py-3  text-2xl rounded-md block mx-auto"
          >
            Create Account
          </button>
          <div className="text-center  text-gray-500 my-4">or</div>
          <div className="flex items-center justify-center ">
            <GoogleLogin />
          </div>
        </form>
      </div>
    </main>
  );
}

export default Signup;
