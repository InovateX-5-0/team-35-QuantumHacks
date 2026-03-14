import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Trash2, ShoppingBag, Plus, Minus } from 'lucide-react-native';
import { useApp } from '../context/AppContext';

const Cart = () => {
  const router = useRouter();
  const { cart, updateCartQuantity, removeFromCart, clearCart } = useApp();
  
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ChevronLeft size={24} color="#0f172a" />
          </TouchableOpacity>
          <Text style={styles.title}>Shopping Cart</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.emptyContainer}>
          <ShoppingBag size={64} color="#e2e8f0" />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity 
            style={styles.shopBtn} 
            onPress={() => router.push('/marketplace')}
          >
            <Text style={styles.shopBtnText}>Go Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.title}>Shopping Cart</Text>
        <TouchableOpacity onPress={clearCart}>
          <Trash2 size={20} color="#64748b" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {cart.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="contain" />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
              <View style={styles.qtyRow}>
                <View style={styles.qtyControls}>
                  <TouchableOpacity 
                    onPress={() => updateCartQuantity(item.id, item.quantity - 1)}
                    style={styles.qtyAction}
                  >
                    <Text style={styles.qtyActionText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity 
                    onPress={() => updateCartQuantity(item.id, item.quantity + 1)}
                    style={styles.qtyAction}
                  >
                    <Text style={styles.qtyActionText}>+</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Trash2 size={18} color="#ef4444" />
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
  checkoutBtnText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyText: { fontSize: 18, color: '#64748b', marginTop: 16, marginBottom: 24 },
  shopBtn: { backgroundColor: '#48d877', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12 },
  shopBtnText: { color: '#ffffff', fontWeight: 'bold' },
  qtyControls: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8fafc', borderRadius: 8, padding: 2 },
  qtyAction: { width: 28, height: 28, justifyContent: 'center', alignItems: 'center' },
  qtyActionText: { fontSize: 18, fontWeight: 'bold', color: '#0f172a' },
});

export default Cart;
