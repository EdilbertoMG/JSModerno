// variables
const listaTweets = document.querySelector('#lista-tweets');

// event listeners
eventListeners();
function eventListeners(){
    // cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit',agregarTweet);

    // borrar tweets
    listaTweets.addEventListener('click', borrarTweet);

    // contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}
// funtions
// agregar tweet del formulario
function agregarTweet(e) {
    e.preventDefault();
    // leer el valor del textarea
    const tweet = document.getElementById('tweet').value;
    //crear boton eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';
    // crear elemento y añadirle valor a la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    // añade el boton de borrar al tweet
    li.appendChild(botonBorrar);
    // añade tweet a lista 
    listaTweets.appendChild(li);

    // añadir a local storage
    agregarTweetLocalStorage(tweet);
}
 // elimina del DOM
function borrarTweet(e) {
    // quitamos acciones por defecto
    e.preventDefault();
    // if para hacer delegacion y solo realizar la accion cuando del click en el lugar correcto
    if (e.target.className === 'borrar-tweet') {
        // borra el tweet ya que el parentElement nos regresa el li cliqueado si se necesita ir mas arriba deberas hacer otro .parentElement
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
}
// agrega tweet a local storage
function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    // añadir un nuevo tweet
    tweets.push(tweet);
    // convertir de string a arreglo para local storage
    localStorage.setItem('tweets', JSON.stringify(tweets));
}
// Mostrar datos de local Storage en la lista
function localStorageListo() {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(tweet => {
    //crear boton eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';
    // crear elemento y añadirle valor a la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    // añade el boton de borrar al tweet
    li.appendChild(botonBorrar);
    // añade tweet a lista 
    listaTweets.appendChild(li);
    });
}
// comprobar que haya elementos el local storage
function obtenerTweetsLocalStorage() {
    let tweets;
    // revisamos los valores de local storage
    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    }else{
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}
// eliminar Tweet de Local Storage
function borrarTweetLocalStorage(tweet) {
    let tweets, tweetBorrar;
    // elimina la x del tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1);
    
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach((tweet, index) => {
        if (tweetBorrar === tweet) {
            tweets.splice(index,1);
        }
    })
    localStorage.setItem('tweets', JSON.stringify(tweets));
}