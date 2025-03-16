import React, { useState } from 'react';
import { KeyboardAvoidingView, TextInput, Button, StyleSheet, Platform, View } from 'react-native';

export default function App() {
  const [text, setText] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Ajusta o comportamento conforme o OS
      style={styles.container}
      keyboardVerticalOffset={100} // Ajusta a altura do teclado (opcional)
    >
      <View style={styles.inner}>
        <TextInput
          style={styles.input}
          placeholder="Digite algo..."
          value={text}
          onChangeText={setText}
        />
        <Button title="Enviar" onPress={() => console.log('Texto:', text)} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  inner: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});
