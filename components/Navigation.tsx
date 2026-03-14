import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, usePathname } from 'expo-router';
import { Home, PawPrint, Search, Users, User } from 'lucide-react-native';

const BottomTab = () => {
  const pathname = usePathname();
  
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
          <Link key={tab.href} href={tab.href} asChild>
            <TouchableOpacity style={styles.tab} activeOpacity={0.7}>
              <tab.icon 
                size={22} 
                color={isActive ? '#48d877' : '#94a3b8'} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <Text style={[styles.label, { color: isActive ? '#48d877' : '#94a3b8' }]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          </Link>
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
