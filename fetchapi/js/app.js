document.getElementById('txtBtn').addEventListener('click', cargarTxt);
document.getElementById('jsonBtn').addEventListener('click', cargarJson);
document.getElementById('apiBTN').addEventListener('click', cargarRest);

function cargarTxt() {
    fetch('datos.txt')
    .then((res)=>{
        return res.text();
    })
    .then((data)=>{
        document.getElementById('resultado').innerHTML = data;
    })
    .catch((error)=>{
    console.error(error);
    })
}

function cargarJson() {
    fetch('empleados.json')
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{

        let html = ''

        data.forEach(empleado => {
            html += `
                <li>Nombre: ${empleado.nombre}</li>
                <li>Puesto: ${empleado.puesto}</li>
            `;
        });

        document.getElementById('resultado').innerHTML = html;
    })
    .catch((error)=>{
    console.error(error);
    })
}

function cargarRest() {
    fetch('https://picsum.photos/list')
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{

        let html = ''

        data.forEach(photo => {
            html += `
                <li>Autor: ${photo.author}</li>
                <li>Id: ${photo.id}</li>
            `;
        });

        document.getElementById('resultado').innerHTML = html;
    })
    .catch((error)=>{
    console.error(error);
    })
}