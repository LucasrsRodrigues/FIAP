import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
    const router = useRouter();

    const [apelido, setApelido] = useState("");
    const [senha, setSenha] = useState("");

    async function submit() {
        try {
            // https://mock-bank-mock-back.yexuz7.easypanel.host/

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

            console.log("===> Dados do usuario")
            console.log(data)
            console.log("===> Dados do usuario");

            await AsyncStorage.setItem("@token", data.token);

            router.push("/Dashboard");

        } catch (error) {
            alert(error?.message);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                {/* "apelido": "joaozinho", */}
                <View
                    style={styles.inputWrapper}
                >
                    <Text
                        style={styles.label}
                    >
                        Apelido
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: João Silva"
                        value={apelido}
                        onChangeText={(text) => setApelido(text)}
                    />
                </View>

                {/* "senha": "senha123"  */}
                <View
                    style={styles.inputWrapper}
                >
                    <Text
                        style={styles.label}
                    >
                        Senha
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: João Silva"
                        value={senha}
                        onChangeText={(text) => setSenha(text)}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={submit}
                >
                    <Text style={styles.buttonText}>
                        Entrar
                    </Text>
                </TouchableOpacity>
            </View>

            <Link href="/" style={styles.redirectButton}>
                <Text style={styles.redirectButtonText}>
                    Abrir uma conta
                </Text>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        gap: 30,
        paddingHorizontal: 20
    },
    inputWrapper: {
        gap: 5
    },
    input: {
        borderWidth: 2,
        borderColor: "#ccc",
        height: 50,
        paddingHorizontal: 10,
        borderRadius: 15,
        fontSize: 16
    },
    label: {
        fontSize: 20,
        fontWeight: 600
    },
    button: {
        backgroundColor: "#31c0f5",
        alignItems: "center",
        padding: 20,
        borderRadius: 15
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 500
    },
    redirectButton: {
        alignItems: "center",
        width: "100%",
        marginTop: 30
    },
    redirectButtonText: {
        fontSize: 16,
        fontWeight: 400,
        color: "#31c0f5",
        textAlign: "center"
    },
});
