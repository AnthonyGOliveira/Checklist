class TarefaView extends View{
    constructor(elemento){
        super(elemento);
    }

    template(modelo){
        return `
            <table class = "table">
                <thead>
                    <tr>
                        <th>Tarefa</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    ${modelo.tarefas.map(t => `
                        <tr>
                            <td>${t._nome}</td>
                            <td>${DateHelper.dataParaTexto(t._data)}</td>
                            <td><input onclick="tarefaController.apaga('${t._nome}')" type="checkbox"></td>
                        </tr> `
                    ).join("")}
                </tbody>
            </table>
        `;
    }
}