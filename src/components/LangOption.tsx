import { Languages } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LangOption = () => {
  const { theme } = useTheme();
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const hoverColor = theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200";
  const changeLang = (lang: string) => {
    localStorage.setItem("lang", lang);
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" > <Languages /> </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={`w-48 p-2 shadow-lg rounded-lg `}>
        <DropdownMenuItem className={`cursor-pointer ${textColor} ${hoverColor}`} onClick={() => changeLang("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem className={`cursor-pointer ${textColor} ${hoverColor}`} onClick={() => changeLang("uz")}>
          Uzbek
        </DropdownMenuItem>
        <DropdownMenuItem className={`cursor-pointer ${textColor} ${hoverColor}`} onClick={() => changeLang("kr")}>
          Korean
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LangOption;