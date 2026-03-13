import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, doc, onSnapshot, setDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

export type Pet = {
  id: string;
  ownerId: string;
  name: string;
  species: 'Dog' | 'Cat' | 'Bird' | 'Other';
  breed: string;
  age: string;
  weight: string;
  photo: string;
  vaccinations: { date: string; type: string; status: 'Done' | 'Pending' }[];
  medicalRecords: { date: string; title: string; notes: string }[];
};

export type Appointment = {
  id: string;
  userId: string;
  petId: string;
  petName: string;
  ownerName: string;
  clinicName: string;
  date: string;
  time: string;
  notes: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled' | 'confirmed' | 'pending';
  type?: string;
};

export type AdoptionApplication = {
  id: string;
  userId: string;
  petId: string;
  petName: string;
  shelterId: string;
  shelterName: string;
  applicantName: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  homeType: string;
  experience: string;
  message: string;
  adoptionFee?: number;
};

export type Order = {
  id: string;
  userId: string;
  customerName: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: 'processing' | 'shipped' | 'delivered';
  date: string;
};

export type UserProfile = {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  role: string;
};

interface AppContextType {
  user: UserProfile | null;
  pets: Pet[];
  addPet: (pet: Omit<Pet, 'id' | 'ownerId'>) => Promise<void>;
  appointments: Appointment[];
  addAppointment: (app: Omit<Appointment, 'id' | 'userId'>) => Promise<void>;
  cancelAppointment: (id: string) => Promise<void>;
  adoptionApplications: AdoptionApplication[];
  addAdoptionApplication: (app: Omit<AdoptionApplication, 'id' | 'userId'>) => Promise<void>;
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'userId'>) => Promise<void>;
  addVaccination: (petId: string, vaccination: Pet['vaccinations'][0]) => void;
  addMedicalRecord: (petId: string, record: Pet['medicalRecords'][0]) => void;
  isLoggedIn: boolean;
  isAuthReady: boolean;
  logout: () => Promise<void>;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string;
    email?: string | null;
    emailVerified?: boolean;
    isAnonymous?: boolean;
    tenantId?: string | null;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export const handleFirestoreError = (error: unknown, operationType: OperationType, path: string | null) => {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [adoptionApplications, setAdoptionApplications] = useState<AdoptionApplication[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setUser(null);
        setPets([]);
        setAppointments([]);
      }
      setIsAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAuthReady || !isLoggedIn || !auth.currentUser) return;

    const uid = auth.currentUser.uid;

    // Listen to User Profile
    const unsubscribeUser = onSnapshot(doc(db, 'users', uid), (docSnap) => {
      if (docSnap.exists()) {
        setUser(docSnap.data() as UserProfile);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `users/${uid}`);
    });

    // Listen to Pets
    const qPets = query(collection(db, 'pets'), where('ownerId', '==', uid));
    const unsubscribePets = onSnapshot(qPets, (snapshot) => {
      const petsData: Pet[] = [];
      snapshot.forEach((doc) => {
        petsData.push({ id: doc.id, ...doc.data() } as Pet);
      });
      setPets(petsData);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'pets');
    });

    // Listen to Appointments
    const qAppointments = query(collection(db, 'appointments'), where('userId', '==', uid));
    const unsubscribeAppointments = onSnapshot(qAppointments, (snapshot) => {
      const appointmentsData: Appointment[] = [];
      snapshot.forEach((doc) => {
        appointmentsData.push({ id: doc.id, ...doc.data() } as Appointment);
      });
      setAppointments(appointmentsData);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'appointments');
    });

    // Listen to Adoption Applications
    const qAdoptions = query(collection(db, 'adoption_applications'), where('userId', '==', uid));
    const unsubscribeAdoptions = onSnapshot(qAdoptions, (snapshot) => {
      const adoptionsData: AdoptionApplication[] = [];
      snapshot.forEach((doc) => {
        adoptionsData.push({ id: doc.id, ...doc.data() } as AdoptionApplication);
      });
      setAdoptionApplications(adoptionsData);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'adoption_applications');
    });

    // Listen to Orders
    const qOrders = query(collection(db, 'orders'), where('userId', '==', uid));
    const unsubscribeOrders = onSnapshot(qOrders, (snapshot) => {
      const ordersData: Order[] = [];
      snapshot.forEach((doc) => {
        ordersData.push({ id: doc.id, ...doc.data() } as Order);
      });
      setOrders(ordersData);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'orders');
    });

    return () => {
      unsubscribeUser();
      unsubscribePets();
      unsubscribeAppointments();
      unsubscribeAdoptions();
      unsubscribeOrders();
    };
  }, [isAuthReady, isLoggedIn]);

  const addPet = async (petData: Omit<Pet, 'id' | 'ownerId'>) => {
    if (!auth.currentUser) return;
    try {
      const newPetRef = doc(collection(db, 'pets'));
      await setDoc(newPetRef, {
        ...petData,
        ownerId: auth.currentUser.uid
      });
      showToast('Pet added successfully!', 'success');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'pets');
    }
  };

  const addAppointment = async (appData: Omit<Appointment, 'id' | 'userId'>) => {
    if (!auth.currentUser) return;
    try {
      const newAppRef = doc(collection(db, 'appointments'));
      await setDoc(newAppRef, {
        ...appData,
        userId: auth.currentUser.uid
      });
      showToast('Appointment booked successfully!', 'success');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'appointments');
    }
  };

  const addAdoptionApplication = async (appData: Omit<AdoptionApplication, 'id' | 'userId'>) => {
    if (!auth.currentUser) return;
    try {
      const newAppRef = doc(collection(db, 'adoption_applications'));
      await setDoc(newAppRef, {
        ...appData,
        userId: auth.currentUser.uid
      });
      showToast('Adoption application submitted!', 'success');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'adoption_applications');
    }
  };

  const addOrder = async (orderData: Omit<Order, 'id' | 'userId'>) => {
    if (!auth.currentUser) return;
    try {
      const newOrderRef = doc(collection(db, 'orders'));
      await setDoc(newOrderRef, {
        ...orderData,
        userId: auth.currentUser.uid
      });
      showToast('Order placed successfully!', 'success');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'orders');
    }
  };

  const cancelAppointment = async (id: string) => {
    try {
      const appRef = doc(db, 'appointments', id);
      await updateDoc(appRef, {
        status: 'Cancelled'
      });
      showToast('Appointment cancelled', 'info');
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `appointments/${id}`);
    }
  };

  const addVaccination = async (petId: string, vax: Pet['vaccinations'][0]) => {
    const pet = pets.find(p => p.id === petId);
    if (!pet) return;
    try {
      const petRef = doc(db, 'pets', petId);
      await updateDoc(petRef, {
        vaccinations: [...(pet.vaccinations || []), vax]
      });
      showToast('Vaccination added', 'success');
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `pets/${petId}`);
    }
  };

  const addMedicalRecord = async (petId: string, record: Pet['medicalRecords'][0]) => {
    const pet = pets.find(p => p.id === petId);
    if (!pet) return;
    try {
      const petRef = doc(db, 'pets', petId);
      await updateDoc(petRef, {
        medicalRecords: [...(pet.medicalRecords || []), record]
      });
      showToast('Medical record added', 'success');
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `pets/${petId}`);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      showToast('Logged out successfully', 'info');
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  return (
    <AppContext.Provider value={{ 
      user, pets, addPet, appointments, addAppointment, cancelAppointment, 
      adoptionApplications, addAdoptionApplication, orders, addOrder,
      addVaccination, addMedicalRecord, isLoggedIn, isAuthReady, logout, toast, showToast 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
