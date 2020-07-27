var ConnectionFactory = (function(){

    const stores = ['tarefas'];
    const version = 8;
    const dbName = 'checklist';
    
    var connection = null;
    var close = null;

    return class ConnectionFactory{
        constructor(){
            throw new Error('Não é permitido instânciar ConnectionFactory');
        }

        static getConnection(){
            return new Promise((resolve, reject) => {
                let openRequest = window.indexedDB.open(dbName, version);

                openRequest.onupgradeneeded = evento => {
                    console.log('Banco alterado ou criado.');

                    ConnectionFactory._createStores(evento.target.result);
                };

                openRequest.onsuccess = evento => {

                    if(!connection) {
                        connection = evento.target.result;
                        close = connection.close.bind(connection);

                        connection.close = function(){
                            throw new Error('Você não pode fechar uma conxeão diretamente.');
                        };
                    }
                    resolve(connection);
                };

                openRequest.onerror = evento => {
                    reject(evento.target.error.name);
                };
            });
        }

        static _createStores(connection){

            stores.forEach(store => {

                if(connection.objectStoreNames.contains(store)){
                    connection.deleteObjectStore(store);
                }

                connection.createObjectStore(store, { autoIncrement: true});
                console.log(`Store ${store} criada com sucesso`);
            });
        }

        static closeConnection(){

            if(connection) 
            close();

            connection = null;
            close = null;
        }
    }

})();