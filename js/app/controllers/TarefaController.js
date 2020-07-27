class TarefaController{

    constructor(){
        const $ = document.querySelector.bind(document);

        this.inputNome = $("input[name=name]");
        this.inputData = $("input[name=date]");

        this._listaDeTarefas = new ListaTarefas();
        this._tarefaView = new TarefaView($("#table-tasks"));

        this._mensagemView = new MensagemView($("#table-tasks"));
        this._mensagem = new Mensagem("Não há nenhuma tarefa");
        
        this._init();

        
        
    }
    
    _init(){
        
        TarefaService
            .lista()
            .then(tarefas => {
                tarefas.forEach(tarefa => this._listaDeTarefas.adiciona(tarefa));
                if(this._listaDeTarefas._tarefas.length == 0){
                    this._mensagemView.update(this._mensagem.texto);
                }else{
                    this._tarefaView.update(this._listaDeTarefas);
                }
            })
            .catch(erro => console.log(erro));

    }

    adiciona(){
        event.preventDefault();

        let tarefa = this._criaTarefa();

        TarefaService
            .adiciona(tarefa)
            .then(() => {
                
                this._listaDeTarefas.adiciona(tarefa);
                this._tarefaView.update(this._listaDeTarefas);
                this.limpaInputs();

            })
            .catch(erro => console.log(erro));
    }

    apaga(nomeDaTarefa){

        TarefaService
            .apaga(nomeDaTarefa)
            .then(() => {console.log('Tarefa apagada com sucesso.')})
            .catch(erro => console.log(erro));

        this._listaDeTarefas.remove(nomeDaTarefa);
        this._tarefaView.update(this._listaDeTarefas);
        
        if(this._listaDeTarefas._tarefas.length == 0){
            this._mensagemView.update(this._mensagem.texto = "Tarefas realizadas com sucesso.");
        }
    }

    limpaInputs(){
        this.inputNome.value = "";
        this.inputData.value = "";

        this.inputNome.focus();
    }

    _criaTarefa(){
        return new Tarefa(this.inputNome.value, DateHelper.textoParaData(this.inputData.value));
    }
}