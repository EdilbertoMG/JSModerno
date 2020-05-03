// instancear clases
const cotizador = new API('55191809f8472dfa79f74b001d5ba83b6f589ac657856bc990e80c69302fb4d9');
const ui = new Interfez();

// Leer Formulario
const formulario = document.querySelector('#formulario');
// eventListener
formulario.addEventListener('submit', e =>{
    e.preventDefault();

    // leer la moneda seleccionada
    const monedaSelect = document.querySelector('#moneda');
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;

    // leer la cripto moneda seleccionada
    const criptoMonedaSelect = document.querySelector('#criptomoneda');
    const cripoMonedaSeleccionada = criptoMonedaSelect.options[criptoMonedaSelect.selectedIndex].value;
    
    // Comprobar que ambos campos tengan algo seleccionado
    if (monedaSeleccionada === '' || cripoMonedaSeleccionada === '') {
        // arrojar alerta de error
        ui.mostrarMensaje('Ambos campos son Obligatorios', 'alert bg-danger text-center')
    }else{
        // todo bien, consultar api
        cotizador.obtenerValores(monedaSeleccionada, cripoMonedaSeleccionada)
            .then(data => {
                ui.mostrarResultado(data.resultado.RAW, monedaSeleccionada, cripoMonedaSeleccionada);
            })

    }
});