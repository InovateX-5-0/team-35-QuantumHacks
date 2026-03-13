import React from 'react';

interface RoleSelectorProps {
  onSelectRole: (role: 'veterinary' | 'shelter' | 'store') => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({ onSelectRole }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">🐾 PawCare Dashboard</h1>
          <p className="text-xl text-teal-100">Select your role to access the dashboard</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Veterinary Clinic */}
          <button
            onClick={() => onSelectRole('veterinary')}
            className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2"
          >
            <div className="text-6xl mb-4">🏥</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Veterinary Clinic</h3>
            <p className="text-gray-600">Manage appointments, patient records, and staff schedules</p>
            <ul className="mt-4 text-sm text-gray-500 space-y-2">
              <li>✓ Appointment Management</li>
              <li>✓ Patient Records</li>
              <li>✓ Staff Scheduling</li>
              <li>✓ Analytics & Reports</li>
            </ul>
          </button>

          {/* Animal Shelter */}
          <button
            onClick={() => onSelectRole('shelter')}
            className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2"
          >
            <div className="text-6xl mb-4">❤️</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Animal Shelter</h3>
            <p className="text-gray-600">Track animals, manage adoptions, and medical records</p>
            <ul className="mt-4 text-sm text-gray-500 space-y-2">
              <li>✓ Animal Listings</li>
              <li>✓ Adoption Applications</li>
              <li>✓ Medical Records</li>
              <li>✓ Adoption Analytics</li>
            </ul>
          </button>

          {/* Pet Store */}
          <button
            onClick={() => onSelectRole('store')}
            className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2"
          >
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Pet Store</h3>
            <p className="text-gray-600">Inventory management, orders, and sales analytics</p>
            <ul className="mt-4 text-sm text-gray-500 space-y-2">
              <li>✓ Inventory Tracking</li>
              <li>✓ Order Management</li>
              <li>✓ Sales Analytics</li>
              <li>✓ Stock Alerts</li>
            </ul>
          </button>
        </div>
      </div>
    </div>
  );
};
