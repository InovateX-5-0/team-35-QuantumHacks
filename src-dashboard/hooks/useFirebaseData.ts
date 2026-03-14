import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export function useFirebaseData() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    let activeListeners = 0;
    const totalListeners = 4;

    const decrementLoading = () => {
      activeListeners++;
      if (activeListeners >= totalListeners) {
        setLoading(false);
      }
    };

    // Listen to Appointments
    const qAppointments = query(collection(db, 'appointments'), orderBy('date', 'desc'));
    const unsubAppointments = onSnapshot(qAppointments, 
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAppointments(data);
        decrementLoading();
      },
      (error) => {
        console.error("Appointments listener failed:", error);
        setError("Missing permissions for appointments. Please check your Firestore rules.");
        decrementLoading();
      }
    );

    // Listen to Pets (Patients)
    const qPatients = query(collection(db, 'pets'));
    const unsubPatients = onSnapshot(qPatients, 
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPatients(data);
        decrementLoading();
      },
      (error) => {
        console.error("Patients listener failed:", error);
        decrementLoading();
      }
    );

    // Listen to Adoption Applications
    const qApplications = query(collection(db, 'adoption_applications'), orderBy('date', 'desc'));
    const unsubApplications = onSnapshot(qApplications, 
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setApplications(data);
        decrementLoading();
      },
      (error) => {
        console.error("Applications listener failed:", error);
        decrementLoading();
      }
    );

    // Listen to Orders
    const qOrders = query(collection(db, 'orders'), orderBy('date', 'desc'));
    const unsubOrders = onSnapshot(qOrders, 
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(data);
        decrementLoading();
      },
      (error) => {
        console.error("Orders listener failed:", error);
        decrementLoading();
      }
    );

    return () => {
      unsubAppointments();
      unsubPatients();
      unsubApplications();
      unsubOrders();
    };
  }, []);

  return { appointments, patients, applications, orders, loading, error };
}
