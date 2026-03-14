import 'react-native-gesture-handler';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from '../context/AppContext';

import { useApp } from '../context/AppContext';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, login } = useApp();

  if (!isLoggedIn) {
    return (
      <View style={styles.loginContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=400' }} 
          style={styles.loginImage} 
        />
        <Text style={styles.loginTitle}>PawCare</Text>
        <Text style={styles.loginSubtitle}>Your pet's best friend in your pocket</Text>
        <TouchableOpacity style={styles.loginBtn} onPress={login}>
          <Text style={styles.loginBtnText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AppProvider>
      <StatusBar style="auto" />
      <AuthWrapper>
        <Slot />
      </AuthWrapper>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  loginContainer: { flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', padding: 24 },
  loginImage: { width: 200, height: 200, borderRadius: 100, marginBottom: 32 },
  loginTitle: { fontSize: 32, fontWeight: 'bold', color: '#0f172a', marginBottom: 8 },
  loginSubtitle: { fontSize: 16, color: '#64748b', textAlign: 'center', marginBottom: 48 },
  loginBtn: { backgroundColor: '#48d877', width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center', shadowColor: '#48d877', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
  loginBtnText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
});
