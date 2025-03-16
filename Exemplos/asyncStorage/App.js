import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [data, setData] = useState('');

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('chave', 'Valor salvo no AsyncStorage!');
      console.log('Dados salvos com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  };

  const loadData = async () => {
    try {
      const value = await AsyncStorage.getItem('chave');
      if (value !== null) {
        setData(value);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const clearData = async () => {
    try {
      await AsyncStorage.removeItem('chave');
      setData('');
      console.log('Dados removidos com sucesso!');
    } catch (error) {
      console.error('Erro ao remover dados:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dados: {data}</Text>
      <Button title="Salvar Dados" onPress={saveData} />
      <Button title="Limpar Dados" onPress={clearData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});
