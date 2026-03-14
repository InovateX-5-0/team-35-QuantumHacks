import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, SafeAreaView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Bell, Shield, User, HelpCircle, ChevronRight } from 'lucide-react-native';

export default function Settings() {
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type: string }>();
  
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [privacy, setPrivacy] = useState(true);

  const getTitle = () => {
    switch (type) {
      case 'Notifications': return 'Notification Settings';
      case 'Privacy & Security': return 'Privacy & Security';
      case 'Account Settings': return 'Account Settings';
      case 'Help & Support': return 'Help & Support';
      default: return 'Settings';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.title}>{getTitle()}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* Notifications Section */}
        {(type === 'Notifications' || type === 'Settings') && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notifications</Text>
            <View style={styles.card}>
              <View style={styles.row}>
                <View style={styles.rowLabel}>
                  <Bell size={20} color="#64748b" />
                  <Text style={styles.rowText}>Push Notifications</Text>
                </View>
                <Switch 
                  value={notifications} 
                  onValueChange={setNotifications}
                  trackColor={{ false: '#e2e8f0', true: '#48d877' }}
                />
              </View>
              <View style={styles.divider} />
              <View style={styles.row}>
                <View style={styles.rowLabel}>
                  <Text style={styles.rowText}>Marketing Emails</Text>
                </View>
                <Switch 
                  value={marketing} 
                  onValueChange={setMarketing}
                  trackColor={{ false: '#e2e8f0', true: '#48d877' }}
                />
              </View>
            </View>
          </View>
        )}

        {/* Privacy Section */}
        {(type === 'Privacy & Security' || type === 'Settings') && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Security</Text>
            <View style={styles.card}>
              <View style={styles.row}>
                <View style={styles.rowLabel}>
                  <Shield size={20} color="#64748b" />
                  <Text style={styles.rowText}>Two-Factor Auth</Text>
                </View>
                <Switch 
                  value={privacy} 
                  onValueChange={setPrivacy}
                  trackColor={{ false: '#e2e8f0', true: '#48d877' }}
                />
              </View>
              <TouchableOpacity style={styles.row}>
                <Text style={styles.rowText}>Change Password</Text>
                <ChevronRight size={20} color="#cbd5e1" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Account Section */}
        {(type === 'Account Settings' || type === 'Settings') && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            <View style={styles.card}>
              <TouchableOpacity style={styles.row}>
                <View style={styles.rowLabel}>
                  <User size={20} color="#64748b" />
                  <Text style={styles.rowText}>Personal Information</Text>
                </View>
                <ChevronRight size={20} color="#cbd5e1" />
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.row}>
                <Text style={styles.rowText}>Delete Account</Text>
                <Text style={{ color: '#ef4444', fontWeight: '600' }}>Request</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Help Section */}
        {(type === 'Help & Support' || type === 'Settings') && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support</Text>
            <View style={styles.card}>
              <TouchableOpacity style={styles.row}>
                <View style={styles.rowLabel}>
                  <HelpCircle size={20} color="#64748b" />
                  <Text style={styles.rowText}>Terms of Service</Text>
                </View>
                <ChevronRight size={20} color="#cbd5e1" />
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.row} onPress={() => router.push('/contact')}>
                <Text style={styles.rowText}>Contact Us</Text>
                <ChevronRight size={20} color="#cbd5e1" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#0f172a' },
  content: { flex: 1, padding: 16 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: 12, marginLeft: 8 },
  card: { backgroundColor: '#ffffff', borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  rowLabel: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rowText: { fontSize: 16, color: '#0f172a', fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#f1f5f9', marginHorizontal: 16 },
});
