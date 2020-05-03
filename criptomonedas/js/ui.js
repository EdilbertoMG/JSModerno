class Interfez {

    constructor(){
        this.init();
    }

    init(){
        this.construirSelect();
    }

    construirSelect(){
        cotizador.obtenerMonedasAPI()
            .then(monedas => {
                // crear un select de opciones
                const select = document.querySelector('#criptomoneda');

                // iteras por los resultados de la API
                for (const [key, value] of Object.entries(monedas.monedas.Data)) {
                    // añadir sl sy,bolo y el nombre como opciones
                    const option = document.createElement('option');
                    option.value = value.Symbol;
                    option.appendChild(document.createTextNode(value.CoinName));
                    select.appendChild(option);
                } 
            })
    }

    mostrarMensaje(mensaje, clases){
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));

        // seleccionar mensajes
        const divMensaje = document.querySelector('.mensajes')
        divMensaje.appendChild(div);

        setTimeout(() => {
            document.querySelector('.mensajes div').remove();
        }, 3000);
    }

    // imprime el resultado de la cotizacion
    mostrarResultado(resultado, moneda, crypto){
        // En caso de un rasultado anterior, ocultarlo

        const resultadoAnterior = document.querySelector('#resultado > div');

        if (resultadoAnterior) {
            resultadoAnterior.remove();
        }

        const datosMoneda = resultado[crypto][moneda];
        
        // recortar digitos de precio
        let precio = datosMoneda.PRICE.toFixed(2),
            pocentaje = datosMoneda.CHANGEPCTDAY.toFixed(2),
            actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-CO');
        
        // construir el template
        let templateHTML = `
            <div class="card bg-warning">
                <div class="card-body text-light">
                    <h2 class="card-title">Resultado:</h2>
                    <p>El Precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de: $ ${precio}</p>
                    <p>Variacion último dia: % ${pocentaje}</p>
                    <p>Última actualización: ${actualizado}</p>
                </div>
            </div>
        `;

        this.mostrarOcultarSpinner('block');
        setTimeout(() => {
            // insertar el resultado
        document.querySelector('#resultado').innerHTML = templateHTML;
        this.mostrarOcultarSpinner('none');
        }, 3000);
    }

    // mostras spinner de carga
    mostrarOcultarSpinner(vista){
        const spinner = document.querySelector('.contenido-spinner');
        spinner.style.display = vista;
    }
}