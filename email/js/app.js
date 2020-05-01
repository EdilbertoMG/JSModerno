// variables
const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');
const btnEnviar = document.getElementById('enviar');
const btnReset = document.getElementById('resetBtn');
const formularioEnviar = document.getElementById('enviar-mail');

// event listener
eventListeners();
function eventListeners(){
    // inicio de la aplicacion y deshabilitar submit
    document.addEventListener('DOMContentLoaded', inicioApp);

    // campos del formulario
    email.addEventListener('blur', validarCampo);
    asunto.addEventListener('blur', validarCampo);
    mensaje.addEventListener('blur', validarCampo);

    // Boton de enviar en el submit
    formularioEnviar.addEventListener('submit',enviarEmail);

    // reset formulario
    btnReset.addEventListener('click', resetearFormulario)
}

// funciones
function inicioApp() {
    // deshabilitar envio
    btnEnviar.disabled = true;
}
// valida que el campo tenga algo ecrito
function validarCampo() {
  // se valida la longitud del texto y que no este vacio  
  validarLongitud(this);
  // validar unicamente el email
  if (this.type === 'email') {
      validarEmail(this);
  }
  let errores = document.querySelectorAll('.error');
  if (email.value !== '' && asunto.value !== '' && mensaje.value !== '') {
    if (errores.length === 0) {
    btnEnviar.disabled = false;
    }  
  }
}
// cuando se envia el correo
function enviarEmail(e) {
    // spinner al presionar Enviar
    const spinnerGif = document.querySelector('#spinner');
    spinnerGif.style.display = 'block';

    // Gif que envia email
    const enviado = document.createElement('img');
    enviado.src = 'img/mail.gif';
    enviado.style.display = 'block';

    // ocultar spinner y mostrar enviado gif
    setTimeout(() => {
        spinnerGif.style.display = 'none';
        document.querySelector('#loaders').appendChild(enviado);
        setTimeout(() => {
            enviado.remove();
            formularioEnviar.reset();
        }, 5000);
    }, 3000);
    e.preventDefault();
}
// verifica la longitud del texto en los campos
function validarLongitud(campo) {
    if(campo.value.length > 0 ) {
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
   } else {
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
   }
}
// valida que el email tenga por lo menos un @
function validarEmail(campo) {
    const mensaje = campo.value;
    if (mensaje.indexOf('@') !== -1) {
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    }else{
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}
// resetea formulario
function resetearFormulario(e) {
    formularioEnviar.reset();
    e.preventDefault();
}