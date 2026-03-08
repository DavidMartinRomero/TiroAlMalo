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
const $creditosVentana = document.getElementById('creditos')
const $play = document.getElementById('play');
const $instruccionesVentana = document.getElementById('instrucciones')
const $toOpciones = document.getElementById('returnInstrucciones');
const $toOpciones2 = document.getElementById('returnInstrucciones2');

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
}

const humo = {
    1: { X: 4, Y: 2750 },
    2: { X: 300, Y: 2750 },
    3: { X: 600, Y: 2750 },
    4: { X: 900, Y: 2750 },
    5: { X: 1200, Y: 2750 },
    6: { X: 1500, Y: 2750 },
    7: { X: 1800, Y: 2750 },
    tamañoRecorte: { X: 300, Y: 350 },
    tamañoPantalla: { X: 150, Y: 175 }
}

const numeros = {
    1: { X: 40, Y: 1700 },
    2: { X: 240, Y: 1700 },
    3: { X: 440, Y: 1700 },
    tamañoRecorte: { X: 200, Y: 300 }
}

const gameOver = {
    inicio: { X: 40, Y: 2100 },
    tamañoRecorte: { X: 2100, Y: 546 },
    tamPantalla: { X: 2100, Y: 546 }
}

const score = {
    inicio: { X: 1000, Y: 1300 },
    tamañoRecorte: { X: 1032, Y: 366 },
    tamPantalla: { X: 300, Y: 120 }
}

const corazon = {
    PosicionRecorte: { X: 2200, Y: 40 },
    RecorteSize: { X: 200, Y: 200 },
    Salidas: {
        1: { X: 170, Y: 380 },
        2: { X: 310, Y: 380 },
        3: { X: 465, Y: 378 },
        4: { X: 602, Y: 377 },
        5: { X: 735, Y: 375 },
        6: { X: 860, Y: 375 },
        7: { X: 1000, Y: 373 },
        8: { X: 1135, Y: 373 },
        9: { X: 110, Y: 450 },
        10: { X: 325, Y: 445 },
        11: { X: 520, Y: 445 },
        12: { X: 720, Y: 445 },
        13: { X: 940, Y: 440 },
        14: { X: 1125, Y: 440 },
        15: { X: 1310, Y: 440 }
    },
    Tamaño: { X: 35, Y: 35 }
}

// Posiciones salida
const posicionesSalida = {
    1: { X: 140, Y: 370, sizeX: 100, sizeY: 210 }, // 370 abajo, 250 arriba => 120 pixeles.
    2: { X: 280, Y: 372, sizeX: 100, sizeY: 210 }, // 372 abajo, 252 arriba
    3: { X: 430, Y: 369, sizeX: 100, sizeY: 210 }, // 369 abajo, 249 arriba
    4: { X: 570, Y: 365, sizeX: 100, sizeY: 210 }, // 365 abajo, 245 arriba
    5: { X: 700, Y: 365, sizeX: 100, sizeY: 210 }, // 365 abajo, 245 arriba
    6: { X: 825, Y: 365, sizeX: 100, sizeY: 210 }, // 365 abajo, 245 arriba
    7: { X: 967, Y: 361, sizeX: 100, sizeY: 210 }, // 361 abajo, 241 arriba
    8: { X: 1100, Y: 363, sizeX: 100, sizeY: 210 }, // 363 abajo, 243 arriba
    9: { X: 55, Y: 415, sizeX: 150, sizeY: 310 }, // 415 abajo, 270 arriba
    10: { X: 265, Y: 415, sizeX: 150, sizeY: 310 }, // 415 abajo, 270 arriba
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
let movimientoHumo = 0
let mouseX
let mouseY
let disparoX
let disparoY
let jugando = false;
let secuencia = 4;
let yAnimacion = 0;
let estadoPersonaje = 0; // 0: escondido, 1: subiendo, 2: esperando, 3: bajando
let timerEspera = 0;
let puntuacion = 0
let aniquilar = false
let corazonEstado = false
let posicionCorazon
let probabilidadCorazon = 10 / dificultad

//
// Eventos
//
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

$creditos.addEventListener('click', () => {
    $menu.style.display = 'none'
    $creditosVentana.style.display = 'flex'
});

$toOpciones.addEventListener('click', () => {
    $menu.style.display = 'flex'
    $instruccionesVentana.style.display = 'none'
});

$toOpciones2.addEventListener('click', () => {
    $menu.style.display = 'flex'
    $creditosVentana.style.display = 'none'
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
    puntuacion = 0

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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    disparoX = e.offsetX
    disparoY = e.offsetY;
    if ((disparoX > posicionesSalida[posicion].X && disparoX < (posicionesSalida[posicion].X + posicionesSalida[posicion].sizeX))
        && (disparoY < posicionesSalida[posicion].Y && disparoY > (posicionesSalida[posicion].Y - 120))) {
        if (personajes[personaje].type == 1) {
            pain()
            personaje = 7
        } else {
            puntuacion += 10
            personaje = 7
        }
        if (!aniquilar) {
            secuenciaHumo = setInterval(() => {
                aniquilar = true
                movimientoHumo++;
                if (movimientoHumo >= 7) {
                    clearInterval(secuenciaHumo);
                    aniquilar = false
                    movimientoHumo = 0
                }
            }, 60);
        }
    }

    if ((disparoX > corazon.Salidas[posicionCorazon].X && disparoX < (corazon.Salidas[posicionCorazon].X + corazon.Tamaño.X))
        && (disparoY > corazon.Salidas[posicionCorazon].Y && disparoY < (corazon.Salidas[posicionCorazon].Y + corazon.Tamaño.Y))
        && corazonEstado) {
        if (vidaActual < 5) {
            vidaActual++
            corazonEstado = false
        }
    }
}

function extraLife() {
    if (secuencia != 2 || vidaActual == 5)
        return

    aleatorio100 = Math.floor(Math.random() * 100 + 1)

    if (aleatorio100 < probabilidadCorazon && corazonEstado == false) {
        posicionCorazon = Math.floor(Math.random() * 15 + 1)
        corazonEstado = true;
        setTimeout(() => {
            corazonEstado = false
        }, 3000);
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
    }, 3000);
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
            if (personajes[personaje].type == 2) {
                pain()
            } else if (personajes[personaje].type == 1) {
                puntuacion += 5
            }
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

function pintaHumo() {
    if (posicion < 8) {
        ctx.drawImage(
            $sprites,
            humo[movimientoHumo].X, humo[movimientoHumo].Y,
            humo.tamañoRecorte.X, humo.tamañoRecorte.Y,
            posicionesSalida[posicion].X - 38, posicionesSalida[posicion].Y - 150,
            humo.tamañoPantalla.X, humo.tamañoPantalla.Y
        );
    } else {
        ctx.drawImage(
            $sprites,
            humo[movimientoHumo].X, humo[movimientoHumo].Y,
            humo.tamañoRecorte.X, humo.tamañoRecorte.Y,
            posicionesSalida[posicion].X, posicionesSalida[posicion].Y - 150,
            humo.tamañoPantalla.X, humo.tamañoPantalla.Y
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
            if (posicion <= 8) {
                dibujarPersonajeActual();
            }
            ctx.drawImage($fondo2, 0, 0, canvas.width, canvas.height);

            if (posicion > 8) {
                dibujarPersonajeActual();
            }
            ctx.drawImage($fondo1, 0, 0, canvas.width, canvas.height);

            if (aniquilar) {
                pintaHumo();
            }

            if (corazonEstado) {
                ctx.drawImage(
                    $sprites,
                    corazon.PosicionRecorte.X, corazon.PosicionRecorte.Y,
                    corazon.RecorteSize.X, corazon.RecorteSize.Y,
                    corazon.Salidas[posicionCorazon].X,
                    corazon.Salidas[posicionCorazon].Y,
                    corazon.Tamaño.X,
                    corazon.Tamaño.Y
                );
            }
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

    if (secuencia == 4) {
        ctx.drawImage($fondo3, 0, 0, canvas.width, canvas.height);
        if (corazonEstado) {                                                  //               
            ctx.drawImage(                                                    //       
                $sprites,                                                     //       
                corazon.PosicionRecorte.X, corazon.PosicionRecorte.Y,         //        Bloque para pruebas de posiciones, forzar la entrada con el valor inical de secuencia                                           
                corazon.RecorteSize.X, corazon.RecorteSize.Y,                 //                                           
                corazon.Salidas[posicionCorazon].X,                           //                                   
                corazon.Salidas[posicionCorazon].Y,                           //                                   
                corazon.Tamaño.X,                                             //               
                corazon.Tamaño.Y
            );
        }
    }

    // Pintamos el Score en la esquina superior derecha (1440, 60)
    ctx.drawImage(
        $sprites,
        score.inicio.X, score.inicio.Y,
        score.tamañoRecorte.X, score.tamañoRecorte.Y,
        canvas.width - 310,
        10,
        score.tamPantalla.X,
        score.tamPantalla.Y
    );
    ctx.font = "50px system";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "right";
    ctx.fillText(puntuacion, 1420, 94);
    ctx.strokeText(puntuacion, 1420, 94);

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
setInterval(extraLife, 1000);