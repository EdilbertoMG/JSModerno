const cargarPosts = document.querySelector('#cargar');

cargarPosts.addEventListener('click', cargarAPI);

function cargarAPI(){
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts', true)
    
    xhr.onload = function() {
        if (this.status === 200) {
            const respuesta = JSON.parse(this.responseText);
            
            let contenido = '';

            respuesta.forEach(post => {
                contenido += `
                    <h3>Titulo: ${post.title}</3>
                    <p>Cuerpo: ${post.body}</p>
                `
            });
            document.getElementById('listado').innerHTML = contenido;
        }
    }

    xhr.send()
}