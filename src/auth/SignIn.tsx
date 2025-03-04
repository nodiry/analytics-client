import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { siteConfig } from "../siteConfig";
import { words } from "../textConfig";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";

interface FormData {
  password: string;
  email: string;
}

const SignIn = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({ password: "", email: "" });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const toggleVisibility = () => setIsVisible((prev) => !prev);

  // 🚀 Send Forgot Password Request
  const submitForget = async () => {
    try {
      const response = await fetch(siteConfig.links.twoauth, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include", // ✅ Send cookies with request
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      localStorage.setItem("email", formData.email); // Save email for 2FA
      navigate("/auth/twoauth");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    }
  };

  // ✅ Handle Input Change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // 🚀 Handle Sign-In Submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(siteConfig.links.signin, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ Include cookies
        body: JSON.stringify(formData),
      });      

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      if (data.user === "twoauth") {
        localStorage.setItem("email", formData.email);
        navigate("/auth/twoauth");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user)); // Save user info
      localStorage.setItem("web", JSON.stringify(data.web)); // Save user info
      navigate("/dashboard");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen p-4">
      <div className="flex flex-col w-screen max-w-sm p-6 bg-card rounded-lg shadow-md border">
        <img src="/favicon.png" className="mx-auto" alt="Logo" width={90} height={90} />
        <h1 className="mx-auto mb-4 text-2xl font-bold">📊 Web Analytics</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-500 text-center">{error}</div>}

          <Input
            type="email"
            placeholder={words.email}
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <div className="relative">
            <Input
              type={isVisible ? "text" : "password"}
              placeholder={words.password}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <Button
              type="button"
              variant="ghost"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={toggleVisibility}
            >
              {isVisible ? <EyeClosed /> : <Eye />}
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-2 text-sm">
            <Button variant="link" className="text-blue-500" onClick={submitForget}>
              {words.forgot}
            </Button>
            <Button variant="link" className="text-blue-500" onClick={() => navigate("/auth/signup")}>
              Go back & sign up
            </Button>
          </div>

          <Button type="submit" className="w-full">
            {words.signin}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;