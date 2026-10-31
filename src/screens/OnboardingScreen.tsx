import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

interface Slide {
  id: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    id: '1',
    title: 'Welcome to PsyDraw',
    description: 'Capture and analyze your drawings with AI-powered insights',
  },
  {
    id: '2',
    title: 'Smart Analysis',
    description: 'Get detailed analysis of your drawings and track your progress',
  },
  {
    id: '3',
    title: 'Privacy First',
    description: 'Your data is secure and private. We never share your information',
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(true);

  const checkOnboardingStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('onboardingCompleted');
      if (value === 'true') {
        setShowOnboarding(false);
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('onboardingCompleted', 'true');
      setShowOnboarding(false);
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const renderItem = ({ item }: { item: Slide }) => (
    <View style={styles.slide}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  const renderDot = (index: number) => (
    <View
      style={[
        styles.dot,
        { backgroundColor: index === currentIndex ? '#FFB88E' : '#CCC' },
      ]}
    />
  );

  if (!showOnboarding) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => renderDot(index))}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={completeOnboarding}
      >
        <Text style={styles.buttonText}>
          {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCEBD1',
  },
  slide: {
    width,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  button: {
    backgroundColor: '#FFB88E',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
}); 