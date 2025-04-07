import { useAuth } from '@/hooks/useAuth';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity, KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [apelido, setApelido] = useState('');
  const [senha, setSenha] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const { handleLogin } = useAuth();

  async function submit() {
  //  if(!isSaved) {
    await AsyncStorage.setItem("@mock-bank-password", senha);
    await AsyncStorage.setItem("@mock-bank-apelido", apelido);
  //  }

    handleLogin(apelido, senha);
  }

  async function handleBiometricAuth() {
    try {
      const isAvailable = await LocalAuthentication.hasHardwareAsync();

      if (!isAvailable) {
        return Alert.alert(
          "Não suportado"
        )
      }

      // Verificar se a biometria esta cadastrada
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!isEnrolled) {
        return Alert.alert(
          "Nenhuma biometria"
        )
      }

      // Faz a autenticação
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Autentique-se para continuar",
        fallbackLabel: "Usar senha",
        disableDeviceFallback: false
      });

      if (result.success) {
        // Função
      } else {
        // Falha
      }


    } catch (error) {
      console.log(error);
    }
  }

  // Verificação se o dispositivo tem biometria
  useEffect(() => {
    (async () => {
     try {
      const saved = await AsyncStorage.getItem("@allow-fingerprint");
      setIsSaved(saved === "true");

      if(saved === "true") {
        const senha =  await AsyncStorage.getItem("@mock-bank-password");
        const apelido = await AsyncStorage.getItem("@mock-bank-apelido");

        if(senha === null || apelido === null) {
          return;
        }

        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Autentique-se para continuar",
          fallbackLabel: "Usar senha",
          disableDeviceFallback: false
        });
  
        if (result.success) {
          handleLogin(apelido, senha);
        } else {
        Alert.alert("Falha na biometria.");
        return;
        }
      }

     } catch (error) {
      console.log(error)
     }
    })();
  }, []);

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

        <TouchableOpacity style={styles.loginButton} onPress={submit}>
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