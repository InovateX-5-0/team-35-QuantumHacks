import { db } from './src/firebase';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';

const seedData = async () => {
  console.log('Seeding data...');
  
  // Seed Pets
  const pets = [
    { name: 'Bella', species: 'Dog', breed: 'Golden Retriever', age: '3 years', ownerId: 'demo-user', photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=400', vaccinations: [], medicalRecords: [] },
    { name: 'Luna', species: 'Cat', breed: 'Persian', age: '2 years', ownerId: 'demo-user', photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400', vaccinations: [], medicalRecords: [] }
  ];
  
  for (const pet of pets) {
    await addDoc(collection(db, 'pets'), pet);
  }

  // Seed Appointments
  const appointments = [
    { petName: 'Bella', ownerName: 'John Doe', clinicName: 'Happy Paws Vet Clinic', date: '2024-03-20', time: '10:00 AM', status: 'pending', type: 'Checkup', userId: 'demo-user' },
    { petName: 'Max', ownerName: 'Sarah Jenkins', clinicName: 'Happy Paws Vet Clinic', date: '2024-03-21', time: '02:30 PM', status: 'confirmed', type: 'Vaccination', userId: 'demo-user' }
  ];

  for (const app of appointments) {
    await addDoc(collection(db, 'appointments'), app);
  }

  // Seed Applications
  const applications = [
    { applicantName: 'Mike Ross', petName: 'Buddy', shelterName: 'City Animal Shelter', date: '2024-03-15', status: 'pending', homeType: 'House', experience: 'Experienced', message: 'I love dogs!', userId: 'demo-user' }
  ];

  for (const app of applications) {
    await addDoc(collection(db, 'adoption_applications'), app);
  }

  // Seed Orders
  const orders = [
    { id: 'ORD-1001', customerName: 'Emily White', items: [{ name: 'Dog Food', quantity: 1, price: 45.99 }], total: 45.99, status: 'processing', date: '2024-03-14', userId: 'demo-user' }
  ];

  for (const order of orders) {
    await addDoc(collection(db, 'orders'), order);
  }

  console.log('Seeding complete!');
};

seedData();
