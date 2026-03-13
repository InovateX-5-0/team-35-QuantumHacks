import React from 'react';
import { useRole } from '../../context/RoleContext';
import { 
  X, LayoutDashboard, CalendarDays, Users, Clock, Settings,
  PawPrint, FileText, Activity, Package, AlertTriangle, ShoppingCart, BarChart3
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const { role, setRole } = useRole();
  const location = useLocation();

  const getNavItems = () => {
    switch (role) {
      case 'vet':
        return [
          { name: 'Overview', icon: LayoutDashboard, path: '/overview' },
          { name: 'Appointments', icon: CalendarDays, path: '/appointments' },
          { name: 'Patient Records', icon: Users, path: '/patients' },
          { name: 'Staff Schedule', icon: Clock, path: '/schedule' },
          { name: 'Settings', icon: Settings, path: '/settings' },
        ];
      case 'shelter':
        return [
          { name: 'Overview', icon: LayoutDashboard, path: '/overview' },
          { name: 'Animal Listings', icon: PawPrint, path: '/listings' },
          { name: 'Adoptions', icon: FileText, path: '/adoptions' },
          { name: 'Medical Records', icon: Activity, path: '/medical' },
          { name: 'Reports', icon: BarChart3, path: '/reports' },
        ];
      case 'store':
        return [
          { name: 'Overview', icon: LayoutDashboard, path: '/overview' },
          { name: 'Inventory', icon: Package, path: '/inventory' },
          { name: 'Orders', icon: ShoppingCart, path: '/orders' },
          { name: 'Analytics', icon: BarChart3, path: '/analytics' },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  const roleDetails = {
    vet: { title: 'Veterinary Clinic', color: 'text-teal-600', bg: 'bg-teal-50' },
    shelter: { title: 'Animal Shelter', color: 'text-blue-600', bg: 'bg-blue-50' },
    store: { title: 'Pet Store', color: 'text-purple-600', bg: 'bg-purple-50' }
  };

  const currentRoleInfo = role ? roleDetails[role] : null;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out flex flex-col
        md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${currentRoleInfo?.bg || 'bg-slate-100'} ${currentRoleInfo?.color || 'text-slate-600'}`}>
              <PawPrint size={20} />
            </div>
            <span className="font-bold text-lg text-slate-800">PawCare</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Role Badge */}
        {currentRoleInfo && (
          <div className="px-4 py-4">
            <div className={`px-3 py-2 rounded-lg text-sm font-medium border ${currentRoleInfo.bg} ${currentRoleInfo.color} border-current/20`}>
              {currentRoleInfo.title} Portal
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="flex-1 px-4 pb-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (location.pathname === '/' && item.path === '/overview');
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-teal-50 text-primary' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-primary' : 'text-slate-400'} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer Navigation */}
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={() => setRole(null)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors"
          >
            <LayoutDashboard size={18} className="text-slate-400 group-hover:text-rose-400" />
            Back to Main Menu
          </button>
        </div>
      </div>
    </>
  );
}
