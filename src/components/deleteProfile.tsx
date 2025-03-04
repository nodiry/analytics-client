import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { siteConfig } from "@/siteConfig";
import { words } from "@/textConfig";
interface Props {
    username:string
}
const DeleteProfile: React.FC<Props> = ({username}) => {
  const [confirmation, setConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (confirmation !== "DELETE") return;
    setLoading(true);

    try {
      const response = await fetch(siteConfig.links.profile, {
        method: "DELETE",
        credentials: "include",
        body:username
      });

      if (!response.ok) {
        toast.error("Failed to delete account!");
        return;
      }

      toast.success("Account deleted successfully!");
      localStorage.clear();
      
      window.location.href = "/";
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">{words.deleteprofile}</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{words.areusure}</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-500">
          {words.deletemes1} <strong className="text-red-600">DELETE</strong> {words.deletemes2}
        </p>

        <Input
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
          placeholder="Type DELETE"
          className="mt-2"
        />

        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={confirmation !== "DELETE" || loading}
          className="w-full mt-2"
        >
          {loading ? "Deleting..." : words.delconfirm}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProfile;
