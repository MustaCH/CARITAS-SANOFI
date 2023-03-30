const userData = JSON.parse(sessionStorage.getItem("user"));
if (userData) {
  crearHeader();
  ObtenerPagina("1");
} else {
  window.location.replace("login.html");
}

//==============================================================
//AREAS MODIFICABLES
//==============================================================

let pageCaritas;
let pageOptions;
let pageTxt;
let pageVideo;
let greeting;

//==============================================================
//VALORES DE PREGUNTA
//==============================================================

let datos = [];
let recorrido = [];
let ultimotexto;
let calif;
let aspect;
let comment;

//==============================================================
//CONFIGURACION DE USUARIO
//==============================================================

let users;
let newUser;

if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));
} else {
  users = [];
}

let fecha = new Date();

class User {
  constructor(calif, aspect, comment, fecha) {
    this.calif = calif;
    this.aspect = aspect;
    this.comment = comment;
    this.fecha = fecha;
  }
}

function storeUser(user) {
  return users.unshift(user);
}

function storeStorage(user) {
  let storage = localStorage.setItem("users", JSON.stringify(user));
  return storage;
}

//==============================================================
// INICIO DE PROGRAMA
//==============================================================

function ObtenerPagina(Urlsiguente) {
  // BORRAMOS SECCION ANTERIOR
  const userData = document.getElementById("face-section");
  userData.remove();

  if (Urlsiguente != "fin") {
    fetch("data/datacliente1.json")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((pregunta) => {
          if (pregunta.code === Urlsiguente) {
            // EVALUO EL TIPO DE PREGUNTA

            /////////////
            // CARITAS //
            ////////////
            if (pregunta.tipo === "caritas") {
              // seteo la variables que necesito para la funcion
              const botones = [];
              pregunta.btns.forEach((btn) => {
                botones.push(btn.txt);
              });

              const urlbtn = [];
              pregunta.btns.forEach((btn) => {
                urlbtn.push(btn.url);
              });

              caritas(
                pregunta.pregunta,
                pregunta.code,
                botones,
                urlbtn,
                pregunta.btnretroceso,
                pregunta.enviar
              );
            }

            ////////////
            // BOTONERA//
            ////////////

            if (pregunta.tipo === "botonera") {
              // seteo la variables que necesito para la funcion
              const botones = [];
              pregunta.btns.forEach((btn) => {
                botones.push(btn.txt);
              });

              const urlbtn = [];
              pregunta.btns.forEach((btn) => {
                urlbtn.push(btn.url);
              });

              botonera(
                pregunta.pregunta,
                pregunta.code,
                botones,
                urlbtn,
                pregunta.btnretroceso,
                pregunta.enviar
              );
            }

            ////////////////
            // BOTONERA SUB//
            /////////////////

            if (pregunta.tipo === "botoneraSub") {
              // seteo la variables que necesito para la funcion
              const botones = [];
              pregunta.btns.forEach((btn) => {
                botones.push(btn.txt);
              });

              const urlbtn = [];
              pregunta.btns.forEach((btn) => {
                urlbtn.push(btn.url);
              });

              botoneraSub(
                pregunta.pregunta,
                pregunta.subpregunta,
                pregunta.code,
                botones,
                urlbtn,
                pregunta.enviar
              );
            }

            ////////////////////
            // CAJA DE TEXTO //
            //////////////////

            if (pregunta.tipo === "cajatxt") {
              // seteo la variables que necesito para la funcion
              cajatxt(
                pregunta.pregunta,
                pregunta.code,
                pregunta.url,
                pregunta.btnretroceso,
                pregunta.enviar
              );
            }

            if (pregunta.tipo === "video") {
              video(
                pregunta.pregunta,
                pregunta.code,
                pregunta.iframe,
                pregunta.txt,
                pregunta.btnretroceso,
                pregunta.enviar,
                pregunta.url
              );
            }
          }
        });
      })
      .catch((error) => console.error(error));
  } else {
    // SI LLEGO A LA PAGINA FIN CARGA LA PAGINA FINAL
    createGreeting();
  }
}

function crearHeader() {
  header = document.createElement("header");
  header.innerHTML = `
      
      <img
        src=${userData.logo}
        class="animate__animated animate__zoomIn"
        alt="sanofi-logo"
        id="logo"
      />
   `;

  document.body.append(header);
}

///////////////////////////
///// PLANTILLAS  ////////
//////////////////////////

function caritas(pregunta, pagina, botones, urlbtn, btnretroceso, enviar) {
  pageCaritas = document.createElement("section");
  pageCaritas.innerHTML = `     
    <section id="face-section">
      <div id="q-cont">
        <h1 class="animate__animated animate__zoomIn" id="pregunta">
          ${pregunta}
        </h1>
      </div>
      <div id="face-cont" class="animate__animated animate__zoomIn"></div>
      <div id="enviar-cont" class="animate__animated animate__zoomIn"></div>
    </section>`;
  document.body.append(pageCaritas);

  const face_cont = document.getElementById("face-cont");

  for (let i = 0; i < botones.length; i++) {
    let caritas_btn;
    caritas_btn = document.createElement("button");
    caritas_btn.innerHTML = `<img src="${botones[i]}" alt="" />`;
    caritas_btn.id = `face-${i + 1}`;
    caritas_btn.className = "normal";
    caritas_btn.value = i + 1;
    console.log("enviar:" + enviar);
    caritas_btn.addEventListener("click", () => {
      if (enviar === "si") {
        caritas_btn.className = "selected";
      } else {
        crearrecorrido(pagina);
        ObtenerPagina(urlbtn[i]);
        cargarData(i, pagina);
      }
    });
    face_cont.append(caritas_btn);
  }

  if (enviar == "si") {
    insertarbotonenviar();
  }

  if (btnretroceso == "si") {
    insertarbotonretroceso();
  }
}

// ------------------- //

function botonera(pregunta, pagina, botones, urlbtn, btnretroceso, enviar) {
  pageCaritas.remove();
  pageOptions = document.createElement("section");
  pageOptions.innerHTML = `
    <section id="face-section">
      <div id="cajaretroceso"></div>
      <div id="q-cont">
  <h1 class="animate__animated animate__zoomIn" id="pregunta">
  ${pregunta}
  </h1>
  </div>
  <div id="opt">
  <div>
    <h2 class="animate__animated animate__zoomIn" id="subpregunta">
    ${userData.subpregunta}
    </h2>
  </div>
  <div id="opt-cont" class="animate__animated animate__zoomIn">
    
  </div>
  </div>
  <div id="enviar-cont" class="animate__animated animate__zoomIn"></div>
  </section>`;

  document.body.append(pageOptions);

  const opt_cont = document.getElementById("opt-cont");

  for (let i = 0; i < botones.length; i++) {
    let option_btn;
    option_btn = document.createElement("button");
    option_btn.innerHTML = `${botones[i]}`;
    option_btn.id = `option-${i + 1}`;
    option_btn.className = `option`;
    option_btn.value = i + 1;
    option_btn.addEventListener("click", () => {
      crearrecorrido(pagina);
      cargarData(i, pagina);
      ObtenerPagina(urlbtn[i]);
    });
    opt_cont.append(option_btn);
  }

  if (btnretroceso == "si") {
    insertarbotonretroceso();
  }

  if (enviar == "si") {
    insertarbotonenviar();
  }
}

// ------------------- //

function botoneraSub(
  pregunta,
  subpregunta,
  pagina,
  botones,
  urlbtn,
  btnretroceso,
  enviar
) {
  pageCaritas.remove();
  pageOptions = document.createElement("section");
  pageOptions.innerHTML = `
    <section id="face-section">
    <div id="cajaretroceso"></div>
      <div id="q-cont">
  <h1 class="animate__animated animate__zoomIn" id="pregunta">
  ${pregunta}
  </h1>
  </div>
  <div id="opt">
  <div>
    <h2 class="animate__animated animate__zoomIn" id="subpregunta">
    ${subpregunta}
    </h2>
  </div>
  <div id="opt-cont" class="animate__animated animate__zoomIn">
    
  </div>
  </div>
  <div id="enviar-cont" class="animate__animated animate__zoomIn"></div>
  </section>`;

  document.body.append(pageOptions);

  const opt_cont = document.getElementById("opt-cont");

  for (let i = 0; i < botones.length; i++) {
    let option_btn;
    option_btn = document.createElement("button");
    option_btn.innerHTML = `${botones[i]}`;
    option_btn.id = `option-${i + 1}`;
    option_btn.className = `option`;
    option_btn.value = i + 1;
    option_btn.addEventListener("click", () => {
      crearrecorrido(pagina);
      cargarData(i, pagina);
      ObtenerPagina(urlbtn[i]);
    });
    opt_cont.append(option_btn);
  }

  if (btnretroceso == "si") {
    insertarbotonretroceso();
  }

  if (enviar == "si") {
    insertarbotonenviar();
  }
}

// ------------------- //

function cajatxt(pregunta, pagina, url, btnretroceso, enviar) {
  pageTxt = document.createElement("section");
  pageTxt.innerHTML = `
  <section id="face-section">
  <div id="cajaretroceso"></div>
        <div id="q-cont">
        <h1 class="animate__animated animate__zoomIn">
          ${pregunta}
        </h1>
        </div>
        <div id="inpt-cont" class="animate__animated animate__zoomIn">
        <textarea name="adicional" id="coment" cols="30" rows="8"></textarea>
        </div>
        <div id="enviar-cont" class="animate__animated animate__zoomIn"></div>
  </section>`;
  document.body.append(pageTxt);

  if (ultimotexto !== undefined && ultimotexto !== "") {
    console.log("cajadetextooo1");
    document.getElementById("coment").value = ultimotexto;
  }
  if (btnretroceso == "si") {
    insertarbotonretroceso();
  }

  if (enviar == "si") {
    insertarbotonenviar();
  }
}

// ------------------- //

function video(pregunta, pagina, iframe, txt, btnretroceso, enviar, url) {
  pageVideo = document.createElement("section");
  console.log("iframe" + iframe);
  pageVideo.innerHTML = `
    <section id="face-section">
      <div id="video-container">
        <h1 class="animate__animated animate__zoomIn">${pregunta}</h1>
        <div>
          <iframe width="560" height="315" allow="autoplay; fullscreen" src="${iframe}" frameborder="0"></iframe>      
          <div>
            <button id="btn-continuar" class="animate__animated animate__zoomIn">${txt}</button>
          </div>        
        </div>
      </div> 
    </section>`;
  document.body.append(pageVideo);

  let btn_continuar = document.getElementById("btn-continuar");
  btn_continuar.addEventListener("click", () => {
    crearrecorrido(pagina);
    ObtenerPagina(url);
  });

  if (btnretroceso === "si") {
    insertarbotonretroceso();
  }

  if (enviar === "si") {
    insertarbotonenviar();
  }
}

//////////////////////////
// FUNCIONES AUXILIARES //
///////////////////////////

function pushUser() {
  newUser = new User(calif, aspect, comment, fecha.toLocaleString());
  localStorage.setItem("users", JSON.stringify(users));
  storeUser(newUser);
  storeStorage(users);
}

// -------------------- //

function cargarData(valor, pagina, texto) {
  let fecha = new Date();

  let registro = {
    valor: valor,
    pagina: pagina,
    fecha: fecha,
    texto: texto || "",
  };

  datos.push(registro);
}

// -------------------- //

function createGreeting() {
  greeting = document.createElement("section");
  greeting.innerHTML = `

    <section id="greeting" class="animate__animated animate__zoomIn">
      <h1>Enviado!</h1>
      <p>Muchas gracias! Que tenga un buen dia</p>
      
    </section>`;

  document.body.append(greeting);

  for (let i = 0; i < datos.length; i++) {
    let registro = datos[i];
    console.log(`Registro ${i + 1}:`);
    console.log(`Página: ${registro.pagina}`);
    console.log(`Valor: ${registro.valor}`);
    console.log(`Fecha: ${registro.fecha}`);
    console.log(`Texto: ${registro.texto}`);
    console.log("------------------");
  }

  for (let i = 0; i < recorrido.length; i++) {
    let pocision = datos[i];
    console.log("Pocision:" + i + ` Página: ${pocision.pagina}`);
  }
}

// -------------------- //

function insertarbotonenviar() {
  enviar = document.createElement("div");
  enviar.innerHTML = `<button id="btn-send" class="activo">Enviar formulario</button>`;
  enviar.style.textAlign = "center";

  document.getElementById("enviar-cont").appendChild(enviar);
  document
    .getElementById("btn-enviar")
    .addEventListener("click", createGreeting);
}

function insertarbotonretroceso() {
  btnretroceso = document.createElement("div");
  btnretroceso.innerHTML = `<button id="retrocesoButton" class="retroceso">Retroceder</button>`;
  btnretroceso.style.textAlign = "right";

  document.getElementById("cajaretroceso").appendChild(btnretroceso);
  document
    .getElementById("retrocesoButton")
    .addEventListener("click", retroceso);
}

function crearrecorrido(pagina) {
  recorrido.push(pagina);
}

function retroceso() {
  paginasiguiente = recorrido.pop();

  const commentElement = document.getElementById("coment");
  if (commentElement) {
    ultimotexto = commentElement.value;
  }

  console.log("cajadetextooo: " + ultimotexto);
  datos.pop();
  ObtenerPagina(paginasiguiente);
}
