class ListaTarefas{
    constructor(){
        this._tarefas = [];
    }

    get tarefas(){
        return [].concat(this._tarefas);
    }

    adiciona(tarefa){
        this._tarefas.push(tarefa);
    }

    remove(nome){

        for(let i = 0; i < this._tarefas.length; i++)
        {
            if(this._tarefas[i]._nome == nome){
                this._tarefas.splice(i,1);
            }
        }
    }
}