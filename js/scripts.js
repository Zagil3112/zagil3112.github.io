
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
       
       textToChange.innerHTML = texts[section][value];
    }
}

// Funcion para gestionar los enlaces


document.addEventListener('DOMContentLoaded', async function() {
    const enlaces = document.querySelectorAll("[data-link]"); 
    
    enlaces.forEach(function(enlace) {
        enlace.addEventListener('click', function(event) {
        
            const link = enlace.dataset.link;
            
            if (valorEnURL('/es/')) {
                window.location.href = `/es/${link}`
            }
            else if (valorEnURL('/en/')){
                window.location.href = `/en/${link}`
            }

        });
    })
});


// Funcion para cambiar navbar,layouts y menus laterales

document.addEventListener('DOMContentLoaded', async function() {
    textsToChange = document.querySelectorAll("[data-section]")

    if (valorEnURL('en')) {      
        // Cambiar navbar a inglés
        
        changeLanguage('en')

    } else {
        // Cambiar navbar a español
        
        changeLanguage('es')

    }

    languageBottons();
    readCSVFile();
      
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
        //window.location.href = reemplazarSubstring(url,valorBuscado,nuevoValor);
        
        // Buscar el valor en la URL
        var index = url.indexOf(valorBuscado);
        console.log(url,index,url[index-1])
        
        // Verificar si se encontró el valor
        if (index !== -1 ) {
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
        //window.location.href = reemplazarSubstring(url,valorBuscado,nuevoValor);
        
        // Buscar el valor en la URL
        var index = url.indexOf(valorBuscado);
        console.log(url,index,url[index-1])
        // Verificar si se encontró el valor
        if (index !== -1) {
            // Reemplazar el valor encontrado por el nuevo valor
            var nuevaURL = url.substring(0, index) + nuevoValor + url.substring(index + valorBuscado.length);    
            // Redirigir a la nueva URL
            window.location.href = nuevaURL;  
            }
        });
}  

function readCSVFile(){
    fetch('/js/voyager_content.csv')
        .then(response => response.text())
        .then(csvdata => {
                     

            // Split by line break to gets rows Array
            var rowData = csvdata.split('\n');
            
            //Buscar elementos
            var csvElements = document.querySelectorAll('[csv]');
            

            // Recorrer tabla de CSV 

            for (var row = 1; row < rowData.length; row++) {

                // Split by comma (,) to get column Array
                let rowColData = rowData[row].split(';');
                const csvId = rowColData[0];
                //pendiente : hacer funcion que detecte el idioma y seleccione el índice
                var textToChange =  rowColData[1]; // 1: es , 2: en
                console.log(csvId);

                // Buscar en las etiquetas HTML (csvElements)

                for(element of csvElements){
                    if ( csvId === element.getAttribute("id") & element.getAttribute("csv") === "true"){
                        element.innerHTML = textToChange;
                    }                   
                }

            }
            
       })

        
}




