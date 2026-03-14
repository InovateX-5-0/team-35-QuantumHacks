import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { ChevronLeft, MapPin, Star, Scissors, Clock } from 'lucide-react-native';
import BottomTab from '../components/Navigation';

const Grooming = () => {
  const spas = [
    {
      id: 'g1',
      name: 'Pawsome Grooming Spa',
      specialty: 'Full Service Pet Spa',
      distance: '1.2 km',
      rating: 4.8,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=400',
      openNow: true,
      price: 'From $40'
    },
    {
      id: 'g2',
      name: 'The Wagging Tail Salon',
      specialty: 'Premium Dog Grooming',
      distance: '2.5 km',
      rating: 4.9,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&q=80&w=400',
      openNow: true,
      price: 'From $55'
    },
    {
      id: 'g3',
      name: 'Purrfect Cuts',
      specialty: 'Cat Specialized Grooming',
      distance: '4.1 km',
      rating: 4.7,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400',
      openNow: false,
      price: 'From $45'
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
          <Text style={styles.title}>Grooming Spas</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.heroSection}>
          <View style={styles.heroIcon}>
            <Scissors size={32} color="#d97706" />
          </View>
          <Text style={styles.heroTitle}>Pamper Your Pet</Text>
          <Text style={styles.heroSubtitle}>Book professional grooming services to keep them looking their best.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Rated Salons</Text>
          {spas.map((spa) => (
            <TouchableOpacity key={spa.id} style={styles.card}>
               <Image source={{ uri: spa.image }} style={styles.cardImage} />
              <View style={styles.cardInfo}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardName} numberOfLines={1}>{spa.name}</Text>
                  <View style={styles.ratingRow}>
                    <Star size={12} color="#fbbf24" fill="#fbbf24" />
                    <Text style={styles.ratingText}>{spa.rating}</Text>
                  </View>
                </View>
                <Text style={styles.cardCategory}>{spa.specialty}</Text>
                
                <View style={styles.detailsRow}>
                  <View style={styles.iconTextRow}>
                    <MapPin size={12} color="#94a3b8" />
                    <Text style={styles.iconText}>{spa.distance}</Text>
                  </View>
                  <View style={styles.statusBadge}>
                    <Clock size={12} color={spa.openNow ? '#22c55e' : '#ef4444'} />
                    <Text style={[styles.statusText, { color: spa.openNow ? '#22c55e' : '#ef4444' }]}>
                      {spa.openNow ? 'Open Now' : 'Closed'}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.cardFooter}>
                  <Text style={styles.priceText}>{spa.price}</Text>
                  <Link href="/booking" asChild>
                    <TouchableOpacity style={styles.bookBtn}>
                      <Text style={styles.bookBtnText}>Book Now</Text>
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
  container: { flex: 1, backgroundColor: '#f8fafc' },
  scrollView: { flex: 1, padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#0f172a' },
  heroSection: { backgroundColor: '#fef3c7', borderRadius: 24, padding: 24, alignItems: 'center', marginBottom: 24 },
  heroIcon: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 20, fontWeight: 'bold', color: '#0f172a', marginBottom: 8 },
  heroSubtitle: { fontSize: 14, color: '#0f172a', opacity: 0.7, textAlign: 'center', paddingHorizontal: 16 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#0f172a', marginBottom: 16 },
  card: { backgroundColor: '#ffffff', borderRadius: 20, marginBottom: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
  cardImage: { width: '100%', height: 160 },
  cardInfo: { padding: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  cardName: { fontSize: 16, fontWeight: 'bold', color: '#0f172a', flex: 1, marginRight: 8 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#fef3c7', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  ratingText: { fontSize: 12, fontWeight: 'bold', color: '#92400e' },
  cardCategory: { fontSize: 13, color: '#64748b', marginBottom: 12 },
  detailsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  iconTextRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  iconText: { fontSize: 12, color: '#64748b' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statusText: { fontSize: 12, fontWeight: '600' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  priceText: { fontSize: 14, fontWeight: 'bold', color: '#d97706' },
  bookBtn: { backgroundColor: '#d97706', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  bookBtnText: { color: '#ffffff', fontSize: 12, fontWeight: 'bold' },
});

export default Grooming;
