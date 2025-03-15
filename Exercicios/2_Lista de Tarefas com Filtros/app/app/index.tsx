import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
    Modal,
    Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface ITarefaProps {
    id: string;
    texto: string;
    concluida: boolean;
    dataCriacao: Date;
}

export default function App() {
    // Estado para a lista de tarefas
    const [tarefas, setTarefas] = useState<Array<ITarefaProps>>([]);

    // Estado para o filtro atual
    const [filtroAtual, setFiltroAtual] = useState('todas');

    // Estado para o texto da nova tarefa
    const [novaTarefaTexto, setNovaTarefaTexto] = useState('');

    // Estados para edição de tarefa
    const [editandoTarefa, setEditandoTarefa] = useState(false);
    const [tarefaEditandoId, setTarefaEditandoId] = useState('');
    const [textoEdicao, setTextoEdicao] = useState('');

    // Função para adicionar nova tarefa
    const adicionarTarefa = () => {
        if (novaTarefaTexto.trim() === '') {
            Alert.alert('Erro', 'Por favor, insira um texto para a tarefa');
            return;
        }

        const novaTarefa = {
            id: Date.now().toString(),
            texto: novaTarefaTexto,
            concluida: false,
            dataCriacao: new Date()
        };

        setTarefas([...tarefas, novaTarefa]);
        setNovaTarefaTexto('');
    };

    // Função para alternar o status de conclusão da tarefa
    const alternarStatusTarefa = (id: string) => {
        const novasTarefas = tarefas.map(tarefa => {
            if (tarefa.id === id) {
                return { ...tarefa, concluida: !tarefa.concluida };
            }
            return tarefa;
        });
        setTarefas(novasTarefas);
    };

    // Função para excluir uma tarefa
    const excluirTarefa = (id: string) => {
        const novasTarefas = tarefas.filter(tarefa => tarefa.id !== id);
        setTarefas(novasTarefas);
    };

    // Função para limpar todas as tarefas concluídas
    const limparTarefasConcluidas = () => {
        const tarefasAtivas = tarefas.filter(tarefa => !tarefa.concluida);
        setTarefas(tarefasAtivas);
    };

    // Função para iniciar a edição de uma tarefa
    const iniciarEdicaoTarefa = (id: string, texto: string) => {
        setTarefaEditandoId(id);
        setTextoEdicao(texto);
        setEditandoTarefa(true);
    };

    // Função para salvar a edição de uma tarefa
    const salvarEdicaoTarefa = () => {
        if (textoEdicao.trim() === '') {
            Alert.alert('Erro', 'Por favor, insira um texto para a tarefa');
            return;
        }

        const novasTarefas = tarefas.map(tarefa => {
            if (tarefa.id === tarefaEditandoId) {
                return { ...tarefa, texto: textoEdicao };
            }
            return tarefa;
        });

        setTarefas(novasTarefas);
        setEditandoTarefa(false);
        setTarefaEditandoId('');
        setTextoEdicao('');
    };

    // Filtrar tarefas com base no filtro atual
    const tarefasFiltradas = tarefas.filter(tarefa => {
        if (filtroAtual === 'ativas') return !tarefa.concluida;
        if (filtroAtual === 'concluidas') return tarefa.concluida;
        return true; // "todas"
    });

    // Contagem de tarefas por status
    const tarefasAtivas = tarefas.filter(t => !t.concluida).length;
    const tarefasConcluidas = tarefas.filter(t => t.concluida).length;

    // Renderizar cada item da lista de tarefas
    const renderItem = ({ item }) => (
        <View style={styles.tarefaItem}>
            <TouchableOpacity
                style={[styles.statusCheckbox, item.concluida && styles.statusCheckboxConcluida]}
                onPress={() => alternarStatusTarefa(item.id)}
            />
            <Text style={[styles.tarefaTexto, item.concluida && styles.tarefaTextoConcluida]}>
                {item.texto}
            </Text>
            <View style={styles.botoesAcao}>
                <TouchableOpacity
                    style={[styles.botaoAcao, styles.botaoEditar]}
                    onPress={() => iniciarEdicaoTarefa(item.id, item.texto)}
                >
                    <Text style={styles.botaoAcaoTexto}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.botaoAcao, styles.botaoExcluir]}
                    onPress={() => excluirTarefa(item.id)}
                >
                    <Text style={styles.botaoAcaoTexto}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            <Text style={styles.titulo}>Lista de Tarefas</Text>

            {/* Área de entrada de nova tarefa */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Adicionar nova tarefa"
                    value={novaTarefaTexto}
                    onChangeText={setNovaTarefaTexto}
                    onSubmitEditing={adicionarTarefa}
                />
                <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarTarefa}>
                    <Text style={styles.botaoAdicionarTexto}>+</Text>
                </TouchableOpacity>
            </View>

            {/* Filtros */}
            <View style={styles.filtrosContainer}>
                <TouchableOpacity
                    style={[styles.botaoFiltro, filtroAtual === 'todas' && styles.botaoFiltroAtivo]}
                    onPress={() => setFiltroAtual('todas')}
                >
                    <Text style={[styles.textoFiltro, filtroAtual === 'todas' && styles.textoFiltroAtivo]}>
                        Todas ({tarefas.length})
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.botaoFiltro, filtroAtual === 'ativas' && styles.botaoFiltroAtivo]}
                    onPress={() => setFiltroAtual('ativas')}
                >
                    <Text style={[styles.textoFiltro, filtroAtual === 'ativas' && styles.textoFiltroAtivo]}>
                        Ativas ({tarefasAtivas})
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.botaoFiltro, filtroAtual === 'concluidas' && styles.botaoFiltroAtivo]}
                    onPress={() => setFiltroAtual('concluidas')}
                >
                    <Text style={[styles.textoFiltro, filtroAtual === 'concluidas' && styles.textoFiltroAtivo]}>
                        Concluídas ({tarefasConcluidas})
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Lista de tarefas */}
            <FlatList
                style={styles.lista}
                data={tarefasFiltradas}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListEmptyComponent={
                    <Text style={styles.listaVazia}>Nenhuma tarefa encontrada</Text>
                }
            />

            {/* Botão de limpar concluídas */}
            {tarefasConcluidas > 0 && (
                <TouchableOpacity
                    style={styles.botaoLimparConcluidas}
                    onPress={limparTarefasConcluidas}
                >
                    <Text style={styles.botaoLimparConcluidasTexto}>
                        Limpar tarefas concluídas ({tarefasConcluidas})
                    </Text>
                </TouchableOpacity>
            )}

            {/* Modal para edição de tarefa */}
            <Modal
                visible={editandoTarefa}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitulo}>Editar Tarefa</Text>
                        <TextInput
                            style={styles.modalInput}
                            value={textoEdicao}
                            onChangeText={setTextoEdicao}
                            autoFocus
                        />
                        <View style={styles.modalBotoes}>
                            <TouchableOpacity
                                style={[styles.modalBotao, styles.modalBotaoCancelar]}
                                onPress={() => setEditandoTarefa(false)}
                            >
                                <Text style={styles.modalBotaoTexto}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalBotao, styles.modalBotaoSalvar]}
                                onPress={salvarEdicaoTarefa}
                            >
                                <Text style={styles.modalBotaoTexto}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E2E',
        padding: 20,
        paddingTop: 50,
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        backgroundColor: '#2D2D42',
        borderRadius: 8,
        padding: 12,
        color: '#FFFFFF',
        fontSize: 16,
        marginRight: 10,
    },
    botaoAdicionar: {
        width: 45,
        height: 45,
        backgroundColor: '#6C5DD3',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botaoAdicionarTexto: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    filtrosContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    botaoFiltro: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    botaoFiltroAtivo: {
        borderBottomColor: '#6C5DD3',
    },
    textoFiltro: {
        color: '#A9A9C0',
        fontSize: 14,
    },
    textoFiltroAtivo: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    lista: {
        flex: 1,
    },
    listaVazia: {
        textAlign: 'center',
        color: '#A9A9C0',
        marginTop: 50,
        fontSize: 16,
    },
    tarefaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2D2D42',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
    },
    statusCheckbox: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: '#6C5DD3',
        marginRight: 12,
    },
    statusCheckboxConcluida: {
        backgroundColor: '#6C5DD3',
    },
    tarefaTexto: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 16,
    },
    tarefaTextoConcluida: {
        textDecorationLine: 'line-through',
        color: '#A9A9C0',
    },
    botoesAcao: {
        flexDirection: 'row',
    },
    botaoAcao: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 4,
        marginLeft: 6,
    },
    botaoEditar: {
        backgroundColor: '#3C8D0D',
    },
    botaoExcluir: {
        backgroundColor: '#D9534F',
    },
    botaoAcaoTexto: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    botaoLimparConcluidas: {
        marginTop: 10,
        backgroundColor: '#3D3D56',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
    },
    botaoLimparConcluidasTexto: {
        color: '#FFFFFF',
        fontSize: 14,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#2D2D42',
        borderRadius: 8,
        padding: 20,
        width: '100%',
    },
    modalTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalInput: {
        backgroundColor: '#1E1E2E',
        borderRadius: 8,
        padding: 12,
        color: '#FFFFFF',
        fontSize: 16,
        marginBottom: 20,
    },
    modalBotoes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalBotao: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalBotaoCancelar: {
        backgroundColor: '#3D3D56',
        marginRight: 10,
    },
    modalBotaoSalvar: {
        backgroundColor: '#6C5DD3',
    },
    modalBotaoTexto: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
});