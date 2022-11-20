class Producto{
    constructor(id, nombre, precio, img, oferta){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.oferta = oferta;
        this.cantidad = 1;
    }
}

class Usuario{
    constructor(usuario, contraseña){
        this.usuario = usuario;
        this.contraseña = contraseña;
        this.admin = 0;
    }
}