import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomTab from '../components/Navigation';

const Explore = () => {
  console.log('[DEBUG] Rendering MINIMAL Explore Page');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Explore Page</Text>
        <Text style={styles.debug}>Version: 1.0.4 - Minimal Debug</Text>
        <Text style={styles.info}>If you see this, the route is working correctly.</Text>
      </View>
      <BottomTab />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  debug: {
    color: '#48d877',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    color: '#64748b',
    textAlign: 'center',
  }
});

export default Explore;
