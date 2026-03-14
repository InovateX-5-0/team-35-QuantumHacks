import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, TextInput, Alert } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { ChevronLeft, MapPin, AlertCircle, Search, Filter, Plus } from 'lucide-react-native';
import BottomTab from '../components/Navigation';

const LostFound = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const lostPets = [
    {
      id: 'l1',
      name: 'Buddy',
      type: 'Dog',
      breed: 'Golden Retriever',
      lastSeen: 'Prospect Park, Brooklyn',
      status: 'Lost',
      time: '2 hours ago',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=400',
      contact: '555-0101'
    },
    {
      id: 'l2',
      name: 'Mittens',
      type: 'Cat',
      breed: 'Calico',
      lastSeen: '7th Ave, Manhattan',
      status: 'Found',
      time: '1 day ago',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400',
      contact: '555-0202'
    },
    {
        id: 'l3',
        name: 'Max',
        type: 'Dog',
        breed: 'Beagle',
        lastSeen: 'Central Park, NY',
        status: 'Lost',
        time: '3 hours ago',
        image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=400',
        contact: '555-0303'
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ChevronLeft size={24} color="#0f172a" />
          </TouchableOpacity>
          <Text style={styles.title}>Lost & Found</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Search & Filter */}
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#64748b" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by area, breed..."
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <Filter size={20} color="#48d877" />
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
            <Link href="/report-pet" asChild>
              <TouchableOpacity style={styles.reportBtn}>
                  <Plus size={20} color="#ffffff" />
                  <Text style={styles.reportBtnText}>Report a Pet</Text>
              </TouchableOpacity>
            </Link>
        </View>

        {/* Feed */}
        <View style={styles.feed}>
          <Text style={styles.sectionTitle}>Recent Reports</Text>
          {lostPets.map((pet) => (
            <TouchableOpacity key={pet.id} style={styles.petCard}>
              <Image source={{ uri: pet.image }} style={styles.petImage} />
              <View style={styles.petInfo}>
                <View style={styles.petHeader}>
                  <Text style={styles.petName}>{pet.name || 'Unknown'}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: pet.status === 'Lost' ? '#fee2e2' : '#dcfce7' }]}>
                    <Text style={[styles.statusBadgeText, { color: pet.status === 'Lost' ? '#ef4444' : '#059669' }]}>
                      {pet.status}
                    </Text>
                  </View>
                </View>
                <Text style={styles.petBreed}>{pet.breed} • {pet.type}</Text>
                <View style={styles.locationRow}>
                  <MapPin size={14} color="#64748b" />
                  <Text style={styles.locationText}>{pet.lastSeen}</Text>
                </View>
                <View style={styles.cardFooter}>
                    <Text style={styles.timeAgo}>{pet.time}</Text>
                    <Link href={{ pathname: '/contact', params: { name: pet.name || 'Owner' } }} asChild>
                        <TouchableOpacity style={styles.contactBtn}>
                            <Text style={styles.contactText}>Contact</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 40,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  searchRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  filterBtn: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionRow: {
    marginBottom: 24,
  },
  reportBtn: {
    flexDirection: 'row',
    backgroundColor: '#f43f5e',
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#f43f5e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  reportBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  feed: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 16,
  },
  petCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  petImage: {
    width: 120,
    height: 120,
  },
  petInfo: {
    flex: 1,
    padding: 12,
  },
  petHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  petBreed: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  locationText: {
    fontSize: 12,
    color: '#64748b',
  },
  cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  timeAgo: {
    fontSize: 11,
    color: '#94a3b8',
  },
  contactBtn: {
      backgroundColor: '#f8fafc',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#e2e8f0',
  },
  contactText: {
      fontSize: 11,
      fontWeight: '600',
      color: '#475569',
  }
});

export default LostFound;
