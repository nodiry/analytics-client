import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { siteConfig } from "@/siteConfig";

export default function WebsiteCreator() {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      toast.error("Website URL is required.");
      return;
    }

    if (!user?.dev) {
      toast.error("User not found. Please sign in again.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(siteConfig.links.website, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify({ dev: user.dev, url, desc }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Something went wrong");

      toast.success("Website added successfully!");
      setUrl("");
      setDesc("");
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Add Website</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Website</DialogTitle>
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
              {loading ? "Adding..." : "Add Website"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
