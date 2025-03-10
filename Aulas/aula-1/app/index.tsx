// Importação de hooks do React para gerenciamento de estado e efeitos
import { useEffect, useState } from "react";
// Importação de componentes nativos do React Native para construção da UI
import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

// Interface que define a estrutura de dados para as contas/despesas
// Cada conta terá um id único, um nome descritivo e um valor monetário
interface IContas {
    id: string;    // Identificador único para cada despesa
    name: string;  // Nome/descrição da despesa
    value: string; // Valor da despesa (armazenado como string para facilitar o uso com TextInput)
}

export default function HomeScreen() {
    // Estado para armazenar a lista de todas as contas adicionadas
    const [contas, setContas] = useState<Array<IContas>>([]);

    // Estados para controlar os valores dos campos do formulário
    const [name, setName] = useState(""); // Controla o campo de nome da despesa
    const [value, setValue] = useState(""); // Controla o campo de valor da despesa

    // Estado para armazenar o valor total de todas as despesas
    const [total, setTotal] = useState(0);

    // Função executada quando o usuário clica no botão "Adicionar!"
    function submit() {
        // Validação básica: verifica se os campos obrigatórios estão preenchidos
        if (name === "" || value === "") {
            alert("Preencha todos os campos!");
            return;
        }

        // Cria uma cópia do array atual para não modificar o estado diretamente
        const oldValues = [...contas];

        // Adiciona a nova despesa ao array
        oldValues.push({
            id: new Date().toISOString(), // Gera um ID único baseado na data/hora atual
            name, // Nome da despesa (shorthand para name: name)
            value // Valor da despesa (shorthand para value: value)
        })

        // Atualiza o estado com o novo array que inclui a despesa adicionada
        setContas(oldValues);

        // Limpa os campos do formulário para permitir uma nova entrada
        setName("");
        setValue("");
    }

    // Effect hook que recalcula o total sempre que a lista de contas é modificada
    useEffect(() => {
        // Inicializa o contador para soma
        let totalCount = 0;

        // Percorre cada item da lista e soma seus valores
        contas.forEach(item => {
            // Converte o valor de string para número antes de somar
            totalCount += Number(item.value)
        })

        // Atualiza o estado do total com o novo valor calculado
        setTotal(totalCount)
    }, [contas]); // Array de dependências: o efeito é executado quando 'contas' muda


    // Estrutura da interface do usuário (UI)
    return (
        <View style={styles.container}>
            {/* Configura a barra de status do dispositivo */}
            <StatusBar
                backgroundColor="#0c0c0c" // Cor de fundo da barra
                barStyle="light-content" // Estilo dos ícones/texto (claro para fundos escuros)
                translucent // Permite que a barra seja semi-transparente
            />

            {/* Título da aplicação */}
            <Text style={styles.title}>
                Bem vindo!
            </Text>

            {/* Seção de formulário para adicionar novas despesas */}
            <View style={styles.form}>
                {/* Campo para inserir o nome da despesa */}
                <TextInput
                    placeholder="Nome" // Texto de ajuda quando o campo está vazio
                    placeholderTextColor="#616161" // Cor do texto de placeholder
                    style={styles.input} // Estilo do campo
                    value={name} // Valor controlado pelo estado
                    onChangeText={(value) => setName(value)} // Atualiza o estado quando o texto muda
                />

                {/* Campo para inserir o valor da despesa */}
                <TextInput
                    placeholder="Valor"
                    placeholderTextColor="#616161"
                    style={styles.input}
                    value={value}
                    onChangeText={(value) => setValue(value)}
                />

                {/* Botão para submeter o formulário */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={submit} // Chama a função submit quando pressionado
                >
                    <Text style={styles.buttonText}>Adicionar!</Text>
                </TouchableOpacity>
            </View>

            {/* Tabela/Lista que exibe todas as despesas adicionadas */}
            <View style={styles.table}>
                {/* Mapeia cada item do array de contas para um elemento visual */}
                {contas.map(item => (
                    <View key={item.id} style={styles.row}> {/* key é necessário para listas em React */}
                        {/* Nome da despesa */}
                        <Text style={styles.rowText}>
                            {item.name}
                        </Text>
                        {/* Valor da despesa formatado como moeda */}
                        <Text style={styles.rowText}>
                            R$ {Number(item.value).toFixed(2)} {/* toFixed(2) garante 2 casas decimais */}
                        </Text>
                    </View>
                ))}
            </View>

            {/* Rodapé fixo que mostra o valor total das despesas */}
            <View style={styles.footer}>
                <Text style={styles.footerLabel}>Total:</Text>
                <Text style={styles.footerValue}>R$ {total.toFixed(2)}</Text>
            </View>
        </View>
    )
}

// Definição dos estilos utilizando StyleSheet para melhor performance
const styles = StyleSheet.create({
    container: {
        position: "relative", // Permite posicionamento absoluto dos filhos
        flex: 1, // Ocupa todo o espaço disponível
        gap: 50, // Espaçamento entre elementos filhos
        backgroundColor: "#0c0c0c" // Fundo preto para tema escuro
    },
    title: {
        fontSize: 30, // Tamanho da fonte grande para título
        fontWeight: 600, // Espessura da fonte (negrito)
        color: "#ccc", // Cor cinza claro para contraste com fundo escuro
        textAlign: "center", // Centraliza o texto
    },
    form: {
        padding: 20, // Espaçamento interno
        gap: 10 // Espaçamento entre os campos do formulário
    },
    input: {
        borderWidth: 1, // Largura da borda
        borderColor: "#616161", // Cor da borda (cinza escuro)
        borderRadius: 10, // Bordas arredondadas
        backgroundColor: "#262626", // Fundo cinza escuro para os inputs
        paddingHorizontal: 20, // Espaçamento horizontal interno
        paddingVertical: 10, // Espaçamento vertical interno
        color: "#ccc" // Cor do texto (cinza claro)
    },
    button: {
        paddingHorizontal: 20, // Espaçamento horizontal interno
        paddingVertical: 10, // Espaçamento vertical interno
        backgroundColor: "purple", // Cor de destaque para o botão
        borderRadius: 10, // Bordas arredondadas
        marginTop: 20 // Espaço extra acima do botão
    },
    buttonText: {
        fontSize: 16, // Tamanho da fonte
        color: "#fff", // Texto branco para contraste
        textAlign: "center" // Centraliza o texto
    },
    footer: {
        position: "absolute", // Posicionamento absoluto para fixar na parte inferior
        bottom: 0, // Alinha na parte inferior
        left: 0, // Estica da esquerda
        right: 0, // até a direita
        padding: 20, // Espaçamento interno
        backgroundColor: "#262626", // Fundo cinza escuro
        flexDirection: "row", // Organiza itens em linha (horizontal)
        justifyContent: "space-between", // Distribui espaço entre os elementos
        borderTopRightRadius: 10, // Arredonda canto superior direito
        borderTopLeftRadius: 10, // Arredonda canto superior esquerdo
    },
    footerLabel: {
        color: "#ffff", // Texto branco
        fontWeight: "600", // Negrito
        fontSize: 30 // Tamanho grande para destaque
    },
    footerValue: {
        color: "#ffff", // Texto branco
        fontWeight: "600", // Negrito
        fontSize: 30 // Tamanho grande para destaque
    },
    table: {
        flex: 1, // Ocupa o espaço disponível
        paddingHorizontal: 20, // Espaçamento horizontal
        gap: 10 // Espaço entre as linhas da tabela
    },
    row: {
        flexDirection: "row", // Organiza itens em linha (horizontal)
        justifyContent: "space-between", // Nome à esquerda, valor à direita
        borderBottomColor: "#ccc", // Cor da linha separadora
        borderBottomWidth: 1 // Espessura da linha separadora
    },
    rowText: {
        color: "#ffff", // Texto branco
        fontSize: 16, // Tamanho médio da fonte
        fontWeight: 500 // Semi-negrito
    },
})