class DateHelper{
    constructor(){
        throw new Error('Esta classe não pode ser instânciada.');
    }

    static dataParaTexto(data){

        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;

    }
    
    static textoParaData(texto){
        if(!/\d{4}-\d{2}-\d{2}/.test(texto)){
            throw new Error('O formato de data deve ser aaaa-mm-dd');
        }
        return new Date(...texto.split('-')
            .map((item, indice) => {
                return item - indice %2;
        }));

    }
}















/*/para trabalhar com data

let data = new Date(["2016", "11", "29"]);

let dataString = "2020-06-11";
//dataString.replace(/-/g, ',');

let data2 = new Date(dataString.split("-"));*/