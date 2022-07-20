import * as tab from './classTablero.js';
import * as func from './funciones.js';
document.addEventListener("DOMContentLoaded", function () {

    Swal.fire({
        title: 'Bienvenido a CoderCHESS',
        timer: 1500,
        timerProgressBar: true
    })
    //Inicializamos el objeto size, que tendra las medidas del tablero
    let size;
    /*Aca se compureba el localStorage, para romar el tamaño de preferencia
    previamente utilizado por el usuario. Funciona igual qeu con el theme */
    if (localStorage.getItem("prefSize")) {
        size = JSON.parse(localStorage.getItem("prefSize"));
    } else {
        size = {
            width: 600,
            height: 600
        }
    }
     

    let tablero = document.getElementById('tablero');
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    canvas.width = size.width;
    canvas.height = size.height;

    

    //Inicializar el tablero
    let matrizTablero = [];

    //Inicializamos el tema (colores de las casillas)    
    let theme
    /*En este fragmento de codigo, que va desde la linea 30 a la 37,
    hago una comprobacion del localStorage, ya que al momento de elegir
    un color, este qeudará guardado en el local y, en caso de salir del
    navegador o refrescar la página, el color por defecto ya no será el azul;
    sino que va a cambiar al ultimo seleccionado por el usuario. Ya que no
    hacia uso del manejo del localStorage, me pareció una buena idea hacerlo aca
    
    NOTA: el seteo del objeto "prefTheme", se hace en la función "postColorsDOM", línea 36*/
    if (localStorage.getItem("prefTheme")) {
        theme = JSON.parse(localStorage.getItem("prefTheme"));
    } else {
        theme = {
            dark: '#7296ad',
            light: '#d7e2e8'
        }
    }

    let boarChess = new tab.Tablero(size);
    boarChess.theme = theme;
    boarChess.context = context;

    fetch("./assets/data/inicio.json")

        .then((response) => response.json())
        .then((data) => {

            for (let x = 0; x < 8; x++) {
                matrizTablero[x] = data[x];
                for (let y = 0; y < 8; y++) {
                    matrizTablero[x][y] = data[x][y];
                }
            }
            boarChess.piecesMatrix = matrizTablero;
            boarChess.renderTablero();
            func.tamTablero(canvas, boarChess)
            func.postColorsDOM(boarChess);
            func.crearBotones();
            func.jugadasDOM(boarChess);
            tablero.appendChild(canvas);
        });
})