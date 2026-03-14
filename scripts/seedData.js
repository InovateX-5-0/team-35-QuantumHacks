const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, setDoc, doc } = require('firebase/firestore');
const firebaseConfig = require('../firebase-applet-config.json');

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

const MOCK_ADOPTION_PETS = [
  {
    name: 'Luna',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: '2 years',
    location: 'Brooklyn, NY',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=400',
    shelter: 'Brooklyn Animal Haven',
    description: 'Luna is a friendly and energetic Golden Retriever looking for a forever home with a big backyard.',
    adoptionFee: 150,
    personality: 'Friendly, Energetic, Loyal',
    energy: 'High',
    health: 'Vaccinated, Spayed'
  },
  {
    name: 'Oliver',
    species: 'Cat',
    breed: 'Tabby',
    age: '6 months',
    location: 'Queens, NY',
    image: 'https://images.unsplash.com/photo-1573865668131-974279df4a94?auto=format&fit=crop&q=80&w=400',
    shelter: 'Happy Whiskers Shelter',
    description: 'Oliver is a playful kitten who loves to cuddle and play with yarn.',
    adoptionFee: 100,
    personality: 'Playful, Curious, Cuddly',
    energy: 'Medium',
    health: 'Dewormed, Vaccinated'
  },
  {
    name: 'Bella',
    species: 'Dog',
    breed: 'Beagle',
    age: '1 year',
    location: 'Manhattan, NY',
    image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=400',
    shelter: 'Manhattan Pet Rescue',
    description: 'Bella is a sweet Beagle who loves long walks and sniffing out new adventures.',
    adoptionFee: 200,
    personality: 'Sweet, Curious, Energetic',
    energy: 'High',
    health: 'Healthy, Vaccinated'
  }
];

const MOCK_APPLICATIONS = [
  {
    petId: 'luna_id',
    petName: 'Luna',
    shelterId: 'brooklyn_sh',
    shelterName: 'Brooklyn Animal Haven',
    applicantName: 'John Doe',
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
    homeType: 'House with yard',
    experience: 'Experienced owner',
    message: 'I would love to give Luna a forever home!',
    adoptionFee: 150
  }
];

async function seed() {
  console.log('Starting seeding...');
  
  // Seed Pets
  for (const pet of MOCK_ADOPTION_PETS) {
    const docRef = await addDoc(collection(db, 'adoption_pets'), pet);
    console.log(`Added pet: ${pet.name} with ID: ${docRef.id}`);
  }

  // Seed Applications
  for (const app of MOCK_APPLICATIONS) {
    const docRef = await addDoc(collection(db, 'adoption_applications'), app);
    console.log(`Added application for: ${app.petName} with ID: ${docRef.id}`);
  }

  console.log('Seeding completed!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
