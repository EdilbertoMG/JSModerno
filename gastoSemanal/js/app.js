// Variables
const presupuestoUsuario = prompt('Cual es tu presupuesto Semanal?');
const formulario = document.getElementById('agregar-gasto');
let cantidadpresupuesto;
// Clases
// Clase de Presupuesto
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }
    // Método para ir restando del presupuesto actual
    presupuestoRestante(cantidad = 0){
        return this.restante -= Number(cantidad);
    }
}
// Clase de Interfaz maneja todo lo relacionadado con el html 
class Interfaz{
    insertarPresupuesto(cantidad){
        const presupuestoSpam = document.querySelector('span#total');
        const restanteSpam = document.querySelector('span#restante');

        // Insertar al HTML
        presupuestoSpam.innerHTML = `${cantidad}`;
        restanteSpam.innerHTML = `${cantidad}`;
    }
    imprimirMensaje(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }
        divMensaje.appendChild(document.createTextNode(mensaje));
        // Insertar en el DOM
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        // Quitar Alert despues de 3 segundos
        setTimeout(()=>{
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        }, 3000);
    }
    // Inserta los gastos a la lista
    agregaeGastoListado(nombre, cantidad){
        const gastosListado = document.querySelector('#gastos ul');
        // Crear li
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between aling-items-center';
        // Insertar gasto
        li.innerHTML = `
            ${nombre}
            <span class="badge badge-primary badge-pill">$${cantidad}</span>
        `;

        // Insertar al HTML
        gastosListado.appendChild(li);
    }
    // Comprueba el presupuesto restante
    presupuestoRestante(cantidad){
        const restante = document.querySelector('span#restante')
        // Leemos el presupuesto restante
        const presupuestoRestante = cantidadpresupuesto.presupuestoRestante(cantidad);

        restante.innerHTML = `${presupuestoRestante}`;

        this.comprobarPresupuesto();
    }
    comprobarPresupuesto(){
        const presupuestoTotal = cantidadpresupuesto.presupuesto;
        const presupuestoRestante = cantidadpresupuesto.restante;

        // Comprobar el 25%
        if ((presupuestoTotal / 4) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger');
        }else if ((presupuestoTotal / 2) > presupuestoRestante){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }
    }
}
// Evente Listeners
document.addEventListener('DOMContentLoaded', ()=>{
    if (presupuestoUsuario === null || presupuestoUsuario === '') {
        window.location.reload();
    }else{
        // Instancear presupuesto
        cantidadpresupuesto = new Presupuesto(presupuestoUsuario);
        // Instancear la clases de interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadpresupuesto.presupuesto);
    }
});

formulario.addEventListener('submit', (e)=>{
    e.preventDefault();

    // Leer del formulario de gasto
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;

    // Instanciar la interfez
    const ui = new Interfaz();

    // Comprobar que los campos esten vacios
    if (nombreGasto === '' || cantidadGasto === '') {
        // 2 parametros: mensaje y tipo
        ui.imprimirMensaje('Hubo un error', 'error');
    }else{
        ui.imprimirMensaje('Correcto', 'Correcto');
        ui.agregaeGastoListado(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }
});