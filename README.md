# Kelas React Native

This repository contains React Native example app from Abraincode meetup that held in [Keboencoding](https://www.google.co.id/maps/place/Keboen+Coding+-+IT+Community/@-6.3621547,106.8384558,15z/data=!4m2!3m1!1s0x0:0x813f0df3a09fcde5?sa=X&ved=0ahUKEwi9rsrT_rzSAhUUTo8KHYB4CTcQ_BIIajAO)

### Presentation slide

Please [download here](https://github.com/herpiko/kelas-20170304-react-native/raw/master/assets/ReactNative.pdf).

Some lines of code also explained in comments.

### Requirements

- Nodejs 6.x
- Android SDK. When you deploying for the first time, you'll be asked to fill the requirements gap (Build-tools, Android Platform SDK, Android Support Repository, etc). Install them via Android SDK.
- The versions that used when this documentation written were : `react-native 0.42.0`, `react-native-cli 2.0.1`

#### Simple HTTP API Server

- The app depends on an API, see [https://github.com/herpiko/wikipedia-featured-simple-api-example](https://github.com/herpiko/wikipedia-featured-simple-api-example).


### Preparation
- Setup environment variable correctly for `JAVA_HOME` and `ANDROID_HOME`
- Install React Native CLI globally, `npm install -g react-native-cli`
- Enter the working dir then install the dependencies, `npm run install`
- Prepare the emulator or device
- Change the `HOST` address to your own deployed API server.

### Deploy

- In other terminal session, run `react-native start` to fire packager microservice (live on port 8081).
- For Android, `react-native run-android`
- For iOS, `react-native run-ios`
- There is Live Reload and Hot Reload feature. Setup the correct address (packager) on dev settings if you want to use them.

### Build an installable APK file

You need to sign the APK. Please consult the [official documentation](https://facebook.github.io/react-native/releases/0.42/docs/signed-apk-android.html).

### TODO

- Step by step tutorial

### Screenshot

![alt text](./assets/android.png)
![alt text](./assets/ios.png)

