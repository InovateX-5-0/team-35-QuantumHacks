import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Link } from 'expo-router';
import { ChevronLeft, Phone, MapPin, AlertTriangle, Info } from 'lucide-react-native';
import { EMERGENCY_TIPS } from '../src/data/mockData';
import BottomTab from '../components/Navigation';

const SOS = () => {
  const emergencyClinics = [
    {
      id: 'e1',
      name: 'Central 24/7 Pet Hospital',
      address: '123 Rescue Way, Manhattan, NY',
      phone: '+1 555-911-PETS',
      distance: '0.5 km',
    },
    {
      id: 'e2',
      name: 'Emergency Animal Care Center',
      address: '456 Safe St, Brooklyn, NY',
      phone: '+1 555-888-HELP',
      distance: '2.1 km',
    },
  ];

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Link href="/" asChild>
            <TouchableOpacity style={styles.backBtn}>
              <ChevronLeft size={24} color="#ffffff" />
            </TouchableOpacity>
          </Link>
          <Text style={styles.title}>Emergency SOS</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.alertBanner}>
          <AlertTriangle size={32} color="#ffffff" />
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>Immediate Help Needed?</Text>
            <Text style={styles.alertSubtitle}>Contact the nearest clinic below or follow emergency tips.</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearest Emergency Clinics</Text>
          {emergencyClinics.map((clinic) => (
            <View key={clinic.id} style={styles.clinicCard}>
              <View style={styles.clinicInfo}>
                <Text style={styles.clinicName}>{clinic.name}</Text>
                <View style={styles.infoRow}>
                  <MapPin size={14} color="#94a3b8" />
                  <Text style={styles.infoText}>{clinic.distance} • {clinic.address}</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.callBtn}
                onPress={() => handleCall(clinic.phone)}
              >
                <Phone size={20} color="#ffffff" />
                <Text style={styles.callBtnText}>Call</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency First Aid Tips</Text>
          {Object.entries(EMERGENCY_TIPS).map(([species, tips]) => (
            <View key={species} style={styles.tipsSection}>
              <Text style={styles.speciesTitle}>{species} Tips</Text>
              {tips.map((tip, idx) => (
                <View key={idx} style={styles.tipCard}>
                  <View style={styles.tipIcon}>
                    <Info size={16} color="#48d877" />
                  </View>
                  <View style={styles.tipContent}>
                    <Text style={styles.tipTitle}>{tip.title}</Text>
                    <Text style={styles.tipText}>{tip.tip}</Text>
                  </View>
                </View>
              ))}
            </View>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
    backgroundColor: '#f43f5e',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  alertBanner: {
    flexDirection: 'row',
    backgroundColor: '#f43f5e',
    padding: 24,
    paddingBottom: 40,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    gap: 16,
    alignItems: 'center',
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  alertSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  section: {
    padding: 16,
    marginTop: -20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 16,
    marginTop: 16,
  },
  clinicCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  clinicInfo: {
    flex: 1,
    marginRight: 12,
  },
  clinicName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#64748b',
  },
  callBtn: {
    backgroundColor: '#48d877',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
  },
  callBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tipsSection: {
    marginBottom: 24,
  },
  speciesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#94a3b8',
    textTransform: 'uppercase',
    marginBottom: 12,
    letterSpacing: 1,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  tipIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#48d8771a',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
  },
});

export default SOS;
