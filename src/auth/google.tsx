import { GoogleLogin } from "@react-oauth/google";

export function GoogleLoginButton() {
  const handleSuccess = async (response: any) => {
    console.log("Google Login Success:", response);

    const res = await fetch("https://was.glasscube.io/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: response.credential }),
      credentials: "include", // ✅ Ensures cookies are sent
    });

    const data = await res.json();
    console.log("Server Response:", data);
  };

  const handleFailure = () => {
    console.error("Google Login Failed");
  };

  return <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} text='continue_with'locale="en_EN"/>;
}