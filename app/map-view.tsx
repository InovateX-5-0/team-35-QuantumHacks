import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, MapPin } from 'lucide-react-native';

const MapView = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.title}>Directions</Text>
        <View style={{ width: 40 }} />
      </View>
      
      {/* Simulated Map View */}
      <View style={styles.mapContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600' }} 
          style={styles.mapImage} 
        />
        <View style={styles.pin}>
          <MapPin size={32} color="#f43f5e" fill="#f43f5e" />
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.destTitle}>Destination</Text>
        <Text style={styles.destName}>Central Pet Park</Text>
        <Text style={styles.destDetails}>1.5 km away • 5 mins drive</Text>
        <TouchableOpacity style={styles.startBtn}>
          <Text style={styles.startBtnText}>Start Navigation</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 16, marginTop: 40, zIndex: 10 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', elevation: 2 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#0f172a' },
  mapContainer: { flex: 1, position: 'relative' },
  mapImage: { width: '100%', height: '100%', opacity: 0.8 },
  pin: { position: 'absolute', top: '50%', left: '50%', marginLeft: -16, marginTop: -32 },
  infoCard: { backgroundColor: '#ffffff', padding: 24, borderTopLeftRadius: 32, borderTopRightRadius: 32, shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 10 },
  destTitle: { fontSize: 12, color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 4 },
  destName: { fontSize: 24, fontWeight: 'bold', color: '#0f172a', marginBottom: 8 },
  destDetails: { fontSize: 14, color: '#64748b', marginBottom: 24 },
  startBtn: { backgroundColor: '#4f46e5', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  startBtnText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' }
});

export default MapView;
