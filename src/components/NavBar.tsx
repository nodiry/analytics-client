import { Link, useNavigate } from 'react-router-dom';
import ProfileModal from './ProfileModal';
import LangOption from './LangOption';
import { words } from '../textConfig';
import { useState } from 'react';
import { ModeToggle } from './mode-toggle';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import {LayoutDashboard, LogOutIcon, Menu } from 'lucide-react';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { path: '/dashboard', label: words.dashboard },
    { path: '/profile', label: words.profile },
  ];

  const clearCookies = () => {
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.split("=");
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  };
  const handleLogout = () => {
    localStorage.clear();
    clearCookies();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-14 px-12 flex items-center justify-between backdrop-blur-md z-50 border-b-1">
      <div className="flex items-center space-x-4">
      <Button variant="outline" onClick={()=>{navigate('/dashboard')}}>
      <LayoutDashboard />
      </Button>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        <ProfileModal />
      </div>

      {/* Mobile Menu */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetTrigger asChild>
          <Button variant='ghost' className='md:hidden'>
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" >
  <SheetHeader>
    <SheetTitle>{words.menu}</SheetTitle>
  </SheetHeader>
  <SheetDescription className='mx-2'>The main menu for phone navigation.</SheetDescription>
  <div className="flex flex-col space-y-4 p-4">
    {navLinks.map(({ path, label }) => (
      <Link className={`text-lg px-3 py-2 rounded-md transition hover:bg-gray-600`}
      key={path} to={path} onClick={() => setMenuOpen(false)} >{label}
      </Link>
    ))}
  </div>
  <div className='mx-8 space-x-8 flex-row'>
  <LangOption />
  <ModeToggle />
  <Button variant='destructive' onClick={handleLogout}><LogOutIcon/></Button>
  </div>
      </SheetContent>
    </Sheet>
    </nav>
  );
};

export default NavBar;