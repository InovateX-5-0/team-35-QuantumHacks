import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Camera, PawPrint } from 'lucide-react-native';

const AddPet = () => {
  const router = useRouter();
  const { addPet } = useApp();

  const [form, setForm] = useState({
    name: '',
    type: 'Dog',
    breed: '',
    age: '',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
  });

  const handleSave = () => {
    if (!form.name || !form.breed || !form.age) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    addPet({
      ...form,
      age: parseInt(form.age),
    });

    Alert.alert('Success', 'Pet added successfully!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  const petTypes = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Pet</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Image Picker Placeholder */}
        <View style={styles.imageSection}>
          <View style={styles.imagePlaceholder}>
            <Image source={{ uri: form.image }} style={styles.previewImage} />
            <TouchableOpacity style={styles.cameraBtn}>
              <Camera size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.imageText}>Tap to change photo</Text>
        </View>

        {/* Form Fields */}
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
          <Text style={styles.saveBtnText}>Save Pet</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
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
  saveBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default AddPet;
