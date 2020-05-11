class Interfez{
    constructor(){
        // inicializa la app al instanciar
        this.init();
        // leer el resultado
        this.listado = document.getElementById('resultado-eventos');
    }
    // Metodo para cuando inicie la app
    init(){
        // llamar a imprimir categorias
        this.imprimirCategorias();
    }
    // imprimir cartegorias
    imprimirCategorias(){
        const listaCategorias = eventbrite.obtenerCategorias()
            .then(categorias => {
                const cats = categorias.categorias.categories;
                const selectCategorias = document.getElementById('listado-categorias');

                // recorremos el arreglo e inprimimos los <option>
                cats.forEach(cat => {
                    const option = document.createElement('option');
                    option.value = cat.id;
                    option.appendChild(document.createTextNode(cat.name_localized));
                    selectCategorias.appendChild(option);
                });
            });
    }
    // lee la respuesta de la API e imprime los resultados
    mostrarEventos(eventos){
        // leer los eventos y agregarlos a una variable
        const listaEventos = eventos.events;

        // recorrer los eventos y crear su template
        listaEventos.forEach(evento => {
            this.listado.innerHTML += `
                <div class="col-mb-4 mb-4">
                    <div class="card">
                            <img class="img-fluid mb-2" src="${evento.logo !== null ? evento.logo.url : ''}">
                        <div class="card-body">
                            <div class="card-text">
                                <h2 class="text-center">${evento.name.text}</h2>
                                <p class="lead text-info">Información del evento</p>
                                <p>${evento.description.text.substring(0,280)}...</p>
                                <span class="badge badge-primary">Capacidad: ${evento.capacity}</span>
                                <span class="badge badge-secondary">Fecha y hora: ${evento.start.local}</span>
                                <a href="${evento.url}" target="_blank" class="btn btn-primary btn-block mt-4">Comprar Boletos</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    // limpia los resultados previos 
    limpiarResultados(){
        this.listado.innerHTML = '';
    }
    // metodo para escribir mensajes 2 parametros, mensaje y clase
    mostrarMensaje(mensaje, clases){
        const div = document.createElement('div');
        div.classList = clases;
        // agregar texto
        div.appendChild(document.createTextNode(mensaje));
        // buscar un padre
        const buscadorDiv = document.querySelector('#buscador');
        buscadorDiv.appendChild(div);
        // quitar el alert despues de 3 segundos
        setTimeout(()=>{ 
            this.limpiarmensaje();
        }, 3000);
    }
    // desaparece el mensaje en caso de que exista
    limpiarmensaje(){
        const alert = document.querySelector('.alert');
        if (alert) {
            alert.remove();
        }
    }
}