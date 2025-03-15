import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert
} from "react-native";

export default function Home() {
    // Estado único com objeto para gerenciar todos os valores do contador
    const [contador, setContador] = useState({
        valor: 0,
        minimo: 0,
        maximo: 1000,
        valorPersonalizado: "0"
    });

    // Função para incrementar o valor
    function add() {
        if (contador.valor < contador.maximo) {
            setContador({
                ...contador,
                valor: contador.valor + 1
            });
        } else {
            Alert.alert("Limite máximo", `Você atingiu o valor máximo de ${contador.maximo}!`);
        }
    }

    // Função para decrementar o valor
    function sub() {
        if (contador.valor > contador.minimo) {
            setContador({
                ...contador,
                valor: contador.valor - 1
            });
        } else {
            Alert.alert("Limite mínimo", `Você atingiu o valor mínimo de ${contador.minimo}!`);
        }
    }

    // Função para resetar o contador
    function resetar() {
        setContador({
            ...contador,
            valor: 0
        });
    }

    // Função para definir um valor personalizado
    function definirValorPersonalizado() {
        const novoValor = parseInt(contador.valorPersonalizado);

        if (isNaN(novoValor)) {
            Alert.alert("Valor inválido", "Por favor, insira um número válido.");
            return;
        }

        if (novoValor < contador.minimo) {
            Alert.alert("Valor muito baixo", `O valor não pode ser menor que ${contador.minimo}.`);
            return;
        }

        if (novoValor > contador.maximo) {
            Alert.alert("Valor muito alto", `O valor não pode ser maior que ${contador.maximo}.`);
            return;
        }

        setContador({
            ...contador,
            valor: novoValor
        });
    }

    // Função para atualizar o valor mínimo
    function atualizarMinimo(texto: string) {
        const novoMinimo = parseInt(texto);

        if (!isNaN(novoMinimo)) {
            if (novoMinimo <= contador.valor) {
                setContador({
                    ...contador,
                    minimo: novoMinimo
                });
            } else {
                Alert.alert("Valor inválido", "O mínimo não pode ser maior que o valor atual.");
            }
        }
    }

    // Função para atualizar o valor máximo
    function atualizarMaximo(texto: string) {
        const novoMaximo = parseInt(texto);

        if (!isNaN(novoMaximo)) {
            if (novoMaximo >= contador.valor) {
                setContador({
                    ...contador,
                    maximo: novoMaximo
                });
            } else {
                Alert.alert("Valor inválido", "O máximo não pode ser menor que o valor atual.");
            }
        }
    }

    return (
        <View style={styles.container}>
            {/* Metade de cima */}
            <View style={styles.valueSection}>
                {/* Header - Configurações de limites */}
                <View style={styles.header}>
                    <View style={styles.limiteInput}>
                        <Text style={styles.limiteLabel}>Min:</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={contador.minimo.toString()}
                            onChangeText={atualizarMinimo}
                        />
                    </View>

                    <View style={styles.limiteInput}>
                        <Text style={styles.limiteLabel}>Max:</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={contador.maximo.toString()}
                            onChangeText={atualizarMaximo}
                        />
                    </View>
                </View>

                {/* Valor */}
                <View style={styles.valuesWrapper}>
                    <Text style={styles.value}>{contador.valor}</Text>

                    {/* Limite caso tenha */}
                    <Text style={styles.limit}>/{contador.maximo}</Text>
                </View>

                {/* Valor personalizado */}
                <View style={styles.customValueContainer}>
                    <TextInput
                        style={styles.customValueInput}
                        keyboardType="numeric"
                        placeholder="Valor personalizado"
                        value={contador.valorPersonalizado}
                        onChangeText={(texto) => setContador({ ...contador, valorPersonalizado: texto })}
                    />
                    <TouchableOpacity
                        style={styles.customValueButton}
                        onPress={definirValorPersonalizado}
                    >
                        <Text style={styles.customValueButtonText}>Definir</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Metade de baixo */}
            <View style={styles.buttonsSection}>
                <TouchableOpacity style={styles.button} onPress={sub}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.resetButton} onPress={resetar}>
                    <Text style={styles.resetButtonText}>Reset</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={add}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    valueSection: {
        flex: 1,
        backgroundColor: "#344151",
        justifyContent: "space-between",
        padding: 30
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    limiteInput: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    limiteLabel: {
        color: "#ffffff",
        marginRight: 5,
        fontSize: 16
    },
    input: {
        backgroundColor: "#ffffff",
        width: 60,
        borderRadius: 5,
        padding: 5,
        textAlign: 'center'
    },
    valuesWrapper: {
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: 'center'
    },
    value: {
        color: "#ffffff",
        fontWeight: "800",
        fontSize: 100
    },
    limit: {
        color: "#ffffff",
        fontWeight: "500",
        fontSize: 30
    },
    customValueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    customValueInput: {
        backgroundColor: "#ffffff",
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10
    },
    customValueButton: {
        backgroundColor: "#F18384",
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    customValueButtonText: {
        color: "#ffffff",
        fontWeight: "600"
    },
    buttonsSection: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: "#F16A6C",
        alignItems: "center"
    },
    button: {
        width: 80,
        height: 80,
        borderRadius: 100,
        backgroundColor: "#F18384",
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: "#ffffff",
        fontWeight: "800",
        fontSize: 50
    },
    resetButton: {
        width: 80,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#344151",
        alignItems: 'center',
        justifyContent: 'center'
    },
    resetButtonText: {
        color: "#ffffff",
        fontWeight: "600",
        fontSize: 16
    }
})