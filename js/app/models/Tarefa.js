class Tarefa{
    constructor(nome, data){
        this._nome = nome;
        this._data = new Date(data.getTime());
        Object.freeze(this);
    }

    get nome(){
        return this._nome;
    }

    get data(){
        return new Date(this._data.getTime());
    }
}