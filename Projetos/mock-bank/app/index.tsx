import { useRouter } from 'expo-router';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity, StatusBar
} from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  const navigateToLogin = () => {
    router.push("/Login")
  };

  const navigateToSignUp = () => {
    router.push("/Register")
  };

  return (
      <>
      <StatusBar barStyle="dark-content" backgroundColor="#f7f8fa" />
      
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          {/* <Image
            source={require('./assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          /> */}
          <Text style={styles.appName}>Mock Bank</Text>
          <Text style={styles.slogan}>O Banco de todos</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={navigateToLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signUpButton}
            onPress={navigateToSignUp}
            activeOpacity={0.8}
          >
            <Text style={styles.signUpButtonText}>CADASTRO</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Versão 1.0.0</Text>
        </View>
      </View>
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