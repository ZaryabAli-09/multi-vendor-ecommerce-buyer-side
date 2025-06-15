import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~\\]).{8,}$/,
      "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character"
    ),

  confirmPassword: Yup.string()
    .required("Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

function ResetPassword() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const [searchParams] = useSearchParams();
  const resetPasswordToken = searchParams.get("resetPasswordToken");
  const navigate = useNavigate();

  function changePasswordVisibility() {
    setIsPasswordVisible((prevIsPasswordVisible) => !prevIsPasswordVisible);
  }

  function changeConfirmPasswordVisibility() {
    setIsConfirmPasswordVisible(
      (prevIsConfirmPasswordVisible) => !prevIsConfirmPasswordVisible
    );
  }

  async function onSubmit(data) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/buyer/auth/reset-password`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newPassword: data.password,
            resetPasswordToken,
          }),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        toast.error(result.message);
      }

      const result = await response.json();
      toast.success(result.message);
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-[#F6F6F4] pb-7">
      <div className="w-[60%] py-12 px-12 border-[1px] border-gray-300 mx-auto bg-white rounded-xl">
        <h1 className="text-4xl font-semibold">Reset your password</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
          <div className="mb-7">
            <label
              className="mb-2 block text-xl font-semibold"
              htmlFor="password"
            >
              New Password
            </label>

            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter new password"
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

          <div className="mb-7">
            <label
              className="mb-2 block text-xl font-semibold"
              htmlFor="confirm-password"
            >
              Confirm New Password
            </label>

            <div className="relative">
              <input
                type={isConfirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm new password"
                id="confirm-password"
                {...register("confirmPassword")}
                className={`${
                  errors.confirmPassword
                    ? "border-red-600 border-[2px]"
                    : "border-black border-[1px]"
                } focus:outline-none w-[100%] px-2 py-3 rounded-[3px]`}
              />

              <button
                type="button"
                className="text-2xl absolute right-3 top-[50%] translate-y-[-48%]"
                onClick={changeConfirmPasswordVisibility}
              >
                {isConfirmPasswordVisible ? <IoMdEyeOff /> : <IoMdEye />}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="mt-2 text-red-600 font-medium">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-black text-white px-16 py-3 text-2xl rounded-md block mx-auto"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
