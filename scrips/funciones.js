/*Funcion Colores: Esta función, trabaja con el json "boardColors" recorriendo la misma
y tomando el atributo "nombreColor" de los objetos allí almacenados para luego entregarselos
al DOM. De esta forma se logra dinanismo, ya que en caso de qeurer agregar un nuevo color, 
bastaría con modificar el JSON. A su vez, esta misma función, va a tomar ese "nombreColor", 
mediante un evento de tipo click, y va a dirigirse al elemento correspondiente a ese atributo
y tomará los valores de los colores (los cuales son hexadecimeales) para cambiar el color del
tablero*/
export function postColorsDOM(tab) {
  fetch('./assets/data/boardColors.json')
    .then(response => response.json())
    .then((data) => {
      let i = 0
      for (const aux of data) {
        let ul = document.getElementById("tabColor");
        let li = document.createElement("li");
        li.className = "liColor";
        li.id = `color${i++}`;
        li.innerHTML = `<a href="">${aux.nombreColor}</a>`;
        ul.appendChild(li);

        let dark
        let light
        let theme

        li.addEventListener("click", function (e) {
          e.preventDefault();

          dark = aux.dark;
          light = aux.light;

          theme = {
            light: light,
            dark: dark
          }

          localStorage.setItem("prefTheme", JSON.stringify(theme));

          tab.theme = theme;
          tab.renderTablero();
        })
      }
    })
}

/*Función tamaño: Aca tomamos valores, predefinidos en el html (lo sé, aca
  no hice uso de json, ya me empache de json XD), para cambiar los valores de
  width y height del tablero. Se hace uso de la función "resizeTablero, de la clase
  tablero para redefinir el tamaño de las celdas*/
export function tamTablero(canvas, tab) {
  let tamTab = document.getElementById("tabSize")

  for (const aux of tamTab.children) {

    let w
    let h
    let ctx
    aux.addEventListener("click", function (e) {
      e.preventDefault();
      w = aux.innerText;
      h = aux.innerText;
      canvas.width = w;
      canvas.height = h;
      let obj = {
        width: w,
        height: h
      }

      localStorage.setItem("prefSize", JSON.stringify(obj));

      tab.reziseTablero(w, h);
      tab.renderTablero()
    })
  }
}

/*Funcion Jugadas: en esta función se trabaja de una forma similar a las de los colores,
osea se toma el nombre de las jugadas almacenadas en el JSON "aperturas", para entregar al
DOM el nombre de las mismas y con un evento "click" se irá recorriendo el atributo "movimientos"
de este JSON, el cuál es un array de matrices con las posiciones de las fichas, para ir
modificando el tablero con dichas jugadas.*/
export function jugadasDOM(tab) {
  fetch('./assets/data/aperturas.json')
    .then((response) => response.json())
    .then((data) => {
      for (const aux of data) {
        let tabApertura = document.getElementById('tabAper');
        let li = document.createElement("li");
        let titulo = document.getElementById('titulo');
        let parrafo = document.getElementById('texto');
        li.className = "liAper";
        li.innerHTML = `<a href="">${aux.nombre}</a>`;
        tabApertura.appendChild(li);


        li.addEventListener("click", function (e) {
          e.preventDefault();
          titulo.innerText = `${aux.nombre}`
          parrafo.innerText = `${aux.explicacion}`
          tab.piecesMatrix = aux.movimientos[0];
          tab.renderTablero();

          let i = 0;

          let adelante = document.getElementById("adelante");
          let atras = document.getElementById("atras");
          let inicio = document.getElementById("inicio");
          atras.disabled = true;
          adelante.disabled = false;


          adelante.onclick = function (e) {
            if ((i + 1) < aux.movimientos.length) {
              i++;
              tab.piecesMatrix = aux.movimientos[i];
              tab.renderTablero();
              atras.disabled = false;
            }
            if (i >= (aux.movimientos.length - 1)) {
              adelante.disabled = true;
              atras.disabled = false;
            }
          };

          atras.onclick = function (e) {
            if (i > 0 && i < aux.movimientos.length) {
              i--;
              tab.piecesMatrix = aux.movimientos[i];
              tab.renderTablero();
              adelante.disabled = false;
              atras.disabled = false;
            }

            if (i <= 0) {
              adelante.disabled = false;
              atras.disabled = true;
            }
          };

          inicio.onclick = function (e) {
            tab.piecesMatrix = aux.movimientos[0];
            tab.renderTablero();
            adelante.disabled = false;
            atras.disabled = true;
            i = 1;
          };
        })
      }

    })

}

/*Funcion posición Inicial: acá simplemente entrego la posicion inical de las fichas del
tablero, para que estas se presenten en el DOM a modo "por defecto"*/
export function posicionInicial() {

  fetch("./assets/data/inicio.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data
    });
}


/*Funcion crear botones: solo crea los botones en el html que mediante eventos
van a recorrer el array de jugadas para ir mostrandolas en el DOM */
export function crearBotones() {
  let botonera = document.getElementById("botonera");
  let adelante = document.createElement("button");
  adelante.innerText = "Adelante";
  adelante.id = "adelante";
  let atras = document.createElement("button");
  atras.innerText = "Atras";
  atras.id = "atras";
  let inicio = document.createElement("button");
  inicio.innerText = "Inicio";
  inicio.id = "inicio";

  botonera.appendChild(adelante);
  botonera.appendChild(atras);
  botonera.appendChild(inicio);

}