import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text, TouchableOpacity, StatusBar
} from 'react-native';

import Animated, { FadeIn, SlideInDown, SlideInUp, ZoomIn } from 'react-native-reanimated';

export default function WelcomeScreen() {
  const { navigate } = useNavigation();

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f7f8fa" />

      <Animated.View
        entering={FadeIn.duration(1000).delay(300)}
        style={styles.content}
      >
        <Animated.View
          entering={SlideInUp.duration(100).delay(1000)}
          style={styles.logoContainer}
        >
          <Text style={styles.appName}>Mock Bank</Text>
          <Text style={styles.slogan}>O Banco de todos</Text>
        </Animated.View>

        <Animated.View
          entering={ZoomIn.duration(1000).delay(1000)}
          style={styles.buttonContainer}
        >
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigate("LoginScreen")}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => navigate("Register")}
            activeOpacity={0.8}
          >
            <Text style={styles.signUpButtonText}>CADASTRO</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          entering={SlideInDown.duration(100).delay(1000)}
          style={styles.footer}
        >
          <Text style={styles.footerText}>Versão 1.0.0</Text>
        </Animated.View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e3e5c',
    marginBottom: 10,
  },
  slogan: {
    fontSize: 16,
    color: '#7b8bb2',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 50,
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: '#4a7df3',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#4a7df3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  signUpButtonText: {
    color: '#2e3e5c',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#7b8bb2',
  },
});