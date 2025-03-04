import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Eye, EyeOff, Edit } from "lucide-react";
import { siteConfig } from "@/siteConfig";
import { toast } from "sonner";
import { words } from "@/textConfig";

interface User {
    username:string,
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

interface EditProfileProps {
    user: User;
}

const EditProfile: React.FC<EditProfileProps> = ({ user }) => {
  const [formData, setFormData] = useState({
    username:user.username || "",
    firstname: user.firstname || "",
    lastname: user.lastname || "",
    email: user.email || "",
    password: "", // Server sends an empty string for safety
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
        const response = await fetch(siteConfig.links.profile, {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (!response.ok) {
            return toast.error("Profile update failed!");
        }
        toast.success("Profile updated successfully");

        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.reload();
    } catch (error) {
        console.error(error);
        toast.error("Something went wrong!");
    }
  }

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger>
            <Button variant="outline">
              <Edit className="w-5 h-5 mr-2" /> {words.editprofile}
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>{words.editprofilemes}</TooltipContent>
      </Tooltip>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{words.editprofile}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="firstname" value={formData.firstname} onChange={handleChange} placeholder={words.firstname} required />
          <Input name="lastname" value={formData.lastname} onChange={handleChange} placeholder={words.lastname} required />
          <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder={words.email} required />

          <div className="relative">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder={words.password}
            />
            <Button
              type="button"
              variant="ghost"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </Button>
          </div>

          <Button type="submit" className="w-full">{words.delconfirm}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
