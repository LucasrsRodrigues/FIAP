import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Dashboard() {
    const [token, setToken] = useState("");
    const [saldo, setSaldo] = useState(0);
    const router = useRouter();

    async function getToken() {
        const token = await AsyncStorage.getItem("@token");

        if (token === null || token === undefined) {
            router.push("/Login");
            return;
        }

        setToken(token);
    }

    async function getBalance() {
        if (token === "") {
            return;
        }

        try {
            const response = await fetch("https://mock-bank-mock-back.yexuz7.easypanel.host/contas/saldo", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const dataError = await response.json();

                console.log(dataError);

                throw new Error(dataError);
            }

            const data = await response.json();

            console.log("===> data")
            console.log(data.saldo);
            console.log("===> data")

            setSaldo(data.saldo);
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        getToken();
    }, []);

    useEffect(() => {
        getBalance();
    }, [token])

    return (
        <View style={styles.container}>
            <Text style={styles.saldo}>R$ {saldo}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    saldo: {
        fontSize: 60,
        fontWeight: 700,
        textAlign: "center"
    }
})