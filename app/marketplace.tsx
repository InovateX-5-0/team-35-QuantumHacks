import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { ChevronLeft, ShoppingCart, Star } from 'lucide-react-native';
import { MOCK_PRODUCTS } from '../src/data/mockData';
import BottomTab from '../components/Navigation';

const Marketplace = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Link href="/" asChild>
            <TouchableOpacity style={styles.backBtn}>
              <ChevronLeft size={24} color="#0f172a" />
            </TouchableOpacity>
          </Link>
          <Text style={styles.title}>Marketplace</Text>
          <Link href="/cart" asChild>
            <TouchableOpacity style={styles.cartBtn}>
              <ShoppingCart size={24} color="#0f172a" />
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.grid}>
          {MOCK_PRODUCTS.map((product) => (
            <Link key={product.id} href="/cart" asChild>
              <TouchableOpacity style={styles.productCard}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productCategory}>{product.category}</Text>
                  <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
                  <View style={styles.ratingRow}>
                    <Star size={12} color="#fbbf24" fill="#fbbf24" />
                    <Text style={styles.ratingText}>{product.rating}</Text>
                  </View>
                  <View style={styles.footer}>
                    <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                    <View style={styles.addBtn}>
                      <Text style={styles.addBtnText}>Add</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
      <BottomTab />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 140,
  },
  productInfo: {
    padding: 12,
  },
  productCategory: {
    fontSize: 10,
    color: '#94a3b8',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#48d877',
  },
  addBtn: {
    backgroundColor: '#48d877',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  addBtnText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default Marketplace;
