import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { InfoIcon } from "lucide-react";

interface InfoProps {
  date: string;
  url: string;
  desc: string;
}

const Info: React.FC<InfoProps> = ({ date, url, desc }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <InfoIcon />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{url}</DialogTitle>
                <DialogDescription>{desc}</DialogDescription>
              </DialogHeader>
              <DialogFooter>{date}</DialogFooter>
            </DialogContent>
          </Dialog>
        </TooltipTrigger>
        <TooltipContent>
          <p>Info of this website.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Info;
