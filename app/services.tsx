import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { ChevronLeft, Scissors, Heart, Home, GraduationCap, MapPin, Star } from 'lucide-react-native';
import BottomTab from '../components/Navigation';

const Services = () => {
  const serviceCategories = [
    { icon: Scissors, label: 'Grooming', color: '#fef3c7', iconColor: '#d97706', href: '/grooming' },
    { icon: Home, label: 'Boarding', color: '#dbeafe', iconColor: '#2563eb', href: '/services' },
    { icon: Heart, label: 'Pet Sitting', color: '#ffe4e6', iconColor: '#e11d48', href: '/services' },
    { icon: GraduationCap, label: 'Training', color: '#d1fae5', iconColor: '#059669', href: '/training' },
  ];

  const featuredServices = [
    {
      id: 's1',
      name: 'Pawsome Grooming Spa',
      category: 'Grooming',
      image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=400',
      rating: 4.8,
      distance: '1.2 km',
      price: 'From $40',
    },
    {
      id: 's2',
      name: 'Elite K9 Training',
      category: 'Training',
      image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=400',
      rating: 4.9,
      distance: '2.5 km',
      price: 'From $60',
    },
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
          <Text style={styles.title}>Services</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.categoriesGrid}>
          {serviceCategories.map((cat, i) => (
            <Link key={i} href={cat.href as any} asChild>
              <TouchableOpacity style={styles.categoryItem}>
                <View style={[styles.categoryIcon, { backgroundColor: cat.color }]}>
                  <cat.icon size={28} color={cat.iconColor} />
                </View>
                <Text style={styles.categoryLabel}>{cat.label}</Text>
              </TouchableOpacity>
            </Link>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Services</Text>
          {featuredServices.map((service) => (
            <TouchableOpacity key={service.id} style={styles.serviceCard}>
              <Image source={{ uri: service.image }} style={styles.serviceImage} />
              <View style={styles.serviceInfo}>
                <View style={styles.serviceHeader}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <View style={styles.ratingRow}>
                    <Star size={12} color="#fbbf24" fill="#fbbf24" />
                    <Text style={styles.ratingText}>{service.rating}</Text>
                  </View>
                </View>
                <Text style={styles.serviceCategory}>{service.category}</Text>
                <View style={styles.serviceFooter}>
                  <View style={styles.locationRow}>
                    <MapPin size={12} color="#94a3b8" />
                    <Text style={styles.locationText}>{service.distance}</Text>
                  </View>
                  <Text style={styles.servicePrice}>{service.price}</Text>
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  categoriesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  categoryItem: {
    width: '22%',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#475569',
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
  serviceCard: {
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
  serviceImage: {
    width: '100%',
    height: 160,
  },
  serviceInfo: {
    padding: 16,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#475569',
  },
  serviceCategory: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 12,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#94a3b8',
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#48d877',
  },
});

export default Services;
