class UI {
    constructor() {

        // instancaer la API
        this.api = new API();

        // crear los markers con layerGroup
        this.markers = new L.LayerGroup();

         // Iniciar el mapa
         this.mapa = this.inicializarMapa();

    }

    inicializarMapa() {
         // Inicializar y obtener la propiedad del mapa
         const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
         const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
         L.tileLayer(
             'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: '&copy; ' + enlaceMapa + ' Contributors',
             maxZoom: 18,
             }).addTo(map);
         return map;

    }

    mostrarEstablecimientos(){
        this.api.obtenerDatos()
            .then(datos =>{
                const resultado = datos.respuestaJson.results;

                // ejecutar la funcion para mostrar los pines
                this.mostrarPines(resultado);
            })
    }

    mostrarPines(datos){
        // limpiar los markers
        this.markers.clearLayers();
        
        // recorres los establecimientos
        datos.forEach(dato => {
            const {latitude, longitude, calle, regular, premium} = dato;

            // crear popup
            const opcionesPopUp = L.popup()
                    .setContent(`
                    <p>Calle: ${calle}</p>
                    <p><b>Regular: ${regular}</b></p>
                    <p><b>Premium: ${premium}</b></p>
                    `);

            //agregar el pin
            const marker = new L.marker([
                parseFloat(latitude),
                parseFloat(longitude)
            ]).bindPopup(opcionesPopUp);
            this.markers.addLayer(marker);
        });
        this.markers.addTo(this.mapa);
    }
    
    obtenerSugerencias(busqueda){
        this.api.obtenerDatos()
            .then(datos =>{
                // obetener los datos
                const resultados = datos.respuestaJson.results;

                // enviar json y la busqueda para el filtrado
                this.filtraSugerencia(resultados,busqueda)
            })
    }

    // filta las sugerencias en base al input
    filtraSugerencia(resultado, busqueda){

        // filtras con .filter
        const filtro = resultado.filter(filtro => filtro.calle.indexOf(busqueda) !== -1);
       
        // mostrar los pines
        this.mostrarPines(filtro);
    }
}