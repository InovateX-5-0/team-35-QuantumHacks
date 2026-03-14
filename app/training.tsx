import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { ChevronLeft, MapPin, Star, GraduationCap, Clock } from 'lucide-react-native';
import BottomTab from '../components/Navigation';

const Training = () => {
  const centers = [
    {
      id: 't1',
      name: 'Elite K9 Training',
      specialty: 'Obedience & Behavior',
      distance: '2.5 km',
      rating: 4.9,
      reviews: 210,
      image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=400',
      openNow: true,
      price: 'From $60/hr'
    },
    {
      id: 't2',
      name: 'Puppy Kindergarten',
      specialty: 'Puppy Socialization',
      distance: '4.0 km',
      rating: 4.7,
      reviews: 94,
      image: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&q=80&w=400',
      openNow: true,
      price: 'From $45/hr'
    },
    {
      id: 't3',
      name: 'Agility Masters',
      specialty: 'Sports & Agility',
      distance: '6.2 km',
      rating: 4.8,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&q=80&w=400',
      openNow: false,
      price: 'From $70/hr'
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
          <Text style={styles.title}>Training Centers</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.heroSection}>
          <View style={styles.heroIcon}>
            <GraduationCap size={32} color="#059669" />
          </View>
          <Text style={styles.heroTitle}>Master New Tricks</Text>
          <Text style={styles.heroSubtitle}>Connect with expert trainers to teach your pet good behavior.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Trainers</Text>
          {centers.map((center) => (
            <TouchableOpacity key={center.id} style={styles.card}>
               <Image source={{ uri: center.image }} style={styles.cardImage} />
              <View style={styles.cardInfo}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardName} numberOfLines={1}>{center.name}</Text>
                  <View style={styles.ratingRow}>
                    <Star size={12} color="#fbbf24" fill="#fbbf24" />
                    <Text style={styles.ratingText}>{center.rating}</Text>
                  </View>
                </View>
                <Text style={styles.cardCategory}>{center.specialty}</Text>
                
                <View style={styles.detailsRow}>
                  <View style={styles.iconTextRow}>
                    <MapPin size={12} color="#94a3b8" />
                    <Text style={styles.iconText}>{center.distance}</Text>
                  </View>
                  <View style={styles.statusBadge}>
                    <Clock size={12} color={center.openNow ? '#22c55e' : '#ef4444'} />
                    <Text style={[styles.statusText, { color: center.openNow ? '#22c55e' : '#ef4444' }]}>
                      {center.openNow ? 'Open Now' : 'Closed'}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.cardFooter}>
                  <Text style={styles.priceText}>{center.price}</Text>
                  <Link href="/booking" asChild>
                    <TouchableOpacity style={styles.bookBtn}>
                      <Text style={styles.bookBtnText}>Book Class</Text>
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
  heroSection: { backgroundColor: '#d1fae5', borderRadius: 24, padding: 24, alignItems: 'center', marginBottom: 24 },
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
  priceText: { fontSize: 14, fontWeight: 'bold', color: '#059669' },
  bookBtn: { backgroundColor: '#059669', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  bookBtnText: { color: '#ffffff', fontSize: 12, fontWeight: 'bold' },
});

export default Training;
