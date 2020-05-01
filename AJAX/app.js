document.getElementById('cargar').addEventListener('click', cargarDatos);

function cargarDatos() {
    // Crear el objeto XMLHttpRequest
    const xhr = new XMLHttpRequest();

    // Abrir una conexion
    xhr.open('GET', 'datos.txt', true);

    // una vez carga
    xhr.onload = function () {
        // 200 : Correcto | 403 : Prohibido | 404: No encontrado
        if (this.status === 200) {
            document.getElementById('listado').innerHTML = `<h1>${this.responseText}</h1>`;
        }
    }
    xhr.send();
}