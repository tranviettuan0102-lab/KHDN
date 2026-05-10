import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  headerAction?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, title, className = "", headerAction }) => (
  <div className={`bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/60 shadow-sm flex flex-col overflow-hidden transition-all hover:shadow-md ${className}`}>
    {title && (
      <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="text-sm font-bold text-[#1a2b4b] uppercase tracking-wide">{title}</h3>
        {headerAction}
      </div>
    )}
    <div className="p-6 flex-1">
      {children}
    </div>
  </div>
);
