import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Sprout, TrendingUp, FlaskConical, History, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/predict/crop', label: 'Crop Recommendation', icon: Sprout },
  { to: '/predict/yield', label: 'Yield Prediction', icon: TrendingUp },
  { to: '/predict/fertilizer', label: 'Fertilizer Advisory', icon: FlaskConical },
  { to: '/history', label: 'Prediction History', icon: History },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-md px-3.5 py-2.5 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-[#142B25] text-[#D6F36A] dark:bg-[#D6F36A] dark:text-[#142B25]'
        : 'text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5'
    }`;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-[var(--border-stone)] bg-[var(--bg-surface)] p-5 transition-transform duration-200 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <span className="font-heading font-bold">Navigation</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-1.5 rounded-md border border-[var(--border-stone)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="space-y-1.5" aria-label="Primary Sidebar">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.to} to={item.to} onClick={onClose} className={linkClass}>
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-8 rounded-md border border-[var(--border-stone)] bg-[var(--bg-primary)] p-4 text-xs text-[var(--text-muted)] space-y-1.5">
          <p className="font-semibold text-[var(--text-primary)]">Decision Support Notice</p>
          <p className="leading-relaxed">
            Predictions are generated from trained ML models and should be verified with soil-test labs[cite: 1].
          </p>
        </div>
      </aside>
    </>
  );
};