import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useState } from "react";

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required("Email is required")
    .email("Email must be a valid email")
    .matches(/\./, "Email must be a valid email"),
});

function ForgotPassword() {
  const [apiResponse, setApiResponse] = useState("");
  const [isResponseSuccess, setIsResponseSuccess] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  async function onSubmit(data) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/buyer/auth/forgot-password`,
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
        setApiResponse(result.message);
        setIsResponseSuccess(false);
        return;
      }

      const result = await response.json();
      setApiResponse(result.message);
      setIsResponseSuccess(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-[#F6F6F4] h-[82.2vh]">
      <div className="mx-auto w-[40vw]">
        {apiResponse && (
          <p
            className={` px-3 rounded-sm py-4 ${
              isResponseSuccess ? "bg-green-300" : "bg-red-300"
            }`}
          >
            {apiResponse}
          </p>
        )}

        <h1 className="text-4xl font-semibold pt-10">Forgot password</h1>
        <p className="mt-4">
          No worries. We'll email you a link to reset your password.{" "}
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <label htmlFor="email" className="block text-xl font-medium mb-2">
            Email
          </label>

          <input
            type="text"
            id="email"
            {...register("email")}
            placeholder="Enter your email"
            className={`block w-full px-2 py-3 focus:outline-none rounded-[3px] ${
              errors.email
                ? "border-[2px] border-red-500"
                : "border-[1px] border-black"
            }`}
          />

          {errors.email && (
            <p className="mt-2 text-red-600 font-medium">
              {errors.email.message}
            </p>
          )}

          <button
            type="submit"
            className="bg-black text-white px-10 py-3 text-xl rounded-md mt-10"
          >
            Submit
          </button>

          <Link to="/auth/login" className="ml-10 text-blue-500 underline">
            Retrun to Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
