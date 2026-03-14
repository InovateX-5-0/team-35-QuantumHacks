import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { Home, User, Search, Users, PawPrint } from 'lucide-react-native';

const BottomTab = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handlePress = (href: string) => {
    console.log('[DEBUG] Navigating to:', href);
    router.push(href as any);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab} onPress={() => handlePress('/')}>
        <Home size={22} color={pathname === '/' ? '#48d877' : '#94a3b8'} />
        <Text style={[styles.label, pathname === '/' && { color: '#48d877' }]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => handlePress('/pets')}>
        <PawPrint size={22} color={pathname === '/pets' ? '#48d877' : '#94a3b8'} />
        <Text style={[styles.label, pathname === '/pets' && { color: '#48d877' }]}>Pets</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => handlePress('/explore')}>
        <Search size={22} color={pathname.startsWith('/explore') ? '#48d877' : '#94a3b8'} />
        <Text style={[styles.label, pathname.startsWith('/explore') && { color: '#48d877' }]}>Explore</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => handlePress('/community')}>
        <Users size={22} color={pathname === '/community' ? '#48d877' : '#94a3b8'} />
        <Text style={[styles.label, pathname === '/community' && { color: '#48d877' }]}>Community</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => handlePress('/profile')}>
        <User size={22} color={pathname === '/profile' ? '#48d877' : '#94a3b8'} />
        <Text style={[styles.label, pathname === '/profile' && { color: '#48d877' }]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingBottom: 8,
    paddingTop: 8,
    height: 60,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
    color: '#94a3b8',
  },
});

export default BottomTab;
