import { Link, useLocation } from 'react-router-dom';
import ProfileModal from './ProfileModal';
import LangOption from './LangOption';
import { words } from '../textConfig';
import { useState } from 'react';
import { ModeToggle } from './mode-toggle';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/dashboard', label: words.dashboard },
    { path: '/website', label: words.website },
    { path: '/settings', label: words.settings },
    { path: '/metrics', label: words.metrics },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full h-14 px-12 flex items-center justify-between backdrop-blur-md z-50 border-b-1">
      <div className="flex items-center space-x-4">
        <img src="/logo.png" alt="logo" height={40} width={60} />
        <div className="hidden md:flex space-x-4">
          {navLinks.map(({ path, label }) => (
            <Link className={cn( `text-lg p-2 rounded-lg transition `,
              location.pathname === path ? "border bg-accent" : "" )} 
              key={path} to={path}> {label}
            </Link>
          ))}
        </div>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        <LangOption />
        <ModeToggle />
        <ProfileModal />
      </div>

      {/* Mobile Menu */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="md:hidden">
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="flex justify-between items-center p-4">
            <SheetHeader>{words.menu}</SheetHeader>
            <Button variant="ghost" onClick={() => setMenuOpen(false)} />
          </div>
          <div className="flex flex-col space-y-4 p-4">
            {navLinks.map(({ path, label }) => (
              <Link className={`text-lg px-3 py-2 rounded-md transition hover:bg-gray-600`}
              key={path} to={path} onClick={() => setMenuOpen(false)} >{label}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default NavBar;
