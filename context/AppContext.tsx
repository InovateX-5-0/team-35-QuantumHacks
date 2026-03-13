import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Pet {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: number;
  image: string;
}

interface Appointment {
  id: string;
  petId: string;
  clinicName: string;
  date: string;
  time: string;
  status: string;
  type: string;
}

interface AppContextType {
  user: User | null;
  pets: Pet[];
  appointments: Appointment[];
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user] = useState<User>({
    id: '1',
    name: 'Pet Owner',
    email: 'owner@petcare.com',
  });
  const [pets] = useState<Pet[]>([
    {
      id: '1',
      name: 'Bella',
      type: 'Dog',
      breed: 'Golden Retriever',
      age: 3,
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    },
    {
      id: '2',
      name: 'Max',
      type: 'Dog',
      breed: 'German Shepherd',
      age: 5,
      image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=200',
    },
  ]);
  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      petId: '1',
      clinicName: 'Happy Paws Vet Clinic',
      date: 'Mar 15, 2026',
      time: '10:00 AM',
      status: 'Upcoming',
      type: 'Vaccination',
    },
  ]);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AppContext.Provider value={{ user, pets, appointments, isLoggedIn, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};
