import { useAuth } from '@/hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Switch,
    ScrollView,
    SafeAreaView,
    Alert,
    ActivityIndicator,
    Image,
} from 'react-native';

interface IUsuarioProps {
    apelido: string;
    cpf: string;
    createdAt: string;
    dataNascimento: string | null;
    email: string | null;
    endereco: string | null;
    id:number;
    nome: string;
    saldo: number;
    telefone: string | null;
    tipoConta: string;
    updatedAt: string;
}

export default function Profile() {
    const router = useRouter();
    const [carregando, setCarregando] = useState(false);
    const [temaEscuro, setTemaEscuro] = useState(false);
    const [notificacoes, setNotificacoes] = useState(true);
    const [biometria, setBiometria] = useState(false);

    const {token, handleLogout, usuario } = useAuth();

    const alternarTema = () => {
        setTemaEscuro(!temaEscuro);
        // Em um cenário real, você salvaria essa preferência
        // AsyncStorage.setItem('temaEscuro', JSON.stringify(!temaEscuro));
    };

    // Função para alternar notificações
    const alternarNotificacoes = () => {
        setNotificacoes(!notificacoes);
        // Em um cenário real, você atualizaria essa preferência no servidor
    };

    // Função para alternar biometria
    const alternarBiometria = async () => {
        const saved = await AsyncStorage.setItem("@allow-fingerprint", "false");
        
        setBiometria(!biometria);
    };

    // Função para excluir conta
    const excluirConta = () => {
        Alert.alert(
            'Excluir Conta',
            'Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: () => {
                        Alert.alert(
                            'Confirmação',
                            'Por favor, confirme novamente que deseja excluir permanentemente sua conta.',
                            [
                                { text: 'Cancelar', style: 'cancel' },
                                {
                                    text: 'Excluir Permanentemente',
                                    style: 'destructive',
                                    onPress: () => {
                                        // Em um cenário real, você faria a exclusão na sua API
                                        // e redirecionaria para a tela de login
                                        navigation && navigation.reset({
                                            index: 0,
                                            routes: [{ name: 'Login' }],
                                        });
                                    }
                                }
                            ]
                        );
                    }
                }
            ]
        );
    };

    useEffect(() => {
       (async () => {
        const saved = await AsyncStorage.getItem("@allow-fingerprint");
        
        setBiometria(saved === "true");
       })();
    }, []);

    return (
        <SafeAreaView style={[styles.container, temaEscuro && styles.containerDark]}>
            <View style={[styles.header, temaEscuro && styles.headerDark]}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Text style={[styles.backButtonText, temaEscuro && styles.textDark]}>←</Text>
                </TouchableOpacity>
                <Text style={[styles.headerTitle, temaEscuro && styles.textDark]}>Meu Perfil</Text>
                <View style={styles.emptySpace} />
            </View>

            {carregando ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={temaEscuro ? '#6a8fff' : '#4a7df3'} />
                    <Text style={[styles.loadingText, temaEscuro && styles.textDark]}>
                        Carregando perfil...
                    </Text>
                </View>
            ) : (
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Foto e informações do perfil */}
                    <View style={[styles.perfilContainer, temaEscuro && styles.cardDark]}>
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>
                                    {usuario?.nome.charAt(0) || 'U'}
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.editarFotoButton}>
                                <Text style={styles.editarFotoText}>Editar</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={[styles.nomeUsuario, temaEscuro && styles.textDark]}>
                            {usuario?.nome || 'Usuário'}
                        </Text>
                        <Text style={styles.apelidoUsuario}>
                            @{usuario?.apelido || 'usuario'}
                        </Text>

                        <TouchableOpacity
                            style={styles.editarPerfilButton}
                            onPress={() => router.push('EditarPerfil')}
                        >
                            <Text style={styles.editarPerfilText}>Editar Perfil</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Informações pessoais */}
                    <View style={[styles.secao, temaEscuro && styles.cardDark]}>
                        <Text style={[styles.secaoTitulo, temaEscuro && styles.textDark]}>
                            Informações Pessoais
                        </Text>

                        <View style={styles.campoContainer}>
                            <Text style={[styles.campoLabel, temaEscuro && styles.textSecondaryDark]}>
                                Email
                            </Text>
                            <Text style={[styles.campoValor, temaEscuro && styles.textDark]}>
                                {usuario?.email || 'email@exemplo.com'}
                            </Text>
                        </View>

                        <View style={styles.campoContainer}>
                            <Text style={[styles.campoLabel, temaEscuro && styles.textSecondaryDark]}>
                                CPF
                            </Text>
                            <Text style={[styles.campoValor, temaEscuro && styles.textDark]}>
                                {usuario?.cpf || '000.000.000-00'}
                            </Text>
                        </View>

                        <View style={styles.campoContainer}>
                            <Text style={[styles.campoLabel, temaEscuro && styles.textSecondaryDark]}>
                                Celular
                            </Text>
                            <Text style={[styles.campoValor, temaEscuro && styles.textDark]}>
                                {usuario?.telefone || '(00) 00000-0000'}
                            </Text>
                        </View>

                        <View style={[styles.campoContainer, styles.ultimoCampo]}>
                            <Text style={[styles.campoLabel, temaEscuro && styles.textSecondaryDark]}>
                                Cliente desde
                            </Text>
                            <Text style={[styles.campoValor, temaEscuro && styles.textDark]}>
                                {usuario?.createdAt ? new Date(usuario.createdAt).toLocaleDateString('pt-BR') : '01/01/2023'}
                            </Text>
                        </View>
                    </View>

                    {/* Configurações */}
                    <View style={[styles.secao, temaEscuro && styles.cardDark]}>
                        <Text style={[styles.secaoTitulo, temaEscuro && styles.textDark]}>
                            Configurações
                        </Text>

                        <View style={styles.opcaoContainer}>
                            <Text style={[styles.opcaoLabel, temaEscuro && styles.textDark]}>
                                Tema Escuro
                            </Text>
                            <Switch
                                trackColor={{ false: '#e0e0e0', true: '#81b0ff' }}
                                thumbColor={temaEscuro ? '#6a8fff' : '#f4f3f4'}
                                ios_backgroundColor="#e0e0e0"
                                onValueChange={alternarTema}
                                value={temaEscuro}
                            />
                        </View>

                        <View style={styles.opcaoContainer}>
                            <Text style={[styles.opcaoLabel, temaEscuro && styles.textDark]}>
                                Notificações
                            </Text>
                            <Switch
                                trackColor={{ false: '#e0e0e0', true: '#81b0ff' }}
                                thumbColor={notificacoes ? '#6a8fff' : '#f4f3f4'}
                                ios_backgroundColor="#e0e0e0"
                                onValueChange={alternarNotificacoes}
                                value={notificacoes}
                            />
                        </View>

                        <View style={[styles.opcaoContainer, styles.ultimaOpcao]}>
                            <Text style={[styles.opcaoLabel, temaEscuro && styles.textDark]}>
                                Login com Biometria
                            </Text>
                            <Switch
                                trackColor={{ false: '#e0e0e0', true: '#81b0ff' }}
                                thumbColor={biometria ? '#6a8fff' : '#f4f3f4'}
                                ios_backgroundColor="#e0e0e0"
                                onValueChange={alternarBiometria}
                                value={biometria}
                            />
                        </View>
                    </View>

                    {/* Links úteis */}
                    <View style={[styles.secao, temaEscuro && styles.cardDark]}>
                        <Text style={[styles.secaoTitulo, temaEscuro && styles.textDark]}>
                            Ajuda e Suporte
                        </Text>

                        <TouchableOpacity
                            style={styles.linkContainer}
                            onPress={() => router.push('/Ajuda')}
                        >
                            <Text style={[styles.linkLabel, temaEscuro && styles.textDark]}>
                                Central de Ajuda
                            </Text>
                            <Text style={styles.linkSeta}>→</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.linkContainer}
                            onPress={() => router.push('/TermosUso')}
                        >
                            <Text style={[styles.linkLabel, temaEscuro && styles.textDark]}>
                                Termos de Uso
                            </Text>
                            <Text style={styles.linkSeta}>→</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.linkContainer}
                            onPress={() => router.push('/Privacidade')}
                        >
                            <Text style={[styles.linkLabel, temaEscuro && styles.textDark]}>
                                Política de Privacidade
                            </Text>
                            <Text style={styles.linkSeta}>→</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.linkContainer, styles.ultimoLink]}
                            onPress={() => router.push('/Sobre')}
                        >
                            <Text style={[styles.linkLabel, temaEscuro && styles.textDark]}>
                                Sobre o Aplicativo
                            </Text>
                            <Text style={styles.linkSeta}>→</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Botões de conta */}
                    <View style={[styles.secao, temaEscuro && styles.cardDark]}>
                        <TouchableOpacity
                            style={styles.botaoLogout}
                            onPress={handleLogout}
                        >
                            <Text style={styles.botaoLogoutText}>Sair da Conta</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.botaoExcluir}
                            onPress={excluirConta}
                        >
                            <Text style={styles.botaoExcluirText}>Excluir Conta</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Versão do app */}
                    <Text style={[styles.versaoApp, temaEscuro && styles.textSecondaryDark]}>
                        Versão 1.0.0
                    </Text>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    containerDark: {
        backgroundColor: '#121212',
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
    headerDark: {
        backgroundColor: '#1e1e1e',
        borderBottomColor: '#2c2c2c',
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
    textDark: {
        color: '#ffffff',
    },
    textSecondaryDark: {
        color: '#b0b0b0',
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
    scrollContent: {
        paddingVertical: 20,
    },
    perfilContainer: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
    cardDark: {
        backgroundColor: '#1e1e1e',
        shadowColor: '#000',
        shadowOpacity: 0.2,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 15,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#4a7df3',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatarText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    editarFotoButton: {
        backgroundColor: 'transparent',
    },
    editarFotoText: {
        color: '#4a7df3',
        fontSize: 14,
        fontWeight: '500',
    },
    nomeUsuario: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2e3e5c',
        marginBottom: 4,
    },
    apelidoUsuario: {
        fontSize: 16,
        color: '#7b8bb2',
        marginBottom: 20,
    },
    editarPerfilButton: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    editarPerfilText: {
        color: '#2e3e5c',
        fontSize: 16,
        fontWeight: '500',
    },
    secao: {
        backgroundColor: '#ffffff',
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 1,
    },
    secaoTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2e3e5c',
        marginBottom: 16,
    },
    campoContainer: {
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    ultimoCampo: {
        paddingBottom: 4,
        borderBottomWidth: 0,
    },
    campoLabel: {
        fontSize: 14,
        color: '#7b8bb2',
        marginBottom: 6,
    },
    campoValor: {
        fontSize: 16,
        color: '#2e3e5c',
        fontWeight: '500',
    },
    opcaoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    ultimaOpcao: {
        borderBottomWidth: 0,
    },
    opcaoLabel: {
        fontSize: 16,
        color: '#2e3e5c',
    },
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    ultimoLink: {
        borderBottomWidth: 0,
    },
    linkLabel: {
        fontSize: 16,
        color: '#2e3e5c',
    },
    linkSeta: {
        fontSize: 18,
        color: '#7b8bb2',
    },
    botaoLogout: {
        backgroundColor: '#4a7df3',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    botaoLogoutText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    botaoExcluir: {
        backgroundColor: 'transparent',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FF3B30',
    },
    botaoExcluirText: {
        color: '#FF3B30',
        fontSize: 16,
        fontWeight: 'bold',
    },
    versaoApp: {
        textAlign: 'center',
        fontSize: 14,
        color: '#7b8bb2',
        marginBottom: 30,
    },
});
