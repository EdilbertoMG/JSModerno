document.querySelector('#generar-nombre').addEventListener('submit', cargarNombre);

// Llamar a Ajax e imprimir resultados
function cargarNombre(e) {
    e.preventDefault();

    // Leer las variables

    const origen = document.getElementById('origen');
    const origenSeleccionado = origen.options[origen.selectedIndex].value;

    const genero = document.getElementById('genero');
    const generoSeleccionado = genero.options[genero.selectedIndex].value;

    const  cantidad = document.getElementById('numero').value;

    let url = '';
    url += 'https://uinames.com/api/?'; 
    // Si hay origen agregarlo a la URL
    if (origenSeleccionado !== '') {
        url += `region=${origenSeleccionado}&`;
    }
    
    // Si hay genero agregarlo a la URL
    if (generoSeleccionado !== '') {
        url += `gender=${generoSeleccionado}&`;
    }

    // Si hay una cantidad agregarlo a la URL
    if (cantidad !== '') {
        url += `amount=${cantidad}`;
    }

    // Conectar con FechApi

    fetch(url)
    .then((res)=>{
        return res.json();
    })
    .then((nombres)=>{
        // Generar el html
        let htmlNombres = '<h2>Nombres Generados</h2>';

        htmlNombres += '<ul class="lista">';
            // Imprimir cada nombre
            nombres.forEach(nombre => {
                htmlNombres += `
                    <li>${nombre.name}</li>
                `;
            });
        htmlNombres += '</ul>';

        document.getElementById('resultado').innerHTML = htmlNombres;
    })
    .catch((error)=>{
        console.error(error);
    })
}