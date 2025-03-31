
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator,
    RefreshControl,
    TextInput,
    StatusBar,
} from 'react-native';


interface ITransacoesProps {
    categoria: string;
    contraparte: {
        apelido: string;
        nome: string;
    },
    data: string;
    descricao: string;
    id: number;
    tipo: string;
    valor: number;
}


export default function Transactions() {
    const [transacoes, setTransacoes] = useState<ITransacoesProps[]>([]);
    const [filtroAtual, setFiltroAtual] = useState('todas');
    const [carregando, setCarregando] = useState(true);
    const [atualizando, setAtualizando] = useState(false);
    const [termoBusca, setTermoBusca] = useState('');
    const [pagina, setPagina] = useState(1);
    const [carregandoMais, setCarregandoMais] = useState(false);
    const [finalLista, setFinalLista] = useState(false);
    const [token, setToken] = useState("");

    const router = useRouter();

    const formatarMoeda = (valor: string) => {
        return `R$ ${parseFloat(valor).toFixed(2).replace('.', ',')}`;
    };

    const formatarData = (dataString: string) => {
        const data = new Date(dataString);
        return `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}/${data.getFullYear()}`;
    };

    const buscarTransacoes = async () => {
        if (token === "") {
            return;
        }

        try {
            const resposta = await fetch('https://mock-bank-mock-back.yexuz7.easypanel.host/transferencias', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const dados = await resposta.json();

            setTransacoes(dados)
        } catch (erro) {
            console.error('Erro ao buscar transações:', erro);

        } finally {
            setCarregando(false);
            setCarregandoMais(false);
        }
    };

    async function getToken() {
        const token = await AsyncStorage.getItem("@token");

        if (token === null || token === undefined) {
            router.push("/Login");
            return;
        }

        setToken(token);
    }

    useEffect(() => {
        getToken();
    }, []);

    useEffect(() => {
        setPagina(1);
        buscarTransacoes();
    }, [filtroAtual, token]);

    const onRefresh = async () => {
        setAtualizando(true);
        setPagina(1);
        setFinalLista(false);
        await buscarTransacoes();
        setAtualizando(false);
    };

    const carregarMais = () => {
        if (carregandoMais || finalLista) return;

        const proximaPagina = pagina + 1;
        setPagina(proximaPagina);
        buscarTransacoes();
    };

    const realizarBusca = () => {
        setPagina(1);
        setFinalLista(false);
        buscarTransacoes();
    };

    const renderTransacao = ({ item }: { item: ITransacoesProps }) => {
        const isEntrada = item.tipo === 'recebida';

        return (
            <TouchableOpacity
                style={styles.transacaoItem}
                onPress={() => router.push('/TransactionDetail', { transacao: item })}
            >
                <View style={styles.transacaoIcone}>
                    <View style={[
                        styles.iconeCirculo,
                        { backgroundColor: isEntrada ? 'rgba(75, 181, 67, 0.1)' : 'rgba(242, 78, 30, 0.1)' }
                    ]}>
                        <Text style={[
                            styles.iconeTexto,
                            { color: isEntrada ? '#4BB543' : '#F24E1E' }
                        ]}>
                            {isEntrada ? '↓' : '↑'}
                        </Text>
                    </View>
                </View>

                <View style={styles.transacaoInfo}>
                    <View style={styles.transacaoLinha1}>
                        <Text style={styles.transacaoDescricao} numberOfLines={1} ellipsizeMode="tail">
                            {item.descricao}
                        </Text>
                        <Text style={[
                            styles.transacaoValor,
                            { color: isEntrada ? '#4BB543' : '#F24E1E' }
                        ]}>
                            {isEntrada ? '+' : '-'}{formatarMoeda(item.valor)}
                        </Text>
                    </View>

                    <View style={styles.transacaoLinha2}>
                        <Text style={styles.transacaoPessoa} numberOfLines={1} ellipsizeMode="tail">
                            {isEntrada ? `De: ${item.contraparte.apelido}` : `Para: ${item.contraparte.apelido}`}
                        </Text>
                        <Text style={styles.transacaoData}>{formatarData(item.data)}</Text>
                    </View>

                    <View style={styles.transacaoLinha3}>
                        <View style={styles.categoriaTag}>
                            <Text style={styles.categoriaTexto}>{item.categoria}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const ListHeader = () => (
        <View style={styles.buscaContainer}>
            <TextInput
                style={styles.inputBusca}
                placeholder="Buscar transações..."
                value={termoBusca}
                onChangeText={setTermoBusca}
                onSubmitEditing={realizarBusca}
                returnKeyType="search"
            />

            <View style={styles.filtros}>
                <TouchableOpacity
                    style={[
                        styles.filtroBotao,
                        filtroAtual === 'todas' && styles.filtroBotaoAtivo
                    ]}
                    onPress={() => setFiltroAtual('todas')}
                >
                    <Text style={[
                        styles.filtroTexto,
                        filtroAtual === 'todas' && styles.filtroTextoAtivo
                    ]}>Todas</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.filtroBotao,
                        filtroAtual === 'entradas' && styles.filtroBotaoAtivo
                    ]}
                    onPress={() => setFiltroAtual('recebidas')}
                >
                    <Text style={[
                        styles.filtroTexto,
                        filtroAtual === 'entradas' && styles.filtroTextoAtivo
                    ]}>Entradas</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.filtroBotao,
                        filtroAtual === 'saidas' && styles.filtroBotaoAtivo
                    ]}
                    onPress={() => setFiltroAtual('enviadas')}
                >
                    <Text style={[
                        styles.filtroTexto,
                        filtroAtual === 'saidas' && styles.filtroTextoAtivo
                    ]}>Saídas</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const ListFooter = () => {
        if (!carregandoMais) {
            return null;
        }

        return (
            <View style={styles.footerLoader}>
                <ActivityIndicator size="small" color="#4a7df3" />
                <Text style={styles.footerText}>Carregando mais...</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Histórico de Transações</Text>
                <View style={styles.emptySpace} />
            </View>

            {carregando ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#4a7df3" />
                    <Text style={styles.loadingText}>Carregando transações...</Text>
                </View>
            ) : (
                <FlatList
                    data={transacoes}
                    renderItem={renderTransacao}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={ListHeader}
                    ListFooterComponent={ListFooter}
                    contentContainerStyle={styles.listaConteudo}
                    refreshControl={
                        <RefreshControl
                            refreshing={atualizando}
                            onRefresh={onRefresh}
                            colors={['#4a7df3']}
                        />
                    }
                    onEndReached={carregarMais}
                    onEndReachedThreshold={0.2}
                    ListEmptyComponent={
                        <View style={styles.semTransacoes}>
                            <Text style={styles.semTransacoesTexto}>
                                Nenhuma transação encontrada
                            </Text>
                        </View>
                    }
                />
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
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
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
    listaConteudo: {
        paddingBottom: 20,
    },
    buscaContainer: {
        padding: 16,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    inputBusca: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 16,
        marginBottom: 16,
    },
    filtros: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    filtroBotao: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
        marginHorizontal: 4,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
    },
    filtroBotaoAtivo: {
        backgroundColor: '#4a7df3',
    },
    filtroTexto: {
        fontSize: 14,
        color: '#7b8bb2',
        fontWeight: '500',
    },
    filtroTextoAtivo: {
        color: '#ffffff',
    },
    transacaoItem: {
        flexDirection: 'row',
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: '#ffffff',
        marginHorizontal: 16,
        marginTop: 8,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    transacaoIcone: {
        marginRight: 12,
        alignSelf: 'center',
    },
    iconeCirculo: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconeTexto: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    transacaoInfo: {
        flex: 1,
    },
    transacaoLinha1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    transacaoDescricao: {
        fontSize: 16,
        color: '#2e3e5c',
        fontWeight: '500',
        flex: 1,
        marginRight: 8,
    },
    transacaoValor: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    transacaoLinha2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    transacaoPessoa: {
        fontSize: 14,
        color: '#7b8bb2',
        flex: 1,
        marginRight: 8,
    },
    transacaoData: {
        fontSize: 12,
        color: '#a0a0a0',
    },
    transacaoLinha3: {
        flexDirection: 'row',
    },
    categoriaTag: {
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    categoriaTexto: {
        fontSize: 12,
        color: '#2e3e5c',
    },
    footerLoader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    footerText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#7b8bb2',
    },
    semTransacoes: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    semTransacoesTexto: {
        fontSize: 16,
        color: '#7b8bb2',
        textAlign: 'center',
    },
});

