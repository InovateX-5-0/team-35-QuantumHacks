import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Camera, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react-native';

const ReportPet = () => {
    const router = useRouter();
    const [status, setStatus] = useState('Lost');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleReport = () => {
        setIsSuccess(true);
        setTimeout(() => {
            setIsSuccess(false);
            router.back();
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <ChevronLeft size={24} color="#0f172a" />
                </TouchableOpacity>
                <Text style={styles.title}>Report a Pet</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.statusToggle}>
                    <TouchableOpacity 
                        style={[styles.toggleBtn, status === 'Lost' && styles.activeLost]}
                        onPress={() => setStatus('Lost')}
                    >
                        <Text style={[styles.toggleText, status === 'Lost' && styles.activeToggleText]}>Lost</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.toggleBtn, status === 'Found' && styles.activeFound]}
                        onPress={() => setStatus('Found')}
                    >
                        <Text style={[styles.toggleText, status === 'Found' && styles.activeToggleText]}>Found</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.imageUpload}>
                    <Camera size={32} color="#94a3b8" />
                    <Text style={styles.uploadText}>Upload Pet Photo</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Pet Name (Optional)</Text>
                        <TextInput style={styles.input} placeholder="e.g. Buddy" />
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Breed / Species</Text>
                        <TextInput style={styles.input} placeholder="e.g. Golden Retriever" />
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Last Seen Location</Text>
                        <View style={styles.locationInput}>
                            <MapPin size={20} color="#64748b" />
                            <TextInput style={[styles.input, { flex: 1, borderBottomWidth: 0, marginTop: 0 }]} placeholder="e.g. Central Park" />
                        </View>
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Description & Special Marks</Text>
                        <TextInput style={[styles.input, { height: 100 }]} multiline placeholder="Red collar, microchipped..." />
                    </View>

                    <TouchableOpacity style={styles.submitBtn} onPress={handleReport}>
                        <AlertCircle size={20} color="#ffffff" style={{ marginRight: 8 }} />
                        <Text style={styles.submitText}>Submit Report</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Success Overlay */}
            {isSuccess && (
                <View style={styles.successOverlay}>
                    <View style={styles.successContent}>
                        <CheckCircle2 size={64} color="#48d877" />
                        <Text style={styles.successTitle}>Report Submitted!</Text>
                        <Text style={styles.successSubtitle}>The pet has been added to the database.</Text>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 60, paddingBottom: 16, backgroundColor: '#ffffff' },
    backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 18, fontWeight: 'bold', color: '#0f172a' },
    content: { flex: 1, padding: 16 },
    statusToggle: { flexDirection: 'row', backgroundColor: '#e2e8f0', padding: 4, borderRadius: 16, marginBottom: 24 },
    toggleBtn: { flex: 1, height: 44, justifyContent: 'center', alignItems: 'center', borderRadius: 14 },
    activeLost: { backgroundColor: '#ef4444' },
    activeFound: { backgroundColor: '#22c55e' },
    toggleText: { fontSize: 14, fontWeight: 'bold', color: '#64748b' },
    activeToggleText: { color: '#ffffff' },
    imageUpload: { height: 200, backgroundColor: '#ffffff', borderRadius: 20, borderStyle: 'dashed', borderWidth: 2, borderColor: '#cbd5e1', justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
    uploadText: { marginTop: 8, color: '#94a3b8', fontWeight: '500' },
    form: { gap: 16 },
    inputGroup: { gap: 8 },
    label: { fontSize: 14, fontWeight: 'bold', color: '#475569' },
    input: { backgroundColor: '#ffffff', borderRadius: 12, padding: 16, fontSize: 16 },
    locationInput: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 12, paddingLeft: 16 },
    submitBtn: { backgroundColor: '#ef4444', height: 56, borderRadius: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 40 },
    submitText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
    successOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
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

export default ReportPet;
