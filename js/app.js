let idiomaActual = null;

let piezaActual = null;


// ==========================================
// OBTENER ID DE LA URL
// ==========================================

function obtenerIdPieza() {

    const parametros =
        new URLSearchParams(
            window.location.search
        );

    return parametros.get("id");

}



// ==========================================
// BOTÓN COMENZAR
// ==========================================

function iniciarExperiencia() {

    window.location.href = "bien.html";

}



// ==========================================
// CARGAR PIEZA
// ==========================================

function cargarPieza() {

    const id = obtenerIdPieza();


    console.log("ID recibido:", id);


    // Si estamos en index.html
    // no hacemos nada

    if (!id) {

        return;

    }


    // Verificar que la pieza exista

    if (!piezas[id]) {

        console.error(
            "No existe la pieza:",
            id
        );


        const error =
            document.getElementById(
                "error"
            );


        if (error) {

            error.classList.remove(
                "oculto"
            );

        }


        return;

    }


    // Guardar pieza

    piezaActual =
        piezas[id];


    console.log(
        "Pieza cargada:",
        piezaActual
    );


    // --------------------------------------
    // RECUPERAR IDIOMA
    // --------------------------------------

    const idiomaGuardado =
        localStorage.getItem(
            "idiomaMuseo"
        );


    if (
        idiomaGuardado === "es" ||
        idiomaGuardado === "en"
    ) {

        idiomaActual =
            idiomaGuardado;


        mostrarContenido();

    }

}



// ==========================================
// SELECCIONAR IDIOMA
// ==========================================

function seleccionarIdioma(
    idioma
) {

    idiomaActual =
        idioma;


    // Guardar idioma

    localStorage.setItem(
        "idiomaMuseo",
        idioma
    );


    mostrarContenido();

}



// ==========================================
// MOSTRAR CONTENIDO
// ==========================================

function mostrarContenido() {

    if (!piezaActual) {

        return;

    }


    if (!idiomaActual) {

        return;

    }


    // --------------------------------------
    // OCULTAR SELECCIÓN
    // --------------------------------------

    const seleccionIdioma =
        document.getElementById(
            "seleccionIdioma"
        );


    if (seleccionIdioma) {

        seleccionIdioma.classList.add(
            "oculto"
        );

    }



    // --------------------------------------
    // MOSTRAR PIEZA
    // --------------------------------------

    const contenido =
        document.getElementById(
            "contenidoPieza"
        );


    if (contenido) {

        contenido.classList.remove(
            "oculto"
        );

    }



    // --------------------------------------
    // IMAGEN
    // --------------------------------------

    const imagen =
        document.getElementById(
            "imagenPieza"
        );


    if (imagen) {

        imagen.src =
            piezaActual.imagen;


        imagen.alt =
            piezaActual.titulo[
                idiomaActual
            ];

    }



    // --------------------------------------
    // TÍTULO
    // --------------------------------------

    const titulo =
        document.getElementById(
            "tituloPieza"
        );


    if (titulo) {

        titulo.textContent =
            piezaActual.titulo[
                idiomaActual
            ];

    }



    // --------------------------------------
    // DATOS
    // --------------------------------------

    const datos =
        document.getElementById(
            "datosPieza"
        );


    if (datos) {

        datos.textContent =
            piezaActual.datos[
                idiomaActual
            ];

    }



    // --------------------------------------
    // DESCRIPCIÓN
    // --------------------------------------

    const descripcion =
        document.getElementById(
            "descripcionPieza"
        );


    if (descripcion) {

        descripcion.textContent =
            piezaActual.descripcion[
                idiomaActual
            ];

    }



    // --------------------------------------
    // IDIOMA DE LA PÁGINA
    // --------------------------------------

    document.documentElement.lang =
        idiomaActual;



    // --------------------------------------
    // BOTÓN DE AUDIO
    // --------------------------------------

    const botonAudio =
        document.getElementById(
            "btnEscuchar"
        );


    if (botonAudio) {

        botonAudio.textContent =
            idiomaActual === "es"
                ? "🔊 Escuchar descripción"
                : "🔊 Listen to description";

    }

}



// ==========================================
// TEXT TO SPEECH
// ==========================================

function escucharDescripcion() {

    const elemento =
        document.getElementById(
            "descripcionPieza"
        );


    if (!elemento) {

        return;

    }


    const texto =
        elemento.textContent.trim();


    if (!texto) {

        return;

    }


    // Comprobar soporte

    if (
        !("speechSynthesis" in window)
    ) {

        alert(
            idiomaActual === "es"
                ? "Tu navegador no permite la lectura de texto."
                : "Your browser does not support text-to-speech."
        );

        return;

    }


    // Detener lectura anterior

    window.speechSynthesis.cancel();



    // Crear lectura

    const lectura =
        new SpeechSynthesisUtterance(
            texto
        );


    // Idioma de la voz

    if (
        idiomaActual === "es"
    ) {

        lectura.lang =
            "es-PE";

    } else {

        lectura.lang =
            "en-US";

    }


    // Velocidad

    lectura.rate =
        0.9;


    // Tono

    lectura.pitch =
        1;


    // Volumen

    lectura.volume =
        1;


    // Reproducir

    window.speechSynthesis.speak(
        lectura
    );

}



// ==========================================
// DETENER LECTURA
// ==========================================

function detenerLectura() {

    if (
        "speechSynthesis" in window
    ) {

        window.speechSynthesis.cancel();

    }

}



// ==========================================
// CAMBIAR IDIOMA
// ==========================================

function cambiarIdioma() {

    detenerLectura();


    const contenido =
        document.getElementById(
            "contenidoPieza"
        );


    const seleccion =
        document.getElementById(
            "seleccionIdioma"
        );


    if (contenido) {

        contenido.classList.add(
            "oculto"
        );

    }


    if (seleccion) {

        seleccion.classList.remove(
            "oculto"
        );

    }

}



// ==========================================
// INICIAR APLICACIÓN
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "Aplicación del museo iniciada"
        );


        cargarPieza();

    }
);