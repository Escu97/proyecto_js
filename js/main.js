////POP UP LOG IN///////
function popUpLogin(){
    document.querySelector("#mostrar_login").addEventListener("click", ()=> {
        document.querySelector(".login_popup").classList.add("active_popup");
        document.getElementById("todo").style.visibility = "hidden";
    });
    document.querySelector(".close_button").addEventListener("click", ()=>{
        document.querySelector(".login_popup").classList.remove("active_popup");
        document.getElementById("todo").style.visibility = "visible";
    });
}

////POP UP REGISTRO////
function popUpRegistro(){
    document.querySelector("#login_registrarse").addEventListener("click", ()=> {
        document.querySelector(".regist_popup").classList.add("active_popup");
        document.querySelector(".login_popup").classList.remove("active_popup");
    });
    document.querySelector(".close_button_2").addEventListener("click", ()=>{
        document.querySelector(".regist_popup").classList.remove("active_popup");
        document.getElementById("todo").style.visibility = "visible";
    });
}

popUpLogin();
popUpRegistro();

////REGISTRO DE USUARIO////
let btn_registro = document.getElementById("registrarse");
btn_registro.addEventListener("click", ()=>{

    let user = document.getElementById("regist_username").value;
    let pass = document.getElementById("regist_password").value;

    usuario = new Usuario(user, pass);

    crearUsuario(usuario);

    document.getElementById("regist_username").value = "";
    document.getElementById("regist_password").value = "";

});

function crearUsuario(usuario){ 
    if(localStorage.getItem('Usuarios'))
    {
        let users_guardados = JSON.parse(localStorage.getItem('Usuarios'));
        let user = document.getElementById("regist_username").value;
        let pass = document.getElementById("regist_password").value;

        if(validarUser(users_guardados, user, pass) === null)
        {
            users_guardados.push(usuario);
            let users_guardados_JSON = JSON.stringify(users_guardados);
            localStorage.setItem('Usuarios', users_guardados_JSON);

            alertaExitosa("Usuario creado");

            document.querySelector(".regist_popup").classList.remove("active_popup");
            document.getElementById("todo").style.visibility = "visible";
            document.querySelector(".login_popup").classList.add("active_popup");
            document.getElementById("todo").style.visibility = "hidden";
        }
        else
        {
            alertaNegativa("Usuario ya existente, intente con otro nombre");

            document.getElementById("todo").style.visibility = "hidden";
        }
    }
    else
    {
        let users_guardados = [];
        users_guardados.push(usuario);
        let users_guardados_JSON = JSON.stringify(users_guardados);
        localStorage.setItem('Usuarios', users_guardados_JSON);

        alertaExitosa("Usuario creado");

        document.querySelector(".regist_popup").classList.remove("active_popup");
        document.getElementById("todo").style.visibility = "visible";
        document.querySelector(".login_popup").classList.add("active_popup");
        document.getElementById("todo").style.visibility = "hidden";
    }
}

////INGRESO DE USUARIO////
let btn_ingreso = document.getElementById("ingresar");
btn_ingreso.addEventListener("click", ()=>{

    let usuarios = JSON.parse(localStorage.getItem('Usuarios'));

    let user = document.getElementById("login_username").value;
    localStorage.setItem('UltimaSesion', user);
    let pass = document.getElementById("login_password").value;
    let alerta = validarUser(usuarios, user, pass)

    if(alerta)
    {
        alertaExitosa("Usted ingreso con exito");
        document.querySelector(".login_popup").classList.remove("active_popup");
        document.getElementById("todo").style.visibility = "visible";
        document.getElementById("login_username").value = "";
        document.getElementById("login_password").value = "";

        usuarioLogeado(user);
    }
    else if(alerta == null)
    {
        alertaNegativa("Usuario no encontrado");
        document.getElementById("login_username").value = "";
        document.getElementById("login_password").value = "";
    }
    else
    {
        alertaNegativa("Contraseña equivocada");
        document.getElementById("login_username").value = "";
        document.getElementById("login_password").value = "";
    }
})

function usuarioLogeado(user){
    let ingresado = document.getElementById("estado_usuario");

    ingresado.innerHTML =   `
                            <button class="nav-link" id="mostrar_usuario"><i class="bi bi-person-circle"></i>${user.toUpperCase()}</button>
                            `
    cerrarSesion();
}

function mantenerSesion(){
    let ultimaSesion = localStorage.getItem('UltimaSesion')
    if(ultimaSesion != null)
    {
        usuarioLogeado(ultimaSesion);
    }
}

function cerrarSesion(){
    let usuario = document.getElementById("mostrar_usuario");
    usuario.addEventListener("click",()=>{
        localStorage.removeItem('UltimaSesion');
        let user = document.getElementById("estado_usuario");
        user.removeChild(document.getElementById("mostrar_usuario"));
        user.innerHTML =`
                        <button class="nav-link" id="mostrar_login"><i class="bi bi-person-circle"></i>Ingresar</button>
                        `
        popUpLogin();
        popUpRegistro();                
    })
}

////VALIDACION DE DATOS////
function validarUser(usuarios, user, pass){
    let encontrado = false;
    let i = 0;

    if(usuarios != null)
    {
        while(encontrado === false && i != usuarios.length)
        {
            if(usuarios[i].usuario == user)
            {
                if(usuarios[i].contraseña == pass)
                {
                    encontrado = true;
                    return true;
                }
                else
                {
                    encontrado = true;
                    return false;
                }
            }

            i++;
        }
        if(encontrado === false)
        {
            return null;
        }
    }
}

////PRODUCTOS////
let ofertas = [1, 2, 3, 4]; //1= 2x1 - 2= 50% - 3= 25% - 4= 10%//
let productos = [];
let carrito = [];

function crearProd(id, nombre, precio, img, oferta){
    productos[id-1] = new Producto(id, nombre, precio, img, oferta);
}

//Productos en stock//
crearProd(1, "Ibupirac 400", 230, "img/ibu400.jpg", 0);
crearProd(2, "Ibupirac 600", 350, "img/ibu600.jpg", 0);
crearProd(3, "Tafirol 500", 750, "img/tafirol500.jpg", 4);
crearProd(4, "Tafirol Forte", 870, "img/tafirolfte.jpg", 0);
crearProd(5, "Tafirol Plus", 1050, "img/tafirolplus.jpg", 0);
crearProd(6, "Crema Platsul-A", 900, "img/platsula.jpg", 3);
crearProd(7, "Crema Adermicina A", 1200, "img/adermicinaa.jpg", 0);
crearProd(8, "Crema Adermicina", 1600, "img/adermicina.jpg", 3);
crearProd(9, "Crema Nivea Creme", 500, "img/niveacreme.jpg", 0);
crearProd(10, "Crema Empecid", 750, "img/empecid.jpg", 0);
crearProd(11, "Crema Voltaren Gel", 1300, "img/voltaren.jpg", 0);
crearProd(12,"A.B. Blue Seduction", 4500, "img/blueseduction.jpg", 0);
crearProd(13,"A.B The Icon", 5300, "img/theicon.jpg", 0);
crearProd(14,"A.B. Her Secret Desire", 4400, "img/secretdesire.jpg", 4);
crearProd(15,"A.B. Her Secret Bloom", 3700, "img/secretbloom.jpg", 1);
crearProd(16,"A.B. The Icon Blue", 4900, "img/theiconblue.jpg", 0);

const contenedorCard = document.getElementById("index_contenedor_productos");

function mostrarProductos(productos){
    productos.forEach((producto)=>{
        const card = document.createElement("div");
        card.innerHTML = `            
                        <div class="card" style="width: 18rem;">
                            <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
                            <div class="card-body">
                                <h5 class="card-title">${producto.nombre}</h5>
                                <p class="card-text">$${producto.precio}</p>
                                <a href="#" class="btn btn-success btn-sm" id="boton${producto.id}">Agregar al carrito</a>
                            </div>
                        </div>`

        contenedorCard.appendChild(card);
    })
}

let prodOferta = productos.filter(prod => prod.oferta != 0);

////BOTON OFERTAS////
let verOfertas = document.getElementById("btn_ofertas");
verOfertas.addEventListener("click", ()=>{
    contenedorCard.innerHTML = "";
    mostrarProductos(prodOferta);
})

////BOTON PRODUCTOS////
let verProd = document.getElementById("btn_prod");
verProd.addEventListener("click", ()=>{
    contenedorCard.innerHTML = "";
    mostrarProductos(productos);
})

////BUSCAR PRODUCTOS////
let btn_buscar = document.getElementById("btn_buscar");
btn_buscar.addEventListener("click", (e)=>{
    e.preventDefault();
    contenedorCard.innerHTML = "";
    buscarProducto(document.getElementById("buscar").value);
})

function buscarProducto(texto){
    let buscados = productos.filter(prod => prod.nombre.toLowerCase().includes(texto.toLowerCase()));
    mostrarProductos(buscados);
}

////ALERTAS////
function alertaNegativa(texto){
    Toastify({
        text: texto,
        duration: 1500,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#f27474",
        },
        onClick: function(){}
      }).showToast();
}

function alertaExitosa(texto){
    Toastify({
        text: texto,
        duration: 1500,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#a5dc86",
        },
        onClick: function(){}
      }).showToast();
}

mostrarProductos(productos);
mantenerSesion();