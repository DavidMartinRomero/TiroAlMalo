// Declaro el canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1472;
canvas.height = 704;

// Pillo las imagenes
const $fondo1 = document.getElementById('fondo1');
const $fondo2 = document.getElementById('fondo2');
const $fondo3 = document.getElementById('fondo3');
const $sprites = document.getElementById('sprites');

// Pillo el menu y sus botones
const $menu = document.getElementById('menu');
const $Dificultad1 = document.getElementById('difButton1');
const $Dificultad2 = document.getElementById('difButton2');
const $Dificultad3 = document.getElementById('difButton3');
const botonesDificultad = [$Dificultad1, $Dificultad2, $Dificultad3];
const botonesMiras = document.querySelectorAll('.miraButton');
const $instrucciones = document.getElementById('otros1');
const $creditos = document.getElementById('otros2');
const $play = document.getElementById('play');
const $instruccionesVentana = document.getElementById('instrucciones')
const $toOpciones = document.getElementById('returnInstrucciones');

// Recortes Sprites
const mira = {
    1: 40,
    2: 280,
    3: 520,
    4: 760,
    5: 1000,
    6: 1240,
    7: 1480,
    8: 1720,
    9: 1960,
    tamaño: 60,
}

const vida = {
    0: 300,
    1: 520,
    2: 740,
    3: 960,
    4: 1180,
    5: 1400,
}

const personajes = {
    1: { X: 1050, Y: 300, type: 1 },
    2: { X: 1300, Y: 300, type: 1 },
    3: { X: 1550, Y: 300, type: 1 },
    4: { X: 1050, Y: 800, type: 2 },
    5: { X: 1300, Y: 800, type: 2 },
    6: { X: 1550, Y: 800, type: 2 },
    7: { X: 1800, Y: 300, type: 3 },
    tamaño1: { X: 125, Y: 260 },
    tamaño2: { X: 250, Y: 520 },
}

const numeros = {
    1: { X: 40, Y: 1700 },
    2: { X: 240, Y: 1700 },
    3: { X: 440, Y: 1700 },
    tamañoRecorte: { X: 200, Y: 300 }
}

const gameOver = {
    inicio: { X: 40, Y: 2100},
    tamañoRecorte: { X: 2100, Y: 546},
    tamPantalla: { X: 2100, Y: 546}
}

// Posiciones salida
const posicionesSalida = {
    1: { X: 125, Y: 370, sizeX: 125, sizeY: 260 }, // 370 abajo, 250 arriba => 120 pixeles.
    2: { X: 260, Y: 372, sizeX: 125, sizeY: 260 }, // 372 abajo, 252 arriba
    3: { X: 417, Y: 369, sizeX: 125, sizeY: 260 }, // 369 abajo, 249 arriba
    4: { X: 555, Y: 365, sizeX: 125, sizeY: 260 }, // 365 abajo, 245 arriba
    5: { X: 685, Y: 365, sizeX: 125, sizeY: 260 }, // 365 abajo, 245 arriba
    6: { X: 812, Y: 365, sizeX: 125, sizeY: 260 }, // 365 abajo, 245 arriba
    7: { X: 953, Y: 361, sizeX: 125, sizeY: 260 }, // 361 abajo, 241 arriba
    8: { X: 1093, Y: 363, sizeX: 115, sizeY: 250 }, // 363 abajo, 243 arriba
    9: { X: 55, Y: 415, sizeX: 150, sizeY: 310 }, // 415 abajo, 270 arriba
    10: { X: 260, Y: 415, sizeX: 150, sizeY: 310 }, // 415 abajo, 270 arriba
    11: { X: 460, Y: 410, sizeX: 150, sizeY: 310 }, // 410 abajo, 265 arriba
    12: { X: 660, Y: 410, sizeX: 150, sizeY: 310 }, // 410 abajo, 265 arriba
    13: { X: 880, Y: 407, sizeX: 150, sizeY: 310 }, // 407 abajo, 262 arriba
    14: { X: 1060, Y: 407, sizeX: 150, sizeY: 310 }, // 407 abajo, 262 arriba
    15: { X: 1250, Y: 405, sizeX: 150, sizeY: 310 }, // 405 abajo, 260 arriba

}

// Valores iniciales
let miraSelect = 1
let vidaActual = 5
let dificultad = 1
let personaje = 3;
let num = 3
let mouseX
let mouseY
let disparoX
let disparoY
let jugando = false;
let secuencia = 0;
let yAnimacion = 0;
let estadoPersonaje = 0; // 0: escondido, 1: subiendo, 2: esperando, 3: bajando
let timerEspera = 0;

//
// Eventos
//
//$menu.addEventListener('click', )
botonesDificultad.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        botonesDificultad.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        dificultad = index + 1;
    });
});

botonesMiras.forEach((btn) => {
    btn.addEventListener('click', () => {
        botonesMiras.forEach(button => button.classList.remove('active'));
        btn.classList.add('active');
        miraSelect = btn.innerText
    });
});

$instrucciones.addEventListener('click', () => {
    $menu.style.display = 'none'
    $instruccionesVentana.style.display = 'flex'
});

$toOpciones.addEventListener('click', () => {
    $menu.style.display = 'flex'
    $instruccionesVentana.style.display = 'none'
});

// $creditos.addEventListener('click', )
$play.addEventListener('click', toPlay)

// Capturamos el movimiento del ratón sobre el canvas
canvas.addEventListener('mousemove', (e) => {
    mouseX = e.offsetX
    mouseY = e.offsetY;
});

// Capturamos el disparo
canvas.addEventListener('click', disparar)

//
// Funciones
//
function toPlay() {
    $menu.style.display = 'none'
    jugando = true;
    secuencia = 1;
    
    timerSecuencia = setInterval(() => {
        num--;
        if (num <= 0) {
            clearInterval(timerSecuencia);
            secuencia = 2;
            ongame();
        }
    }, 500);
}

function ongame() {
    personaje = Math.floor(Math.random() * 6 + 1)
    posicion = Math.floor(Math.random() * 15 + 1)
    yAnimacion = posicionesSalida[posicion].Y;
    estadoPersonaje = 1; // Empezar a subir
    timerEspera = 0;
}

function pain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (vidaActual > 1) {
        vidaActual--
    } else {
        
        muertoMatao()
    }
}

function disparar(e) {
    disparoX = e.offsetX
    disparoY = e.offsetY;
    if ((disparoX > posicionesSalida[posicion].X && disparoX < (posicionesSalida[posicion].X + posicionesSalida[posicion].sizeX))
        && (disparoY < posicionesSalida[posicion].Y && disparoY > (posicionesSalida[posicion].Y - 120))) {
        if (personajes[personaje].type == 1) {
            pain()
            personaje = 7
        } else {
            personaje = 7
        }
    }
}

function muertoMatao() {
    secuencia = 3
    jugando = false

    setTimeout(() => {
        secuencia = 0,
        vidaActual = 5,
        $menu.style.display = 'flex'
        timerEspera = 0
        estadoPersonaje = 0
        num = 3
     } , 3000);
}

function dibujarPersonajeActual() {
    const yAbajo = posicionesSalida[posicion].Y;

    // Lógica de movimiento
    if (estadoPersonaje == 1) { // Sube
        yAnimacion -= 4; // Velocidad de subida
        if (yAnimacion <= yAbajo - 120) estadoPersonaje = 2;
    }
    else if (estadoPersonaje == 2) { // Arriba y logica daño del malo
        timerEspera++;
        if (timerEspera > (100 / (dificultad * 3))) {
            estadoPersonaje = 3;
            if (personajes[personaje].type == 2)
                pain()
        }
    }
    else if (estadoPersonaje == 3) { // Baja
        yAnimacion += 4;
        if (yAnimacion >= yAbajo) {
            estadoPersonaje = 0;
            setTimeout(ongame, 3000 / (dificultad * 3));
        }
    }

    // Dibuja personaje moviendose
    if (estadoPersonaje != 0) {
        ctx.drawImage(
            $sprites,
            personajes[personaje].X, personajes[personaje].Y,
            250, 520,
            posicionesSalida[posicion].X, yAnimacion,
            posicionesSalida[posicion].sizeX, posicionesSalida[posicion].sizeY
        );
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage($fondo3, 0, 0, canvas.width, canvas.height);

    if (jugando) {
        // Dibujo la barra de vida
        ctx.drawImage(
            $sprites,     // La imagen original
            40, vida[vidaActual],       // Inicio del recorte  X, Y
            900, 205,     // Tamaño del recorte X,Y
            30, 10, // Posición en canvas X, Y
            350, 80 // Ancho final en el canvas, // Alto final en el canvas

        );

        if (secuencia == 1) {
            ctx.drawImage(
                $sprites,
                numeros[num].X, numeros[num].Y,
                numeros.tamañoRecorte.X, numeros.tamañoRecorte.Y,
                canvas.width / 2 - numeros.tamañoRecorte.X / 2,
                canvas.height / 2 - numeros.tamañoRecorte.Y / 2,
                numeros.tamañoRecorte.X,
                numeros.tamañoRecorte.Y
            );
        }

        if (secuencia == 2) {
            if (posicion <= 8)
                dibujarPersonajeActual();

            ctx.drawImage($fondo2, 0, 0, canvas.width, canvas.height);

            if (posicion > 8)
                dibujarPersonajeActual();

            ctx.drawImage($fondo1, 0, 0, canvas.width, canvas.height);
        }

        

    }

    if (secuencia == 3) {
             ctx.drawImage(
                $sprites,
                gameOver.inicio.X, gameOver.inicio.Y,
                gameOver.tamañoRecorte.X, gameOver.tamañoRecorte.Y,
                canvas.width - gameOver.tamañoRecorte.X / 1.7,
                canvas.height / 2 - gameOver.tamañoRecorte.Y / 2,
                gameOver.tamPantalla.X,
                gameOver.tamPantalla.Y
            );
        }

    // Dibujo la mira
    ctx.drawImage(
        $sprites,
        mira[miraSelect], 40,
        200, 200,
        mouseX - (mira.tamaño / 2), mouseY - (mira.tamaño / 2),
        mira.tamaño, mira.tamaño
    );
}
setInterval(draw, 20);