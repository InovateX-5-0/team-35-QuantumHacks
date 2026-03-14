import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { ChevronLeft, MapPin, Star, Stethoscope, Clock, Phone } from 'lucide-react-native';
import BottomTab from '../components/Navigation';

const Vets = () => {
  const vetClinics = [
    {
      id: 'v1',
      name: 'Happy Paws Vet Clinic',
      specialty: 'General Veterinary Care',
      distance: '0.8 km',
      rating: 4.9,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
      openNow: true,
      price: 'Consultation: $50'
    },
    {
      id: 'v2',
      name: 'City Pet Hospital',
      specialty: 'Emergency 24/7 & Surgery',
      distance: '3.5 km',
      rating: 4.8,
      reviews: 342,
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400',
      openNow: true,
      price: 'Consultation: $85'
    },
    {
      id: 'v3',
      name: 'Paws & Claws Dental',
      specialty: 'Pet Dentistry',
      distance: '2.1 km',
      rating: 4.6,
      reviews: 45,
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=400',
      openNow: false,
      price: 'Consultation: $60'
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Link href="/" asChild>
            <TouchableOpacity style={styles.backBtn}>
              <ChevronLeft size={24} color="#0f172a" />
            </TouchableOpacity>
          </Link>
          <Text style={styles.title}>Vet Clinics</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.heroSection}>
          <View style={styles.heroIcon}>
            <Stethoscope size={32} color="#0d9488" />
          </View>
          <Text style={styles.heroTitle}>Find Top Veterinarians</Text>
          <Text style={styles.heroSubtitle}>Book appointments with trusted professionals for your pet's health.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Clinics</Text>
          {vetClinics.map((clinic) => (
            <TouchableOpacity key={clinic.id} style={styles.card}>
              <Image source={{ uri: clinic.image }} style={styles.cardImage} />
              <View style={styles.cardInfo}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardName} numberOfLines={1}>{clinic.name}</Text>
                  <View style={styles.ratingRow}>
                    <Star size={12} color="#fbbf24" fill="#fbbf24" />
                    <Text style={styles.ratingText}>{clinic.rating}</Text>
                  </View>
                </View>
                <Text style={styles.cardCategory}>{clinic.specialty}</Text>
                
                <View style={styles.detailsRow}>
                  <View style={styles.iconTextRow}>
                    <MapPin size={12} color="#94a3b8" />
                    <Text style={styles.iconText}>{clinic.distance}</Text>
                  </View>
                  <View style={styles.statusBadge}>
                    <Clock size={12} color={clinic.openNow ? '#22c55e' : '#ef4444'} />
                    <Text style={[styles.statusText, { color: clinic.openNow ? '#22c55e' : '#ef4444' }]}>
                      {clinic.openNow ? 'Open Now' : 'Closed'}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.cardFooter}>
                  <Text style={styles.priceText}>{clinic.price}</Text>
                  <Link href="/booking" asChild>
                    <TouchableOpacity style={styles.bookBtn}>
                      <Text style={styles.bookBtnText}>Book Appt</Text>
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
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  heroSection: {
    backgroundColor: '#ccfbf1',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  heroIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#0f172a',
    opacity: 0.7,
    textAlign: 'center',
    paddingHorizontal: 16,
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
  card: {
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
  cardImage: {
    width: '100%',
    height: 160,
  },
  cardInfo: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
    flex: 1,
    marginRight: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#92400e',
  },
  cardCategory: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  iconTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconText: {
    fontSize: 12,
    color: '#64748b',
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
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0d9488',
  },
  bookBtn: {
    backgroundColor: '#0d9488',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  bookBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Vets;
