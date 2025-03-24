import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const dados = [
  { id: 1, nome: "João", idade: 28, cidade: "São Paulo" },
  { id: 2, nome: "Maria", idade: 34, cidade: "Rio de Janeiro" },
  { id: 3, nome: "Carlos", idade: 25, cidade: "Belo Horizonte" },
  { id: 4, nome: "Ana", idade: 22, cidade: "Curitiba" },
  { id: 5, nome: "Paulo", idade: 40, cidade: "Salvador" },
  { id: 6, nome: "Fernanda", idade: 31, cidade: "Porto Alegre" },
  { id: 7, nome: "Ricardo", idade: 27, cidade: "Recife" },
  { id: 8, nome: "Juliana", idade: 29, cidade: "Fortaleza" },
  { id: 9, nome: "Eduardo", idade: 35, cidade: "Manaus" },
  { id: 10, nome: "Camila", idade: 23, cidade: "Florianópolis" }
];


function AsyncLesson() {
  const [value, setValue] = useState<Array<String>>([]);

  async function addStorage(text: string) {
    const valueCopy = [...value];

    const date = new Date().toISOString();

    valueCopy.push(`${text}-${date}`);

    setValue(valueCopy);

    await AsyncStorage.setItem("teste", JSON.stringify(valueCopy))
  }

  async function getData() {
    try {
      const valor = await AsyncStorage.getItem("teste");

      if (valor === null) {
        return;
      }

      setValue(JSON.parse(valor))
    } catch (error) {
      console.log("===> error")
      console.log(error)
      console.log("===> error")
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => addStorage("teste 123")}
          style={styles.button}
        >
          <Text>Salvar!</Text>
        </TouchableOpacity>

        <Text>Valor Salvo:</Text>
      </View>

      <ScrollView
        style={styles.scroll}
      >
        <View style={styles.box}>
          {value?.map((item, index) => (
            <View style={styles.boxItem} key={index}>
              <Text>{item}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

function FlatListLesson() {
  return (
    <View style={styles.container}>
      <FlatList
        data={dados}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <View>
            <Text>
              {item.nome}
            </Text>
          </View>
        )}
      />
    </View>
  )
}

export default function App() {

  return (
    <View style={styles.container}>
      <FlatListLesson />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: "#f14bd0",
    padding: 30
  },
  box: {
    gap: 30,
  },
  header: {
    marginTop: 60
  },
  scroll: {
    marginTop: 50
  },
  boxItem: {
    backgroundColor: "#fbd3f3",
    padding: 20,
    justifyContent: "center"
  }
});
