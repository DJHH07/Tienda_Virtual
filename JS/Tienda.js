//leemos la clase que contiene el icono del carrito
const btncart = document.querySelector('.container-cart-icon')
//leemos los elementos que al dar click al icono del carrito se van a mostrar 
const containerCartProducts = document.querySelector('.container-cart-productos')

//Cada que nosotros damos click al icono del carrito 
//ingresara aca
btncart.addEventListener('click', () => {
    //utilizamos la funcion 
    //.classList.toggle('') esto funciona como un shuich
    containerCartProducts.classList.toggle('hidden-cart')
})

// esto es para lo que va ir dentro del carrito
const cartInfo = document.querySelector('cart-product')

//obtenemos donde vamos a isertar la informacioon 
const rowProduct = document.querySelector('.row-product')

// lista de los contenedores de los productos 
const productList = document.querySelector('.container-items')

//variable que tiene el carrito
const carrito = document.querySelector('.cart-total')
//console.log(carrito);

//arreglo arreglos de productos
let allProducts = []

//variable que guarda el total de los productos 
const valorTotal = document.querySelector('.total-pagar')
//variable que guarda el total de productos
const countProductos = document.querySelector('#contador-productos')

//funcion que guarda los elementos en el almacenamiento de la paguina
const saveTodo = ()=>{
    console.log("Almacenamiento");
    if(JSON.parse(localStorage.getItem('todo')) === null){
        localStorage.setItem('todo', JSON.stringify(allProducts))
        return;
    }
    localStorage.setItem('todo', JSON.stringify(allProducts))
}


//esto hara la lista de productos 
productList.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')) {
        //aca obtendremos la informacion de la targeta a la cual fuimos dando click
        const producto = e.target.parentElement //guardamos toda la target
        //objeto que guardara la informacion del producto 
        const infoProduct = {
            id: Date.now(),
            cantidad: 1,
            titulo: producto.querySelector('h2').textContent,
            precio: producto.querySelector('p').textContent
        }

        //esto nos contara el numero de elementos del mismo tipo que ya estan en el carrito
        const existe = allProducts.some(producto => producto.titulo === infoProduct.titulo)

        if(existe){
            const productos = allProducts.map(producto => {
                if(producto.titulo === infoProduct.titulo){
                    producto.cantidad ++;
                    return producto;
                }else{
                    return producto;
                }
            })
            //esto lleva el conteo de los productos repetidos
            allProducts = [...productos]
        }else{
            //añadimos el producto a la lista 
            //esto lo que hace es que al arreglo se le agrega un nuevo elmento
            allProducts = [...allProducts, infoProduct]
        }

        saveTodo()
        showHTML();
    }
})


//evento que eliminara los productos que no deseamos en el carrito
rowProduct.addEventListener('click', e =>{

    //console.log(e.target);
    const productid = e.target.id;

    allProducts = allProducts.filter(i => i.id != productid) 
        //console.log(product);
        //tomamos con id al nombre del producto
        //const titulo = product.querySelector('p').textContent;

        //allProducts = allProducts.filter(i => i.titulo != titulo);
    saveTodo();
    showHTML();
});

//para el boton de la compra
carrito.addEventListener('click', e =>{
    //guarda el precio de la compra 
    const precio = document.querySelector('.total-pagar').textContent
    //guarda los productos de la compra
    const produtos = document.querySelector('.row-product').textContent

    const accion = e.target;

    //console.log(e);
    if(accion.id === 'car'){
        console.log("quieres hacer la compra ");

        //obtiene el objeto de los productos a comprar 
        let mensaje = JSON.stringify(allProducts);

        //este mensaje confirma si se va a regalizar la compra  
        if (confirm("Productos a comprar\n\n"+mensaje+"\n\nTotal de la compra: "+precio)) {
            // Código que se ejecuta si se hace clic en "Aceptar"
            location.reload();
            allProducts = []
            saveTodo()
          } else {
            // Código que se ejecuta si se hace clic en "Cancelar"
          }
        // alert("Productos a comprar\n\n"+mensaje+"\n\nTotal de la compra: "+precio)
        // setTimeout(function() {
        //     location.reload();
        // }, 100);
        //Swal.fire("Productos a comprar\n\n"+produtos+"\n\nTotal a pagar: "+precio)
        // allProducts = []
        // saveTodo()
    }
})

//esta funcion mostrara el arreglo en el carrito 
const showHTML = () => {

    console.log(JSON.parse(localStorage.getItem('todo')).length);
    

    //limpiando html
    rowProduct.innerHTML = ''

    //esto nos permite agregar el producto al almacenamiento
    allProducts = JSON.parse(localStorage.getItem('todo'))
    saveTodo()


    //aca aumentaremos el total de productos del carrito y el total del precio de los productos 
    let total = 0;
    let totalProductos = 0;
    
    
    allProducts.forEach(producto => { 
        const containerProducto = document.createElement('div')
        containerProducto.classList.add('cart-product')
        containerProducto.innerHTML = `
        <div class="info-cart-product">
            <span class="cantidad-producto-carrito"> 
                ${producto.cantidad}
            </span>
            <p class="titulo-producto-carrito">
                ${producto.titulo}
            </p>
            <span class="precio-producto-carrito">
                ${producto.precio}
            </span>
        </div>
        <svg id = "${producto.id} " class="icon-close" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
        `

        //añadimos cada producto al carrito
        rowProduct.append(containerProducto);

        //para actualizar el valor y el total de products 
        total += parseInt(producto.cantidad*producto.precio.slice(2));
        totalProductos = totalProductos + producto.cantidad; 
        
    });
    //console.log(total);
    valorTotal.textContent = `$${total}`
    countProductos.innerText = totalProductos;

}


document.addEventListener('DOMContentLoaded', (event)=>{
    //console.log("entrada");
    showHTML();
})


