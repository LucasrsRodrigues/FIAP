import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

export default function LoginScreen() {
  const [apelido, setApelido] = useState('');
  const [senha, setSenha] = useState('');
   const router = useRouter();

  const handleLogin = async () => {
    try {
      if (apelido.trim() === '' || senha.trim() === '') {
        Alert.alert('Erro', 'Por favor, preencha todos os campos');
        return;
      }

      // Aqui você implementaria a lógica de autenticação
      const datToSend = {
        apelido,
        senha,
      }

      const response = await
        fetch("https://mock-bank-mock-back.yexuz7.easypanel.host/auth/login", {
          method: "POST",
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify(datToSend)
        });

      if (!response.ok) {
        const dataError = await response.json();

        throw new Error(dataError?.message);
      }

      const data = await response.json();

      await AsyncStorage.setItem("@token", data.token);

      // Limpar os campos após o login
      router.push("/Dashboard")
    } catch (error) {
      Alert.alert(error?.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        {/* <Image
          source={require('./assets/logo.png')} // Substitua pelo caminho correto da sua logo
          style={styles.logo}
          resizeMode="contain"
        /> */}
        <Text style={styles.title}>Mock Bank</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Apelido</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu apelido"
          value={apelido}
          onChangeText={setApelido}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity style={styles.forgotsenha}>
          <Text style={styles.forgotsenhaText}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>ENTRAR</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Não tem uma conta? </Text>
          <TouchableOpacity>
            <Text style={styles.signupLink}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  formContainer: {
    paddingHorizontal: 30,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  forgotsenha: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotsenhaText: {
    color: '#4287f5',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#4287f5',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#333',
    fontSize: 14,
  },
  signupLink: {
    color: '#4287f5',
    fontSize: 14,
    fontWeight: 'bold',
  },
});