import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  ClipboardList, 
  TrendingUp,
  Settings,
  ShieldCheck,
  UserCircle,
  PlusCircle,
  LogOut,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { SidebarItem } from '../components/common/SidebarItem';
import { User } from '../types';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentUser: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, currentUser, activeTab, setActiveTab, handleLogout 
}) => {
  const getTabTitle = () => {
    switch(activeTab) {
      case 'dashboard': return 'Báo cáo Hoạt động Kinh doanh';
      case 'workflow': return 'Phê duyệt & Giải ngân';
      case 'crm': return 'Quản lý Khách hàng Tiềm năng';
      case 'stats': return 'Phân tích & Tăng trưởng';
      case 'kpi': return currentUser.role === 'RM' ? 'Cập nhật Chỉ tiêu cá nhân' : 'Phân bổ Chỉ tiêu Đội ngũ';
      case 'logs': return 'Báo cáo Nhật ký Công việc';
      default: return 'Trang quản trị';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800 selection:bg-blue-200">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-20 shadow-2xl border-r border-slate-800 transition-all duration-300">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold tracking-tight uppercase flex items-center gap-2">
            P.KHDN <span className="text-blue-500 text-[10px] bg-blue-500/20 px-2 py-0.5 rounded border border-blue-500/30">Admin</span>
          </h1>
        </div>

        <nav className="flex-1 py-6 overflow-y-auto custom-scrollbar">
          <div className="px-6 mb-3 text-[10px] uppercase tracking-widest text-slate-500 font-bold">Danh mục quản lý</div>
          <SidebarItem icon={LayoutDashboard} label="Dashboard KPI" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <SidebarItem 
            icon={currentUser.role === 'RM' ? PlusCircle : Settings} 
            label={currentUser.role === 'RM' ? "Quản lý Chỉ tiêu" : "Phân bổ Chỉ tiêu"} 
            active={activeTab === 'kpi'} 
            onClick={() => setActiveTab('kpi')} 
          />
          <SidebarItem icon={TrendingUp} label="Phân tích & Thống kê" active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} />
          <SidebarItem icon={FileText} label="Quản lý Hồ sơ" active={activeTab === 'workflow'} onClick={() => setActiveTab('workflow')} />
          <SidebarItem icon={Users} label="CRM Khách hàng" active={activeTab === 'crm'} onClick={() => setActiveTab('crm')} />
          <SidebarItem icon={ClipboardList} label="Nhật ký Ngày" active={activeTab === 'logs'} onClick={() => setActiveTab('logs')} />
        </nav>

        <div className="p-6 bg-slate-950 border-t border-slate-800 mt-auto">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm shadow-[0_0_15px_rgba(37,99,235,0.4)] overflow-hidden ring-2 ring-slate-800">
               <img src={currentUser.avatar} alt="avatar" className="w-full h-full object-cover" />
             </div>
             <div className="overflow-hidden flex-1">
               <p className="text-xs font-bold text-slate-200 truncate">{currentUser.name}</p>
               <p className="text-[9px] text-blue-400 font-medium uppercase tracking-tighter truncate">
                 {currentUser.role === 'RM' ? 'Relationship Manager' : 'Business Unit Manager'}
               </p>
             </div>
             <button 
               onClick={handleLogout}
               className="text-slate-500 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-slate-800"
               title="Đăng xuất"
             >
                <LogOut size={16} />
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">
            {getTabTitle()}
          </h2>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold border border-emerald-100 shadow-sm">
              <ShieldCheck size={12} /> System Online
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Phiên làm việc</p>
              <p className="text-[10px] font-mono text-slate-600 font-medium">{format(new Date(), 'HH:mm:ss - dd/MM/yyyy')}</p>
            </div>
            <button className="p-2 rounded-full hover:bg-slate-100 relative group transition-colors">
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white shadow-[0_0_5px_rgba(239,68,68,0.5)]"></span>
              <AlertCircle size={20} className="text-slate-400 group-hover:text-slate-700" />
            </button>
          </div>
        </header>

        <div className="p-8 flex-1 w-full max-w-7xl mx-auto">
          {children}
        </div>

        <footer className="px-8 py-4 border-t border-slate-200/60 bg-white/50 backdrop-blur flex justify-between items-center text-[9px] text-slate-400 uppercase tracking-widest font-bold font-mono">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><UserCircle size={10} /> {currentUser.name} ({currentUser.role})</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span>Branch: Corporate Banking</span>
          </div>
          <span>© 2026 BankerPro Modern System</span>
        </footer>
      </main>
    </div>
  );
};
