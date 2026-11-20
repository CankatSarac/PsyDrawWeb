# PsyDraw Mobile App

A React Native mobile application for capturing and analyzing drawings with AI-powered insights.

## Features

- Camera integration for capturing drawings
- Timeline view of captured images
- AI-powered drawing analysis
- Trial period management
- Dark mode support
- Privacy-focused design

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- React Native development environment setup
  - For iOS: Xcode (Mac only)
  - For Android: Android Studio and Android SDK

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/psydraw-mobile.git
cd psydraw-mobile
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. iOS specific setup (Mac only):
```bash
cd ios
pod install
cd ..
```

## Running the App

### iOS (Mac only)
```bash
npm run ios
# or
yarn ios
```

### Android
```bash
npm run android
# or
yarn android
```

## Development

The app is built with:
- React Native
- TypeScript
- React Navigation
- React Native Vision Camera
- AsyncStorage for data persistence

### Project Structure

```
src/
  ├── components/     # Reusable components
  ├── screens/        # Screen components
  ├── hooks/         # Custom hooks
  └── utils/         # Utility functions
```

## Building for Production

### Android
1. Update the version in `android/app/build.gradle`
2. Create a keystore and configure signing
3. Run:
```bash
cd android
./gradlew assembleRelease
```

### iOS
1. Update the version in Xcode
2. Configure certificates and provisioning profiles
3. Archive and upload through Xcode

## License

This project is licensed under the MIT License - see the LICENSE file for details. 