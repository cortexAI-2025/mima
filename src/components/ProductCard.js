import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function ProductCard({ product, onAddToCart, isInCart, cartCount }) {
  const { currentTheme } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: currentTheme.cardBg,
          borderColor: currentTheme.accent,
          shadowColor: currentTheme.accent,
        },
      ]}
    >
      {/* Badge */}
      {!!product.badge && (
        <View style={[styles.badge, { backgroundColor: currentTheme.accent }]}>
          <Text style={[styles.badgeText, { color: currentTheme.name === 'light' ? '#3A2A2A' : '#1a1a1a' }]}>
            {product.badge}
          </Text>
        </View>
      )}

      {/* Product Image */}
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Content */}
      <View style={styles.content}>
        <Text
          style={[styles.name, { color: currentTheme.text }]}
          numberOfLines={2}
        >
          {product.name}
        </Text>

        <Text
          style={[styles.description, { color: currentTheme.textSecondary }]}
          numberOfLines={3}
        >
          {product.description}
        </Text>

        {/* Price + Button row */}
        <View style={styles.footer}>
          <Text style={[styles.price, { color: currentTheme.accent }]}>
            {product.price} <Text style={styles.currency}>د.م</Text>
          </Text>

          <TouchableOpacity
            style={[
              styles.addButton,
              {
                backgroundColor: isInCart ? currentTheme.accent : currentTheme.buttonBg,
                borderColor: currentTheme.accent,
              },
            ]}
            onPress={() => onAddToCart(product)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.addButtonText,
                {
                  color: isInCart
                    ? (currentTheme.name === 'light' ? '#3A2A2A' : '#1a1a1a')
                    : currentTheme.accent,
                },
              ]}
            >
              {isInCart ? `✓ ${cartCount}` : '+ أضف'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.addLabel, { color: currentTheme.textSecondary }]}>
          أضف إلى الحقيبة
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 14,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  image: {
    width: '100%',
    height: 130,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 5,
    lineHeight: 22,
  },
  description: {
    fontSize: 11,
    textAlign: 'right',
    writingDirection: 'rtl',
    lineHeight: 17,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  price: {
    fontSize: 17,
    fontWeight: '800',
  },
  currency: {
    fontSize: 12,
    fontWeight: '500',
  },
  addButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    minWidth: 50,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 13,
    fontWeight: '700',
  },
  addLabel: {
    fontSize: 10,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});
