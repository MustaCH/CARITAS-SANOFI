//localStorage.removeItem('datosGuardados');

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
let greeting;

//==============================================================
//VALORES DE PREGUNTA
//==============================================================

//let datos = [];
let datos = JSON.parse(localStorage.getItem('datosGuardados')) || [];
let botonSeleccionado = false;
let recorrido = [];
let datosGuardados= [];
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

//==============================================================
// INICIO DE PROGRAMA
//==============================================================

function ObtenerPagina(Urlsiguente) {

  // BORRAMOS SECCION ANTERIOR
  const userDatasec = document.getElementById("face-section");
  userDatasec.remove();

    rutajsoncliente = `data/datacliente${userData.code}.json`
    fetch(rutajsoncliente)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((pregunta) => {
          if (pregunta.pagina === Urlsiguente) {

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

              caritas(pregunta.pregunta,pregunta.pagina, botones, urlbtn,pregunta.btnretroceso, pregunta.enviar,pregunta.urlfin);
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

              botonera(pregunta.pregunta,pregunta.pagina, botones, urlbtn,pregunta.btnretroceso,pregunta.enviar,pregunta.urlfin);
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
                pregunta.pagina,
                botones,
                urlbtn,
                pregunta.btnretroceso,
                pregunta.enviar
              );
            }

            ////////////////////
            // CAJA DE TEXTO //
            //////////////////

            if (pregunta.tipo === "cajatxt") {
              // seteo la variables que necesito para la funcion
              cajatxt(pregunta.pregunta, pregunta.pagina, pregunta.url,pregunta.btnretroceso,pregunta.enviar,pregunta.urlfin);
            }

            //////////////
            // VIDEO  //
            ////////////V

            if (pregunta.tipo === "video") {
              console.log("video:")
              video(
                pregunta.pregunta,
                pregunta.pagina,
                pregunta.iframe,
                pregunta.txt,
                pregunta.btnretroceso,
                pregunta.enviar,
                pregunta.url
              );
            }

            /////////////////////
            // FIN DE PANTALLA //
            /////////////////////

            if (pregunta.tipo === "fin") {
              // seteo la variables que necesito para la funcion
              findepantalla(pregunta.pagina, pregunta.pregunta,pregunta.texto);
            }

          }
        });
      })
      .catch((error) => console.error(error));

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

////////////////////////////////
///// PLANTILLAS CARITAS ////////
///////////////////////////////

function caritas(pregunta, pagina, botones, urlbtn, btnretroceso, enviar,urlenviar) {
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
    caritas_btn.value = i + 1;
    caritas_btn.addEventListener("click", () => {
     
      if (enviar === "si") {
        botonSeleccionado = true;
        document.querySelectorAll('#face-cont button').forEach((btn) => {
          btn.classList.remove('selected');
        });
        document.getElementById("error-msg").style.display = "none";
        caritas_btn.className = "selected";
      } else {
        crearrecorrido(pagina);
        ObtenerPagina(urlbtn[i]);
        cargarData(i+1, pagina,"");
      }
    });
    face_cont.append(caritas_btn);
  }

  if(btnretroceso == "si"){
    insertarbotonretroceso()
  }


  if (enviar == "si") {
    insertarbotonenviar(urlenviar);
  }
}


///////////////////////////////////
// / PLANTILLA BOTONERAS //////
///////////////////////////////////

function botonera(pregunta,pagina, botones, urlbtn,btnretroceso, enviar,urlenviar) {
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
  </div>
  <div id="opt-cont" class="animate__animated animate__zoomIn"></div>
  <div id="enviar-cont" class="animate__animated animate__zoomIn"></div>
  </div>
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
      crearrecorrido(pagina)
      cargarData(i+1,pagina,"");
      ObtenerPagina(urlbtn[i]);
    });
    opt_cont.append(option_btn);
  }

  if(btnretroceso == "si"){
    insertarbotonretroceso()
  }

  if (enviar == "si") {
    insertarbotonenviar(urlenviar);
  }

}

// ------------------- //

function botoneraSub(pregunta, subpregunta,pagina, botones, urlbtn,btnretroceso, enviar,urlenviar) {
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
  <div id="opt-cont" class="animate__animated animate__zoomIn"></div>
  <div id="enviar-cont" class="animate__animated animate__zoomIn"></div>
    
  </div>
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
      crearrecorrido(pagina)
      cargarData(i+1,pagina);
      ObtenerPagina(urlbtn[i]);
    });
    opt_cont.append(option_btn);
  }

  if(btnretroceso == "si"){
    insertarbotonretroceso()
  }

  if (enviar == "si") {
    insertarbotonenviar(urlenviar);
  }

}

///////////////////////////////////
// / PLANTILLA CAJA DE TEXTO //////
///////////////////////////////////

function cajatxt(pregunta,pagina, url,btnretroceso, enviar,urlenviar) {
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
        ${enviar === "si" ? "" : '<button id="btn-send">Siguiente</button>'}
        <div id="enviar-cont" class="animate__animated animate__zoomIn"></div>
        </div>
  </section>`;
  document.body.append(pageTxt);

  console.log("enviarr:"+enviar)

  if (enviar == "si") {
    botonSeleccionado = true;
    insertarbotonenviar(urlenviar,pagina);
    
  }else{

    document.getElementById("btn-send").addEventListener("click", function () {
      comment = document.getElementById("coment").value;
      crearrecorrido(pagina)
      cargarData(0,pagina,comment);
      ObtenerPagina(url);
    });
  }


  if (ultimotexto !== undefined && ultimotexto !== "") {
    document.getElementById("coment").value = ultimotexto;
  }

  console.log("btnretroceso: "+btnretroceso)
  if(btnretroceso == "si"){
    insertarbotonretroceso();
  }

}

///////////////////////////
// / PLANTILLA VIDEOS //////
///////////////////////////

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


function cargarData(valor, pagina, texto) {
  let fecha = new Date();

  // console.log("valor:"+valor)
  // console.log("pagina:"+pagina)
  // console.log("texto:"+texto)

  let registro = {
    proyecto: userData.code,
    pagina: pagina,
    valor: valor,
    fecha: fecha,
    texto: texto || ''
  };

  datos.push(registro);

  localStorage.setItem('datosGuardados', JSON.stringify(datos));
}

// -------------------- //
//findepantalla
function findepantalla(pagina,texto1,texto2) {
  greeting = document.createElement("section");
  greeting.innerHTML = `

    <section id="greeting" class="animate__animated animate__zoomIn">
      <h1>${texto1}</h1>
      <p>>${texto2}</p>
      
    </section>`;

  document.body.append(greeting);

   insertardatos()

   setTimeout(() => {
    location.reload();
  }, 6000);

}

// -------------------- //

function insertarbotonretroceso() {

  btnretroceso = document.createElement("div");
  btnretroceso.innerHTML = `<button id="retrocesoButton" class="retroceso">Retroceder</button>`;
  btnretroceso.style.textAlign = "right"; 

  document.getElementById("cajaretroceso").appendChild(btnretroceso);
  document.getElementById("retrocesoButton").addEventListener("click", retroceso);

}

function insertarbotonenviar(url,pagina) {
  enviar = document.createElement("div");
  enviar.innerHTML = `<button id="btn-send" class="activo">Enviar formulario</button>
  <div id="error-msg" style="display:none">Debe seleccionar una opción antes de enviar el formulario</div>`;
  enviar.style.textAlign = "center";

  console.log("url:"+url)
  document.getElementById("enviar-cont").appendChild(enviar);
  document
    .getElementById("btn-send")
    .addEventListener("click", function() {
      if (botonSeleccionado) {
          const commentElement = document.getElementById("coment");
          if (commentElement) {
            comment = document.getElementById("coment").value;
          }
          cargarData(0,pagina,comment);
          ObtenerPagina(url);
      } else {
        // Si ningún botón está seleccionado, no hacemos nada
        document.getElementById("error-msg").style.display = "block";
        console.log("Debe seleccionar una opción antes de enviar el formulario");
      }
    });
}

function crearrecorrido(pagina) {
  recorrido.push(pagina);
  console.log("recorrido:"+recorrido)
}

function retroceso() {

  paginasiguiente = recorrido.pop();

  const commentElement = document.getElementById("coment");
  if (commentElement) {
    ultimotexto = commentElement.value;
  }

  console.log("paginasiguiente:"+paginasiguiente)
  console.log("recorrido:"+recorrido)

  datos.pop();
  ObtenerPagina(paginasiguiente);


}

function insertardatos() {

  const datosGuardados = localStorage.getItem('datosGuardados');
  
  if (datosGuardados) {
    datosg = JSON.parse(datosGuardados);
    console.log(datosg);
  }
  recorrido = [];
  ultimotexto = null
}
