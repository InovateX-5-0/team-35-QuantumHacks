import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, TextInput, Modal } from 'react-native';
import { useApp } from '../context/AppContext';
import { MOCK_ADOPTION_PETS } from '../src/data/mockData';
import { Heart, Filter, Search, MapPin, Info, ChevronLeft, X, CheckCircle2, Sparkles, DollarSign } from 'lucide-react-native';
import { Link, useRouter } from 'expo-router';
import BottomTab from '../components/Navigation';

const Adoption = () => {
  const router = useRouter();
  const { addAdoptionApplication, user } = useApp();
  const [selectedPet, setSelectedPet] = useState<any>(null);
  const [filter, setFilter] = useState('All');
  const [isApplying, setIsApplying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    experience: 'First-time owner',
    homeType: 'Apartment',
    message: ''
  });

  const categories = ['All', 'Dogs', 'Cats', 'Birds', 'Small Pets'];
  
  const filteredPets = filter === 'All' 
    ? MOCK_ADOPTION_PETS 
    : MOCK_ADOPTION_PETS.filter(p => p.species === filter.slice(0, -1));

  const handleApply = async () => {
    if (!selectedPet) return;
    
    setIsApplying(true);
    try {
      await addAdoptionApplication({
        petId: selectedPet.id,
        petName: selectedPet.name,
        shelterId: selectedPet.id,
        shelterName: selectedPet.shelter,
        applicantName: user?.name || 'Anonymous User',
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
        homeType: formData.homeType,
        experience: formData.experience,
        message: formData.message,
        adoptionFee: selectedPet.adoptionFee || 0
      });
      setIsApplying(false);
      setSelectedPet(null);
      setFormData({ experience: 'First-time owner', homeType: 'Apartment', message: '' });
      setIsSuccess(true);
      
      // Auto-hide success after 2 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      setIsApplying(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ChevronLeft size={24} color="#0f172a" />
          </TouchableOpacity>
          <Text style={styles.title}>Find a Friend</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setFilter(cat)}
              style={[styles.categoryPill, filter === cat && styles.activeCategoryPill]}
            >
              <Text style={[styles.categoryText, filter === cat && styles.activeCategoryText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Pet Grid */}
        <View style={styles.grid}>
          {filteredPets.map((pet) => (
            <TouchableOpacity
              key={pet.id}
              style={styles.petCard}
              onPress={() => setSelectedPet(pet)}
            >
              <Image source={{ uri: pet.image }} style={styles.petImage} />
              <TouchableOpacity style={styles.wishlistBtn}>
                <Heart size={18} color="#f43f5e" />
              </TouchableOpacity>
              <View style={styles.petInfo}>
                <View style={styles.petHeader}>
                  <Text style={styles.petName}>{pet.name}</Text>
                  <Text style={styles.petAge}>{pet.age}</Text>
                </View>
                <Text style={styles.petBreed}>{pet.breed}</Text>
                <View style={styles.locationRow}>
                    <MapPin size={12} color="#94a3b8" />
                    <Text style={styles.locationText}>{pet.location}</Text>
                </View>
                <View style={styles.footer}>
                  <Text style={styles.fee}>${pet.adoptionFee}</Text>
                  <Text style={styles.viewLink}>View Details</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Pet Detail Modal */}
      <Modal visible={!!selectedPet} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedPet && (
              <>
                <Image source={{ uri: selectedPet.image }} style={styles.modalImage} />
                <TouchableOpacity onPress={() => setSelectedPet(null)} style={styles.closeBtn}>
                  <X size={24} color="#ffffff" />
                </TouchableOpacity>
                
                <ScrollView style={styles.modalInfo}>
                  <View style={styles.modalHeader}>
                    <View>
                      <Text style={styles.modalName}>{selectedPet.name}</Text>
                      <View style={styles.locationRow}>
                        <MapPin size={16} color="#94a3b8" />
                        <Text style={styles.modalLocation}>{selectedPet.location}</Text>
                      </View>
                    </View>
                    <View style={styles.feeBadge}>
                      <Text style={styles.feeText}>${selectedPet.adoptionFee}</Text>
                    </View>
                  </View>

                  <View style={styles.statsRow}>
                    <View style={styles.statBox}>
                      <Text style={styles.statLabel}>AGE</Text>
                      <Text style={styles.statValue}>{selectedPet.age}</Text>
                    </View>
                    <View style={styles.statBox}>
                      <Text style={styles.statLabel}>ENERGY</Text>
                      <Text style={styles.statValue}>{selectedPet.energy}</Text>
                    </View>
                    <View style={styles.statBox}>
                      <Text style={styles.statLabel}>HEALTH</Text>
                      <Text style={styles.statValue}>Verified</Text>
                    </View>
                  </View>

                  <Text style={styles.aboutTitle}>About {selectedPet.name}</Text>
                  <Text style={styles.aboutText}>{selectedPet.description}</Text>

                  <TouchableOpacity style={styles.adoptBtn} onPress={() => setIsApplying(true)}>
                    <Text style={styles.adoptBtnText}>Adopt Me</Text>
                  </TouchableOpacity>
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Application Form Modal */}
      <Modal visible={isApplying} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
            <View style={styles.formContent}>
                <Text style={styles.formTitle}>Adoption Request</Text>
                <Text style={styles.formSubtitle}>Briefly tell us about your home.</Text>
                
                <TextInput 
                    style={styles.messageInput}
                    placeholder="Message to shelter..."
                    multiline
                    value={formData.message}
                    onChangeText={(text) => setFormData({...formData, message: text})}
                />

                <View style={styles.formActions}>
                    <TouchableOpacity style={styles.cancelBtn} onPress={() => setIsApplying(false)}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.submitBtn} onPress={handleApply}>
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
      </Modal>

      <BottomTab />
      
      {/* Adoption Success Overlay */}
      {isSuccess && (
        <View style={styles.successOverlay}>
          <View style={styles.successContent}>
            <CheckCircle2 size={64} color="#48d877" />
            <Text style={styles.successTitle}>Application Submitted!</Text>
            <Text style={styles.successSubtitle}>The shelter will contact you soon.</Text>
          </View>
        </View>
      )}
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
    marginBottom: 20,
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
  categoriesScroll: {
    marginBottom: 24,
  },
  categoryPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  activeCategoryPill: {
    backgroundColor: '#48d877',
    borderColor: '#48d877',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  activeCategoryText: {
    color: '#ffffff',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  petCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  petImage: {
    width: '100%',
    height: 180,
  },
  wishlistBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  petInfo: {
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
  petAge: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#48d877',
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
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
    fontSize: 10,
    color: '#94a3b8',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 8,
  },
  fee: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  viewLink: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#48d877',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: '90%',
    overflow: 'hidden',
  },
  modalImage: {
    width: '100%',
    height: 350,
  },
  closeBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInfo: {
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  modalName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
  },
  modalLocation: {
    fontSize: 14,
    color: '#64748b',
  },
  feeBadge: {
    backgroundColor: '#48d877',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  feeText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statBox: {
    width: '30%',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#94a3b8',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 15,
    color: '#64748b',
    lineHeight: 22,
    marginBottom: 32,
  },
  adoptBtn: {
    backgroundColor: '#48d877',
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  adoptBtnText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  formContent: {
      backgroundColor: '#ffffff',
      margin: 20,
      padding: 24,
      borderRadius: 24,
  },
  formTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#0f172a',
      marginBottom: 8,
  },
  formSubtitle: {
      fontSize: 14,
      color: '#64748b',
      marginBottom: 20,
  },
  messageInput: {
      backgroundColor: '#f1f5f9',
      borderRadius: 12,
      padding: 16,
      height: 120,
      textAlignVertical: 'top',
      marginBottom: 20,
  },
  formActions: {
      flexDirection: 'row',
      gap: 12,
  },
  cancelBtn: {
      flex: 1,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
  },
  cancelText: {
      color: '#94a3b8',
      fontWeight: 'bold',
  },
  submitBtn: {
      flex: 2,
      backgroundColor: '#48d877',
      height: 50,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
  },
  submitText: {
      color: '#ffffff',
      fontWeight: 'bold',
  },
  successOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
  },
  successContent: {
    alignItems: 'center',
    padding: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginTop: 16,
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  }
});

export default Adoption;
