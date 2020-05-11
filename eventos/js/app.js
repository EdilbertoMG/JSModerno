const eventbrite = new EventBrite();
const ui = new Interfez();

// listener al buscador 

document.getElementById('buscarBtn').addEventListener('click', (e)=>{
    e.preventDefault();

    // Leer el texto de input buscar
    const textoBuscador = document.getElementById('evento').value;
    
    // leer select
    const cartegorias = document.getElementById('listado-categorias');
    const cartegoriaSeleccionada = cartegorias.options[cartegorias.selectedIndex].value;

    if (textoBuscador !== '') {
        // cuando si hay una busqueda
        eventbrite.obtenerEventos(textoBuscador, cartegoriaSeleccionada)
            .then(eventos => {
                if (eventos.eventos.events.length > 0) {
                    // si gay eventos mostrar el resultado
                    ui.limpiarResultados();
                    ui.mostrarEventos(eventos.eventos);
                }else{
                    // no hay eventos enviar alertar
                    ui.mostrarMensaje('No hay resultados', 'alert alert-danger mt-4');
                }
            })
            .catch(() =>{
                ui.mostrarMensaje('No hay resultados fallo en la petición', 'alert alert-danger mt-4');
            })
    }else{
        // mostrar mensaje que imprime algo
        ui.mostrarMensaje('Escribe algo en el buscador', 'alert alert-danger mt-4');
    }
    
});