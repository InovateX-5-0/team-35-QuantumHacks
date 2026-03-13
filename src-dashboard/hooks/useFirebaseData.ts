import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export function useFirebaseData() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to Appointments
    const qAppointments = query(collection(db, 'appointments'), orderBy('date', 'desc'));
    const unsubAppointments = onSnapshot(qAppointments, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAppointments(data);
    });

    // Listen to Pets (Patients)
    const qPatients = query(collection(db, 'pets'));
    const unsubPatients = onSnapshot(qPatients, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPatients(data);
    });

    // Listen to Adoption Applications
    const qApplications = query(collection(db, 'adoption_applications'), orderBy('date', 'desc'));
    const unsubApplications = onSnapshot(qApplications, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setApplications(data);
    });

    // Listen to Orders
    const qOrders = query(collection(db, 'orders'), orderBy('date', 'desc'));
    const unsubOrders = onSnapshot(qOrders, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(data);
    });

    setLoading(false);

    return () => {
      unsubAppointments();
      unsubPatients();
      unsubApplications();
      unsubOrders();
    };
  }, []);

  return { appointments, patients, applications, orders, loading };
}
