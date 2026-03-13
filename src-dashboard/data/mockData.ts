export const mockData = {
  vet: {
    stats: {
      todayAppointments: 24,
      newPatients: 12,
      revenueToday: 3240,
      activeVets: 4,
    },
    appointmentVolume: [
      { date: 'Mon', count: 18 },
      { date: 'Tue', count: 22 },
      { date: 'Wed', count: 19 },
      { date: 'Thu', count: 24 },
      { date: 'Fri', count: 28 },
      { date: 'Sat', count: 35 },
      { date: 'Sun', count: 15 },
    ],
    appointmentTypes: [
      { name: 'Checkup', value: 45 },
      { name: 'Vaccination', value: 30 },
      { name: 'Surgery', value: 15 },
      { name: 'Emergency', value: 10 },
    ],
    topBreeds: [
      { name: 'Golden Retriever', count: 120 },
      { name: 'French Bulldog', count: 95 },
      { name: 'Labrador', count: 88 },
      { name: 'Persian Cat', count: 75 },
      { name: 'German Shepherd', count: 62 },
    ],
    appointments: [
      { id: '1', petName: 'Bella', owner: 'Sarah Jones', time: '09:00 AM', type: 'Checkup', status: 'confirmed' },
      { id: '2', petName: 'Max', owner: 'Mike Smith', time: '09:30 AM', type: 'Vaccination', status: 'pending' },
      { id: '3', petName: 'Luna', owner: 'Emma Wilson', time: '10:00 AM', type: 'Surgery', status: 'confirmed' },
      { id: '4', petName: 'Charlie', owner: 'Tom Davis', time: '11:00 AM', type: 'Checkup', status: 'cancelled' },
      { id: '5', petName: 'Lucy', owner: 'Lisa Taylor', time: '01:00 PM', type: 'Emergency', status: 'confirmed' },
    ],
    patients: [
      { id: 'P001', name: 'Bella', species: 'Dog', breed: 'Golden Retriever', age: '3 yrs', lastVisit: '2023-10-15' },
      { id: 'P002', name: 'Max', species: 'Dog', breed: 'German Shepherd', age: '5 yrs', lastVisit: '2023-11-20' },
      { id: 'P003', name: 'Luna', species: 'Cat', breed: 'Persian', age: '2 yrs', lastVisit: '2024-01-05' },
      { id: 'P004', name: 'Charlie', species: 'Dog', breed: 'Labrador', age: '1 yr', lastVisit: '2024-02-12' },
      { id: 'P005', name: 'Lucy', species: 'Cat', breed: 'Siamese', age: '4 yrs', lastVisit: '2023-09-30' },
    ]
  },
  shelter: {
    stats: {
      totalAnimals: 145,
      adoptedThisMonth: 32,
      pendingApplications: 18,
      newArrivals: 8,
    },
    adoptionRate: [
      { month: 'Jan', count: 25 },
      { month: 'Feb', count: 28 },
      { month: 'Mar', count: 35 },
      { month: 'Apr', count: 32 },
      { month: 'May', count: 42 },
      { month: 'Jun', count: 48 },
    ],
    speciesBreakdown: [
      { name: 'Dogs', value: 85 },
      { name: 'Cats', value: 45 },
      { name: 'Birds', value: 10 },
      { name: 'Others', value: 5 },
    ],
    agestats: [
      { age: '< 1 yr', count: 45 },
      { age: '1-3 yrs', count: 65 },
      { age: '3-7 yrs', count: 25 },
      { age: '7+ yrs', count: 10 },
    ],
    animals: [
      { id: 'A001', name: 'Buddy', species: 'Dog', breed: 'Mixed', age: '2 yrs', status: 'available' },
      { id: 'A002', name: 'Mittens', species: 'Cat', breed: 'Domestic Shorthair', age: '1 yr', status: 'pending' },
      { id: 'A003', name: 'Rocky', species: 'Dog', breed: 'Bulldog', age: '4 yrs', status: 'medical_hold' },
      { id: 'A004', name: 'Daisy', species: 'Dog', breed: 'Poodle', age: '3 mos', status: 'adopted' },
      { id: 'A005', name: 'Oliver', species: 'Cat', breed: 'Maine Coon', age: '5 yrs', status: 'available' },
    ],
    applications: [
      { id: 'APP-101', applicant: 'John Doe', pet: 'Buddy (A001)', date: '2024-03-12', status: 'pending' },
      { id: 'APP-102', applicant: 'Jane Smith', pet: 'Mittens (A002)', date: '2024-03-10', status: 'approved' },
      { id: 'APP-103', applicant: 'Robert Johnson', pet: 'Daisy (A004)', date: '2024-03-05', status: 'approved' },
      { id: 'APP-104', applicant: 'Emily White', pet: 'Oliver (A005)', date: '2024-03-14', status: 'rejected' },
    ]
  },
  store: {
    stats: {
      totalSKUs: 850,
      lowStockItems: 12,
      todayOrders: 45,
      revenueToday: 2850.50,
    },
    topProducts: [
      { name: 'Premium Dog Food 15kg', sales: 120 },
      { name: 'Squeaky Toy Varied', sales: 85 },
      { name: 'Cat Litter 10L', sales: 65 },
      { name: 'Flea Treatment Dogs', sales: 45 },
      { name: 'Leather Collar', sales: 30 },
    ],
    revenueByCategory: [
      { month: 'Jan', food: 4000, medicine: 2400, accessories: 1200 },
      { month: 'Feb', food: 3000, medicine: 1398, accessories: 1500 },
      { month: 'Mar', food: 2000, medicine: 9800, accessories: 1800 },
      { month: 'Apr', food: 2780, medicine: 3908, accessories: 2000 },
      { month: 'May', food: 1890, medicine: 4800, accessories: 2181 },
      { month: 'Jun', food: 2390, medicine: 3800, accessories: 2500 },
    ],
    inventory: [
      { id: 'SKU-001', name: 'Premium Dry Dog Food', category: 'Food', stock: 45, reorder: 20, price: 54.99 },
      { id: 'SKU-002', name: 'Flea & Tick Prevention', category: 'Medicine', stock: 8, reorder: 15, price: 29.99 },
      { id: 'SKU-003', name: 'Interactive Cat Wand', category: 'Accessory', stock: 112, reorder: 30, price: 9.99 },
      { id: 'SKU-004', name: 'Large Dog Bed', category: 'Accessory', stock: 5, reorder: 10, price: 65.00 },
      { id: 'SKU-005', name: 'Grain-Free Salmon Mix', category: 'Food', stock: 24, reorder: 15, price: 42.50 },
      { id: 'SKU-006', name: 'Joint Health Supplement', category: 'Medicine', stock: 3, reorder: 12, price: 34.00 },
    ],
    orders: [
      { id: 'ORD-7721', customer: 'Alice Brown', items: 3, total: 124.50, status: 'processing' },
      { id: 'ORD-7720', customer: 'David Clark', items: 1, total: 54.99, status: 'shipped' },
      { id: 'ORD-7719', customer: 'Eva Green', items: 5, total: 210.25, status: 'delivered' },
      { id: 'ORD-7718', customer: 'Frank Miller', items: 2, total: 44.98, status: 'processing' },
      { id: 'ORD-7717', customer: 'Grace Lee', items: 1, total: 65.00, status: 'delivered' },
    ]
  }
};
