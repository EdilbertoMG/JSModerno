// Constructor para seguro
class Seguro{
    constructor(marca, anio, tipo){
        this.marca = marca;
        this.anio = anio;
        this.tipo = tipo;
    }

    cotizarSeguro(informacion){
        /*
            1 = americano 1.15 
            2 = asiatico 1.06
            3 = europeo 1.35
        */
       let cantidad;
       const base = 2000;
    
       switch (informacion.marca) {
           case '1':
                cantidad = base * 1.15;
               break;
            case '2':
                cantidad = base * 1.05;
                break;
            case '3':
                cantidad = base * 1.35;
               break;
       }
    
       // Leer el año
       const diferencia = new Date().getFullYear() - informacion.anio;
       // Cada año de diferencia hay que reducir el 3% el valor del seguro
       cantidad -= ((diferencia * 3) * cantidad) / 100;
    
       /*
            Si el seguro es basico se multiplica por 30% mas
            Si el seguro es completoto un 50% mas
        */
    
        if (informacion.tipo === 'basico') {
            cantidad *= 1.30;
        }else{
            cantidad *= 1.50;
        }
    
       return cantidad 
    }
}

class Interfaz{
    // Mensaje que se imprime en el html
    mostrarMensaje(mensaje, tipo){
        const div = document.createElement('div');
        if (tipo === 'error') {
            div.classList.add('mensaje','error');
        }else{
            div.classList.add('mensaje','correcto');
        }
        div.innerHTML = `${mensaje}`;
        formulario.insertBefore(div, document.querySelector(".form-group"));
    
        setTimeout(()=>{
            document.querySelector('.mensaje').remove();
        }, 3000);
    }
    // Imprime el resultado de la cotización
    mostrarResultado(seguro, total){
        const resultado = document.getElementById('resultado');
        let marca;
        switch (seguro.marca) {
            case '1':
                marca = 'Americano';
                break;
             case '2':
                marca = 'Asiatico';
                break;
             case '3':
                marca = 'Europeo';
                break;
        }
        // Crear div
        const div = document.createElement('div');
        // Insertar la información
        div.innerHTML = `
                <p class='header'>Tu Resumen</p>
                <p>Marca: ${marca}</p>
                <p>Año: ${seguro.anio}</p>
                <p>Tipo: ${seguro.tipo}</p>
                <p>Total; ${total}</p>
        `;
        const spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block';
        setTimeout(()=>{
            spinner.style.display = 'none';
            resultado.appendChild(div);
        }, 3000);
    }
}

// Event listennr
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function(e){
    e.preventDefault();

    // leer la marca seleccionada del select
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    // leer el año seleccionado
    const anio = document.getElementById('anio');
    const anioSeleccionada = anio.options[anio.selectedIndex].value;
    
    // leer el valor del radiobutton
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    
    // Crear intancia de interfaz
    const interfaz = new Interfaz();

    // Revisar que los campos no esten vacios

    if (marcaSeleccionada === '' || anioSeleccionada === '' || tipo === '') {
        interfaz.mostrarMensaje('Faltan datos, revisa el formulario y prueba nuevamente', 'error');
        
    }else{
        // Limpiar resultados anteriores
        const resultado = document.querySelector('#resultado div');
        if (resultado != null) {
            resultado.remove();
        }
        // Intanciar seguro y mostrar interface
        const seguro = new Seguro(marcaSeleccionada, anioSeleccionada, tipo);
        // Cotizar el seguro
        const cantidad = seguro.cotizarSeguro(seguro);
        // Mostrar el resultado
        interfaz.mostrarResultado(seguro, cantidad);
        interfaz.mostrarMensaje('Cotizando....', 'correcto');
    }
});

const max = new Date().getFullYear(),
      min = max - 20;

const selectAnios = document.getElementById('anio');
for (let index = max; index > min; index--) {
    let option = document.createElement('option');
    option.value = index;
    option.innerHTML = index;
    selectAnios.appendChild(option);
}
