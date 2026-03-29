import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function Header({ onMenuPress, onProfilePress }) {
  const { currentTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      {/* Left: Profile Icon */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={onProfilePress}
        activeOpacity={0.7}
      >
        <View style={[styles.profileCircle, { borderColor: currentTheme.accent + 'AA' }]}>
          <Text style={[styles.profileInitial, { color: currentTheme.accent }]}>👤</Text>
        </View>
      </TouchableOpacity>

      {/* Center: Logo */}
      <View style={styles.logoContainer}>
        <Text style={[styles.laurel, { color: currentTheme.accent }]}>🌿</Text>
        <View style={styles.logoTextBlock}>
          <Text style={styles.logoEmoji}>🌳</Text>
          <Text style={[styles.logoTitle, { color: currentTheme.accent }]}>Mima</Text>
          <Text style={[styles.logoSubtitle, { color: currentTheme.accentLight }]}>NATURALS</Text>
        </View>
        <Text style={[styles.laurel, styles.laurelFlip, { color: currentTheme.accent }]}>🌿</Text>
      </View>

      {/* Right: Burger Menu */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={onMenuPress}
        activeOpacity={0.7}
      >
        <View style={styles.burgerWrap}>
          <View style={[styles.menuLine, { backgroundColor: currentTheme.accent }]} />
          <View style={[styles.menuLine, styles.menuLineMiddle, { backgroundColor: currentTheme.accent }]} />
          <View style={[styles.menuLine, { backgroundColor: currentTheme.accent }]} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 0 : 8,
    paddingBottom: 10,
    minHeight: 74,
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitial: { fontSize: 18 },
  burgerWrap: {
    width: 36,
    height: 36,
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 5,
  },
  menuLine: {
    width: 24,
    height: 2.5,
    borderRadius: 1.5,
  },
  menuLineMiddle: { width: 16 },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  laurel: { fontSize: 14, opacity: 0.85 },
  laurelFlip: { transform: [{ scaleX: -1 }] },
  logoTextBlock: { alignItems: 'center' },
  logoEmoji: { fontSize: 24, lineHeight: 28 },
  logoTitle: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 1,
    lineHeight: 24,
  },
  logoSubtitle: {
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 3.5,
    lineHeight: 12,
  },
});
