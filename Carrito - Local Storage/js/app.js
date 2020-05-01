// variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCurso = document.querySelector('#lista-carrito tbody');
const varciaCrarritoBtn = document.getElementById('vaciar-carrito');
// listeners
cargarEventListeners();
function cargarEventListeners() {
    // dispara cuando se preciona agregar carrito
    cursos.addEventListener('click', comprarCurso);

    // cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    // al vaciar el carrito
    varciaCrarritoBtn.addEventListener('click',vaciarCarrito);

    // al cargar el documento cargar local storage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}
// funciones
// funcion que añade el curso al carrito
function comprarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        // enviamos el curso sleccionado para tomar sus datos
        leerDatosCursos(curso);
    }
}
// lee los datos del curso
function leerDatosCursos(curso) {
    const infoCurso = {
        image: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoCurso); 
}
// inserta curso al carrito
function insertarCarrito(curso) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${curso.image}" width="100">
        </td>
        <td>
            ${curso.titulo}
        </td>
        <td>
            ${curso.precio}
        </td>
        <td>
           <a href="#" class="borrar-curso" data-id="${curso.id}">x</a>
        </td>
    `;
    listaCurso.appendChild(row);
    guardarCursoLocalStorage(curso);
}
// elina el curso del carrito en el DOM
function eliminarCurso(e) {
    e.preventDefault();
    let curso,
        cursoId;
    if (e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
    }  
    eliminarCursoDeLocalStorage(cursoId);
}
// elimina los cursos del carrito en el DOM
function vaciarCarrito() {
    // forma lenta
    // listaCurso.innerHTML = '';
    // forma rapida
    while (listaCurso.firstChild) {
        listaCurso.removeChild(listaCurso.firstChild);
    }
    // vaciar local storage
    vaciarLocalStorage();
    return false;
}

// almacena cursos en el carrito a local storage
function guardarCursoLocalStorage(curso) {
    let cursos;  
    // toma el valor que este en LS
    cursos = obtenerCursosLocalStorage();
    // el curso seleccionado se agrega al LS
    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos));
}
// comprueba que halla elementos en local storage
function obtenerCursosLocalStorage() {
    let cursosLS;  
    // comprobamos si hay algo en local storage
    if (localStorage.getItem('cursos') === null) {
        cursosLS = [];
    }else{
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
}
// imprime los curos de local storage en el carrito
function leerLocalStorage() {
    let cursosLS;
    cursosLS = obtenerCursosLocalStorage();
    cursosLS.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.image}" width="100">
            </td>
            <td>
                ${curso.titulo}
            </td>
            <td>
                ${curso.precio}
            </td>
            <td>
               <a href="#" class="borrar-curso" data-id="${curso.id}">x</a>
            </td>
        `;
        listaCurso.appendChild(row);
    });
}
// eliminar curso por el ID en local storage
function eliminarCursoDeLocalStorage(cursoId) {
    let cursosLS;
    // obtenemos el arreglo de curso
    cursosLS = obtenerCursosLocalStorage();
    // iteramos comparando con el ID curso borrado
    cursosLS.forEach((cursoLS,index) => {
        if (cursoLS.id === cursoId) {
            cursosLS.splice(index, 1);
        }
    });
    // añadimos el arreglo actual a local storage
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}
// elimina todos los cursos de local storage
function vaciarLocalStorage() {
    localStorage.clear();
}