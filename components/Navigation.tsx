import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { Home, PawPrint, Search, Users, User } from 'lucide-react-native';

const BottomTab = () => {
  const pathname = usePathname();
  const router = useRouter();
  
  const tabs = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: PawPrint, label: 'Pets', href: '/pets' },
    { icon: Search, label: 'Explore', href: '/explore' },
    { icon: Users, label: 'Community', href: '/community' },
    { icon: User, label: 'Profile', href: '/profile' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href));
        return (
          <TouchableOpacity 
            key={tab.href}
            style={styles.tab} 
            activeOpacity={0.7}
            onPress={() => router.push(tab.href as any)}
          >
            <tab.icon 
              size={22} 
              color={isActive ? '#48d877' : '#94a3b8'} 
              strokeWidth={isActive ? 2.5 : 2}
            />
            <Text style={[styles.label, { color: isActive ? '#48d877' : '#94a3b8' }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
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
  },
});

export default BottomTab;
