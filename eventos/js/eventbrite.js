class EventBrite {
    constructor(){
        this.token_auth = 'MJWFXFW7JNUOZMIQMOWT';
        this.ordenar = 'date';
    }

    // mostrar resultados de la busqueda
    async obtenerEventos(evento, categoria){
        // consultar los eventos en la REST API de event brite
        const respuestaEvento = await fetch(`https://www.eventbriteapi.com/v3/events/search/?q=${evento}&sort_by=${this.ordenar}&categories=${categoria}?token=${this.token_auth}`);
        // esperar la respuesta del evento y devolver json
        const eventos = await respuestaEvento.json();
        // devolvemos el resultado
        return {
            eventos
        };
    }

    // obtiene las categorias
    async obtenerCategorias(){
        // consultar las categoria a la REST API de event brite
        const respuestaCategorias = await fetch(`https://www.eventbriteapi.com/v3/categories/?token=${this.token_auth}`);
        // esperar la respuesta de las categorias y devolver json
        const categorias = await respuestaCategorias.json();
        // devolvemos el resultado
        return {
            categorias
        };
    }
}