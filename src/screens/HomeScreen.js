import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';
import ThemeSelector from '../components/ThemeSelector';
import ProductCard from '../components/ProductCard';
import { products, chefCollections } from '../data/products';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 48) / 2;

export default function HomeScreen({ navigation }) {
  const { currentTheme } = useTheme();
  const [cart, setCart] = useState({});

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const handleAddToCart = (product) => {
    setCart((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: currentTheme.background }]}>
      <Header
        onMenuPress={() => {}}
        onProfilePress={() => navigation.navigate('Account')}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Theme Selector */}
        <ThemeSelector />

        {/* Chef Collections Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>
            مجموعات الشيف
          </Text>
          <TouchableOpacity>
            <Text style={[styles.seeAll, { color: currentTheme.accent }]}>
              المصراف
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chefScroll}
        >
          {chefCollections.map((item) => (
            <TouchableOpacity key={item.id} style={styles.chefItem} activeOpacity={0.85}>
              <Image
                source={{ uri: item.image }}
                style={[styles.chefImage, { borderColor: currentTheme.accent }]}
                resizeMode="cover"
              />
              <Text style={[styles.chefLabel, { color: currentTheme.textSecondary }]} numberOfLines={1}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Boutique Section */}
        <Text style={[styles.sectionTitle, styles.boutiqueTitle, { color: currentTheme.text }]}>
          قطع البوتيك
        </Text>

        {/* 2-column product grid */}
        <View style={styles.grid}>
          {products.map((product, index) => (
            <View key={product.id} style={[styles.gridItem, { width: COLUMN_WIDTH }]}>
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
                isInCart={!!cart[product.id]}
                cartCount={cart[product.id] || 0}
              />
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <TouchableOpacity
          style={[styles.cartButton, { backgroundColor: currentTheme.accent }]}
          activeOpacity={0.85}
        >
          <Text style={styles.cartEmoji}>🛍️</Text>
          <Text style={[styles.cartText, { color: currentTheme.name === 'light' ? '#3A2A2A' : '#1a1a1a' }]}>
            حقيبة التسوق
          </Text>
          <View style={[styles.cartBadge, { backgroundColor: currentTheme.name === 'light' ? '#3A2A2A' : '#1a1a1a' }]}>
            <Text style={[styles.cartBadgeText, { color: currentTheme.accent }]}>
              {totalItems}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  seeAll: {
    fontSize: 13,
    fontWeight: '600',
  },
  boutiqueTitle: {
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  chefScroll: {
    paddingHorizontal: 12,
    paddingBottom: 4,
    gap: 10,
    flexDirection: 'row',
  },
  chefItem: {
    alignItems: 'center',
    width: 90,
  },
  chefImage: {
    width: 80,
    height: 80,
    borderRadius: 14,
    borderWidth: 2,
  },
  chefLabel: {
    fontSize: 10,
    marginTop: 5,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 16,
    justifyContent: 'space-between',
  },
  gridItem: {
    // width set dynamically
  },
  cartButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    gap: 8,
  },
  cartEmoji: {
    fontSize: 18,
  },
  cartText: {
    fontSize: 15,
    fontWeight: '700',
  },
  cartBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    fontSize: 12,
    fontWeight: '800',
  },
});
