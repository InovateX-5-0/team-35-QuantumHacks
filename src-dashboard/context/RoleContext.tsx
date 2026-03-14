import React, { createContext, useContext, useState, ReactNode } from 'react';

export type RoleType = 'vet' | 'shelter' | 'store' | 'grooming' | 'training' | 'parks' | null;

interface RoleContextType {
  role: RoleType;
  setRole: (role: RoleType) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<RoleType>(null);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
