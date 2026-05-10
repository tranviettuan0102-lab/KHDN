import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  onClick: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center px-6 py-3.5 transition-all duration-300 relative ${
      active 
        ? 'text-blue-100 bg-blue-900/40' 
        : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
    }`}
  >
    {active && (
      <motion.div 
        layoutId="active-indicator"
        className="absolute left-0 top-0 w-1 h-full bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"
      />
    )}
    <Icon size={20} className={`mr-3 ${active ? 'text-blue-400' : ''}`} />
    <span className="text-sm font-medium">{label}</span>
  </button>
);
