import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { Link } from 'expo-router';
import { Calendar, Bell, ShieldAlert, Stethoscope, Heart, Users, MapPin, ShoppingBag, Scissors, ChevronRight } from 'lucide-react-native';
import BottomTab from '../components/Navigation';

const Home = () => {
  const { user, appointments, pets } = useApp();

  const quickActions = [
    { icon: Stethoscope, label: 'Book Vet', color: '#ccfbf1', iconColor: '#0d9488', href: '/explore' },
    { icon: Heart, label: 'Adopt', color: '#fef3c7', iconColor: '#d97706', href: '/adoption' },
    { icon: Users, label: 'Community', color: '#e0e7ff', iconColor: '#4f46e5', href: '/community' },
    { icon: ShoppingBag, label: 'Shop', color: '#dbeafe', iconColor: '#2563eb', href: '/marketplace' },
    { icon: Scissors, label: 'Services', color: '#d1fae5', iconColor: '#059669', href: '/services' },
    { icon: MapPin, label: 'Lost & Found', color: '#ffe4e6', iconColor: '#e11d48', href: '/explore' },
  ];

  const upcomingApp = appointments.find(a => a.status === 'Upcoming');

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Welcome Banner */}
        <View style={styles.welcomeRow}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>{user?.name || 'Pet Owner'} 👋</Text>
          </View>
          <Link href="/notifications" asChild>
            <TouchableOpacity style={styles.notificationBtn}>
              <Bell size={24} color="#475569" />
              <View style={styles.badge} />
            </TouchableOpacity>
          </Link>
        </View>

        {/* SOS Button */}
        <Link href="/sos" asChild>
          <TouchableOpacity style={styles.sosCard}>
            <View style={styles.sosIcon}>
              <ShieldAlert size={32} color="#e11d48" />
            </View>
            <View>
              <Text style={styles.sosTitle}>Emergency SOS</Text>
              <Text style={styles.sosSubtitle}>Find nearest emergency vet clinics instantly</Text>
            </View>
          </TouchableOpacity>
        </Link>

        {/* Quick Actions */}
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, i) => (
            <Link key={i} href={action.href} asChild>
              <TouchableOpacity style={styles.actionBtn}>
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <action.icon size={24} color={action.iconColor} />
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            </Link>
          ))}
        </View>

        {/* Upcoming Appointment */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Appointment</Text>
            <Link href="/pets">
              <Text style={styles.seeAll}>View All</Text>
            </Link>
          </View>
          <View style={styles.appointmentCard}>
            {upcomingApp ? (
              <View>
                <View style={styles.appointmentHeader}>
                  <View style={styles.appointmentInfo}>
                    <View style={styles.calendarIconWrapper}>
                      <Calendar size={28} color="#064e3b" />
                    </View>
                    <View>
                      <Text style={styles.clinicName}>{upcomingApp.clinicName}</Text>
                      <Text style={styles.appointmentDate}>{upcomingApp.date} • {upcomingApp.time}</Text>
                    </View>
                  </View>
                  <View style={styles.confirmedBadge}>
                    <Text style={styles.confirmedText}>Confirmed</Text>
                  </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.petInfo}>
                  <Image 
                    source={{ uri: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100' }}
                    style={styles.petImage}
                  />
                  <Text style={styles.petName}>For {pets.find(p => p.id === upcomingApp.petId)?.name || 'your pet'}</Text>
                  <ChevronRight size={20} color="#064e3b80" />
                </View>
              </View>
            ) : (
              <View style={styles.noAppointment}>
                <View style={styles.noApptIcon}>
                  <Calendar size={32} color="#064e3b80" />
                </View>
                <Text style={styles.noApptTitle}>No upcoming appointments</Text>
                <Text style={styles.noApptSubtitle}>Keep your pet healthy with regular checkups</Text>
                <Link href="/explore" asChild>
                  <TouchableOpacity style={styles.bookNowBtn}>
                    <Text style={styles.bookNowText}>Book Now</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            )}
          </View>
        </View>

        {/* Health Alerts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Alerts</Text>
          <View style={styles.alertCard}>
            <View style={styles.alertIcon}>
              <Bell size={20} color="#d97706" />
            </View>
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>Vaccination Due</Text>
              <Text style={styles.alertSubtitle}>Rabies shot for Bella is due in 3 days.</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.detailsBtn}>Details</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recommended Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended for You</Text>
            <Link href="/marketplace">
              <Text style={styles.seeAll}>See All</Text>
            </Link>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            <View style={styles.productCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=200' }}
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={1}>Premium Puppy Food</Text>
                <Text style={styles.productPrice}>$45.99</Text>
              </View>
            </View>
            <View style={styles.productCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1591768793355-74d7c836038c?auto=format&fit=crop&q=80&w=200' }}
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={1}>Orthopedic Dog Bed</Text>
                <Text style={styles.productPrice}>$89.00</Text>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Add some padding for bottom nav */}
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
  welcomeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  notificationBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#f43f5e',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  sosCard: {
    flexDirection: 'row',
    backgroundColor: '#fff1f2',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#fecdd3',
    gap: 16,
  },
  sosIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f43f5e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#881337',
  },
  sosSubtitle: {
    fontSize: 14,
    color: '#e11d48',
    marginTop: 4,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionBtn: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 16,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#475569',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  seeAll: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#48d877',
  },
  appointmentCard: {
    backgroundColor: '#48d877',
    borderRadius: 24,
    padding: 16,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  appointmentInfo: {
    flexDirection: 'row',
    gap: 16,
  },
  calendarIconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#064e3b1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clinicName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#064e3b',
  },
  appointmentDate: {
    fontSize: 14,
    color: '#064e3b80',
    marginTop: 4,
  },
  confirmedBadge: {
    backgroundColor: '#064e3b1a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#064e3b1a',
  },
  confirmedText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#064e3b',
    textTransform: 'uppercase',
  },
  divider: {
    height: 1,
    backgroundColor: '#064e3b1a',
    marginVertical: 16,
  },
  petInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  petImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#064e3b33',
  },
  petName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#064e3b',
    flex: 1,
    marginLeft: 12,
  },
  noAppointment: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noApptIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#064e3b1a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  noApptTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#064e3b',
  },
  noApptSubtitle: {
    fontSize: 12,
    color: '#064e3b80',
    marginTop: 4,
    marginBottom: 24,
  },
  bookNowBtn: {
    backgroundColor: '#064e3b',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bookNowText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  alertCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    gap: 16,
  },
  alertIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  alertSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  detailsBtn: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#48d877',
  },
  horizontalScroll: {
    marginRight: -16,
  },
  productCard: {
    width: 160,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 96,
  },
  productInfo: {
    padding: 8,
  },
  productName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  productPrice: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#48d877',
    marginTop: 4,
  },
});

export default Home;
