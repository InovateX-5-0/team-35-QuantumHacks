import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { ChevronLeft, MapPin, TreePine, Navigation } from 'lucide-react-native';
import BottomTab from '../components/Navigation';

const Parks = () => {
  const parks = [
    {
      id: 'p1',
      name: 'Central Dog Park',
      features: 'Fenced • Agility Course • Water Fountains',
      distance: '1.5 km',
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=400',
      openNow: true,
      time: '6:00 AM - 9:00 PM'
    },
    {
      id: 'p2',
      name: 'Riverside Trails',
      features: 'Off-leash trails • Lake swimming • Shaded',
      distance: '3.2 km',
      image: 'https://images.unsplash.com/photo-1601758124277-2f3b97089cdd?auto=format&fit=crop&q=80&w=400',
      openNow: true,
      time: 'Sunrise - Sunset'
    },
    {
      id: 'p3',
      name: 'Downtown Pet Plaza',
      features: 'Small dog area • Benches • Cleanup Stations',
      distance: '5.0 km',
      image: 'https://images.unsplash.com/photo-1494947665470-20322015e3a8?auto=format&fit=crop&q=80&w=400',
      openNow: true,
      time: '24/7'
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
          <Text style={styles.title}>Pet-Friendly Parks</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.heroSection}>
          <View style={styles.heroIcon}>
            <TreePine size={32} color="#4f46e5" />
          </View>
          <Text style={styles.heroTitle}>Explore the Outdoors</Text>
          <Text style={styles.heroSubtitle}>Find the perfect parks and trails to let your pet run free and play.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Parks</Text>
          {parks.map((park) => (
            <TouchableOpacity key={park.id} style={styles.card}>
               <Image source={{ uri: park.image }} style={styles.cardImage} />
              <View style={styles.cardInfo}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardName} numberOfLines={1}>{park.name}</Text>
                </View>
                <Text style={styles.cardCategory}>{park.features}</Text>
                
                <View style={styles.detailsRow}>
                  <View style={styles.iconTextRow}>
                    <MapPin size={12} color="#94a3b8" />
                    <Text style={styles.iconText}>{park.distance}</Text>
                  </View>
                  <Text style={styles.timeText}>{park.time}</Text>
                </View>
                
                <View style={styles.cardFooter}>
                  <Link href="/map-view" asChild>
                    <TouchableOpacity style={styles.directionsBtn}>
                      <Navigation size={16} color="#4f46e5" />
                      <Text style={styles.directionsBtnText}>Get Directions</Text>
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
  heroSection: { backgroundColor: '#e0e7ff', borderRadius: 24, padding: 24, alignItems: 'center', marginBottom: 24 },
  heroIcon: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 20, fontWeight: 'bold', color: '#0f172a', marginBottom: 8 },
  heroSubtitle: { fontSize: 14, color: '#0f172a', opacity: 0.7, textAlign: 'center', paddingHorizontal: 16 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#0f172a', marginBottom: 16 },
  card: { backgroundColor: '#ffffff', borderRadius: 20, marginBottom: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
  cardImage: { width: '100%', height: 160 },
  cardInfo: { padding: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  cardName: { fontSize: 16, fontWeight: 'bold', color: '#0f172a', flex: 1 },
  cardCategory: { fontSize: 13, color: '#64748b', marginBottom: 12 },
  detailsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  iconTextRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  iconText: { fontSize: 12, color: '#64748b' },
  timeText: { fontSize: 12, color: '#64748b', fontWeight: '500' },
  cardFooter: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  directionsBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#e0e7ff', width: '100%', justifyContent: 'center', paddingVertical: 12, borderRadius: 12 },
  directionsBtnText: { color: '#4f46e5', fontSize: 14, fontWeight: 'bold' },
});

export default Parks;
