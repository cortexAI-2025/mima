import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { products } from '../data/products';

const { width } = Dimensions.get('window');

const CATEGORIES = ['الكل', 'كلاسيك', 'رياضي', 'لايت'];

export default function SearchScreen() {
  const { currentTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('الكل');

  const categoryMap = { 'الكل': null, 'كلاسيك': 'classic', 'رياضي': 'sport', 'لايت': 'light' };

  const filtered = products.filter((p) => {
    const matchQuery = query.length === 0 || p.name.includes(query) || p.description.includes(query);
    const matchCat = !categoryMap[activeCategory] || p.category === categoryMap[activeCategory];
    return matchQuery && matchCat;
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      {/* Title */}
      <Text style={[styles.title, { color: currentTheme.accent }]}>البحث</Text>

      {/* Search Input */}
      <View style={[styles.searchBar, { backgroundColor: currentTheme.surface, borderColor: currentTheme.accent + '66' }]}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={[styles.input, { color: currentTheme.text }]}
          placeholder="ابحث عن طبق..."
          placeholderTextColor={currentTheme.textSecondary}
          value={query}
          onChangeText={setQuery}
          textAlign="right"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Text style={[styles.clearBtn, { color: currentTheme.textSecondary }]}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Category Filter */}
      <View style={styles.categories}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.catChip,
              {
                backgroundColor: activeCategory === cat ? currentTheme.accent : currentTheme.surface,
                borderColor: currentTheme.accent + '88',
              },
            ]}
            onPress={() => setActiveCategory(cat)}
            activeOpacity={0.75}
          >
            <Text
              style={[
                styles.catLabel,
                {
                  color: activeCategory === cat
                    ? (currentTheme.name === 'light' ? '#3A2A2A' : '#1a1a1a')
                    : currentTheme.textSecondary,
                  fontWeight: activeCategory === cat ? '700' : '500',
                },
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Results Count */}
      <Text style={[styles.resultsCount, { color: currentTheme.textSecondary }]}>
        {filtered.length} نتيجة
      </Text>

      {/* Results List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.resultCard, { backgroundColor: currentTheme.cardBg, borderColor: currentTheme.accent + '55' }]}
            activeOpacity={0.8}
          >
            <Image source={{ uri: item.image }} style={styles.resultImage} resizeMode="cover" />
            <View style={styles.resultInfo}>
              <Text style={[styles.resultName, { color: currentTheme.text }]} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={[styles.resultDesc, { color: currentTheme.textSecondary }]} numberOfLines={2}>
                {item.description}
              </Text>
              <Text style={[styles.resultPrice, { color: currentTheme.accent }]}>
                {item.price} د.م
              </Text>
            </View>
            {item.badge ? (
              <View style={[styles.badge, { backgroundColor: currentTheme.accent }]}>
                <Text style={[styles.badgeText, { color: currentTheme.name === 'light' ? '#3A2A2A' : '#1a1a1a' }]}>
                  {item.badge}
                </Text>
              </View>
            ) : null}
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🍽️</Text>
            <Text style={[styles.emptyText, { color: currentTheme.textSecondary }]}>
              لا توجد نتائج مطابقة
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'right',
    writingDirection: 'rtl',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 14,
    gap: 8,
  },
  searchIcon: {
    fontSize: 16,
  },
  input: {
    flex: 1,
    fontSize: 15,
    writingDirection: 'rtl',
  },
  clearBtn: {
    fontSize: 16,
    paddingHorizontal: 4,
  },
  categories: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 10,
  },
  catChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  catLabel: {
    fontSize: 13,
  },
  resultsCount: {
    textAlign: 'right',
    paddingHorizontal: 16,
    fontSize: 12,
    marginBottom: 10,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 12,
  },
  resultCard: {
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
    height: 90,
  },
  resultImage: {
    width: 90,
    height: '100%',
  },
  resultInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  resultName: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 3,
  },
  resultDesc: {
    fontSize: 11,
    textAlign: 'right',
    writingDirection: 'rtl',
    lineHeight: 16,
    marginBottom: 4,
  },
  resultPrice: {
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'right',
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
  },
  empty: {
    alignItems: 'center',
    paddingTop: 60,
    gap: 12,
  },
  emptyEmoji: {
    fontSize: 48,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
