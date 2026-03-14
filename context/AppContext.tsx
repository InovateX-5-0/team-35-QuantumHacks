import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone?: string;
  location?: string;
}

interface Pet {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: number;
  image: string;
  vaccinations: Array<{ name: string; date: string; nextDue: string }>;
  medicalRecords: Array<{ diagnosis: string; date: string; vet: string }>;
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

interface CartItem extends PetProduct {
  quantity: number;
}

interface PetProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  description: string;
}

interface AppContextType {
  user: User | null;
  pets: Pet[];
  appointments: Appointment[];
  applications: AdoptionApplication[];
  cart: CartItem[];
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  addPet: (pet: Omit<Pet, 'id' | 'vaccinations' | 'medicalRecords'>) => void;
  updatePet: (id: string, petData: Partial<Pet>) => void;
  deletePet: (id: string) => void;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  addAdoptionApplication: (app: AdoptionApplication) => Promise<void>;
  addToCart: (product: PetProduct, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
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
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
    phone: '+1 (555) 000-0000',
    location: 'San Francisco, CA'
  });
  const [pets, setPets] = useState<Pet[]>([
    {
      id: '1',
      name: 'Bella',
      type: 'Dog',
      breed: 'Golden Retriever',
      age: 3,
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
      vaccinations: [
        { name: 'Rabies', date: 'Oct 2025', nextDue: 'Oct 2026' },
        { name: 'DHPP', date: 'Jan 2026', nextDue: 'Jan 2027' }
      ],
      medicalRecords: [
        { diagnosis: 'Annual Checkup', date: 'Jan 2026', vet: 'Dr. Smith' }
      ]
    },
    {
      id: '2',
      name: 'Max',
      type: 'Dog',
      breed: 'German Shepherd',
      age: 5,
      image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=200',
      vaccinations: [
        { name: 'Rabies', date: 'Dec 2025', nextDue: 'Dec 2026' },
        { name: 'Bordetella', date: 'Feb 2026', nextDue: 'Aug 2026' }
      ],
      medicalRecords: [
        { diagnosis: 'Ear Infection', date: 'Feb 2026', vet: 'Dr. House' }
      ]
    },
  ]);
  const [appointments, setAppointments] = useState<Appointment[]>([
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
  const [cart, setCart] = useState<CartItem[]>([]);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  const updateUser = (userData: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...userData } : null);
  };

  const addPet = (pet: Omit<Pet, 'id' | 'vaccinations' | 'medicalRecords'>) => {
    const newPet = { 
      ...pet, 
      id: Math.random().toString(36).substr(2, 9),
      vaccinations: [],
      medicalRecords: []
    };
    setPets(prev => [...prev, newPet]);
  };

  const updatePet = (id: string, petData: Partial<Pet>) => {
    setPets(prev => prev.map(pet => pet.id === id ? { ...pet, ...petData } : pet));
  };

  const deletePet = (id: string) => {
    setPets(prev => prev.filter(pet => pet.id !== id));
  };

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment = { ...appointment, id: Math.random().toString(36).substr(2, 9) };
    setAppointments(prev => [...prev, newAppointment]);
  };

  const addAdoptionApplication = async (app: AdoptionApplication) => {
    setApplications(prev => [...prev, app]);
    console.log('Adoption application submitted:', app);
  };

  const addToCart = (product: PetProduct, quantity: number) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

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
      addAppointment,
      addAdoptionApplication,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart
    }}>
      {children}
    </AppContext.Provider>
  );
};
