
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


document.addEventListener('DOMContentLoaded',pageHandler);


async function pageHandler() {
    console.log("starting...")

    // Funcion para gestionar las URL /en/ y /es/ en navbar y menú lateal
    redirectURL();

    // Cambia el idioma de navbar y menus laterales con archivo JSON
    changeLanguage();

    // Botones ES y EN
    languageBottons();

    // Leer contenido de .csv 
    readCSVFile();
    
}

// Funcion para gestionar las URL /en/ y /es/ en navbar y menú lateal

async function redirectURL() {
    const enlaces = document.querySelectorAll("[data-link]"); 
    
    enlaces.forEach(function(enlace) {
        enlace.addEventListener('click', function() {
        
            const link = enlace.dataset.link;
            
            if (valorEnURL('/es/')) {
                window.location.href = `/es/${link}`
            }
            else if (valorEnURL('/en/')){
                window.location.href = `/en/${link}`
            }

        });
    })
};

// Cambia el idioma de navbar y menus laterales con archivo JSON
async function changeLanguage(){
    var language;
    var textsToChange = document.querySelectorAll("[data-section]")

    if (valorEnURL('/en/')) {          
        language = 'en'; 
    } else {              
        
        language = 'es'; 
    }
    

    const requestJson = await fetch(`/${language}/${language}.json`);
    const texts = await requestJson.json();
    
    for(const textToChange of textsToChange){
       
       const section = textToChange.dataset.section;
       const value = textToChange.dataset.value; 
       
       textToChange.innerHTML = texts[section][value];
    }
}




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





function languageBottons(){

    // Funcion boton Spanish de navbar  
    var spanish = document.querySelector('.navbar-item[data-language="es"]');


    spanish.addEventListener('click', function(event) {
        const nuevoValor = '/es/';
        const valorBuscado = '/en/';
        
        // Evitar el comportamiento predeterminado del enlace
        event.preventDefault();
        
        // Obtener la URL actual
        var url = window.location.href;
        //window.location.href = reemplazarSubstring(url,valorBuscado,nuevoValor);
        
        // Buscar el valor en la URL
        var index = url.indexOf(valorBuscado);
        
        
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
        const nuevoValor = '/en/';
        const valorBuscado = '/es/';        
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

    // Obtener pagina, seccion, idioma 

    /*
    Pages : index, voyager, deltav, events (codeac), inprogress, contact 
    */
    var page;
    var url = window.location.href;  

    if (url.indexOf("voyager") !== -1) {
        page = "voyager";
    }
    else if (url.indexOf("deltav")!== -1){
        page = "deltav";
    }
    else if (url.indexOf("inprogress")!== -1){
        page = "inprogress";
    }

    else if (url.split('/').length <= 5){
        page = "index";
    }

    console.log(url,page)
       

    var lang_index;
    if (valorEnURL('/en/')) {  
        lang_index = 2;
    } else {              
        lang_index = 1;
    }

    

    fetch(`/js/${page}_content.csv`)
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
                var textToChange =  rowColData[lang_index]; // 1: es , 2: en
                

                // Buscar en las etiquetas HTML (csvElements)

                for(element of csvElements){
                    if ( csvId === element.getAttribute("id") & element.getAttribute("csv") === "true"){
                        element.innerHTML = textToChange;
                    }                   
                }

            }
            
       })

        
}




