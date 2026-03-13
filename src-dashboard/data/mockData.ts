// Mock Data for PawCare Dashboard

export interface Appointment {
  id: string;
  petName: string;
  owner: string;
  date: string;
  time: string;
  type: 'checkup' | 'surgery' | 'vaccine' | 'emergency';
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface Patient {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  owner: string;
  vaccinationHistory: string[];
  visitHistory: { date: string; reason: string }[];
  notes: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  availability: boolean[];
}

export interface ShelterAnimal {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  status: 'available' | 'adopted' | 'medical hold';
  photo: string;
  arrivalDate: string;
  medicalRecords: string[];
}

export interface AdoptionApplication {
  id: string;
  applicantName: string;
  petId: string;
  petName: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  contact: string;
  address: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'food' | 'medicine' | 'accessory' | 'toy';
  stockCount: number;
  reorderLevel: number;
  price: number;
  sold: number;
}

export interface Order {
  id: string;
  customer: string;
  items: { productId: string; quantity: number }[];
  total: number;
  status: 'processing' | 'shipped' | 'delivered';
  date: string;
}

// Veterinary Clinic Data
export const veterinaryAppointments: Appointment[] = [
  { id: '1', petName: 'Max', owner: 'John Smith', date: '2024-01-15', time: '09:00', type: 'checkup', status: 'confirmed' },
  { id: '2', petName: 'Bella', owner: 'Sarah Johnson', date: '2024-01-15', time: '10:30', type: 'vaccine', status: 'confirmed' },
  { id: '3', petName: 'Charlie', owner: 'Mike Brown', date: '2024-01-15', time: '14:00', type: 'surgery', status: 'pending' },
  { id: '4', petName: 'Luna', owner: 'Emma Wilson', date: '2024-01-16', time: '11:00', type: 'checkup', status: 'confirmed' },
  { id: '5', petName: 'Cooper', owner: 'David Lee', date: '2024-01-16', time: '15:30', type: 'emergency', status: 'cancelled' },
  { id: '6', petName: 'Daisy', owner: 'Lisa Anderson', date: '2024-01-17', time: '09:30', type: 'vaccine', status: 'confirmed' },
];

export const patientRecords: Patient[] = [
  { id: '1', name: 'Max', species: 'Dog', breed: 'Golden Retriever', age: 5, owner: 'John Smith', 
    vaccinationHistory: ['Rabies (2023)', 'DHPP (2023)', 'Bordetella (2024)'],
    visitHistory: [{ date: '2024-01-10', reason: 'Annual Checkup' }, { date: '2023-06-15', reason: 'Vaccination' }],
    notes: 'Healthy, regular exercise recommended' },
  { id: '2', name: 'Bella', species: 'Cat', breed: 'Siamese', age: 3, owner: 'Sarah Johnson',
    vaccinationHistory: ['Rabies (2023)', 'FVRCP (2023)'],
    visitHistory: [{ date: '2024-01-08', reason: 'Dental Cleaning' }],
    notes: 'Indoor cat, special diet' },
  { id: '3', name: 'Charlie', species: 'Dog', breed: 'German Shepherd', age: 7, owner: 'Mike Brown',
    vaccinationHistory: ['Rabies (2023)', 'DHPP (2023)', 'Lyme (2023)'],
    visitHistory: [{ date: '2024-01-05', reason: 'Hip Evaluation' }, { date: '2023-11-20', reason: 'Blood Work' }],
    notes: 'Hip dysplasia monitoring required' },
];

export const staffSchedule: StaffMember[] = [
  { id: '1', name: 'Dr. Emily Chen', role: 'Senior Veterinarian', availability: [true, true, true, true, true, false, false] },
  { id: '2', name: 'Dr. James Wilson', role: 'Veterinarian', availability: [true, true, false, true, true, false, false] },
  { id: '3', name: 'Dr. Maria Garcia', role: 'Surgical Specialist', availability: [false, true, true, true, false, false, false] },
];

// Shelter Data
export const shelterAnimals: ShelterAnimal[] = [
  { id: '1', name: 'Rocky', species: 'Dog', breed: 'Labrador Mix', age: 2, status: 'available', 
    photo: '🐕', arrivalDate: '2024-01-01', medicalRecords: ['Vaccinated', 'Neutered', 'Microchipped'] },
  { id: '2', name: 'Whiskers', species: 'Cat', breed: 'Domestic Shorthair', age: 1, status: 'available',
    photo: '🐱', arrivalDate: '2024-01-05', medicalRecords: ['Vaccinated', 'Spayed'] },
  { id: '3', name: 'Buddy', species: 'Dog', breed: 'Beagle', age: 5, status: 'medical hold',
    photo: '🐕', arrivalDate: '2023-12-15', medicalRecords: ['Under treatment for ear infection'] },
  { id: '4', name: 'Mittens', species: 'Cat', breed: 'Persian', age: 3, status: 'adopted',
    photo: '🐱', arrivalDate: '2023-11-20', medicalRecords: ['Vaccinated', 'Spayed', 'Dental Work'] },
];

export const adoptionApplications: AdoptionApplication[] = [
  { id: '1', applicantName: 'Jennifer Martinez', petId: '1', petName: 'Rocky', date: '2024-01-10', status: 'pending', contact: '555-0101', address: '123 Main St' },
  { id: '2', applicantName: 'Robert Taylor', petId: '2', petName: 'Whiskers', date: '2024-01-12', status: 'approved', contact: '555-0102', address: '456 Oak Ave' },
  { id: '3', applicantName: 'Amanda White', petId: '4', petName: 'Mittens', date: '2024-01-08', status: 'approved', contact: '555-0103', address: '789 Pine Rd' },
];

// Pet Store Data
export const products: Product[] = [
  { id: '1', name: 'Premium Dog Food', category: 'food', stockCount: 45, reorderLevel: 20, price: 54.99, sold: 234 },
  { id: '2', name: 'Cat Litter', category: 'accessory', stockCount: 8, reorderLevel: 15, price: 12.99, sold: 456 },
  { id: '3', name: 'Heartworm Medication', category: 'medicine', stockCount: 120, reorderLevel: 30, price: 89.99, sold: 189 },
  { id: '4', name: 'Rope Toy', category: 'toy', stockCount: 5, reorderLevel: 10, price: 8.99, sold: 312 },
  { id: '5', name: 'Bird Seed Mix', category: 'food', stockCount: 67, reorderLevel: 25, price: 15.99, sold: 145 },
  { id: '6', name: 'Fish Tank Filter', category: 'accessory', stockCount: 23, reorderLevel: 10, price: 34.99, sold: 78 },
];

export const orders: Order[] = [
  { id: 'ORD-001', customer: 'Alice Johnson', items: [{ productId: '1', quantity: 2 }], total: 109.98, status: 'delivered', date: '2024-01-10' },
  { id: 'ORD-002', customer: 'Bob Smith', items: [{ productId: '3', quantity: 1 }, { productId: '4', quantity: 3 }], total: 116.96, status: 'shipped', date: '2024-01-12' },
  { id: 'ORD-003', customer: 'Carol White', items: [{ productId: '2', quantity: 4 }], total: 51.96, status: 'processing', date: '2024-01-14' },
];

// Analytics Data
export const appointmentVolumeData = [
  { date: 'Jan 1', appointments: 12 }, { date: 'Jan 5', appointments: 15 },
  { date: 'Jan 10', appointments: 18 }, { date: 'Jan 15', appointments: 14 },
  { date: 'Jan 20', appointments: 20 }, { date: 'Jan 25', appointments: 17 },
  { date: 'Jan 30', appointments: 22 },
];

export const appointmentTypeBreakdown = [
  { name: 'Checkup', value: 45 }, { name: 'Vaccine', value: 30 },
  { name: 'Surgery', value: 15 }, { name: 'Emergency', value: 10 },
];

export const topBreeds = [
  { breed: 'Labrador', count: 45 }, { breed: 'Golden Retriever', count: 38 },
  { breed: 'German Shepherd', count: 32 }, { breed: 'Siamese Cat', count: 28 },
  { breed: 'Beagle', count: 25 },
];

export const adoptionRateData = [
  { month: 'Aug', adoptions: 12 }, { month: 'Sep', adoptions: 15 },
  { month: 'Oct', adoptions: 18 }, { month: 'Nov', adoptions: 22 },
  { month: 'Dec', adoptions: 25 }, { month: 'Jan', adoptions: 20 },
];

export const speciesBreakdown = [
  { name: 'Dogs', value: 45 }, { name: 'Cats', value: 35 },
  { name: 'Rabbits', value: 12 }, { name: 'Birds', value: 8 },
];

export const revenueByCategory = [
  { month: 'Aug', food: 4000, medicine: 2400, accessory: 1800 },
  { month: 'Sep', food: 4500, medicine: 2800, accessory: 2100 },
  { month: 'Oct', food: 5200, medicine: 3100, accessory: 2400 },
  { month: 'Nov', food: 4800, medicine: 2900, accessory: 2200 },
  { month: 'Dec', food: 5500, medicine: 3400, accessory: 2600 },
  { month: 'Jan', food: 6000, medicine: 3700, accessory: 2900 },
];

export const topSellingProducts = [
  { name: 'Premium Dog Food', sales: 234 }, { name: 'Cat Litter', sales: 456 },
  { name: 'Rope Toy', sales: 312 }, { name: 'Heartworm Meds', sales: 189 },
  { name: 'Bird Seed', sales: 145 },
];
