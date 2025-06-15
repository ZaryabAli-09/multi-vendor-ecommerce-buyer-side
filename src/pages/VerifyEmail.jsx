import { useRef, useState } from "react";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const inputsRef = useRef([]);

  function isOtpValid() {
    for (let i = 0; i < otp.length; i++) {
      if (otp[i] === "") {
        toast.error(`Please enter the full 6 digit otp`);
        return false;
      }
    }

    return true;
  }

  function handleOtpInputChange(e, i) {
    e.preventDefault();

    let inputValue = e.target.value;

    // This code is to prevent from pasting less than 6 digits

    if (
      inputValue.length !== 0 &&
      inputValue.length !== 1 &&
      inputValue.length !== 2 &&
      inputValue.length !== 6
    ) {
      return;
    }

    // replacing existing digit with the new inputed one in an input
    if (inputValue.length === 2) {
      inputValue = inputValue[1];
    }

    // if someone pastes the otp,
    // the regex makes sure each character in the pasted otp is a number
    if (inputValue.length === 6 && /^\d+$/.test(inputValue)) {
      setOtp(["", "", "", "", "", ""]);

      const otp = [...inputValue.split("")];
      setOtp(otp);
      inputsRef.current[5].focus();
      return;
    }

    // To prevent user from entering non-numeric characters
    if (!"0123456789".includes(inputValue)) return;

    // This code is causing the next input to focus
    if (inputValue !== "" && i !== 5) {
      for (let j = i + 1; j <= 5; j++) {
        if (inputsRef.current[j].value === "" || j === 5) {
          inputsRef.current[j].focus();
          break;
        }
      }
    }

    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[i] = inputValue;
      return newOtp;
    });
  }

  function handleKeyDown(e, i) {
    if (e.keyCode === 8 && otp[i] === "") {
      inputsRef.current[i - 1].focus();
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isOtpValid()) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/buyer/auth/verify-email`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            verificationOtp: otp.join(""),
          }),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        alert(result.message);

        return;
      }

      const result = await response.json();
      toast.success(result.message, {
        duration: 7000,
      });
      sessionStorage.removeItem("email");
      navigate("/auth/login");
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  }

  return (
    <main className="bg-[#F6F6F4] min-h-[83vh]">
      <div className="w-[60%] py-12 px-12 border-[1px] border-gray-300 mx-auto bg-white rounded-xl">
        <h1 className="text-4xl text-center font-semibold mb-8">
          Email Verification
        </h1>

        <p className="text-center text-lg mb-12 w-[85%] mx-auto">
          An OTP has been sent to your email. Please enter the code below to
          verify your email.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-x-4 mb-12">
            {otp.map((_, i) => {
              return (
                <input
                  type="text"
                  key={i}
                  value={otp[i]}
                  autoFocus={i === 0}
                  ref={(ele) => (inputsRef.current[i] = ele)}
                  onChange={(e) => handleOtpInputChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="border-[1.5px] border-gray-600 w-[75px] h-[65px] text-center focus:outline-none text-3xl"
                />
              );
            })}
          </div>

          <button
            type="submit"
            className="bg-black text-white px-16 py-3 text-2xl rounded-md block mx-auto"
          >
            Verify
          </button>
        </form>
      </div>
    </main>
  );
}

export default VerifyEmail;
