import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../context/ThemeContext';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import LoyaltyScreen from '../screens/LoyaltyScreen';
import AccountScreen from '../screens/AccountScreen';

const Tab = createBottomTabNavigator();

function TabIcon({ emoji, focused, color }) {
  return (
    <Text style={{ fontSize: focused ? 22 : 19, opacity: focused ? 1 : 0.65 }}>
      {emoji}
    </Text>
  );
}

export default function AppNavigator() {
  const { currentTheme } = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: currentTheme.tabBar,
            borderTopColor: currentTheme.accent + '55',
            borderTopWidth: 1.5,
            height: 64,
            paddingBottom: 8,
            paddingTop: 6,
          },
          tabBarActiveTintColor: currentTheme.accent,
          tabBarInactiveTintColor: currentTheme.textSecondary,
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '700',
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'البوتيك',
            tabBarIcon: ({ focused, color }) => (
              <TabIcon emoji="🏠" focused={focused} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarLabel: 'البحث',
            tabBarIcon: ({ focused, color }) => (
              <TabIcon emoji="🔍" focused={focused} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Loyalty"
          component={LoyaltyScreen}
          options={{
            tabBarLabel: 'بطاقتي',
            tabBarIcon: ({ focused, color }) => (
              <TabIcon emoji="💳" focused={focused} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            tabBarLabel: 'حسابي',
            tabBarIcon: ({ focused, color }) => (
              <TabIcon emoji="👤" focused={focused} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
