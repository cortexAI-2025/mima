import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { themes } from '../theme/themes';

const THEME_KEYS = ['classic', 'sport', 'light'];
const THEME_DOT_COLORS = { classic: '#004d40', sport: '#002f6c', light: '#e1b3b3' };
const THEME_ICONS = { classic: '🌿', sport: '💪', light: '🌸' };

export default function ThemeSelector() {
  const { currentThemeName, setTheme, currentTheme } = useTheme();

  return (
    <View style={[styles.outerWrap, { borderColor: currentTheme.accent + '44' }]}>
      <View style={[styles.container, { backgroundColor: currentTheme.surface }]}>
        {THEME_KEYS.map((key, index) => {
          const theme = themes[key];
          const isActive = currentThemeName === key;
          const labelColor = isActive
            ? (key === 'light' ? '#3A2A2A' : '#1a1a1a')
            : currentTheme.textSecondary;

          return (
            <TouchableOpacity
              key={key}
              style={[
                styles.segment,
                index === 0 && styles.segmentFirst,
                index === THEME_KEYS.length - 1 && styles.segmentLast,
                isActive && { backgroundColor: currentTheme.accent },
              ]}
              onPress={() => setTheme(key)}
              activeOpacity={0.7}
            >
              <Text style={styles.icon}>{THEME_ICONS[key]}</Text>
              <Text style={[styles.label, { color: labelColor, fontWeight: isActive ? '700' : '500' }]}>
                {theme.label}
              </Text>
              {isActive && (
                <View style={[styles.activeDot, { backgroundColor: key === 'light' ? '#3A2A2A' : '#1a1a1a' }]} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrap: {
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  container: {
    flexDirection: 'row',
    height: 50,
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  segmentFirst: {
    borderTopLeftRadius: 13,
    borderBottomLeftRadius: 13,
  },
  segmentLast: {
    borderTopRightRadius: 13,
    borderBottomRightRadius: 13,
  },
  icon: { fontSize: 12, lineHeight: 14 },
  label: { fontSize: 13, letterSpacing: 0.3 },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 1,
  },
});
