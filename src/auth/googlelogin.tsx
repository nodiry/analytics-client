import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export function GoogleSignInButton() {
  const navigate = useNavigate();

  const handleSuccess = async (response: any) => {
    console.log("Google Sign-In Success:", response);

    const res = await fetch("https://was.glasscube.io/auth/google/signin", {
      method: "POST", // ✅ Use POST if passing a token
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: response.credential }),
      credentials: "include",
    });

    const data = await res.json();
    if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('web', JSON.stringify(data.web));
      navigate("/dashboard"); // Redirect after sign-in
    } else {
      console.error("Sign-In failed:", data);
    }
  };

  return <GoogleLogin onSuccess={handleSuccess} onError={() => console.error("Google Sign-In Failed")} text="signin_with" locale="en_EN" />;
}
