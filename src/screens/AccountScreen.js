import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';

const MENU_ITEMS = [
  { icon: '📦', label: 'طلباتي', desc: 'تتبع وتاريخ طلباتك' },
  { icon: '❤️', label: 'المفضلة', desc: 'أطباقك المفضلة' },
  { icon: '📍', label: 'عناويني', desc: 'إدارة عناوين التوصيل' },
  { icon: '🎁', label: 'العروض', desc: 'كوبونات وعروض حصرية' },
  { icon: '🔔', label: 'الإشعارات', desc: 'إعدادات الإشعارات' },
  { icon: '🌐', label: 'اللغة', desc: 'العربية' },
  { icon: '🔒', label: 'الأمان', desc: 'كلمة المرور والخصوصية' },
  { icon: '💬', label: 'الدعم', desc: 'تواصل معنا' },
];

export default function AccountScreen() {
  const { currentTheme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Banner */}
        <LinearGradient
          colors={[currentTheme.gradientStart, currentTheme.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          {/* Avatar */}
          <View style={[styles.avatar, { borderColor: currentTheme.accent }]}>
            <Text style={[styles.avatarInitial, { color: currentTheme.accent }]}>BR</Text>
          </View>
          <Text style={[styles.memberName, { color: '#FFFFFF' }]}>Badiaa RADI</Text>
          <Text style={[styles.memberEmail, { color: currentTheme.accentLight }]}>
            badiaa.radi@email.com
          </Text>
          {/* Gold Member Badge */}
          <View style={[styles.goldBadge, { borderColor: currentTheme.accent }]}>
            <Text style={[styles.goldBadgeText, { color: currentTheme.accent }]}>⭐ عضو ذهبي</Text>
          </View>
        </LinearGradient>

        {/* Stats Row */}
        <View style={[styles.statsRow, { backgroundColor: currentTheme.surface }]}>
          {[
            { val: '850', label: 'نقطة' },
            { val: '12', label: 'طلب' },
            { val: '3', label: 'مكافأة' },
          ].map((s, i) => (
            <View key={i} style={[styles.statItem, i < 2 && { borderRightWidth: 1, borderRightColor: currentTheme.accent + '33' }]}>
              <Text style={[styles.statVal, { color: currentTheme.accent }]}>{s.val}</Text>
              <Text style={[styles.statLabel, { color: currentTheme.textSecondary }]}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {MENU_ITEMS.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.menuItem,
                { backgroundColor: currentTheme.surface, borderBottomColor: currentTheme.accent + '22' },
              ]}
              activeOpacity={0.7}
            >
              <Text style={styles.menuArrow}>‹</Text>
              <View style={styles.menuContent}>
                <Text style={[styles.menuLabel, { color: currentTheme.text }]}>{item.label}</Text>
                <Text style={[styles.menuDesc, { color: currentTheme.textSecondary }]}>{item.desc}</Text>
              </View>
              <View style={[styles.menuIconWrap, { backgroundColor: currentTheme.accent + '22' }]}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={[styles.logoutBtn, { borderColor: '#E53935' }]}
          activeOpacity={0.75}
        >
          <Text style={[styles.logoutText, { color: '#E53935' }]}>🚪 تسجيل الخروج</Text>
        </TouchableOpacity>

        <Text style={[styles.version, { color: currentTheme.textSecondary }]}>
          Mima Naturals v1.0.0
        </Text>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  banner: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 20,
    gap: 6,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginBottom: 8,
  },
  avatarInitial: { fontSize: 28, fontWeight: '800' },
  memberName: { fontSize: 22, fontWeight: '800', letterSpacing: 0.5 },
  memberEmail: { fontSize: 13, opacity: 0.9 },
  goldBadge: {
    marginTop: 8,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: 'rgba(201,168,76,0.15)',
  },
  goldBadgeText: { fontSize: 13, fontWeight: '700' },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 14,
    overflow: 'hidden',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },
  statVal: { fontSize: 22, fontWeight: '800' },
  statLabel: { fontSize: 12, marginTop: 2 },
  menuSection: { marginTop: 20, marginHorizontal: 16, borderRadius: 16, overflow: 'hidden', gap: 1 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  menuArrow: {
    fontSize: 20,
    color: '#888',
    marginLeft: 4,
    transform: [{ scaleX: -1 }],
  },
  menuContent: { flex: 1, alignItems: 'flex-end', marginRight: 12 },
  menuLabel: { fontSize: 15, fontWeight: '600', textAlign: 'right', writingDirection: 'rtl' },
  menuDesc: { fontSize: 11, textAlign: 'right', marginTop: 1 },
  menuIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: { fontSize: 20 },
  logoutBtn: {
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  logoutText: { fontSize: 16, fontWeight: '700' },
  version: { textAlign: 'center', fontSize: 11, marginTop: 16 },
});
