import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Camera, Trash2, CheckCircle2 } from 'lucide-react-native';

const EditPet = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { pets, updatePet, deletePet } = useApp();

  const [form, setForm] = useState({
    name: '',
    type: 'Dog',
    breed: '',
    age: '',
    image: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successType, setSuccessType] = useState<'updated' | 'deleted'>('updated');

  useEffect(() => {
    const pet = pets.find(p => p.id === id);
    if (pet) {
      setForm({
        name: pet.name,
        type: pet.type,
        breed: pet.breed,
        age: pet.age.toString(),
        image: pet.image,
      });
    }
  }, [id, pets]);

  const handleSave = () => {
    if (!form.name || !form.breed || !form.age) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsSaving(true);
    
    setTimeout(() => {
      updatePet(id!, {
        ...form,
        age: parseInt(form.age),
      });
      
      setIsSaving(false);
      setSuccessType('updated');
      setIsSuccess(true);

      setTimeout(() => {
        router.push('/pets');
      }, 1500);
    }, 1000);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Pet',
      'Are you sure you want to remove this pet profile?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            setIsSaving(true);
            setTimeout(() => {
              deletePet(id!);
              setIsSaving(false);
              setSuccessType('deleted');
              setIsSuccess(true);
              setTimeout(() => {
                router.push('/pets');
              }, 1500);
            }, 1000);
          }
        }
      ]
    );
  };

  const petTypes = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Pet Profile</Text>
        <TouchableOpacity onPress={handleDelete} style={styles.deleteBtn}>
          <Trash2 size={22} color="#ef4444" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.imageSection}>
          <View style={styles.imagePlaceholder}>
            {form.image ? (
              <Image source={{ uri: form.image }} style={styles.previewImage} />
            ) : (
              <View style={styles.imageIconPlaceholder} />
            )}
            <TouchableOpacity style={styles.cameraBtn}>
              <Camera size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.imageText}>Tap to change photo</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pet Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter pet name"
              value={form.name}
              onChangeText={(text) => setForm({ ...form, name: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pet Type</Text>
            <View style={styles.typeContainer}>
              {petTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeBtn,
                    form.type === type && styles.typeBtnActive
                  ]}
                  onPress={() => setForm({ ...form, type })}
                >
                  <Text style={[
                    styles.typeText,
                    form.type === type && styles.typeTextActive
                  ]}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Breed</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Golden Retriever"
              value={form.breed}
              onChangeText={(text) => setForm({ ...form, breed: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age (years)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter age"
              value={form.age}
              keyboardType="numeric"
              onChangeText={(text) => setForm({ ...form, age: text })}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save Changes</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Saving Overlay */}
      {isSaving && (
        <View style={styles.overlay}>
          <View style={styles.overlayContent}>
            <ActivityIndicator size="large" color="#48d877" />
            <Text style={styles.overlayText}>
              {successType === 'deleted' ? 'Removing pet...' : 'Saving changes...'}
            </Text>
          </View>
        </View>
      )}

      {/* Success Overlay */}
      {isSuccess && (
        <View style={styles.overlay}>
          <View style={styles.overlayContent}>
            <CheckCircle2 size={64} color={successType === 'deleted' ? '#ef4444' : '#48d877'} />
            <Text style={styles.overlayText}>
              {successType === 'deleted' ? 'Pet Removed' : 'Changes Saved!'}
            </Text>
            <Text style={styles.subOverlayText}>Returning to your pet list...</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backBtn: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  deleteBtn: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  imageIconPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#cbd5e1',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#48d877',
    padding: 8,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  imageText: {
    marginTop: 12,
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#0f172a',
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  typeBtnActive: {
    backgroundColor: '#48d877',
    borderColor: '#48d877',
  },
  typeText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  typeTextActive: {
    color: '#ffffff',
  },
  saveBtn: {
    backgroundColor: '#48d877',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginTop: 40,
    shadowColor: '#48d877',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  overlayContent: {
    alignItems: 'center',
    gap: 16,
  },
  overlayText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  subOverlayText: {
    fontSize: 14,
    color: '#64748b',
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default EditPet;
