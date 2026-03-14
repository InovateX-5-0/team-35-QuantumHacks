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

interface AdoptionApplication {
  petId: string;
  petName: string;
  shelterId: string;
  shelterName: string;
  applicantName: string;
  date: string;
  status: string;
  homeType: string;
  experience: string;
  message: string;
  adoptionFee: number;
}

interface AppContextType {
  user: User | null;
  pets: Pet[];
  appointments: Appointment[];
  applications: AdoptionApplication[];
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  addPet: (pet: Omit<Pet, 'id'>) => void;
  updatePet: (id: string, petData: Partial<Pet>) => void;
  deletePet: (id: string) => void;
  addAdoptionApplication: (app: AdoptionApplication) => Promise<void>;
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
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Pet Owner',
    email: 'owner@petcare.com',
  });
  const [pets, setPets] = useState<Pet[]>([
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

  const [applications, setApplications] = useState<AdoptionApplication[]>([]);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  const updateUser = (userData: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...userData } : null);
  };

  const addPet = (pet: Omit<Pet, 'id'>) => {
    const newPet = { ...pet, id: Math.random().toString(36).substr(2, 9) };
    setPets(prev => [...prev, newPet]);
  };

  const updatePet = (id: string, petData: Partial<Pet>) => {
    setPets(prev => prev.map(pet => pet.id === id ? { ...pet, ...petData } : pet));
  };

  const deletePet = (id: string) => {
    setPets(prev => prev.filter(pet => pet.id !== id));
  };

  const addAdoptionApplication = async (app: AdoptionApplication) => {
    setApplications(prev => [...prev, app]);
    console.log('Adoption application submitted:', app);
  };

  return (
    <AppContext.Provider value={{ 
      user, 
      pets, 
      appointments, 
      applications, 
      isLoggedIn, 
      login, 
      logout,
      updateUser,
      addPet,
      updatePet,
      deletePet,
      addAdoptionApplication 
    }}>
      {children}
    </AppContext.Provider>
  );
};
