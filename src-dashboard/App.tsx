import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { RoleSelector } from './components/RoleSelector';
import { VeterinaryOverview } from './pages/veterinary/Overview';

type Role = 'veterinary' | 'shelter' | 'store';
type Page = 'overview' | 'appointments' | 'patients' | 'staff' | 'settings' | 'animals' | 'adoptions' | 'medical' | 'reports' | 'inventory' | 'orders' | 'analytics';

const App: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (!selectedRole) {
    return <RoleSelector onSelectRole={setSelectedRole} />;
  }

  const handleRoleChange = () => {
    setSelectedRole(null);
    setCurrentPage('overview');
  };

  const renderContent = () => {
    // For now, show overview for all roles (you can expand this)
    switch (currentPage) {
      case 'overview':
        if (selectedRole === 'veterinary') {
          return <VeterinaryOverview />;
        }
        return (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 capitalize">{selectedRole} Overview</h2>
            <p className="text-gray-600">This page is under construction. Check back soon!</p>
            <div className="mt-8 text-6xl">🚧</div>
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 capitalize">{currentPage}</h2>
            <p className="text-gray-600">This feature will be implemented soon.</p>
            <div className="mt-8 text-6xl">🔨</div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        role={selectedRole}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        collapsed={sidebarCollapsed}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header role={selectedRole} onRoleChange={handleRoleChange} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
