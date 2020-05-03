class API {
    constructor(apikey){
        this.apikey = apikey;
    }
    // obtener todas las monedas
    async obtenerMonedasAPI(){
        const url = `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${this.apikey}`;

        // fecth a la api
        const urlObtenerMonedas = await fetch(url);

        // respuesta en json
        const monedas = await urlObtenerMonedas.json();
        
        return {
            monedas
        }
    }

    async obtenerValores(moneda, criptomoneda){
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}&api_key=${this.apikey}`

        // consultar en sert api
        const urlConvertir = await fetch(url);

        const resultado = await urlConvertir.json();

        return {
            resultado
        }
    }
}