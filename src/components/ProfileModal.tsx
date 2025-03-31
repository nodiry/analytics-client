import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { words } from "../textConfig";
import { Ellipsis, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem } from "@/components/ui/dropdown-menu";
import LangOption from "./LangOption";
import { ModeToggle } from "./mode-toggle";
import { siteConfig } from "@/siteConfig";

const ProfileModal = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); 

  const logout = async () => {
    await fetch(siteConfig.links.logout, { method: "POST", credentials: "include" });
  };
  const handleLogout = () => {
    localStorage.clear();
    logout();
    navigate("/");
  };

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} 
      onMouseLeave={() => setOpen(false)} >
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline"> <User /> </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="bottom" align="end"
          className="w-48 shadow-lg rounded-lg p-2 z-50" >

          <DropdownMenuItem onClick={() => navigate("/profile")}>
            <Ellipsis className="mr-2" /> {words.profile}
          </DropdownMenuItem>
          <DropdownMenuItem >
          <LangOption/> {words.language}
          </DropdownMenuItem>
          <DropdownMenuItem >
          <ModeToggle/> {words.theme}
          </DropdownMenuItem>
          <hr className="my-2" />
          <DropdownMenuItem variant="destructive" onClick={handleLogout}>
          <LogOut className="mr-2" /> {words.signout}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileModal;