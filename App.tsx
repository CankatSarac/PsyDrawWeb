import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import screens
import TimelineScreen from './src/screens/TimelineScreen';
import CameraScreen from './src/screens/CameraScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import TrialCounter from './src/components/TrialCounter';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <OnboardingScreen />
          <TrialCounter />
          <Tab.Navigator
            screenOptions={{
              tabBarStyle: styles.tabBar,
              tabBarActiveTintColor: '#FFB88E',
              tabBarInactiveTintColor: 'gray',
              headerShown: false,
            }}
          >
            <Tab.Screen
              name="Timeline"
              component={TimelineScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="clock" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Capture"
              component={CameraScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="camera" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="cog" size={size} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCEBD1',
  },
  tabBar: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    height: 60,
    paddingBottom: 5,
  },
}); 