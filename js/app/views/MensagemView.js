class MensagemView extends View{
    constructor(elemento){
        super(elemento);
    }

    template(modelo){
        return `
            <h2>${modelo}<h2>
        `;
    }
}