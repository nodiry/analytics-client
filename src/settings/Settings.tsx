import { Toaster } from "@/components/ui/sonner";
import NavBar from "../components/NavBar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Settings = () => {
    const token = localStorage.getItem("token");
    return (
      <div className="flex flex-col space-y-10 items-center">
        {!token ? <></>:<NavBar/>}
        <p className="text-3xl text-gray-200 mt-12">Settings</p>
        <p className="m-4 text-2xl text-white">Hey, you are not authorized to be here.</p>
        <Button variant="outline" onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: { label: "Undo", onClick: () => console.log("Undo")},
        })} > Show Toast
        </Button>
        <Toaster />
      </div>
    )
  }

export default Settings
