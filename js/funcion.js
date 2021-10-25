
//alert("Bienvenido al ahorcado");
//document.querySelector("blur");
var palabra = "";
let letra = document.getElementById("letra");
let aciertos = document.getElementById("aciertos");
let fallos = document.getElementById("fallos");
var guiones;

// Leer ficheros del directorio seleccioando

function SeleccionImagenes(evt) {

    var files = evt.target.files; // FileList object
    // Bucle que recorre las imagenes obtenidos de la carpeta seleccionada.
    var columnas = 0;
    for (var i = 0, f; f = files[i]; i++) {
        // Si f no es de type image , no continua y vuelve al inicio del bucle(continue)
        if (!f.type.match('image.*')) {
            continue;

        }
        var reader = new FileReader();
        // Function(Clousure) que obtiene la información de cada archivo. la funcion
        // se ejecuta al cargar (load) cada unop de los archivos seleccionadso
        reader.onload = (function (ElFichero) {
            return function (e) {
                //ElFichero.name contiene el nombre de los ficheros seleccionados
                // e.target.result contiene el Data de la imagen,que asigándo el mismo
                // a la prpiedad src de un elemento html img, sevisualiza en el mismo
                var cadena = escape(ElFichero.name);
                var ppunto = cadena.indexOf(".");
                var nimagen = cadena.substring(0, ppunto);

                // Creamos la IMAGEN
                console.log(i);

                imm = document.createElement("img");

                imm.src = e.target.result;

                imm.alt = ElFichero.name;

                //Podemos guardar el nombre de la imagen a adivinar en esta propiedad alt
                imm.title = nimagen;

                // Programamos en evento clic sobre la imagen para jugar con ella
                imm.setAttribute('onclick', "copiaPalabra(event);")

                document.getElementById('contenedorImagen').insertBefore(imm, null);

            }

        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);

    }

}
function copiaPalabra(event) {
    //el event coge el div de una imagen
    //target es la propia imagen
    //Devuelve una referencia al objetivo en la cual el evento fue originalmente enviado.
    console.log(event.target.title);
    palabra = event.target.title;
    creaGuiones();
}


document.getElementById('files').addEventListener('change', SeleccionImagenes, false);

letra.addEventListener("keyup", buscaCarater, true);

function creaGuiones() {
    //alert(palabra.value);

    guiones = palabra;
    guiones = guiones.replace(/./g, "-");
    alert(guiones);
    aciertos.value = guiones;


}

function buscaCarater() {
    //convierte los caracteres a mayusculas.
    var caracterbuscar = letra.value.toUpperCase();
    console.log(caracterbuscar);
    var posicion = palabra.toUpperCase().indexOf(caracterbuscar);
    console.log(posicion);
    var es_acierto = false;
    
    if (letra.value == "") {
        return
    }

    //si la posición es mayor a -1 la letra está en la palabra, si no se sale. 
    while (posicion > -1) {
        guiones = guiones.substring(0, posicion) + caracterbuscar + guiones.substring
            (posicion + 1, guiones.length);

        aciertos.value = guiones;

        posicion = palabra.toUpperCase().indexOf(caracterbuscar, posicion + 1);
        es_acierto = true;

    }
    if (!es_acierto) {
        fallos.value = fallos.value + caracterbuscar + " - ";
    }

    if (palabra.toUpperCase() == aciertos.value) {
        alert("Has adivinado la palabra");
    }
    //borra la letra nada mas escribirla
    document.getElementById('letra').value="";
}


