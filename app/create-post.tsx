import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Camera, Image as ImageIcon, Send } from 'lucide-react-native';

const CreatePost = () => {
    const router = useRouter();
    const [content, setContent] = useState('');

    const handlePost = () => {
        if (!content.trim()) {
            Alert.alert('Empty Post', 'Please write something before posting.');
            return;
        }
        Alert.alert('Posted!', 'Your post has been shared with the community.', [
            { text: 'OK', onPress: () => router.back() }
        ]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <ChevronLeft size={24} color="#0f172a" />
                </TouchableOpacity>
                <Text style={styles.title}>Create Post</Text>
                <TouchableOpacity onPress={handlePost} style={styles.postBtn}>
                    <Text style={styles.postBtnText}>Post</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="What's on your mind? Share a tip or a cute pet photo!"
                        placeholderTextColor="#94a3b8"
                        multiline
                        value={content}
                        onChangeText={setContent}
                        autoFocus
                    />
                </View>

                <View style={styles.attachmentRow}>
                    <TouchableOpacity style={styles.attachmentBtn}>
                        <Camera size={24} color="#48d877" />
                        <Text style={styles.attachmentText}>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.attachmentBtn}>
                        <ImageIcon size={24} color="#3b82f6" />
                        <Text style={styles.attachmentText}>Gallery</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.guidelines}>
                    <Text style={styles.guidelinesTitle}>Posting Rules</Text>
                    <Text style={styles.guidelineText}>• Be kind and respectful to other pet owners.</Text>
                    <Text style={styles.guidelineText}>• Only share pet-related content and advice.</Text>
                    <Text style={styles.guidelineText}>• No promotional spam or advertisements.</Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#ffffff' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 60, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
    backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 18, fontWeight: 'bold', color: '#0f172a' },
    postBtn: { backgroundColor: '#48d877', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 },
    postBtnText: { color: '#ffffff', fontWeight: 'bold' },
    content: { flex: 1, padding: 20 },
    inputContainer: { minHeight: 200 },
    input: { fontSize: 18, color: '#0f172a', lineHeight: 28, textAlignVertical: 'top' },
    attachmentRow: { flexDirection: 'row', gap: 16, marginTop: 24, paddingVertical: 16, borderTopWidth: 1, borderBottomWidth: 1, borderTopColor: '#f1f5f9', borderBottomColor: '#f1f5f9' },
    attachmentBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#f8fafc', padding: 12, borderRadius: 12 },
    attachmentText: { fontSize: 13, fontWeight: '600', color: '#475569' },
    guidelines: { marginTop: 32, backgroundColor: '#f0fdf4', padding: 16, borderRadius: 16 },
    guidelinesTitle: { fontSize: 14, fontWeight: 'bold', color: '#166534', marginBottom: 8 },
    guidelineText: { fontSize: 12, color: '#166534', marginBottom: 4, opacity: 0.8 }
});

export default CreatePost;
