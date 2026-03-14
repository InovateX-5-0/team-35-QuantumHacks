import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, MapPin, Star, Clock, AlertCircle } from 'lucide-react-native';
import BottomTab from '../components/Navigation';

// Comprehensive mock data for global search
const ALL_SERVICES = [
  { id: 's1', name: 'Happy Paws Vet Clinic', type: 'Veterinary', distance: '0.8 km', rating: 4.9, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200', openNow: true, route: '/vets' },
  { id: 's2', name: 'City Pet Hospital', type: 'Veterinary / Emergency', distance: '2.5 km', rating: 4.5, image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=200', openNow: true, route: '/vets' },
  { id: 's3', name: 'PetSmart Store', type: 'Pet Shop / Food', distance: '1.2 km', rating: 4.7, image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=200', openNow: true, route: '/marketplace' },
  { id: 's4', name: 'Paws & Claws Dental', type: 'Dentistry', distance: '2.1 km', rating: 4.6, image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=200', openNow: true, route: '/vets' },
  { id: 's5', name: 'Fluffy Cuts Grooming', type: 'Grooming / Spa', distance: '3.0 km', rating: 4.8, image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=200', openNow: false, route: '/grooming' },
  { id: 's6', name: 'Good Boy Academy', type: 'Training / Obedience', distance: '4.5 km', rating: 4.9, image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=200', openNow: true, route: '/training' },
  { id: 's7', name: 'Central Bark Park', type: 'Park / Outdoors', distance: '1.5 km', rating: 4.8, image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200', openNow: true, route: '/parks' },
  { id: 's8', name: 'Luxury Pet Resort', type: 'Hotel / Boarding', distance: '5.2 km', rating: 4.7, image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=200', openNow: true, route: '/services' },
];

const LOST_PETS = [
  { id: 'l1', name: 'Buddy', type: 'Golden Retriever', lastSeen: 'Prospect Park, Brooklyn', status: 'Lost', time: '2 hours ago', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200' },
  { id: 'l2', name: 'Mittens', type: 'Calico Cat', lastSeen: '7th Ave, Manhattan', status: 'Found', time: '1 day ago', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=200' }
];

export default function Explore() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('services');

  // Global Search Logic using useMemo for performance
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return ALL_SERVICES; // Show all by default
    
    const query = searchQuery.toLowerCase();
    return ALL_SERVICES.filter(service => 
      service.name.toLowerCase().includes(query) || 
      service.type.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const lostPetsResults = useMemo(() => {
    if (!searchQuery.trim()) return LOST_PETS;
    
    const query = searchQuery.toLowerCase();
    return LOST_PETS.filter(pet => 
      pet.name.toLowerCase().includes(query) || 
      pet.type.toLowerCase().includes(query) ||
      pet.lastSeen.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleRoute = (route: string) => {
    try {
      router.push(route as any);
    } catch (e) {
      console.error('Navigation error:', e);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Global Search</Text>
          <Text style={styles.subtitle}>Find anything in PawCare</Text>
        </View>

        {/* Global Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            placeholder={activeTab === 'lost' ? "Search for lost dogs, cats, locations..." : "Search for vets, shops, grooming, parks..."}
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
          />
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            onPress={() => setActiveTab('services')}
            style={[styles.tab, activeTab === 'services' ? styles.activeTab : null]}
          >
            <Text style={[styles.tabText, activeTab === 'services' ? styles.activeTabText : null]}>Services & Places</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab('lost')}
            style={[styles.tab, activeTab === 'lost' ? styles.activeTab : null]}
          >
            <Text style={[styles.tabText, activeTab === 'lost' ? styles.activeTabText : null]}>Lost & Found</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'services' ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {searchQuery ? `Search Results (${searchResults.length})` : 'All Available Services'}
            </Text>
            
            {searchResults.length === 0 ? (
              <View style={styles.emptyState}>
                <AlertCircle size={40} color="#94a3b8" />
                <Text style={styles.emptyText}>No services found matching "{searchQuery}"</Text>
              </View>
            ) : (
              searchResults.map((place) => (
                <TouchableOpacity key={place.id} style={styles.placeCard} onPress={() => handleRoute(place.route)}>
                  <Image source={{ uri: place.image }} style={styles.placeImage} />
                  <View style={styles.placeContent}>
                    <View style={styles.placeHeader}>
                      <Text style={styles.placeName} numberOfLines={1}>{place.name}</Text>
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
              ))
            )}
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {searchQuery ? `Found Reports (${lostPetsResults.length})` : 'Recent Reports'}
            </Text>
            
            {lostPetsResults.length === 0 ? (
              <View style={styles.emptyState}>
                <AlertCircle size={40} color="#94a3b8" />
                <Text style={styles.emptyText}>No missing pets found matching "{searchQuery}"</Text>
              </View>
            ) : (
              lostPetsResults.map((pet) => (
                <TouchableOpacity key={pet.id} style={styles.placeCard} onPress={() => handleRoute('/lost-found')}>
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
              ))
            )}
            
            <TouchableOpacity style={styles.reportBtn} onPress={() => handleRoute('/lost-found')}>
              <AlertCircle size={20} color="#ffffff" />
              <Text style={styles.reportBtnText}>Report a New Sighting</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{ height: 100 }} />
      </ScrollView>
      <BottomTab />
    </View>
  );
}

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
    borderWidth: 2,
    borderColor: '#48d877',
    shadowColor: '#48d877',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#0f172a',
    fontWeight: '500',
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
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#cbd5e1',
  },
  emptyText: {
    marginTop: 12,
    fontSize: 14,
    color: '#64748b',
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
    fontWeight: '500',
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
    backgroundColor: '#0f172a',
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
