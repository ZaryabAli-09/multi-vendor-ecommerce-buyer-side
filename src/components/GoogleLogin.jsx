import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/userSlice";

const GoogleLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const loadGoogleScript = () => {
      try {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = initializeGoogleSignIn;
        script.onerror = () => {
          toast.error("Failed to load Google authentication service");
        };
        document.body.appendChild(script);
      } catch (error) {
        toast.error("Error initializing Google login");
        console.error("Script loading error:", error);
      }
    };

    const initializeGoogleSignIn = () => {
      try {
        /* global google */
        if (window.google) {
          google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_LOGIN_CLIENT_ID,
            callback: handleGoogleResponse,
          });

          google.accounts.id.renderButton(
            document.getElementById("googleSignInDiv"),
            {
              theme: "outline",
              size: "large",
              width: "300",
              text: "continue_with",
              shape: "rectangular",
              logo_alignment: "left",
            }
          );

          // Optional: Show One Tap UI
          google.accounts.id.prompt();
        }
      } catch (error) {
        toast.error("Failed to initialize Google button");
        console.error("Google initialization error:", error);
      }
    };

    if (!window.google) {
      loadGoogleScript();
    } else {
      initializeGoogleSignIn();
    }

    return () => {
      const script = document.querySelector(
        'script[src="https://accounts.google.com/gsi/client"]'
      );
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleGoogleResponse = async (response) => {
    const loadingToast = toast.loading("Signing in with Google...");

    try {
      const googleIdToken = response.credential;

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/buyer/auth/google`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ googleIdToken }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      toast.success("login successful", { id: loadingToast });
      console.log("success dtaa", data);

      dispatch(
        login({
          name: data.data.name,
          id: data.data.id,
          cartItemsCount: data.data.cartItemsCount,
          wishlistItemsCount: data.data.wishlistItemsCount,
        })
      );

      navigate("/");
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <div
      id="googleSignInDiv"
      style={{
        marginTop: "20px",
        minWidth: "300px",
        minHeight: "44px",
      }}
    />
  );
};

export default GoogleLogin;
