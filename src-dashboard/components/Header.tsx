import React, { useState } from 'react';

interface HeaderProps {
  role: string;
  onRoleChange: () => void;
}

export const Header: React.FC<HeaderProps> = ({ role, onRoleChange }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, message: 'New appointment request from John Smith', time: '5 min ago', type: 'appointment' },
    { id: 2, message: 'Low stock alert: Cat Litter (8 remaining)', time: '1 hour ago', type: 'inventory' },
    { id: 3, message: 'New adoption application for Rocky', time: '2 hours ago', type: 'adoption' },
  ];

  return (
    <header className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 capitalize">
            {role === 'veterinary' ? 'Veterinary Clinic' : role === 'shelter' ? 'Animal Shelter' : 'Pet Store'} Dashboard
          </h2>
          <p className="text-sm text-gray-500">Welcome back, Admin</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-teal-600 transition-colors"
            >
              <span className="text-xl">🔔</span>
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="p-4 border-b hover:bg-gray-50 cursor-pointer">
                      <p className="text-sm text-gray-800">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
              <span className="text-sm font-medium text-gray-700">Admin</span>
              <span className="text-gray-400">▼</span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-50">
                <button
                  onClick={onRoleChange}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  Change Role
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                  Edit Profile
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
