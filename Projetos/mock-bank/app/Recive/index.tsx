
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';

export default function Recive() {
  const [carregando, setCarregando] = useState(true);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [apelido, setApelido] = useState('');

  const router = useRouter();

  // Simulando o carregamento das informações do usuário
  useEffect(() => {
    // Em um cenário real, você buscaria esses dados da API
    const carregarDadosUsuario = async () => {
      setCarregando(true);
      try {
        // Simulando um tempo de carregamento
        setTimeout(() => {
          setNomeUsuario('João Silva');
          setApelido('joaozinho');
          setCarregando(false);
        }, 1000);
      } catch (erro) {
        console.error('Erro ao carregar dados do usuário:', erro);
        Alert.alert('Erro', 'Não foi possível carregar seus dados');
        setCarregando(false);
      }
    };

    carregarDadosUsuario();
  }, []);

  // Função para compartilhar a chave Pix
  const compartilharApelido = async () => {
    try {
    // TODO: Compartilhamento
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível compartilhar sua chave Pix');
    }
  };

  // Função para copiar a chave Pix (simulada)
  const copiarApelido = () => {
    // TODO: Copiar
    Alert.alert('Copiado', 'Chave Pix copiada para a área de transferência');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Receber Dinheiro</Text>
        <View style={styles.emptySpace} />
      </View>

      {carregando ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4a7df3" />
          <Text style={styles.loadingText}>Carregando suas informações...</Text>
        </View>
      ) : (
        <View style={styles.content}>
          <View style={styles.nomeContainer}>
            <Text style={styles.nomeLabel}>Receber como</Text>
            <Text style={styles.nomeUsuario}>{nomeUsuario}</Text>
          </View>

          <View style={styles.qrCodeContainer}>
            <View style={styles.qrCode}>
              {/* Aqui seria renderizado um QR Code real */}
              <Text style={styles.qrCodePlaceholder}>QR Code</Text>
              <Text style={styles.qrCodeInfo}>(Simulação)</Text>
            </View>
            <Text style={styles.qrCodeInstrucao}>
              Peça para a pessoa escanear este QR Code
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.chaveApelidoContainer}>
            <Text style={styles.chaveApelidoLabel}>Seu Apelido</Text>
            <View style={styles.chaveApelidoValorContainer}>
              <Text style={styles.chaveApelidoValor}>{apelido}</Text>
              <TouchableOpacity 
                style={styles.copyButton}
                onPress={copiarApelido}
              >
                <Text style={styles.copyButtonText}>Copiar</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.chaveApelidoInstrucao}>
              Ou compartilhe seu apelido diretamente
            </Text>
            <TouchableOpacity 
              style={styles.shareButton}
              onPress={compartilharApelido}
            >
              <Text style={styles.shareButtonText}>Compartilhar Apelido</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    fontSize: 24,
    color: '#4a7df3',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e3e5c',
  },
  emptySpace: {
    width: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#7b8bb2',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  nomeContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  nomeLabel: {
    fontSize: 16,
    color: '#7b8bb2',
    marginBottom: 8,
  },
  nomeUsuario: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e3e5c',
    textAlign: 'center',
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  qrCode: {
    width: 200,
    height: 200,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  qrCodePlaceholder: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a7df3',
  },
  qrCodeInfo: {
    fontSize: 14,
    color: '#7b8bb2',
    marginTop: 5,
  },
  qrCodeInstrucao: {
    fontSize: 14,
    color: '#7b8bb2',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 20,
  },
  chaveApelidoContainer: {
    marginBottom: 20,
  },
  chaveApelidoLabel: {
    fontSize: 16,
    color: '#7b8bb2',
    marginBottom: 8,
  },
  chaveApelidoValorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  chaveApelidoValor: {
    flex: 1,
    fontSize: 16,
    color: '#2e3e5c',
  },
  copyButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  copyButtonText: {
    fontSize: 14,
    color: '#4a7df3',
    fontWeight: '500',
  },
  chaveApelidoInstrucao: {
    fontSize: 14,
    color: '#7b8bb2',
    marginBottom: 16,
  },
  shareButton: {
    backgroundColor: '#4a7df3',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#4a7df3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  shareButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
