export const MOCK_CLINICS = [
  {
    id: '1',
    name: 'Happy Paws Vet Clinic',
    rating: 4.8,
    distance: '1.2 km',
    specialization: 'General Medicine, Surgery',
    hours: '08:00 - 20:00',
    contact: '+1 234 567 890',
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '2',
    name: 'City Pet Hospital',
    rating: 4.5,
    distance: '2.5 km',
    specialization: 'Emergency, Dental',
    hours: '24/7',
    contact: '+1 987 654 321',
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '3',
    name: 'Feline Friends Care',
    rating: 4.9,
    distance: '3.1 km',
    specialization: 'Cat Specialist',
    hours: '09:00 - 18:00',
    contact: '+1 555 000 111',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '4',
    name: 'Paws & Claws Dental',
    rating: 4.7,
    distance: '4.5 km',
    specialization: 'Pet Dentistry',
    hours: '08:30 - 17:30',
    contact: '+1 555 123 456',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '5',
    name: 'Exotic Pet Haven',
    rating: 4.6,
    distance: '5.2 km',
    specialization: 'Birds, Reptiles, Rabbits',
    hours: '10:00 - 19:00',
    contact: '+1 555 789 012',
    image: 'https://images.unsplash.com/photo-1522850949506-32f65ea53fc9?auto=format&fit=crop&q=80&w=400',
  }
];

export const MOCK_ADOPTION_PETS = [
  {
    id: 'a1',
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
    id: 'a2',
    name: 'Oliver',
    species: 'Cat',
    breed: 'Tabby',
    age: '6 months',
    location: 'Queens, NY',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400',
    shelter: 'Happy Whiskers Shelter',
    description: 'Oliver is a playful kitten who loves to cuddle and play with yarn.',
    adoptionFee: 100,
    personality: 'Playful, Curious, Cuddly',
    energy: 'Medium',
    health: 'Dewormed, Vaccinated'
  },
  {
    id: 'a3',
    name: 'Bella',
    species: 'Dog',
    breed: 'Beagle',
    age: '1 year',
    location: 'Manhattan, NY',
    image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=400',
    shelter: 'Manhattan Pet Rescue',
    description: 'Bella is a sweet Beagle who loves long walks and sniffing out new adventures.',
    adoptionFee: 200,
    personality: 'Sweet, Curious, Energetic',
    energy: 'High',
    health: 'Healthy, Vaccinated'
  },
  {
    id: 'a4',
    name: 'Mochi',
    species: 'Cat',
    breed: 'Siamese',
    age: '3 years',
    location: 'Staten Island, NY',
    image: 'https://images.unsplash.com/photo-1513245535761-07747efbd661?auto=format&fit=crop&q=80&w=400',
    shelter: 'Island Cat Rescue',
    description: 'Mochi is a calm and affectionate Siamese cat who enjoys quiet afternoons.',
    adoptionFee: 80,
    personality: 'Calm, Affectionate, Quiet',
    energy: 'Low',
    health: 'Vaccinated'
  }
];

export const MOCK_POSTS = [
  {
    id: 'p1',
    author: 'Sarah Jenkins',
    authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
    petName: 'Max',
    content: 'Just had a great walk at the park today! Max loved the new trail.',
    image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=400',
    likes: 24,
    comments: 5,
    time: '2h ago'
  },
  {
    id: 'p2',
    author: 'Mike Ross',
    authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
    petName: 'Whiskers',
    content: 'New scratching post is a hit! 🐱',
    image: 'https://images.unsplash.com/photo-1554692998-0d26ff83f34e?auto=format&fit=crop&q=80&w=400',
    likes: 42,
    comments: 8,
    time: '5h ago'
  },
  {
    id: 'p3',
    author: 'Elena Gilbert',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
    petName: 'Rex',
    content: 'Rex finally learned "Roll Over"! So proud of my smart boy. 🐕🦴',
    image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&q=80&w=400',
    likes: 56,
    comments: 12,
    time: '8h ago'
  },
  {
    id: 'p4',
    author: 'David Bowie',
    authorImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100',
    petName: 'Ziggy',
    content: 'Any tips for training a parrot? Ziggy is a bit too loud in the mornings! 🦜',
    image: 'https://images.unsplash.com/photo-1522850949506-32f65ea53fc9?auto=format&fit=crop&q=80&w=400',
    likes: 18,
    comments: 15,
    time: '12h ago'
  }
];

export const MOCK_PRODUCTS = [
  {
    id: 'prd1',
    name: 'Premium Puppy Food',
    price: 45.99,
    category: 'Food',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=400',
    description: 'High-protein puppy food for healthy growth.'
  },
  {
    id: 'prd2',
    name: 'Orthopedic Dog Bed',
    price: 89.00,
    category: 'Accessories',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1541599624620-fd5c98b8c654?auto=format&fit=crop&q=80&w=400',
    description: 'Slow-recovery memory foam for ultimate comfort.'
  },
  {
    id: 'prd3',
    name: 'Interactive Cat Laser',
    price: 15.50,
    category: 'Toys',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&q=80&w=400',
    description: 'Keeps your cat active and entertained for hours.'
  },
  {
    id: 'prd4',
    name: 'Automatic Pet Feeder',
    price: 120.00,
    category: 'Tech',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400',
    description: 'Schedule meals even when you are away.'
  }
];

export const EMERGENCY_TIPS = {
  Dog: [
    { title: 'Choking', tip: 'Check the mouth for obstructions. If visible, try to remove with fingers or tweezers.' },
    { title: 'Heatstroke', tip: 'Move to a cool area, apply cool (not cold) water to their fur, and provide small amounts of water.' }
  ],
  Cat: [
    { title: 'Poisoning', tip: 'Identify the substance. Do not induce vomiting unless instructed by a vet.' },
    { title: 'Bleeding', tip: 'Apply firm, direct pressure to the wound using a clean cloth or gauze.' }
  ]
};
