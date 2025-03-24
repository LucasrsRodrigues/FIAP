import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [tarefas, setTarefas] = useState<Array<string>>([]);
  const [tarefaDigitando, setTarefaDigitando] = useState("");

  async function addToLocal() {
    const copiaDasTarefas = [...tarefas];
    copiaDasTarefas.push(tarefaDigitando);

    setTarefas(copiaDasTarefas);

    AsyncStorage.setItem("@chave_teste", JSON.stringify(copiaDasTarefas));
  }

  async function getLocal() {
    const data = await AsyncStorage.getItem("@chave_teste");
    if (!data) {
      return;
    }
    const transformData = JSON.parse(data);
    setTarefas(transformData);
  }

  useEffect(() => {
    getLocal();
  }, []);

  return (
    <View style={styles.container}>
      {/* Input */}
      <TextInput
        placeholder="Digite a tarefa..."
        value={tarefaDigitando}
        onChangeText={(value) => setTarefaDigitando(value)}
        style={styles.input}
      />

      {/* Botao */}
      <TouchableOpacity
        onPress={addToLocal}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>

      {/* Listagem */}
      {
        tarefas.map(item => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
    padding: 20
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    color: "#000"
  },
  button: {
    backgroundColor: "#8592e6",
    borderRadius: 15,
    padding: 15
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
  },
  item: {
    backgroundColor: "#dedbdb",
    borderRadius: 15,
    padding: 15
  },
  itemText: {
    fontSize: 20,
    textAlign: "center",
  },
});
