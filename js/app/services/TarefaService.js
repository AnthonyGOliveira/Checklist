class TarefaService{

    constructor(){
        throw new Error('Não é permitido instânciar TarefaService');
    }

    static adiciona(tarefa){
        return ConnectionFactory
            .getConnection()
            .then(connection => new TarefaDao(connection)
            .adiciona(tarefa))
            .then(() => 'Tarefa adicionada')
            .catch(() => {
                console.log(erro);
                throw new Error('Não foi possivel adicionar a tarefa do indexDB')
            });
    }

    static lista(){
        return ConnectionFactory
        .getConnection()
        .then(connection => new TarefaDao(connection))
        .then(dao => dao.listaTodos())
        .catch(erro => {
            console.log(erro);
            throw new Error('Não foi possivel listar as tarefas do indexDB')});
    }

    static apaga(nomeDaTarefa){
        return ConnectionFactory
            .getConnection()
            .then(connection => new TarefaDao(connection))
            .then(dao => {
                dao.apagaTarefa(nomeDaTarefa);
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possivel apagar a tarefa do indexDB')});
    }
}