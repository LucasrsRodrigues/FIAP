import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native';

export default function FormularioCadastro() {
    // Estados para os campos do formulário
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmacaoSenha, setConfirmacaoSenha] = useState('');

    // Estados para as mensagens de erro
    const [erroNome, setErroNome] = useState('');
    const [erroEmail, setErroEmail] = useState('');
    const [erroSenha, setErroSenha] = useState('');
    const [erroConfirmacao, setErroConfirmacao] = useState('');

    // Estado para controlar a força da senha
    const [forcaSenha, setForcaSenha] = useState(0);

    // Estado para controlar o formulário enviado com sucesso
    const [formularioEnviado, setFormularioEnviado] = useState(false);

    // Estado para controlar se o formulário é válido
    const [formularioValido, setFormularioValido] = useState(false);

    // Função para validar o nome
    const validarNome = (texto: string) => {
        setNome(texto);
        if (texto.length < 3) {
            setErroNome('O nome deve ter pelo menos 3 caracteres');
        } else {
            setErroNome('');
        }
    };

    // Função para validar o email
    const validarEmail = (texto: string) => {
        setEmail(texto);
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(texto)) {
            setErroEmail('Digite um email válido');
        } else {
            setErroEmail('');
        }
    };

    // Função para calcular a força da senha
    const calcularForcaSenha = (senha: string) => {
        let pontos = 0;

        if (senha.length === 0) return 0;

        // Comprimento básico
        if (senha.length >= 6) pontos += 1;
        if (senha.length >= 10) pontos += 1;

        // Complexidade
        if (/[A-Z]/.test(senha)) pontos += 1;  // Letra maiúscula
        if (/[0-9]/.test(senha)) pontos += 1;  // Número
        if (/[^A-Za-z0-9]/.test(senha)) pontos += 1;  // Caractere especial

        return pontos;
    };

    // Função para validar a senha
    const validarSenha = (texto: string) => {
        setSenha(texto);
        setForcaSenha(calcularForcaSenha(texto));

        if (texto.length < 6) {
            setErroSenha('A senha deve ter pelo menos 6 caracteres');
        } else if (!/[A-Z]/.test(texto)) {
            setErroSenha('A senha deve ter pelo menos uma letra maiúscula');
        } else if (!/[0-9]/.test(texto)) {
            setErroSenha('A senha deve ter pelo menos um número');
        } else {
            setErroSenha('');
        }

        // Verificar confirmação de senha quando a senha mudar
        if (confirmacaoSenha && texto !== confirmacaoSenha) {
            setErroConfirmacao('As senhas não coincidem');
        } else if (confirmacaoSenha) {
            setErroConfirmacao('');
        }
    };

    // Função para validar a confirmação de senha
    const validarConfirmacao = (texto: string) => {
        setConfirmacaoSenha(texto);
        if (texto !== senha) {
            setErroConfirmacao('As senhas não coincidem');
        } else {
            setErroConfirmacao('');
        }
    };

    // Função para lidar com o envio do formulário
    const enviarFormulario = () => {
        if (formularioValido) {
            // Simulação de envio
            setTimeout(() => {
                setFormularioEnviado(true);
                // Limpar o formulário após o envio
                setNome('');
                setEmail('');
                setSenha('');
                setConfirmacaoSenha('');
                setForcaSenha(0);

                // Exibir alerta de sucesso
                Alert.alert(
                    "Cadastro realizado!",
                    "Seus dados foram enviados com sucesso.",
                    [{ text: "OK", onPress: () => setFormularioEnviado(false) }]
                );
            }, 1000);
        }
    };

    // Verificar se o formulário é válido sempre que os campos mudarem
    useEffect(() => {
        const camposPreenchidos = nome && email && senha && confirmacaoSenha;
        const semErros = !erroNome && !erroEmail && !erroSenha && !erroConfirmacao;
        setFormularioValido(camposPreenchidos && semErros);
    }, [nome, email, senha, confirmacaoSenha, erroNome, erroEmail, erroSenha, erroConfirmacao]);

    // Renderizar indicador de força da senha
    const renderizarIndicadorForca = () => {
        const niveis = [
            { cor: '#e74c3c', texto: 'Muito fraca' },
            { cor: '#e67e22', texto: 'Fraca' },
            { cor: '#f1c40f', texto: 'Média' },
            { cor: '#2ecc71', texto: 'Forte' },
            { cor: '#27ae60', texto: 'Muito forte' }
        ];

        return (
            <View style={styles.indicadorContainer}>
                <Text style={styles.indicadorTexto}>
                    {senha ? niveis[forcaSenha].texto : ''}
                </Text>
                <View style={styles.barraContainer}>
                    {[0, 1, 2, 3, 4].map((index) => (
                        <View
                            key={index}
                            style={[
                                styles.barra,
                                {
                                    backgroundColor: index <= forcaSenha ? niveis[forcaSenha].cor : '#ecf0f1',
                                },
                            ]}
                        />
                    ))}
                </View>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.formContainer}>
                    <Text style={styles.titulo}>Criar Conta</Text>

                    {/* Campo de Nome */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nome</Text>
                        <TextInput
                            style={[styles.input, erroNome ? styles.inputErro : null]}
                            placeholder="Seu nome completo"
                            placeholderTextColor="#9E9E9E"
                            value={nome}
                            onChangeText={validarNome}
                        />
                        {erroNome ? <Text style={styles.textoErro}>{erroNome}</Text> : null}
                    </View>

                    {/* Campo de Email */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={[styles.input, erroEmail ? styles.inputErro : null]}
                            placeholder="exemplo@email.com"
                            placeholderTextColor="#9E9E9E"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={validarEmail}
                        />
                        {erroEmail ? <Text style={styles.textoErro}>{erroEmail}</Text> : null}
                    </View>

                    {/* Campo de Senha */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Senha</Text>
                        <TextInput
                            style={[styles.input, erroSenha ? styles.inputErro : null]}
                            placeholder="Mínimo 6 caracteres"
                            placeholderTextColor="#9E9E9E"
                            secureTextEntry
                            value={senha}
                            onChangeText={validarSenha}
                        />
                        {erroSenha ? <Text style={styles.textoErro}>{erroSenha}</Text> : null}
                        {renderizarIndicadorForca()}
                    </View>

                    {/* Campo de Confirmação de Senha */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Confirmar Senha</Text>
                        <TextInput
                            style={[styles.input, erroConfirmacao ? styles.inputErro : null]}
                            placeholder="Digite a senha novamente"
                            placeholderTextColor="#9E9E9E"
                            secureTextEntry
                            value={confirmacaoSenha}
                            onChangeText={validarConfirmacao}
                        />
                        {erroConfirmacao ? <Text style={styles.textoErro}>{erroConfirmacao}</Text> : null}
                    </View>

                    {/* Botão de Cadastro */}
                    <TouchableOpacity
                        style={[
                            styles.botaoCadastro,
                            !formularioValido && styles.botaoDesabilitado,
                        ]}
                        onPress={enviarFormulario}
                        disabled={!formularioValido}
                    >
                        <Text style={styles.textoBotao}>Cadastrar</Text>
                    </TouchableOpacity>

                    {/* Mensagem de sucesso (visível após cadastro bem-sucedido) */}
                    {formularioEnviado && (
                        <View style={styles.mensagemSucesso}>
                            <Text style={styles.textoSucesso}>
                                Cadastro realizado com sucesso!
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F8FA',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#2C3E50',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#2C3E50',
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#F5F8FA',
        borderWidth: 1,
        borderColor: '#E0E7FF',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#2C3E50',
    },
    inputErro: {
        borderColor: '#e74c3c',
    },
    textoErro: {
        color: '#e74c3c',
        fontSize: 14,
        marginTop: 5,
    },
    indicadorContainer: {
        marginTop: 10,
    },
    indicadorTexto: {
        fontSize: 14,
        marginBottom: 5,
        color: '#7F8C8D',
    },
    barraContainer: {
        flexDirection: 'row',
        height: 8,
        borderRadius: 4,
        overflow: 'hidden',
    },
    barra: {
        flex: 1,
        marginHorizontal: 2,
        borderRadius: 4,
    },
    botaoCadastro: {
        backgroundColor: '#3498DB',
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    botaoDesabilitado: {
        backgroundColor: '#BDC3C7',
    },
    textoBotao: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    mensagemSucesso: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#D5F5E3',
        borderRadius: 8,
        alignItems: 'center',
    },
    textoSucesso: {
        color: '#27AE60',
        fontSize: 16,
        fontWeight: '500',
    },
});