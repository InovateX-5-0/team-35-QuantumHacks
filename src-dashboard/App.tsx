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

// Grooming Pages
import { GroomingOverview } from './pages/grooming/GroomingOverview';
import { GroomingAppointments } from './pages/grooming/GroomingAppointments';
import { GroomingServices } from './pages/grooming/GroomingServices';

// Training Pages
import { TrainingOverview } from './pages/training/TrainingOverview';
import { TrainingClasses } from './pages/training/TrainingClasses';
import { TrainerManagement } from './pages/training/TrainerManagement';

// Parks Pages
import { ParksOverview } from './pages/parks/ParksOverview';
import { VisitorTraffic } from './pages/parks/VisitorTraffic';
import { ParkAlerts } from './pages/parks/ParkAlerts';
import { ParkDirectory } from './pages/parks/ParkDirectory';

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
            <Route path="/overview" element={<GroomingOverview />} />
            <Route path="/appointments" element={<GroomingAppointments />} />
            <Route path="/services" element={<GroomingServices />} />
          </>
        )}

        {/* Training Routes */}
        {role === 'training' && (
          <>
            <Route path="/overview" element={<TrainingOverview />} />
            <Route path="/classes" element={<TrainingClasses />} />
            <Route path="/trainers" element={<TrainerManagement />} />
          </>
        )}

        {/* Parks Routes */}
        {role === 'parks' && (
          <>
            <Route path="/overview" element={<ParksOverview />} />
            <Route path="/visitors" element={<VisitorTraffic />} />
            <Route path="/alerts" element={<ParkAlerts />} />
            <Route path="/directory" element={<ParkDirectory />} />
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
        <BrowserRouter basename="/dashboard">
          <AppContent />
        </BrowserRouter>
      </ToastProvider>
    </RoleProvider>
  );
}

export default App;
