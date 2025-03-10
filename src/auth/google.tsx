import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export function GoogleSignUpButton() {
  const navigate = useNavigate();

  const handleSuccess = async (response: any) => {
    console.log("Google Sign-Up Success:", response);

    const res = await fetch("https://was.glasscube.io/auth/google/signup", {
      method: "POST", // ✅ POST for signing up
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: response.credential }),
      credentials: "include", // Ensures cookies are sent
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("web", JSON.stringify(data.web));
      navigate("/dashboard"); // Redirect after sign-up
    } else {
      console.error("Sign-Up failed:", data);
    }
  };

  return <GoogleLogin useOneTap={true} onSuccess={handleSuccess} onError={() => console.error("Google Sign-Up Failed")} text="signup_with" locale="en_EN" />;
}
