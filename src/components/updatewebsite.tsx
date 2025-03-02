import { useState } from "react";
import { SquarePen } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { toast } from "sonner";
import { siteConfig } from "@/siteConfig";
import { Website } from "./types";

interface UpdateProps {
  website: Website;
}

const Update: React.FC<UpdateProps> = ({ website }) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(website.url);
  const [desc, setDesc] = useState(website.desc || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      toast.error("Website URL is required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(siteConfig.links.website, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ unique_key: website.unique_key, url, desc }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Something went wrong");

      // Update localStorage: Remove old entry and insert updated one
      const storedWebsites = JSON.parse(localStorage.getItem("web") || "[]");
      const updatedWebsites = storedWebsites.filter((w: Website) => w.unique_key !== website.unique_key);
      updatedWebsites.push(result.website); // Add updated website
      localStorage.setItem("web", JSON.stringify(updatedWebsites));

      toast.success("Website updated successfully!");
      setOpen(false);
      window.location.reload(); // Reload the page to reflect changes
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger >
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <SquarePen />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Website</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="url">Website URL</Label>
                  <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" />
                </div>
                <div>
                  <Label htmlFor="desc">Description (optional)</Label>
                  <Input id="desc" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Describe your website" />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? <div className="w-8 h-8 border-4 border-t-transparent border-gray-500 rounded-full animate-spin"></div> : "Update"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </TooltipTrigger>
        <TooltipContent>Update Website</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Update;
