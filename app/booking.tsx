import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { ChevronLeft, Calendar as CalendarIcon, Clock, CheckCircle2 } from 'lucide-react-native';
import BottomTab from '../components/Navigation';

const Booking = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('15');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  
  const dates = ['14', '15', '16', '17', '18'];
  const times = ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM'];

  if (step === 3) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <CheckCircle2 size={80} color="#059669" />
        <Text style={styles.successTitle}>Booking Confirmed!</Text>
        <Text style={styles.successText}>Your appointment has been successfully scheduled.</Text>
        <TouchableOpacity style={styles.doneBtn} onPress={() => router.push('/')}>
          <Text style={styles.doneBtnText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.title}>Book Appointment</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {step === 1 ? (
          <>
            <Text style={styles.sectionTitle}>Select Date</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateSelector}>
              {dates.map((d) => (
                <TouchableOpacity 
                  key={d} 
                  style={[styles.dateBox, selectedDate === d && styles.selectedDateBox]}
                  onPress={() => setSelectedDate(d)}
                >
                  <Text style={[styles.dateMonth, selectedDate === d && styles.selectedDateText]}>Mar</Text>
                  <Text style={[styles.dateNum, selectedDate === d && styles.selectedDateText]}>{d}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.sectionTitle}>Select Time</Text>
            <View style={styles.timeGrid}>
              {times.map((t) => (
                <TouchableOpacity 
                  key={t}
                  style={[styles.timeBox, selectedTime === t && styles.selectedTimeBox]}
                  onPress={() => setSelectedTime(t)}
                >
                  <Text style={[styles.timeText, selectedTime === t && styles.selectedTimeText]}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.nextBtn} onPress={() => setStep(2)}>
              <Text style={styles.nextBtnText}>Continue to Details</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Your Information</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Pet Name</Text>
              <TextInput style={styles.input} placeholder="e.g. Bella" />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Reason for Visit</Text>
              <TextInput style={styles.input} placeholder="e.g. Annual Checkup" multiline />
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Appointment Summary</Text>
              <View style={styles.summaryRow}>
                <CalendarIcon size={16} color="#64748b" />
                <Text style={styles.summaryText}>March {selectedDate}, 2026</Text>
              </View>
              <View style={styles.summaryRow}>
                <Clock size={16} color="#64748b" />
                <Text style={styles.summaryText}>{selectedTime}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.nextBtn} onPress={() => setStep(3)}>
              <Text style={styles.nextBtnText}>Confirm Booking</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { flex: 1, padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 16, marginTop: 40 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', elevation: 2 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#0f172a' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#0f172a', marginTop: 20, marginBottom: 12 },
  dateSelector: { flexDirection: 'row', marginBottom: 20 },
  dateBox: { width: 60, height: 80, backgroundColor: '#ffffff', borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 12, elevation: 1 },
  selectedDateBox: { backgroundColor: '#0d9488' },
  dateMonth: { fontSize: 12, color: '#64748b', fontWeight: 'bold', marginBottom: 4 },
  dateNum: { fontSize: 24, color: '#0f172a', fontWeight: 'bold' },
  selectedDateText: { color: '#ffffff' },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 40 },
  timeBox: { width: '45%', backgroundColor: '#ffffff', paddingVertical: 16, borderRadius: 12, justifyContent: 'center', alignItems: 'center', elevation: 1 },
  selectedTimeBox: { backgroundColor: '#0d9488' },
  timeText: { fontSize: 14, fontWeight: 'bold', color: '#0f172a' },
  selectedTimeText: { color: '#ffffff' },
  nextBtn: { backgroundColor: '#0d9488', paddingVertical: 16, borderRadius: 16, alignItems: 'center', marginTop: 20 },
  nextBtnText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#475569', marginBottom: 8 },
  input: { backgroundColor: '#ffffff', borderRadius: 12, padding: 16, fontSize: 16, elevation: 1 },
  summaryCard: { backgroundColor: '#e0f2fe', padding: 20, borderRadius: 16, marginTop: 20 },
  summaryTitle: { fontSize: 16, fontWeight: 'bold', color: '#0369a1', marginBottom: 12 },
  summaryRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  summaryText: { fontSize: 14, color: '#0369a1', fontWeight: '500' },
  successTitle: { fontSize: 24, fontWeight: 'bold', color: '#0f172a', marginTop: 20, marginBottom: 8 },
  successText: { fontSize: 14, color: '#64748b', textAlign: 'center', paddingHorizontal: 40, marginBottom: 32 },
  doneBtn: { backgroundColor: '#059669', paddingHorizontal: 32, paddingVertical: 16, borderRadius: 16 },
  doneBtnText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
});

export default Booking;
