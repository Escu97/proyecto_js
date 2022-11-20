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
    if(localStorage.getItem('Usuarios'))                       //Se fija en el array de usuarios del local storage si hay usuarios creados.
    {
        let users_guardados = JSON.parse(localStorage.getItem('Usuarios'));
        let user = document.getElementById("regist_username").value;
        let pass = document.getElementById("regist_password").value;

        if(validarUser(users_guardados, user, pass) === null)  //Si no encuentra al usuario en el array de users del local storage, lo crea y lo guarda.
        {
            users_guardados.push(usuario);
            localStorage.setItem('Usuarios', JSON.stringify(users_guardados));

            alertaExitosa("Usuario creado");

            document.querySelector(".regist_popup").classList.remove("active_popup");
            document.getElementById("todo").style.visibility = "visible";
            document.querySelector(".login_popup").classList.add("active_popup");
            document.getElementById("todo").style.visibility = "hidden";
        }
        else                                                   //Si encuentra un usuario con el mismo nombre, no lo crea nuevamente.
        {
            alertaNegativa("Usuario ya existente, intente con otro nombre");

            document.getElementById("todo").style.visibility = "hidden";
        }
    }
    else                                                       //Si el array de usuarios esta vacio, directamente crea el usuario.
    {
        let users_guardados = [];
        users_guardados.push(usuario);
        localStorage.setItem('Usuarios', JSON.stringify(users_guardados));

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
    let pass = document.getElementById("login_password").value;
    let alerta = validarUser(usuarios, user, pass)

    if(alerta)                                                 //Si el usuario y constraseña ingresados coinciden con uno existente, hace el log in.
    {
        alertaExitosa("Usted ingreso con exito");
        document.querySelector(".login_popup").classList.remove("active_popup");
        document.getElementById("todo").style.visibility = "visible";
        document.getElementById("login_username").value = "";
        document.getElementById("login_password").value = "";
        localStorage.setItem('UltimaSesion', JSON.stringify(user));

        usuarioLogeado(user);
    }
    else if(alerta == null)                                    //Si no encuentra el usuario, pide el reingreso.
    {
        alertaNegativa("Usuario no encontrado");
        document.getElementById("login_username").value = "";
        document.getElementById("login_password").value = "";
    }
    else                                                       //Si la contraseña no coincide con el usuario, pide el reingreso.
    {
        alertaNegativa("Contraseña equivocada");
        document.getElementById("login_username").value = "";
        document.getElementById("login_password").value = "";
    }
})

function usuarioLogeado(user){                                 //Cambia el boton "Ingresar", por el nombre del usuario ingresado.
    let ingresado = document.getElementById("estado_usuario");

    ingresado.innerHTML =   `
                            <button class="nav-link" id="mostrar_usuario"><i class="bi bi-person-circle"></i>${user.toUpperCase()}</button>
                            `
    cerrarSesion();
}

function mantenerSesion(){                                     //Recupera el usuario de la ultima sesion y lo mantiene iniciado.
    let ultimaSesion = localStorage.getItem('UltimaSesion')
    if(ultimaSesion != null)
    {
        usuarioLogeado(ultimaSesion);
    }
}

function cerrarSesion(){                                       //Cierra la sesion al hacer click en el nombre de usuario.
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

    if(usuarios != null)                                       //Si el array de usuario no esta vacio, continua el proceso.
    {
        while(encontrado === false && i != usuarios.length)    //Mientras no se encuentre el usuario y siga habiendo elementos, sigue el ciclo.
        {
            if(usuarios[i].usuario == user)                    
            {
                if(usuarios[i].contraseña == pass)             //Si el usuario es encontrado, activa la bandera y retorna el resultado dependiendo de la contraseña.
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
        if(encontrado === false)                               //Si el usuario no se encuentra, retorna null.
        {
            return null;
        }
    }
}

////PRODUCTOS////
let ofertas = [1, 2, 3, 4]; // 1= 50% - 2= 25% - 3=15% - 4= 10%//
let productos = [];
const listaProductos = "json/productos.json";
const contenedorCard = document.getElementById("contenedor_productos");

function crearProducto(){                                      //Crea los objetos producto a partir de un archivo JSON.
    fetch(listaProductos)
    .then(respuesta => respuesta.json())
    .then(datos => {
        datos.forEach(producto => {
            productos.push(new Producto(producto.id, producto.nombre, producto.precio, producto.img, producto.oferta));
        })
    })
}

function mostrarProductos(productos){                          //Muestra los productos dinamicamente.
    productos.forEach((producto)=>{
        const card = document.createElement("div");
        card.innerHTML = `            
                        <div class="card" style="width: 16rem;">
                            <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
                            <div class="card-body">
                                <h2 class="card-title">${producto.nombre}</h2>
                                <p class="card-text">$${producto.precio}</p>
                                <button class="btn btn-success" id="boton${producto.id}">Agregar al carrito</button>
                            </div>
                        </div>`

        contenedorCard.appendChild(card);

        const btn_carrito = document.getElementById(`boton${producto.id}`);

        btn_carrito.addEventListener("click", () =>{
            agregarAlCarrito(producto);
        })
    })
}


////BOTON OFERTAS////
let verOfertas = document.getElementById("btn_ofertas");        //Muestra todos los productos que tienen alguna oferta.
verOfertas.addEventListener("click", ()=>{                      //No llegue a implementarlas.
    contenedorCard.innerHTML = "";
    mostrarProductos(productos.filter(prod => prod.oferta != 0));
})

////BOTON PRODUCTOS///
let verProd = document.getElementById("btn_prod");              //Muestra todos los productos disponibles.
verProd.addEventListener("click", ()=>{
    contenedorCard.innerHTML = "";
    mostrarProductos(productos);
})

////BUSCAR PRODUCTOS////
let btn_buscar = document.getElementById("btn_buscar");         //Permite buscar productos mediante el nombre.
btn_buscar.addEventListener("click", (e)=>{
    e.preventDefault();
    contenedorCard.innerHTML = "";
    buscarProducto(document.getElementById("buscar").value);
})

function buscarProducto(texto){                                 //Corrobora que exista algun producto que en el nombre lleve lo escrito en el buscador
    let buscados = productos.filter(prod => prod.nombre.toLowerCase().includes(texto.toLowerCase()));
    mostrarProductos(buscados);
}

////CARRITO////
let carrito = [];

(localStorage.getItem("Carrito")) ? carrito = JSON.parse(localStorage.getItem("Carrito")) : carrito = [];

function agregarAlCarrito(prod){                                //Verifica si el producto agregado ya existe o es nuevo. 

    const existe = carrito.some(producto => producto.id === prod.id);

    (existe)? (prod.cantidad ++, alertaExitosa("Cantidad del producto actualizada")) : (carrito.push(prod), alertaExitosa("Producto agregado al carrito"))

    localStorage.setItem("Carrito", JSON.stringify(carrito));
    mostrarCantidad();
}

function mostrarCantidad(){                                     //Muestra la cantidad de productos en el carrito.
    let contadorProductos = 0;
    carrito.forEach((prod)=>{
        contadorProductos += prod.cantidad;
    })
    const verContador = document.getElementById("verCantidad");
    verContador.innerHTML = `
                            ${contadorProductos}
                            `
}

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", ()=> {
    mostrarCarrito();
})

function mostrarCarrito(){                                          //Muestra el carrito.
    contenedorCarrito.innerHTML = "";
    let precio_total = 0;
    carrito.forEach((producto) =>{
        const {id, nombre, precio, img, cantidad} = producto;
        const prodCarrito = document.createElement("div");
        prodCarrito.innerHTML = `
                                <div class="card_carrito">
                                    <div class="card_carrito">
                                    <img src="${img}" class="img_carrito" alt="${nombre}">
                                    </div>
                                    <div class="card_carrito">
                                    <p class="nombre_carrito">${nombre}</p>
                                    </div>
                                    <div class="card_carrito">
                                    <p class="precio_carrito">$${(precio*cantidad)}</p>
                                    </div>
                                    <div class="card_carrito">
                                    <p class="cant_carrito">${cantidad}</p>
                                    </div>
                                    <div class="card_carrito">
                                    <button class="btn btn_cant" id="btn_sumar_${id}">
                                    <i class="bi bi-plus-circle-fill"></i>
                                    </button>
                                    <button class="btn btn_cant" id="btn_restar_${id}">
                                    <i class="bi bi-dash-circle-fill"></i>
                                    </button>
                                    </div>
                                </div>
                                `
        contenedorCarrito.appendChild(prodCarrito);

        precio_total += (cantidad*precio);

        const btn_restar = document.getElementById(`btn_restar_${id}`);
        btn_restar.addEventListener("click", ()=>{
        restarCarrito(producto);
        })

        const btn_sumar = document.getElementById(`btn_sumar_${id}`);
        btn_sumar.addEventListener("click", ()=>{
            sumarCarrito(producto);
        })
    })

    const verTotal = document.createElement("div");
    verTotal.innerHTML =`
                        <div class="total_carrito">
                        <p class="total">Total a pagar:</p>
                        <p class="total">$${precio_total}</p>
                        </div>
                        `
    contenedorCarrito.appendChild(verTotal);
}


function restarCarrito(producto){
    if(producto.cantidad == 1){
        const index = carrito.indexOf(producto);
        carrito.splice(index, 1);
        alertaNegativa("Producto eliminado");
    }
    else{
        producto.cantidad--;
        alertaExitosa("Cantidad del producto actualizada");
    }
    mostrarCarrito();
    mostrarCantidad();
    localStorage.setItem("Carrito", JSON.stringify(carrito));
}

function sumarCarrito(producto){
    producto.cantidad++;
    alertaExitosa("Cantidad del producto actualizada");
    mostrarCarrito();
    mostrarCantidad();
    localStorage.setItem("Carrito", JSON.stringify(carrito));
}

////ALERTAS////
function alertaNegativa(texto){
    Toastify({
        text: texto,
        duration: 1000,
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
        duration: 1000,
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

setTimeout(()=> mostrarProductos(productos),100);
crearProducto();
mostrarCarrito();
mantenerSesion();
mostrarCantidad();