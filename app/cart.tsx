import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Trash2, ShoppingBag } from 'lucide-react-native';

const Cart = () => {
  const router = useRouter();
  
  const cartItems = [
    { id: 1, name: 'Premium Puppy Food', price: 45.99, qty: 1, image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=200' },
    { id: 2, name: 'Squeaky Toy Bone', price: 12.50, qty: 2, image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=200' }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.title}>Shopping Cart</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
              <View style={styles.qtyRow}>
                <Text style={styles.qtyText}>Qty: {item.qty}</Text>
                <TouchableOpacity>
                  <Trash2 size={16} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.receipt}>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Subtotal</Text>
            <Text style={styles.receiptValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Tax (8%)</Text>
            <Text style={styles.receiptValue}>${tax.toFixed(2)}</Text>
          </View>
          <View style={[styles.receiptRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.checkoutBtn} onPress={() => { Alert.alert('Success', 'Checkout successful!'); router.push('/marketplace'); }}>
          <ShoppingBag size={20} color="#ffffff" style={{ marginRight: 8 }} />
          <Text style={styles.checkoutBtnText}>Checkout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { flex: 1, padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 16, marginTop: 40 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', elevation: 2 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#0f172a' },
  cartItem: { flexDirection: 'row', backgroundColor: '#ffffff', borderRadius: 16, padding: 12, marginBottom: 16, elevation: 1 },
  itemImage: { width: 80, height: 80, borderRadius: 12 },
  itemDetails: { flex: 1, marginLeft: 16, justifyContent: 'center' },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#0f172a', marginBottom: 4 },
  itemPrice: { fontSize: 14, fontWeight: 'bold', color: '#48d877', marginBottom: 8 },
  qtyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  qtyText: { fontSize: 12, color: '#64748b', fontWeight: '500' },
  receipt: { backgroundColor: '#ffffff', borderRadius: 16, padding: 16, marginTop: 20, elevation: 1 },
  receiptRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  receiptLabel: { fontSize: 14, color: '#64748b' },
  receiptValue: { fontSize: 14, color: '#0f172a', fontWeight: 'bold' },
  totalRow: { borderTopWidth: 1, borderTopColor: '#f1f5f9', paddingTop: 12, marginTop: 4 },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: '#0f172a' },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: '#48d877' },
  checkoutBtn: { backgroundColor: '#48d877', flexDirection: 'row', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginTop: 32 },
  checkoutBtnText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' }
});

export default Cart;
