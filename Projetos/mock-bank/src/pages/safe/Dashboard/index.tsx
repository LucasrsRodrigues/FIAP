import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, Fragment } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    SafeAreaView,
    StatusBar,
    Alert,
    Easing
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../hooks/useAuth';
import Animated, { SlideInDown, SlideInRight, SlideInUp, ZoomIn, ZoomInEasyDown, ZoomInEasyUp } from "react-native-reanimated";
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

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function DashboardScreen() {
    const [saldo, setSaldo] = useState(0);
    const [transacoes, setTransacoes] = useState<ITransacoesProps[]>([]);
    const [carregandoSaldo, setCarregandoSaldo] = useState(true);
    const [carregandoTransacoes, setCarregandoTransacoes] = useState(true);
    const [atualizando, setAtualizando] = useState(false);
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);

    const { token, usuario } = useAuth();

    const { navigate } = useNavigation();

    // Função para formatar valores monetários
    const formatarMoeda = (valor: string) => {
        return `R$ ${parseFloat(valor).toFixed(2).replace('.', ',')}`;
    };

    // Função para formatar data
    const formatarData = (dataString: string) => {
        const data = new Date(dataString);
        return `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}/${data.getFullYear()}`;
    };

    // Função para buscar o saldo
    const buscarSaldo = async () => {
        if (token === "") {
            return;
        }

        setCarregandoSaldo(true);
        try {
            const resposta = await fetch('https://mock-bank-mock-back.yexuz7.easypanel.host/contas/saldo', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const dados = await resposta.json();

            setSaldo(dados.saldo);
        } catch (erro) {
            console.error('Erro ao buscar saldo:', erro);
            Alert.alert('Erro', 'Não foi possível carregar seu saldo');
            setCarregandoSaldo(false);
        } finally {
            setCarregandoSaldo(false);
        }
    };

    // Função para buscar transações
    const buscarTransacoes = async () => {
        if (token === "") {
            return;
        }

        setCarregandoTransacoes(true);
        try {
            // Em um cenário real, você faria uma requisição para sua API
            const resposta = await fetch('https://mock-bank-mock-back.yexuz7.easypanel.host/transferencias', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const dados = await resposta.json();

            setTransacoes(dados);

        } catch (erro) {
            console.error('Erro ao buscar transações:', erro);
            Alert.alert('Erro', 'Não foi possível carregar suas transações');
        } finally {
            setCarregandoTransacoes(false);
        }
    };

    // Função para atualizar os dados ao puxar para baixo
    const onRefresh = async () => {
        setAtualizando(true);
        await Promise.all([buscarSaldo(), buscarTransacoes()]);
        setAtualizando(false);
    };

    // Carregar dados ao montar o componente
    useEffect(() => {
        buscarSaldo();
        buscarTransacoes();
    }, [token]);

    // Renderiza cada item da lista de transações
    const renderTransacao = (item: ITransacoesProps, index: string) => {
        const isEntrada = item.tipo === 'recebida';

        return (
            <AnimatedTouchableOpacity
                entering={SlideInRight.delay(2600).duration(300 * (Number(index) + 1))}
                style={styles.transacaoItem}
                onPress={() => Alert.alert('Detalhes', `Transação: ${item.descricao}\nValor: ${formatarMoeda(item.valor)}\nData: ${formatarData(item.data)}`)}
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
                    <Text style={styles.transacaoDescricao}>{item.descricao}</Text>
                    <Text style={styles.transacaoPessoa}>
                        {isEntrada ? `De: ${item.contraparte.apelido}` : `Para: ${item.contraparte.apelido}`}
                    </Text>
                    <Text style={styles.transacaoData}>{formatarData(item.data)}</Text>
                </View>
                <View style={styles.transacaoValor}>
                    <Text style={[
                        styles.valorTexto,
                        { color: isEntrada ? '#4BB543' : '#F24E1E' }
                    ]}>
                        {isEntrada ? '+' : '-'}{formatarMoeda(item.valor)}
                    </Text>
                </View>
            </AnimatedTouchableOpacity>
        );
    };

    // Verificação se o dispositivo tem biometria
    useEffect(() => {
        (async () => {
            const saved = await AsyncStorage.getItem("@allow-fingerprint");

            if (saved === "true" || saved === "false") {
                return;
            }

            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible);

            if (compatible) {
                const enrolled = await LocalAuthentication.isEnrolledAsync();

                if (!enrolled) {
                    // Alert.alert("Nenhuma biometria cadastrada");
                }

                handleBiometricAuth();

            }
        })();
    }, []);

    // Pedir autorização para utilizar a biometria
    async function handleBiometricAuth() {
        try {
            const isAvailable = await LocalAuthentication.hasHardwareAsync();

            if (!isAvailable) {
                // return Alert.alert(
                //     "Não suportado"
                // )
                return;
            }

            // Verificar se a biometria esta cadastrada
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();

            if (!isEnrolled) {
                // return Alert.alert(
                //     "Nenhuma biometria"
                // )


                return;
            }

            // Faz a autenticação
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: "Autentique-se para continuar",
                fallbackLabel: "Usar senha",
                disableDeviceFallback: false
            });

            if (result.success) {
                // Função
                await AsyncStorage.setItem("@allow-fingerprint", "true");
            } else {
                // Falha
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Fragment>
            <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

            {/* Cabeçalho */}
            <Animated.View
                entering={SlideInUp.duration(1000).delay(100)}
                style={styles.header}
            >
                <View>
                    <Text style={styles.saudacao}>Olá, {usuario?.nome}</Text>
                    <Text style={styles.subtitulo}>Bem-vindo de volta</Text>
                </View>
                <TouchableOpacity style={styles.perfilContainer} onPress={() => navigate("Profile")}>
                    <View style={styles.perfilImagem}>
                        <Text style={styles.perfilInicial}>{usuario?.nome?.charAt(0)}</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>

            {/* Cartão de Saldo */}
            <Animated.View
                entering={ZoomInEasyDown.duration(500).delay(1100)}
                style={styles.cardSaldo}
            >
                <View style={styles.cardTopo}>
                    <Text style={styles.cardTitulo}>Saldo disponível</Text>
                    <TouchableOpacity onPress={buscarSaldo}>
                        <Text style={styles.cardAtualizar}>Atualizar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.cardConteudo}>
                    {carregandoSaldo ? (
                        <ActivityIndicator size="large" color="#4a7df3" />
                    ) : (
                        <Text style={styles.valorSaldo}>{formatarMoeda(saldo)}</Text>
                    )}
                </View>
            </Animated.View>

            {/* Ações Rápidas */}
            <Animated.View
                entering={ZoomInEasyUp.duration(500).delay(1100)}
                style={styles.acoes}
            >
                <TouchableOpacity
                    style={styles.acaoBotao}
                    onPress={() => navigate('Send')}
                >
                    <View style={[styles.acaoIcone, { backgroundColor: 'rgba(74, 125, 243, 0.1)' }]}>
                        <Text style={[styles.acaoIconeTexto, { color: '#4a7df3' }]}>↑</Text>
                    </View>
                    <Text style={styles.acaoTexto}>Enviar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.acaoBotao}
                    onPress={() => navigate('Recive')}
                >
                    <View style={[styles.acaoIcone, { backgroundColor: 'rgba(75, 181, 67, 0.1)' }]}>
                        <Text style={[styles.acaoIconeTexto, { color: '#4BB543' }]}>↓</Text>
                    </View>
                    <Text style={styles.acaoTexto}>Receber</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.acaoBotao}
                    onPress={() => navigate('Transactions')}
                >
                    <View style={[styles.acaoIcone, { backgroundColor: 'rgba(156, 39, 176, 0.1)' }]}>
                        <Text style={[styles.acaoIconeTexto, { color: '#9C27B0' }]}>≡</Text>
                    </View>
                    <Text style={styles.acaoTexto}>Histórico</Text>
                </TouchableOpacity>
            </Animated.View>

            {/* Lista de Transações */}
            <Animated.View
                entering={SlideInDown.duration(1000).delay(500)}
                style={styles.transacoesContainer}
            >
                <View style={styles.transacoesCabecalho}>
                    <Text style={styles.transacoesTitulo}>Transações Recentes</Text>
                    <TouchableOpacity onPress={() => navigate('Transactions')}>
                        <Text style={styles.verTodas}>Ver todas</Text>
                    </TouchableOpacity>
                </View>

                {carregandoTransacoes ? (
                    <ActivityIndicator style={styles.carregando} size="large" color="#4a7df3" />
                ) : (
                    <Animated.FlatList
                        data={transacoes}
                        renderItem={({ index, item }) => renderTransacao(item, index)}
                        keyExtractor={item => String(item.id)}
                        refreshControl={
                            <RefreshControl
                                refreshing={atualizando}
                                onRefresh={onRefresh}
                                colors={['#4a7df3']}
                            />
                        }
                        ListEmptyComponent={
                            <View style={styles.semTransacoes}>
                                <Text style={styles.semTransacoesTexto}>Nenhuma transação encontrada</Text>
                            </View>
                        }
                    />
                )}
            </Animated.View>
        </Fragment>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        marginTop: 50
    },
    saudacao: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2e3e5c',
    },
    subtitulo: {
        fontSize: 14,
        color: '#7b8bb2',
        marginTop: 4,
    },
    perfilContainer: {
        padding: 4,
    },
    perfilImagem: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#4a7df3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    perfilInicial: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardSaldo: {
        margin: 20,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    cardTopo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    cardTitulo: {
        fontSize: 16,
        color: '#7b8bb2',
    },
    cardAtualizar: {
        fontSize: 14,
        color: '#4a7df3',
        fontWeight: '500',
    },
    cardConteudo: {
        height: 60,
        justifyContent: 'center',
    },
    valorSaldo: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2e3e5c',
    },
    acoes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    acaoBotao: {
        alignItems: 'center',
        flex: 1,
    },
    acaoIcone: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    acaoIconeTexto: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    acaoTexto: {
        fontSize: 14,
        color: '#2e3e5c',
        fontWeight: '500',
    },
    transacoesContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
    },
    transacoesCabecalho: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    transacoesTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2e3e5c',
    },
    verTodas: {
        fontSize: 14,
        color: '#4a7df3',
        fontWeight: '500',
    },
    carregando: {
        marginTop: 40,
    },
    transacaoItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    transacaoIcone: {
        marginRight: 15,
        justifyContent: 'center',
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
        justifyContent: 'center',
    },
    transacaoDescricao: {
        fontSize: 16,
        color: '#2e3e5c',
        fontWeight: '500',
        marginBottom: 4,
    },
    transacaoPessoa: {
        fontSize: 14,
        color: '#7b8bb2',
        marginBottom: 2,
    },
    transacaoData: {
        fontSize: 12,
        color: '#a0a0a0',
    },
    transacaoValor: {
        justifyContent: 'center',
        paddingLeft: 10,
    },
    valorTexto: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    semTransacoes: {
        padding: 40,
        alignItems: 'center',
    },
    semTransacoesTexto: {
        fontSize: 16,
        color: '#7b8bb2',
    },
});
