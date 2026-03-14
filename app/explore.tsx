import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter, Link } from 'expo-router';
import { Search, MapPin, Star, Phone, Clock, AlertCircle } from 'lucide-react-native';
import BottomTab from '../components/Navigation';

const Explore = () => {
  const router = useRouter();
  const { filter: initialFilter } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(initialFilter === 'lost' ? 'Lost & Found' : 'Nearby Services');

  const categories = [
    { id: '1', name: 'Vet Clinics', icon: '🏥', color: '#fee2e2' },
    { id: '2', name: 'Pet Shops', icon: '🛍️', color: '#dbeafe' },
    { id: '3', name: 'Grooming', icon: '✂️', color: '#fef3c7' },
    { id: '4', name: 'Training', icon: '🎓', color: '#d1fae5' },
    { id: '5', name: 'Parks', icon: '🌳', color: '#e0e7ff' },
    { id: '6', name: 'Hotels', icon: '🏨', color: '#fce7f3' },
  ];

  const nearbyPlaces = [
    {
      id: '1',
      name: 'Happy Paws Vet Clinic',
      type: 'Veterinary',
      distance: '0.8 km',
      rating: 4.9,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
      openNow: true,
    },
    {
      id: '2',
      name: 'PetSmart Store',
      type: 'Pet Shop',
      distance: '1.2 km',
      rating: 4.7,
      reviews: 256,
      image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=200',
      openNow: true,
    },
    {
      id: '3',
      name: 'Paws & Claws Dental',
      type: 'Dentistry',
      distance: '2.1 km',
      rating: 4.6,
      reviews: 45,
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=200',
      openNow: true,
    }
  ];

  const lostPets = [
      {
          id: 'l1',
          name: 'Buddy',
          type: 'Golden Retriever',
          lastSeen: 'Prospect Park, Brooklyn',
          status: 'Lost',
          time: '2 hours ago',
          image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200'
      },
      {
          id: 'l2',
          name: 'Mittens',
          type: 'Calico Cat',
          lastSeen: '7th Ave, Manhattan',
          status: 'Found',
          time: '1 day ago',
          image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=200'
      }
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Explore</Text>
          <Text style={styles.subtitle}>Discover pet services near you</Text>
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabContainer}>
            <TouchableOpacity 
                onPress={() => setActiveTab('Nearby Services')}
                style={{ ...styles.tab, ...(activeTab === 'Nearby Services' ? styles.activeTab : {}) }}
            >
                <Text style={[styles.tabText, activeTab === 'Nearby Services' && styles.activeTabText]}>Services</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => setActiveTab('Lost & Found')}
                style={{ ...styles.tab, ...(activeTab === 'Lost & Found' ? styles.activeTab : {}) }}
            >
                <Text style={[styles.tabText, activeTab === 'Lost & Found' && styles.activeTabText]}>Lost & Found</Text>
            </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            placeholder={activeTab === 'Lost & Found' ? "Search lost pets..." : "Search for vets, shops, grooming..."}
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {activeTab === 'Nearby Services' ? (
            <>
                {/* Categories */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Categories</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {categories.map((category) => {
                            const routeMap: Record<string, string> = {
                                'Vet Clinics': '/vets',
                                'Pet Shops': '/marketplace',
                                'Grooming': '/grooming',
                                'Training': '/training',
                                'Parks': '/parks',
                                'Hotels': '/services'
                            };
                            return (
                                <Link key={category.id} href={routeMap[category.name] as any} asChild>
                                    <TouchableOpacity style={{ ...styles.categoryCard, backgroundColor: category.color }}>
                                        <Text style={styles.categoryIcon}>{category.icon}</Text>
                                        <Text style={styles.categoryName}>{category.name}</Text>
                                    </TouchableOpacity>
                                </Link>
                            );
                        })}
                    </ScrollView>
                </View>

                {/* Nearby Places */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Nearby Places</Text>
                    {nearbyPlaces.map((place) => (
                        <Link key={place.id} href="/vets" asChild>
                            <TouchableOpacity style={styles.placeCard}>
                                <Image source={{ uri: place.image }} style={styles.placeImage} />
                                <View style={styles.placeContent}>
                                    <View style={styles.placeHeader}>
                                        <Text style={styles.placeName}>{place.name}</Text>
                                        <View style={styles.ratingBadge}>
                                            <Star size={12} color="#fbbf24" fill="#fbbf24" />
                                            <Text style={styles.ratingText}>{place.rating}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.placeType}>{place.type}</Text>
                                    <View style={styles.placeFooter}>
                                        <View style={styles.distanceRow}>
                                            <MapPin size={14} color="#64748b" />
                                            <Text style={styles.distanceText}>{place.distance}</Text>
                                        </View>
                                        <View style={styles.statusBadge}>
                                            <Clock size={12} color={place.openNow ? '#22c55e' : '#ef4444'} />
                                            <Text style={[styles.statusText, { color: place.openNow ? '#22c55e' : '#ef4444' }]}>
                                                {place.openNow ? 'Open Now' : 'Closed'}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Link>
                    ))}
                </View>
            </>
        ) : (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Lost & Found Reports</Text>
                {lostPets.map((pet) => (
                    <TouchableOpacity key={pet.id} style={styles.placeCard}>
                        <Image source={{ uri: pet.image }} style={styles.placeImage} />
                        <View style={styles.placeContent}>
                            <View style={styles.placeHeader}>
                                <Text style={styles.placeName}>{pet.name}</Text>
                                <View style={[styles.statusTag, { backgroundColor: pet.status === 'Lost' ? '#fee2e2' : '#dcfce7' }]}>
                                    <Text style={[styles.statusTagText, { color: pet.status === 'Lost' ? '#ef4444' : '#22c55e' }]}>{pet.status}</Text>
                                </View>
                            </View>
                            <Text style={styles.placeType}>{pet.type}</Text>
                            <View style={styles.locationRow}>
                                <MapPin size={14} color="#94a3b8" />
                                <Text style={styles.distanceText}>{pet.lastSeen}</Text>
                            </View>
                            <Text style={styles.timeAgo}>{pet.time}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.reportBtn} onPress={() => router.push('/lost-found')}>
                    <AlertCircle size={20} color="#ffffff" />
                    <Text style={styles.reportBtnText}>Go to Lost & Found Page</Text>
                </TouchableOpacity>
            </View>
        )}
        <View style={{ height: 100 }} />
      </ScrollView>
      <BottomTab />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#0f172a',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 16,
  },
  categoryCard: {
    width: 90,
    height: 90,
    borderRadius: 16,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0f172a',
    textAlign: 'center',
  },
  placeCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  placeImage: {
    width: 120,
    height: 120,
  },
  placeContent: {
    flex: 1,
    padding: 12,
  },
  placeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
    flex: 1,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#92400e',
    marginLeft: 4,
  },
  placeType: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 8,
  },
  placeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tabContainer: {
      flexDirection: 'row',
      backgroundColor: '#f1f5f9',
      padding: 4,
      borderRadius: 12,
      marginBottom: 20,
  },
  tab: {
      flex: 1,
      paddingVertical: 10,
      alignItems: 'center',
      borderRadius: 8,
  },
  activeTab: {
      backgroundColor: '#ffffff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
  },
  tabText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#64748b',
  },
  activeTabText: {
      color: '#0f172a',
  },
  statusTag: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
  },
  statusTagText: {
      fontSize: 10,
      fontWeight: 'bold',
  },
  locationRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginTop: 4,
  },
  timeAgo: {
      fontSize: 10,
      color: '#94a3b8',
      marginTop: 8,
  },
  reportBtn: {
      backgroundColor: '#f43f5e',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      paddingVertical: 16,
      borderRadius: 16,
      marginTop: 20,
  },
  reportBtnText: {
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: 16,
  }
});

export default Explore;
