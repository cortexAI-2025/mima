import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import LoyaltyCard from '../components/LoyaltyCard';
import { purchaseHistory } from '../data/products';

export default function LoyaltyScreen() {
  const { currentTheme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Title */}
        <Text style={[styles.title, { color: currentTheme.accent }]}>بطاقة الولاء</Text>
        <Text style={[styles.subtitle, { color: currentTheme.textSecondary }]}>
          مرحباً بك في برنامج مكافآت ميما ناتيورالز
        </Text>

        {/* Loyalty Card Component */}
        <LoyaltyCard />

        {/* Rewards Section */}
        <View style={[styles.rewardsSection, { backgroundColor: currentTheme.surface }]}>
          <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>مكافآتك</Text>
          <View style={styles.rewardRow}>
            {[
              { icon: '☕', label: 'مشروب مجاني', pts: '200 نقطة' },
              { icon: '🍽️', label: 'طبق مجاني', pts: '500 نقطة' },
              { icon: '🎁', label: 'عرض خاص', pts: '1000 نقطة' },
            ].map((r, i) => (
              <View key={i} style={[styles.rewardCard, { backgroundColor: currentTheme.cardBg, borderColor: currentTheme.accent + '55' }]}>
                <Text style={styles.rewardIcon}>{r.icon}</Text>
                <Text style={[styles.rewardLabel, { color: currentTheme.text }]}>{r.label}</Text>
                <Text style={[styles.rewardPts, { color: currentTheme.accent }]}>{r.pts}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Purchase History */}
        <View style={styles.historySection}>
          <Text style={[styles.sectionTitle, { color: currentTheme.text, paddingHorizontal: 16 }]}>
            سجل المشتريات
          </Text>
          {purchaseHistory.map((item) => (
            <View
              key={item.id}
              style={[styles.historyItem, { backgroundColor: currentTheme.surface, borderLeftColor: currentTheme.accent }]}
            >
              <View style={styles.historyLeft}>
                <Text style={[styles.historyDate, { color: currentTheme.textSecondary }]}>{item.date}</Text>
                <Text style={[styles.historyItems, { color: currentTheme.text }]} numberOfLines={1}>
                  {item.items}
                </Text>
              </View>
              <View style={styles.historyRight}>
                <Text style={[styles.historyAmount, { color: currentTheme.accent }]}>
                  {item.amount} د.م
                </Text>
                <View style={[styles.pointsBadge, { backgroundColor: currentTheme.accent + '22', borderColor: currentTheme.accent + '66' }]}>
                  <Text style={[styles.pointsBadgeText, { color: currentTheme.accent }]}>
                    +{item.points} نقطة
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingBottom: 20 },
  title: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'right',
    writingDirection: 'rtl',
    paddingHorizontal: 16,
    paddingTop: 12,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'right',
    writingDirection: 'rtl',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  rewardsSection: {
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 14,
  },
  rewardRow: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  rewardCard: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 5,
  },
  rewardIcon: { fontSize: 22 },
  rewardLabel: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  rewardPts: {
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  historySection: { marginTop: 24 },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 14,
    borderRadius: 12,
    borderLeftWidth: 3,
  },
  historyLeft: { flex: 1, alignItems: 'flex-end' },
  historyDate: {
    fontSize: 11,
    textAlign: 'right',
    marginBottom: 3,
  },
  historyItems: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  historyRight: { alignItems: 'flex-end', marginLeft: 12 },
  historyAmount: { fontSize: 15, fontWeight: '800', marginBottom: 5 },
  pointsBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  pointsBadgeText: { fontSize: 11, fontWeight: '700' },
});
