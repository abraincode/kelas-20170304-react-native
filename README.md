# Kelas React Native

This repository contains example app from Abraincode meetup

### Presentation slide

Please [download here](./assets/ReactNative.pdf).

### Requirements

- Nodejs 6.x
- Android SDK. When you deploying for the first time, you'll be asked to fill the requirements gap (Build-tools, Android Platform SDK, Android Support Repository, etc). Install them via Android SDK.
- The versions that used when this documentation written are : `react-native 0.42.0`, `react-native-cli 2.0.1`

### Preparation

- Setup environment variable correctly for JAVA_HOME and ANDROID_HOME
- Install React Native CLI globally, `npm install -g react-native-cli`
- Enter the working dir then install the dependencies, `npm run install`
- Prepare the emulator or device

### Deploy

- In other terminal session, run `react-native start` to fire packager microservice (live on port 8081).
- For Android, `react-native run-android`
- For iOS, `react-native run-android`
- There is Live Reload and Hot Reload feature. Setup correct address (packager) on dev settings if you want to use them.

### Build an installable APK file

You need to sign the APK. Please consult the [official documentation](https://facebook.github.io/react-native/releases/0.42/docs/signed-apk-android.html).

### TODO

- Step by step tutorial

### Screenshot

![alt text](./assets/ios.png)
![alt text](./assets/android.png)

