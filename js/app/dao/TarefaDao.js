class TarefaDao{
    constructor(connection){
        this._connection = connection;
        this._store = 'tarefas';
    }

    adiciona(tarefa){
        return new Promise((resolve, reject) => {

            let request = this._connection
            .transaction([this._store], 'readwrite')
            .objectStore(this._store)
            .add(tarefa);
    
            request.onsuccess = evento => {
                resolve();
            };
    
            request.onerror = evento => {
                console.log(evento.target.error.name);
                reject('Não foi possivel adicionar a tarefa.');
            };
        });
    }

    listaTodos(){

        return new Promise((resolve, reject) => {

            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();
    
            let tarefas = [];
    
            cursor.onsuccess = evento => {
                
                let atual = evento.target.result;
    
                if(atual){
    
                    let dado = atual.value;
    
                    tarefas.push(new Tarefa(dado._nome, dado._data));
    
                    atual.continue();
                }else{
                    resolve(tarefas);
                }
            };
    
            cursor.onerror = evento => {
                console.log(evento.target.error);
                reject('Não foi possivel listar as tarefas');
            };
        });
    }

    apagaTarefa(nomeTarefa){
        return new Promise((resolve, reject) => {

            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();
    
            cursor.onsuccess = evento => {
                
                let atual = evento.target.result;
    
                if(atual){
    
                    let dado = atual.value;
    
                    if(dado._nome == nomeTarefa){
                        atual.delete(atual.key);
                    }
    
                    atual.continue();
                }else{
                    resolve();
                }
            };
    
            cursor.onerror = evento => {
                console.log(evento.target.error);
                reject('Não foi possivel apagar a tarefa');
            };
        });
    }
}