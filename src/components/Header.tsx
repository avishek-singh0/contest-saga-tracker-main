
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Menu, X, Calendar, Bookmark, Settings } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
            <Calendar className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">Contest Tracker</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Link 
            to="/" 
            className={`nav-item ${isActive('/') ? 'nav-item-active' : ''}`}
          >
            Contests
          </Link>
          <Link 
            to="/bookmarks" 
            className={`nav-item ${isActive('/bookmarks') ? 'nav-item-active' : ''}`}
          >
            Bookmarks
          </Link>
          <Link 
            to="/admin" 
            className={`nav-item ${isActive('/admin') ? 'nav-item-active' : ''}`}
          >
            Admin
          </Link>
          <div className="pl-2 ml-2 border-l border-border">
            <ThemeToggle />
          </div>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu}
            className="w-10 h-10 rounded-full"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border animate-slide-down">
          <nav className="container flex flex-col px-4 py-3 gap-1">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                isActive('/') ? 'bg-primary/10 text-primary' : 'text-foreground'
              }`}
              onClick={closeMenu}
            >
              <Calendar className="h-5 w-5" />
              Contests
            </Link>
            <Link
              to="/bookmarks"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                isActive('/bookmarks') ? 'bg-primary/10 text-primary' : 'text-foreground'
              }`}
              onClick={closeMenu}
            >
              <Bookmark className="h-5 w-5" />
              Bookmarks
            </Link>
            <Link
              to="/admin"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                isActive('/admin') ? 'bg-primary/10 text-primary' : 'text-foreground'
              }`}
              onClick={closeMenu}
            >
              <Settings className="h-5 w-5" />
              Admin
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
