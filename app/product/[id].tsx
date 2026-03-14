import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter, Link } from 'expo-router';
import { ChevronLeft, Star, ShoppingCart, Minus, Plus, ShoppingBag, CheckCircle2 } from 'lucide-react-native';
import { MOCK_PRODUCTS } from '../../src/data/mockData';
import { useApp } from '../../context/AppContext';

export default function ProductDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { addToCart } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const product = MOCK_PRODUCTS.find(p => p.id === id);

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found!</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addToCart(product, quantity);
      setIsAdding(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    }, 800);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/cart');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.circleBtn}>
          <ChevronLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
        <Link href="/cart" asChild>
          <TouchableOpacity style={styles.circleBtn}>
            <ShoppingCart size={22} color="#0f172a" />
          </TouchableOpacity>
        </Link>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{product.category}</Text>
          </View>
          
          <Text style={styles.productName}>{product.name}</Text>
          
          <View style={styles.ratingRow}>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star 
                  key={s} 
                  size={16} 
                  color={s <= Math.floor(product.rating) ? "#fbbf24" : "#e2e8f0"} 
                  fill={s <= Math.floor(product.rating) ? "#fbbf24" : "transparent"} 
                />
              ))}
            </View>
            <Text style={styles.ratingText}>{product.rating} (120+ reviews)</Text>
          </View>

          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.sectionTitle}>About Product</Text>
          <Text style={styles.description}>{product.description} This high-quality product is specifically designed for your pet's health and happiness. Made with premium materials and tested for safety.</Text>

          <View style={styles.quantitySection}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.qtySelector}>
              <TouchableOpacity 
                style={styles.qtyBtn} 
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus size={20} color="#0f172a" />
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{quantity}</Text>
              <TouchableOpacity 
                style={styles.qtyBtn} 
                onPress={() => setQuantity(quantity + 1)}
              >
                <Plus size={20} color="#0f172a" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.secondaryBtn} 
          onPress={handleAddToCart}
          disabled={isAdding}
        >
          {isAdding ? (
            <ActivityIndicator color="#48d877" />
          ) : (
            <Text style={styles.secondaryBtnText}>Add to Cart</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.primaryBtn} onPress={handleBuyNow}>
          <ShoppingBag size={20} color="#ffffff" style={{ marginRight: 8 }} />
          <Text style={styles.primaryBtnText}>Buy Now</Text>
        </TouchableOpacity>
      </View>

      {/* Success Modal */}
      {isSuccess && (
        <View style={styles.successOverlay}>
          <View style={styles.successCard}>
            <CheckCircle2 size={48} color="#48d877" />
            <Text style={styles.successTitle}>Added to Cart!</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 10,
  },
  circleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#0f172a' },
  imageContainer: {
    width: '100%',
    height: 350,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: { width: '80%', height: '80%', resizeMode: 'contain' },
  detailsContainer: { padding: 24, backgroundColor: '#ffffff', borderTopLeftRadius: 32, borderTopRightRadius: 32, marginTop: -32 },
  categoryBadge: {
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  categoryText: { color: '#48d877', fontWeight: 'bold', fontSize: 12, textTransform: 'uppercase' },
  productName: { fontSize: 24, fontWeight: 'bold', color: '#0f172a', marginBottom: 8 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  stars: { flexDirection: 'row', gap: 2 },
  ratingText: { color: '#64748b', fontSize: 14 },
  price: { fontSize: 28, fontWeight: 'bold', color: '#48d877', marginBottom: 24 },
  divider: { height: 1, backgroundColor: '#f1f5f9', marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#0f172a', marginBottom: 12 },
  description: { fontSize: 15, color: '#64748b', lineHeight: 24, marginBottom: 24 },
  quantitySection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  qtySelector: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8fafc', borderRadius: 12, padding: 4 },
  qtyBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  qtyValue: { fontSize: 18, fontWeight: 'bold', color: '#0f172a', paddingHorizontal: 16 },
  footer: {
    padding: 24,
    paddingBottom: 40,
    flexDirection: 'row',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
  },
  secondaryBtn: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#48d877',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryBtnText: { color: '#48d877', fontSize: 16, fontWeight: 'bold' },
  primaryBtn: {
    flex: 1.5,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#48d877',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#48d877',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryBtnText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { fontSize: 18, color: '#0f172a', marginBottom: 20 },
  backBtn: { backgroundColor: '#48d877', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  backBtnText: { color: '#ffffff', fontWeight: 'bold' },
  successOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.7)', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  successCard: { backgroundColor: '#ffffff', padding: 32, borderRadius: 24, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 10 },
  successTitle: { marginTop: 16, fontSize: 18, fontWeight: 'bold', color: '#0f172a' },
});
