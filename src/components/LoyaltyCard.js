import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;
const CARD_HEIGHT = CARD_WIDTH * 0.58;

const MEMBER_NAME = 'Badiaa RADI';
const MEMBER_ID = 'MIMA-2024-8847';
const POINTS = 850;
const MAX_POINTS = 1200;

export default function LoyaltyCard() {
  const { currentTheme } = useTheme();

  const progressPercent = (POINTS / MAX_POINTS) * 100;

  return (
    <View style={styles.wrapper}>
      {/* The Card */}
      <LinearGradient
        colors={[currentTheme.gradientStart, currentTheme.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, { width: CARD_WIDTH, height: CARD_HEIGHT }]}
      >
        {/* Decorative Circles */}
        <View style={[styles.decorCircle1, { backgroundColor: currentTheme.accent, opacity: 0.12 }]} />
        <View style={[styles.decorCircle2, { backgroundColor: currentTheme.accent, opacity: 0.08 }]} />

        {/* Top Row: Logo + Badge */}
        <View style={styles.topRow}>
          <View style={styles.logoArea}>
            <Text style={styles.logoEmoji}>🌿</Text>
            <Text style={[styles.logoText, { color: currentTheme.accent }]}>
              Mima Naturals
            </Text>
          </View>
          <View style={[styles.premiumBadge, { borderColor: currentTheme.accent }]}>
            <Text style={[styles.premiumText, { color: currentTheme.accent }]}>GOLD</Text>
          </View>
        </View>

        {/* Chip + QR */}
        <View style={styles.midRow}>
          {/* Chip */}
          <View style={[styles.chip, { borderColor: currentTheme.accentLight }]}>
            <View style={[styles.chipInner, { borderColor: currentTheme.accent }]} />
            <View style={[styles.chipLine, { backgroundColor: currentTheme.accent }]} />
          </View>

          {/* QR Code */}
          <View style={[styles.qrContainer, { backgroundColor: '#FFFFFF', borderColor: currentTheme.accent }]}>
            <QRCode
              value={`MIMA-LOYALTY:${MEMBER_ID}`}
              size={60}
              color="#1a1a1a"
              backgroundColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Bottom Row: Name + ID */}
        <View style={styles.bottomRow}>
          <View>
            <Text style={[styles.memberLabel, { color: currentTheme.textSecondary }]}>
              العضو
            </Text>
            <Text style={[styles.memberName, { color: '#FFFFFF' }]}>
              {MEMBER_NAME}
            </Text>
            <Text style={[styles.memberId, { color: currentTheme.accent }]}>
              {MEMBER_ID}
            </Text>
          </View>
          <View style={styles.pointsArea}>
            <Text style={[styles.pointsLabel, { color: currentTheme.textSecondary }]}>
              النقاط
            </Text>
            <Text style={[styles.pointsValue, { color: currentTheme.accent }]}>
              {POINTS}
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Points Progress Bar */}
      <View style={[styles.progressSection, { backgroundColor: currentTheme.surface }]}>
        <View style={styles.progressHeader}>
          <Text style={[styles.progressTitle, { color: currentTheme.text }]}>
            تقدم النقاط
          </Text>
          <Text style={[styles.progressValues, { color: currentTheme.textSecondary }]}>
            {POINTS} / {MAX_POINTS}
          </Text>
        </View>

        {/* Bar */}
        <View style={[styles.progressBarTrack, { backgroundColor: currentTheme.buttonBg }]}>
          <LinearGradient
            colors={[currentTheme.accent, currentTheme.accentLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.progressBarFill, { width: `${progressPercent}%` }]}
          />
        </View>

        <Text style={[styles.progressHint, { color: currentTheme.textSecondary }]}>
          تحتاج إلى {MAX_POINTS - POINTS} نقطة للوصول إلى مستوى بلاتيني
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  card: {
    borderRadius: 20,
    padding: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
    justifyContent: 'space-between',
  },
  decorCircle1: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    top: -40,
    right: -30,
  },
  decorCircle2: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    bottom: -30,
    left: 40,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  logoEmoji: {
    fontSize: 16,
  },
  logoText: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  premiumBadge: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  premiumText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
  },
  midRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chip: {
    width: 44,
    height: 32,
    borderRadius: 5,
    borderWidth: 1.5,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipInner: {
    width: 30,
    height: 22,
    borderRadius: 3,
    borderWidth: 1,
  },
  chipLine: {
    position: 'absolute',
    width: '100%',
    height: 1,
    opacity: 0.6,
  },
  qrContainer: {
    padding: 6,
    borderRadius: 10,
    borderWidth: 1.5,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  memberLabel: {
    fontSize: 9,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  memberName: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  memberId: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 1,
    marginTop: 2,
  },
  pointsArea: {
    alignItems: 'flex-end',
  },
  pointsLabel: {
    fontSize: 9,
    letterSpacing: 1,
    marginBottom: 2,
    textAlign: 'right',
  },
  pointsValue: {
    fontSize: 26,
    fontWeight: '800',
  },
  progressSection: {
    marginTop: 16,
    borderRadius: 14,
    padding: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  progressValues: {
    fontSize: 13,
    fontWeight: '600',
  },
  progressBarTrack: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressHint: {
    fontSize: 11,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});
