class View{
    constructor(elemento){
        this._elemento = elemento;
    }

    template(modelo){
        throw new Error("Metodo template deve ser implementado.");
    }

    update(modelo){
        return this._elemento.innerHTML = this.template(modelo)
    }
}