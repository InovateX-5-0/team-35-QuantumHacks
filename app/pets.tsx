import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import BottomTab from '../components/Navigation';
import { Plus, Calendar, Syringe, Clipboard, X, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const Pets = () => {
  const { pets, appointments } = useApp();
  const router = useRouter();
  const [selectedPet, setSelectedPet] = React.useState<any>(null);
  const [showVaxModal, setShowVaxModal] = React.useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>My Pets</Text>
          <Text style={styles.subtitle}>Manage your furry friends</Text>
        </View>

        {/* Add Pet Button */}
        <TouchableOpacity 
          style={styles.addPetBtn}
          onPress={() => router.push('/add-pet')}
        >
          <Plus size={24} color="#ffffff" />
          <Text style={styles.addPetText}>Add New Pet</Text>
        </TouchableOpacity>

        {/* Pets List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Pets ({pets.length})</Text>
          {pets.map((pet) => {
            const upcomingAppointment = appointments.find(
              (apt) => apt.petId === pet.id && apt.status === 'Upcoming'
            );

            return (
              <TouchableOpacity key={pet.id} style={styles.petCard}>
                <Image source={{ uri: pet.image }} style={styles.petImage} />
                <View style={styles.petContent}>
                  <View style={styles.petHeader}>
                    <Text style={styles.petName}>{pet.name}</Text>
                    <Text style={styles.petBreed}>{pet.breed}</Text>
                  </View>
                  <View style={styles.petInfo}>
                    <Text style={styles.petDetail}>
                      {pet.type} • {pet.age} years old
                    </Text>
                  </View>
                  {upcomingAppointment && (
                    <View style={styles.appointmentBadge}>
                      <Calendar size={14} color="#059669" />
                      <Text style={styles.appointmentText}>
                        Next: {upcomingAppointment.date} at {upcomingAppointment.time}
                      </Text>
                    </View>
                  )}
                  <View style={styles.petActions}>
                    <TouchableOpacity 
                      style={styles.actionBtn}
                      onPress={() => {
                        setSelectedPet(pet);
                        setShowVaxModal(true);
                      }}
                    >
                      <Syringe size={16} color="#48d877" />
                      <Text style={styles.actionText}>Vaccination</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.actionBtn, styles.secondaryBtn]}
                      onPress={() => router.push({ pathname: '/edit-pet', params: { id: pet.id } })}
                    >
                      <Text style={[styles.actionText, styles.secondaryText]}>Edit Profile</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
      <BottomTab />

      {/* Vaccination & Records Modal */}
      <Modal
        visible={showVaxModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleRow}>
                <Syringe size={24} color="#48d877" />
                <Text style={styles.modalTitle}>{selectedPet?.name}'s Records</Text>
              </View>
              <TouchableOpacity onPress={() => setShowVaxModal(false)}>
                <X size={24} color="#64748b" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.cardSectionTitle}>Vaccinations</Text>
              {selectedPet?.vaccinations?.length > 0 ? (
                selectedPet.vaccinations.map((vax: any, i: number) => (
                  <View key={i} style={styles.recordItem}>
                    <View>
                      <Text style={styles.recordName}>{vax.name}</Text>
                      <Text style={styles.recordSub}>Last dose: {vax.date}</Text>
                    </View>
                    <View style={styles.nextDueBadge}>
                      <Text style={styles.nextDueText}>Due: {vax.nextDue}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.emptyText}>No vaccinations on record.</Text>
              )}

              <Text style={[styles.cardSectionTitle, { marginTop: 24 }]}>Medical History</Text>
              {selectedPet?.medicalRecords?.length > 0 ? (
                selectedPet.medicalRecords.map((rec: any, i: number) => (
                  <View key={i} style={styles.recordItem}>
                    <View>
                      <Text style={styles.recordName}>{rec.diagnosis}</Text>
                      <Text style={styles.recordSub}>{rec.vet} • {rec.date}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.emptyText}>No medical records found.</Text>
              )}
            </ScrollView>

            <TouchableOpacity style={styles.closeBtn} onPress={() => setShowVaxModal(false)}>
              <Text style={styles.closeBtnText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
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
  addPetBtn: {
    flexDirection: 'row',
    backgroundColor: '#48d877',
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
    shadowColor: '#48d877',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addPetText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
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
  petCard: {
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
  petImage: {
    width: 120,
    height: 120,
  },
  petContent: {
    flex: 1,
    padding: 12,
  },
  petHeader: {
    marginBottom: 8,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  petBreed: {
    fontSize: 14,
    color: '#64748b',
  },
  petInfo: {
    marginBottom: 8,
  },
  petDetail: {
    fontSize: 13,
    color: '#475569',
  },
  appointmentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d1fae5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
    gap: 6,
  },
  appointmentText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#065f46',
  },
  petActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  secondaryBtn: {
    backgroundColor: '#f1f5f9',
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#48d877',
  },
  secondaryText: {
    color: '#475569',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  cardSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  recordName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 2,
  },
  recordSub: {
    fontSize: 12,
    color: '#64748b',
  },
  nextDueBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  nextDueText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#d97706',
  },
  emptyText: {
    fontSize: 14,
    color: '#94a3b8',
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 12,
  },
  closeBtn: {
    backgroundColor: '#48d877',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  closeBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Pets;
