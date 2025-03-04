import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { toast } from "sonner";
import { siteConfig } from "@/siteConfig";
import { Website } from "./types";
import { useNavigate } from "react-router-dom";
import { words } from "@/textConfig";

interface UpdateProps {
  unique_key: string;
}

const DeleteWebsite: React.FC<UpdateProps> = ({ unique_key }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (confirm !== "DELETE") {
      toast.warning("Please enter confirmation word properly!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(siteConfig.links.website, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ unique_key }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Something went wrong");

      // Remove website data from localStorage
      ["day", "week", "month", "all"].forEach(period => 
        localStorage.removeItem(`metrics_${unique_key}_${period}`)
      );

      // Update localStorage websites list
      const storedWebsites = JSON.parse(localStorage.getItem("web") || "[]");
      const updatedWebsites = storedWebsites.filter((w: Website) => w.unique_key !== unique_key);
      localStorage.setItem("web", JSON.stringify(updatedWebsites));

      toast.success("Website deleted successfully!");
      setOpen(false);
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" size="icon">
                <Trash2 />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{words.deletewebsite}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label className="mb-2" htmlFor="confirm">
                    {words.pleaseinput} <span className="text-red-800">DELETE</span> {words.deleteconfirm}
                  </Label>
                  <Input id="confirm" value={confirm} onChange={(e) => setConfirm(e.target.value)} disabled={loading} />
                </div>
                <Button variant="destructive" disabled={loading}>
                  {loading ? <div className="w-5 h-5 border-4 border-t-transparent border-gray-500 rounded-full animate-spin"></div> : "DELETE"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </TooltipTrigger>
        <TooltipContent>{words.deletewebsitemes}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DeleteWebsite;
