import { useNavigate } from "react-router-dom";
import { words } from "../textConfig";
import { Ellipsis, LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu,DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem } from "@/components/ui/dropdown-menu";

const ProfileModal = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="relative">
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <Button variant="outline" > <User /> </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="bottom" align="end"
          className={`w-48 shadow-lg rounded-lg p-2 z-50`} >

          <DropdownMenuItem onClick={() => navigate("/settings")}
          > <Settings className="mr-2" /> {words.settings}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/options')}
          > <Ellipsis className="mr-2" /> {words.options}
          </DropdownMenuItem>
          <hr className="my-2" />
          <DropdownMenuItem variant="destructive" onClick={handleLogout}
          > <LogOut className="mr-2" /> {words.signout}
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileModal;