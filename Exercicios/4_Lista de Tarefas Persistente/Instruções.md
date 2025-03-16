Exercício 4: Lista de Tarefas Persistente

Objetivo: Criar uma lista de tarefas (To-Do List) que persista os dados no AsyncStorage.

Descrição:
Desenvolva um aplicativo que permita ao usuário adicionar e remover tarefas. Os dados das tarefas devem ser salvos no AsyncStorage para que persistam mesmo após o fechamento do app.

Requisitos:
1. Use AsyncStorage.setItem para salvar a lista de tarefas.
2. Use AsyncStorage.getItem para carregar as tarefas ao iniciar o app.
3. Implemente funcionalidades para:
    * Adicionar uma nova tarefa.
    * Remover uma tarefa existente.
4. Exiba a lista de tarefas em uma FlatList.

Desafio Adicional:

Adicione uma funcionalidade para marcar tarefas como concluídas e salve esse estado no AsyncStorage.