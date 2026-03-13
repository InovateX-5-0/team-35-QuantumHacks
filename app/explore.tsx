import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { Link } from 'expo-router';
import { Search, MapPin, Star, Phone, Clock } from 'lucide-react-native';
import BottomTab from '../components/Navigation';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');

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
      name: 'Paws & Bubbles Grooming',
      type: 'Grooming',
      distance: '1.5 km',
      rating: 4.8,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1591768793355-74d7c836038c?auto=format&fit=crop&q=80&w=200',
      openNow: false,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Explore</Text>
          <Text style={styles.subtitle}>Discover pet services near you</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for vets, shops, grooming..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity key={category.id} style={[styles.categoryCard, { backgroundColor: category.color }]}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Nearby Places */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Places</Text>
          {nearbyPlaces.map((place) => (
            <TouchableOpacity key={place.id} style={styles.placeCard}>
              <Image source={{ uri: place.image }} style={styles.placeImage} />
              <View style={styles.placeContent}>
                <View style={styles.placeHeader}>
                  <Text style={styles.placeName}>{place.name}</Text>
                  <View style={styles.ratingBadge}>
                    <Star size={12} color="#fbbf24" fill="#fbbf24" />
                    <Text style={styles.ratingText}>{place.rating}</Text>
                    <Text style={styles.reviewsText}>({place.reviews})</Text>
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
    marginBottom: 20,
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
  reviewsText: {
    fontSize: 10,
    color: '#92400e',
    marginLeft: 2,
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
});

export default Explore;
