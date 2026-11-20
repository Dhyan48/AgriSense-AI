import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Sprout, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '../ui/Button';

interface NavbarProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick, showMenuButton = false }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border-stone)] bg-[var(--bg-primary)]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {showMenuButton && (
            <button
              type="button"
              onClick={onMenuClick}
              aria-label="Open navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border-stone)] lg:hidden cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
          <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#142B25] text-[#D6F36A]">
              <Sprout className="h-5 w-5" />
            </span>
            <span className="font-heading text-lg font-extrabold tracking-tight text-[var(--text-primary)]">
              AgriSense <span className="text-[#285442] dark:text-[#D6F36A]">AI</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <>
              <span className="hidden sm:inline-block text-sm font-medium text-[var(--text-muted)]">
                {user.name}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};