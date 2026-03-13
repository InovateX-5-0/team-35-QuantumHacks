import React from 'react';

interface SidebarProps {
  role: 'veterinary' | 'shelter' | 'store';
  currentPage: string;
  onNavigate: (page: string) => void;
  collapsed?: boolean;
}

const menuItems = {
  veterinary: [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'appointments', label: 'Appointments', icon: '📅' },
    { id: 'patients', label: 'Patient Records', icon: '📋' },
    { id: 'staff', label: 'Staff Schedule', icon: '👨‍⚕️' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ],
  shelter: [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'animals', label: 'Animal Listings', icon: '🐾' },
    { id: 'adoptions', label: 'Adoption Applications', icon: '❤️' },
    { id: 'medical', label: 'Medical Records', icon: '🏥' },
    { id: 'reports', label: 'Reports', icon: '📈' },
  ],
  store: [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'inventory', label: 'Inventory', icon: '📦' },
    { id: 'orders', label: 'Orders', icon: '🛒' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
  ],
};

export const Sidebar: React.FC<SidebarProps> = ({ role, currentPage, onNavigate, collapsed = false }) => {
  const items = menuItems[role];

  return (
    <div className={`bg-gray-800 text-white h-screen transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-2xl">🐾</span>
          {!collapsed && <h1 className="text-xl font-bold">PawCare</h1>}
        </div>
        
        {!collapsed && (
          <div className="mb-6 pb-4 border-b border-gray-700">
            <p className="text-xs text-gray-400 uppercase">Dashboard</p>
            <p className="text-sm font-semibold capitalize">{role === 'veterinary' ? 'Veterinary Clinic' : role === 'shelter' ? 'Animal Shelter' : 'Pet Store'}</p>
          </div>
        )}

        <nav className="space-y-2">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                currentPage === item.id
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};
