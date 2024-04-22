
$(document).ready(function () {
    
    // ----- NAVBAR -----
    $(".navbar-burger").click(function () {
        $(this).toggleClass("is-active");
        // $(".navbar-item").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    });

    $(".navbar-item").click(function () {
        $(this).addClass("is-active");
    });


    // ----- MENUS -----
    $(".menu-list a").click(function () {
        $(".menu-list a").removeClass("is-active");
        $(this).addClass("is-active");
    });
    
    
    // ----- SLIDESHOW -----
    $("#slideshow > div:gt(0)").hide();

    setInterval(function () {
        $("#slideshow > div:first")
            .fadeOut(1000)
            .next()
            .fadeIn(1000)
            .end()
            .appendTo("#slideshow");
    }, 3000);
});

// Funciones cambio de lenguaje 

// Detectar click en cambio de idioma




// Función para verificar si un valor está presente en la URL
function valorEnURL(valor) {
    // Obtener la URL actual
    var url = window.location.href;
    // Verificar si el valor está presente en la URL
    if (url.indexOf(valor) !== -1) {
      return true;
    } else {
      return false;
    }
  }
  
// Función cambio de lenguaje 

let textsToChange = '';

const changeLanguage = async language => {
    const requestJson = await fetch(`/${language}/${language}.json`);
    const texts = await requestJson.json();
    //console.log(texts)
    //console.log(textsToChange)
    for(const textToChange of textsToChange){
       
       const section = textToChange.dataset.section;
       const value = textToChange.dataset.value; 
       console.log(section,value)
       textToChange.innerHTML = texts[section][value];
    }
}



// Funcion para cambiar navbar,layouts y menus laterales

document.addEventListener('DOMContentLoaded', async function() {
textsToChange = document.querySelectorAll("[data-section]")

if (valorEnURL('en')) {      
    // Cambiar navbar a inglés
    console.log("English Page")
    changeLanguage('en')

} else {
    // Cambiar navbar a español
    console.log("Spanish Page")
    changeLanguage('es')

}

languageBottons();
});


function languageBottons(){

    // Funcion boton Spanish de navbar
  
    var spanish = document.querySelector('.navbar-item[data-language="es"]');


    spanish.addEventListener('click', function(event) {
        const nuevoValor = 'es';
        const valorBuscado = 'en';
        // Evitar el comportamiento predeterminado del enlace
        event.preventDefault();
        
        // Obtener la URL actual
        var url = window.location.href;
        // Buscar el valor en la URL
        var index = url.indexOf(valorBuscado);
        
        // Verificar si se encontró el valor
        if (index !== -1) {
            // Reemplazar el valor encontrado por el nuevo valor
            var nuevaURL = url.substring(0, index) + nuevoValor + url.substring(index + valorBuscado.length);    
            // Redirigir a la nueva URL
            window.location.href = nuevaURL;  
            }
    });

    var english = document.querySelector('.navbar-item[data-language="en"]');

    english.addEventListener('click', function(event) {
        const nuevoValor = 'en';
        const valorBuscado = 'es';
        // Evitar el comportamiento predeterminado del enlace
        event.preventDefault();
        
        // Obtener la URL actual
        var url = window.location.href;
        // Buscar el valor en la URL
        var index = url.indexOf(valorBuscado);
        
        // Verificar si se encontró el valor
        if (index !== -1) {
            // Reemplazar el valor encontrado por el nuevo valor
            var nuevaURL = url.substring(0, index) + nuevoValor + url.substring(index + valorBuscado.length);    
            // Redirigir a la nueva URL
            window.location.href = nuevaURL;  
            }
        });
}  




