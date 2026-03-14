import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RoleProvider, useRole } from './context/RoleContext';
import { ToastProvider } from './context/ToastContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { RoleSelector } from './pages/RoleSelector';

// Vet Pages
import { VetOverview } from './pages/vet/VetOverview';
import { Appointments } from './pages/vet/Appointments';
import { PatientRecords } from './pages/vet/PatientRecords';

// Shelter Pages
import { ShelterOverview } from './pages/shelter/ShelterOverview';
import { AnimalListings } from './pages/shelter/AnimalListings';
import { AdoptionApplications } from './pages/shelter/AdoptionApplications';

// Store Pages
import { StoreOverview } from './pages/store/StoreOverview';
import { Inventory } from './pages/store/Inventory';
import { Orders } from './pages/store/Orders';

// Placeholder Pages
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center min-h-[400px]">
    <h1 className="text-2xl font-bold text-slate-800 mb-2">{title}</h1>
    <p className="text-slate-500">This module is under construction.</p>
  </div>
);

function AppContent() {
  const { role } = useRole();

  if (!role) {
    return <RoleSelector />;
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/overview" replace />} />
        
        {/* Vet Routes */}
        {role === 'vet' && (
          <>
            <Route path="/overview" element={<VetOverview />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/patients" element={<PatientRecords />} />
            <Route path="/schedule" element={<PlaceholderPage title="Staff Schedule" />} />
            <Route path="/settings" element={<PlaceholderPage title="Clinic Settings" />} />
          </>
        )}

        {/* Shelter Routes */}
        {role === 'shelter' && (
          <>
            <Route path="/overview" element={<ShelterOverview />} />
            <Route path="/listings" element={<AnimalListings />} />
            <Route path="/adoptions" element={<AdoptionApplications />} />
            <Route path="/medical" element={<PlaceholderPage title="Medical Records" />} />
            <Route path="/reports" element={<PlaceholderPage title="Shelter Reports" />} />
          </>
        )}

        {/* Store Routes */}
        {role === 'store' && (
          <>
            <Route path="/overview" element={<StoreOverview />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/analytics" element={<PlaceholderPage title="Store Analytics" />} />
          </>
        )}

        {/* Grooming Routes */}
        {role === 'grooming' && (
          <>
            <Route path="/overview" element={<PlaceholderPage title="Grooming Overview" />} />
            <Route path="/appointments" element={<PlaceholderPage title="Grooming Appointments" />} />
            <Route path="/services" element={<PlaceholderPage title="Grooming Services" />} />
          </>
        )}

        {/* Training Routes */}
        {role === 'training' && (
          <>
            <Route path="/overview" element={<PlaceholderPage title="Training Overview" />} />
            <Route path="/classes" element={<PlaceholderPage title="Training Classes" />} />
            <Route path="/trainers" element={<PlaceholderPage title="Trainer Management" />} />
          </>
        )}

        {/* Parks Routes */}
        {role === 'parks' && (
          <>
            <Route path="/overview" element={<PlaceholderPage title="Parks Overview" />} />
            <Route path="/visitors" element={<PlaceholderPage title="Visitor Traffic" />} />
            <Route path="/alerts" element={<PlaceholderPage title="Park Alerts" />} />
          </>
        )}

        <Route path="*" element={<Navigate to="/overview" replace />} />
      </Routes>
    </DashboardLayout>
  );
}

function App() {
  return (
    <RoleProvider>
      <ToastProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ToastProvider>
    </RoleProvider>
  );
}

export default App;
