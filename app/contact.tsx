import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Send, Phone, MessageSquare } from 'lucide-react-native';

const Contact = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (!message.trim()) return;
        Alert.alert('Sent', 'Your message has been sent successfully.', [
            { text: 'OK', onPress: () => router.back() }
        ]);
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <ChevronLeft size={24} color="#0f172a" />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Contact {params.name || 'Pet Owner'}</Text>
                    <Text style={styles.status}>Online</Text>
                </View>
                <TouchableOpacity style={styles.callBtn} onPress={() => Alert.alert('Calling...', 'Dialing owner...')}>
                    <Phone size={20} color="#48d877" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.chatArea}>
                <View style={styles.systemMessage}>
                    <Text style={styles.systemText}>You are starting a conversation regarding their pet report.</Text>
                </View>
                
                <View style={[styles.bubble, styles.otherBubble]}>
                    <Text style={styles.bubbleText}>Hello! I saw your report. Is the pet still missing?</Text>
                    <Text style={styles.timeText}>9:41 AM</Text>
                </View>
            </ScrollView>

            <View style={styles.inputArea}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    value={message}
                    onChangeText={setMessage}
                    multiline
                />
                <TouchableOpacity style={[styles.sendBtn, !message.trim() && styles.sendBtnDisabled]} onPress={handleSend}>
                    <Send size={20} color="#ffffff" />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 60, paddingBottom: 16, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
    backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
    titleContainer: { flex: 1, marginLeft: 12 },
    title: { fontSize: 16, fontWeight: 'bold', color: '#0f172a' },
    status: { fontSize: 12, color: '#22c55e', fontWeight: '500' },
    callBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f0fdf4', justifyContent: 'center', alignItems: 'center' },
    chatArea: { flex: 1, padding: 16 },
    systemMessage: { alignSelf: 'center', backgroundColor: '#e2e8f0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, marginBottom: 24 },
    systemText: { fontSize: 11, color: '#64748b', fontWeight: '500' },
    bubble: { maxWidth: '80%', padding: 12, borderRadius: 16, marginBottom: 12 },
    otherBubble: { alignSelf: 'flex-start', backgroundColor: '#ffffff', borderBottomLeftRadius: 4 },
    bubbleText: { fontSize: 14, color: '#334155', lineHeight: 20 },
    timeText: { fontSize: 10, color: '#94a3b8', marginTop: 4, textAlign: 'right' },
    inputArea: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#ffffff', paddingBottom: Platform.OS === 'ios' ? 40 : 16 },
    input: { flex: 1, backgroundColor: '#f1f5f9', borderRadius: 24, paddingHorizontal: 16, paddingVertical: 10, maxHeight: 100, fontSize: 15 },
    sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#48d877', justifyContent: 'center', alignItems: 'center', marginLeft: 12 },
    sendBtnDisabled: { opacity: 0.5 }
});

export default Contact;
