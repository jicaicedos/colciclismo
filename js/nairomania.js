var iniciado = false;
var txtContador;

// Variable para almacenar el escenario del canvas
var escenario;

// Tablero de 5x16
var pista = [
    [8,0,4,0,9],
    [8,1,0,0,9],
    [8,0,4,0,9],
    [8,0,2,0,9],
    [8,0,4,1,9],
    [8,0,0,0,9],
    [8,2,4,0,9],
    [8,0,0,0,9],
    [8,0,4,0,9],
    [8,0,0,0,9],
    [8,0,4,0,9],
    [8,0,0,0,9],
    [8,0,4,0,9],
    [8,0,0,0,9],
    [8,0,4,0,9],
    [8,0,0,0,9],
    [8,0,4,0,9],
    [8,0,2,0,9],
    [8,0,4,0,9],
    [8,0,0,0,9],
    [8,0,4,0,9]
];

// Variables usadas para manipular los componenetes del escenario
var carreteraL = 0;
var cespediL = 8;
var cespeddL = 9;
var metaL = 7;
var choqueL = 5;
var carreteraLineaL = 4;

var nairoL = 3;
var contadorL = 1;
var evansL = 2;

// Tamaño en pixeles de la imagen
var tamImagen = 50;

// Determina si el usuario mueve al personaje Nairo con el teclado 
// Si mueve teclado no dibuja
var movioConTeclado = false;
var movioAderecha = false;
var movioAizquierda = false;

// limite izquierdo y derecho de la matriz (escenario)
var limiteIzq = 0;
var limiteDer = 4;
var limiteArriba = 0;
var limiteAbajo = pista.length-1;  // Debe ser la cantidad de filas - 1

// Definimos la posición inicial del jugador (ciclista nairo)
var posXnairo = 1;
var posYnairo = 9;

// Variables usadas para determinar el Nivel del juego, a mayor nivel mayor velocidad
var nivel = 5;
var totalNivel = 5;
var contadorNivel = 1;
var pausa = 200;

// Declaración de variables JSON
var teclas = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
};

var nairo = {
	nairoURL: "imagenes/nairo.png",
	imagenOK: false,
	x: 2,
	y: 9
};

var cespedIzq ={
	cespedIzqURL: "imagenes/cesped_izq.png",
	imagenOK: false
};

var cespedDer = {
	cespedDerURL: "imagenes/cesped_der.png",
	imagenOK: false
};

var carretera = {
	carreteraURL: "imagenes/carretera.png",
	imagenOK: false
};

var carreteraLinea = {
	carreteraLineaURL: "imagenes/carretera_linea.png",
	imagenOK: false
};

var meta = {
	metaURL: "imagenes/meta.png",
	imagenOK: false
};

var choque = {
	choqueURL: "imagenes/choque.png",
	imagenOK: false
};

var contador = {
	contadorURL: "imagenes/contador.png",
	imagenOK: false
};

var evans = {
	evansURL: "imagenes/evans.png",
	imagenOK: false
};

// Funciones que confirman si las imágenes ya cargaron

function confirmadoNairo() {
	nairo.imagenOK = true;
	dibujarEscenarioIncial();
}
function confirmadoContador() {
	contador.imagenOK = true;
	dibujarEscenarioIncial();
}
function confirmadoEvans() {
	evans.imagenOK = true;
	dibujarEscenarioIncial();
}
function confirmadoCespedIzq() {
	cespedIzq.imagenOK = true;
	dibujarEscenarioIncial();
}
function confirmadoCespedDer() {
	cespedDer.imagenOK = true;
	dibujarEscenarioIncial();
}
function confirmadoCarretera() {
	carretera.imagenOK = true;
	dibujarEscenarioIncial();
}

function confirmadoCarreteraLinea() {
	carreteraLinea.imagenOK = true;
	dibujarEscenarioIncial();
}

function confirmadoMeta() {
	meta.imagenOK = true;
	dibujarEscenarioIncial();
}

function confirmadoChoque() {
	choque.imagenOK = true;
	dibujarEscenarioIncial();
}

function moverNairoDerecha() {
	movioAderecha = true;
}

function moverNairoIzquierda() {
	movioAizquierda = true;
}

function mostrarPista() {
	var txt = document.getElementById("matriz");
	for (var a=0; a < 10; a++ ) {
		txt.innerHTML += "<br> "+pista[a][0]+" "+" "+pista[a][1]+" "+pista[a][2]+" "+pista[a][3]+" "+pista[a][4]+"</ br>";
	}	
	txt.innerHTML = "";
	moverPista();
}

// Función para que el escenario cambie cada segundo
function moverPista() {
	var atemp = [0,0,0];

	// Guardamos temporalmente la última fila de la pista con el fin de mover
	// el escenario hacia abajo
	atemp[0] = pista[limiteAbajo][1];
	atemp[1] = pista[limiteAbajo][2];
	atemp[2] = pista[limiteAbajo][3];

	// Iterador para filas es i
	// Iterador para columnas es j
	for (var i = limiteAbajo; i > 0; i--) {
		for (var j = 1; j < 4; j++) {
			pista[i][j] = pista[i-1][j];
		}
	}
	
	// La última fila guardada ahora la colocamos en la primera fila conservando así el efecto
	pista[0][1] = atemp[0];
	pista[0][2] = atemp[1];
	pista[0][3] = atemp[2];

	// colocamos al ciclista Nairo en la posicion que haya definido el usuario
	pista[posXnairo][posYnairo] = 3;

	contadorNivel++;
	txtContador.innerHTML = "Contador Nivel: " + contadorNivel + "-- Nivel: " + nivel;
	if( iniciado ) {	 	
	 	if( contadorNivel%10 == 0 ) {	 		
	 		if( nivel > 1) {
	 			nivel--;	 			
	 		}
	 		// Agregamos el elemento de llegada a la Meta, en la pista ( meta = 7 )
			if( nivel == 1 ) {
				pista[0][1] = pista[0][2] = pista[0][3] = 7;
			}
	 		if( contadorNivel >= (totalNivel*10) ) {
	 			terminarJuego();
	 		}
	 	}
	 	// Pausamos 
	 	setTimeout(dibujar,nivel*pausa);
	}
}

// Función que dibuja todo el escenario y los elementos del juego.
function dibujar() {


	// Valida si ha chocado
	var bandChoque = false;
	// Se dibuja cuando no se haya usado el teclado para mover el personaje Nairo
	if ( !movioConTeclado ) {
		// Iterador para filas es i
		// Iterador para columnas es j

		for (var i = 0; i < limiteAbajo+1; i++) {
			for (var j = 0; j < 5; j++) {								
				if( pista[i][j] == contadorL ) {					
					if( posXnairo==j && posYnairo==i ) {
						escenario.drawImage(carretera.imagen,posXnairo*tamImagen,posYnairo*tamImagen);
						escenario.drawImage(choque.imagen, j*tamImagen, i*tamImagen);
						bandChoque = true;
					} else {
						escenario.drawImage(contador.imagen, j*tamImagen, i*tamImagen);
					}															
				}
				if( pista[i][j] == evansL ) {
					if( posXnairo==j && posYnairo==i ) {
						escenario.drawImage(carretera.imagen,posXnairo*tamImagen,posYnairo*tamImagen);
						escenario.drawImage(choque.imagen, j*tamImagen, i*tamImagen);
						bandChoque = true;
					} else {
						escenario.drawImage(evans.imagen, j*tamImagen, i*tamImagen);
					}															
				}
				if( pista[i][j] == carreteraL ) {
					escenario.drawImage(carretera.imagen,j*tamImagen,i*tamImagen);
				}
				if( pista[i][j] == carreteraLineaL ) {
					escenario.drawImage(carreteraLinea.imagen,j*tamImagen,i*tamImagen);
				}
				if( pista[i][j] == metaL ) {
					escenario.drawImage(meta.imagen,j*tamImagen,i*tamImagen);
				}
			}		
		}
		if( !bandChoque ) {			
			if( movioAderecha && posXnairo<(limiteDer-1) )
			{
				posXnairo++;
				escenario.drawImage(nairo.imagen, posXnairo*tamImagen, posYnairo*tamImagen);
			}
			else if( movioAizquierda && posXnairo>(limiteIzq+1) ){
				posXnairo--;
				escenario.drawImage(nairo.imagen, posXnairo*tamImagen, posYnairo*tamImagen);
			}
			else {
				escenario.drawImage(nairo.imagen, posXnairo*tamImagen, posYnairo*tamImagen);
			}
		}

		// Se cambian las posiciones para volver a dibujar y dar efecto de Scrolling
		moverPista();	
	}
	
	movioConTeclado = false;
	movioAizquierda = false;
	movioAderecha = false;
}

// Función que dibuja todo el escenario y los elementos del juego.
function dibujarEscenarioIncial() {

	// Posiciones X,Y de Contador y Evans
	var contadorX, contadorY, evansX, evansY;

	// Iterador para filas es i
	// Iterador para columnas es j
	for (var i = 0; i < limiteAbajo+1; i++) {
		for (var j = 0; j < 5; j++) {
			if( pista[i][j] == choqueL ) {
				escenario.drawImage(choque.imagen,j*tamImagen,i*tamImagen);
			}
			if( pista[i][j] == contadorL ) {
				contadorX = j*tamImagen;
				contadorY = i*tamImagen;
			}
			if( pista[i][j] == evansL ) {
				evansX = j*tamImagen;
				evansY = i*tamImagen;
			}
			
			if( pista[i][j] == cespeddL ) {
				escenario.drawImage(cespedDer.imagen,j*tamImagen,i*tamImagen);
			}
			else if( pista[i][j] == cespediL ) {
				escenario.drawImage(cespedIzq.imagen,j*tamImagen,i*tamImagen);
			}
			else if( pista[i][j] == carreteraLineaL ) {
				escenario.drawImage(carreteraLinea.imagen,j*tamImagen,i*tamImagen);
			}
			else {
				escenario.drawImage(carretera.imagen,j*tamImagen,i*tamImagen);
			}			
		}		
	}

	// Dibujar a Contador y Evans
	escenario.drawImage(contador.imagen,contadorX,contadorY);
	escenario.drawImage(evans.imagen,evansX,evansY);

	// Se dibuja a Nairo en la posición definida por el usuario
	escenario.drawImage(nairo.imagen,posXnairo*tamImagen,posYnairo*tamImagen);
}

function teclado (evento) {

	var codigo = evento.keyCode;

	// Cada vez que se oprime teclado el nivel también aumenta, NO DEBERÍA SER ASÍ
	// contadorNivel = contadorNivel - 2;

	if ( codigo == teclas.LEFT ) {
		if( (posXnairo-1)>limiteIzq ) {
			posXnairo--;
		}
	}
	if( codigo == teclas.RIGHT ) {
		if( (posXnairo+1)<limiteDer ) {
			posXnairo++;
		}
	}
	if ( codigo == teclas.UP ) {
		if( (posYnairo-1)>=limiteArriba ) {
			posYnairo--;
		}
	}
	if( codigo == teclas.DOWN ) {
		if( (posYnairo+1)<=limiteAbajo ) {
			posYnairo++;
		}
	}

	movioConTeclado = true;
	if( iniciado ) {
	 	dibujar();
	}
	
}

function terminarJuego() {
	iniciado = false;
	for (var i = 0; i <= limiteDer; i++) {
		for (var i = 1; i <= limiteAbajo; i++) {
			escenario.drawImage(carretera.imagen, i*tamImagen, j*tamImagen);
		};
	};
	for (var i = 1; i < limiteDer ; i++) {
		escenario.drawImage(evans.imagen, i*tamImagen, limiteAbajo*tamImagen);
	};
}

function inicio() {
	var canvas = document.getElementById("pista");
	escenario = canvas.getContext("2d");

	txtContador = document.getElementById("contador");

	cespedIzq.imagen = new Image();
	cespedIzq.imagen.src = cespedIzq.cespedIzqURL;
	cespedIzq.imagen.onload = confirmadoCespedIzq;
	
	cespedDer.imagen = new Image();
	cespedDer.imagen.src = cespedDer.cespedDerURL;
	cespedDer.imagen.onload = confirmadoCespedDer;

	
	carretera.imagen = new Image();
	carretera.imagen.src = carretera.carreteraURL;
	carretera.imagen.onload = confirmadoCarretera;

	carreteraLinea.imagen = new Image();
	carreteraLinea.imagen.src = carreteraLinea.carreteraLineaURL;
	carreteraLinea.imagen.onload = confirmadoCarreteraLinea;

	meta.imagen = new Image();
	meta.imagen.src = meta.metaURL;
	meta.imagen.onload = confirmadoMeta;

	choque.imagen = new Image();
	choque.imagen.src = choque.choqueURL;
	choque.imagen.onload = confirmadoChoque;

	nairo.imagen = new Image();
	nairo.imagen.src = nairo.nairoURL;
	nairo.imagen.onload = confirmadoNairo;

	contador.imagen = new Image();
	contador.imagen.src = contador.contadorURL;
	contador.imagen.onload = confirmadoContador;
	
	evans.imagen = new Image();
	evans.imagen.src = evans.evansURL;
	evans.imagen.onload = confirmadoEvans;
	
	iniciado = true;

	document.addEventListener("keydown",teclado);

	// Usando la librería Hammer para detectar el movimiento en la pantalla
	// Movimientos hacia la derecha y hacia la izquierda
	var $body = document.querySelector('body');
	var body = new Hammer($body);

	body.on('panright', moverNairoDerecha);
	body.on('panleft', moverNairoIzquierda);


	dibujarEscenarioIncial();
	dibujar();
}

