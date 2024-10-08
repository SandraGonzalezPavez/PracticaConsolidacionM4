
const productosSeleccionados = {};


const preciosProductos = {
    "Leche Entera Colun": 1000,
    "Pan de Molde Ideal": 2000,
    "Queso Ranco Colun": 1200,
    "Mermelada En línea": 890,
    "Azúcar Iansa": 1300
};


function asignarEventos() {
    const botonesAgregar = document.querySelectorAll('.btn-agregar');

    botonesAgregar.forEach((boton) => {
        boton.addEventListener('click', function(event) {
            event.preventDefault();

            const productoCard = this.closest('.card-body');
            const tituloProducto = productoCard.querySelector('.card-title').textContent;
            const inputCantidad = productoCard.querySelector('.cantidad-input');
            const cantidadContainer = productoCard.querySelector('.cantidad'); 

            
            cantidadContainer.style.display = 'block';

            
            const btnConfirmar = cantidadContainer.querySelector('.btn-confirmar');
            btnConfirmar.onclick = () => {
                const cantidad = parseInt(inputCantidad.value);
                if (cantidad > 0) {
                    agregarProductoAlDetalle(tituloProducto, cantidad);
                    inputCantidad.value = 1; 
                    cantidadContainer.style.display = 'none'; 
                } else {
                    alert('Por favor, selecciona una cantidad válida.');
                }
            };
        });
    });

    
    document.addEventListener('click', function(event) {
        // Si el botón clickeado es de incremento
        if (event.target.classList.contains('btn-increment')) {
            const cantidadInput = event.target.closest('.input-group').querySelector('.cantidad-input');
            let value = parseInt(cantidadInput.value);
            cantidadInput.value = value + 1;
        }
    
        // Si el botón clickeado es de decremento
        if (event.target.classList.contains('btn-decrement')) {
            const cantidadInput = event.target.closest('.input-group').querySelector('.cantidad-input');
            let value = parseInt(cantidadInput.value);
            if (value > 1) {
                cantidadInput.value = value - 1;
            }
        }
    });
    
}


function agregarProductoAlDetalle(nombreProducto, cantidad) {
    if (productosSeleccionados[nombreProducto]) {
        productosSeleccionados[nombreProducto] += cantidad;
    } else {
        productosSeleccionados[nombreProducto] = cantidad;
    }

    actualizarDetalleCompra();
}


function actualizarDetalleCompra() {
    const detalleCompraElement = document.getElementById('DetalleCompra');
    detalleCompraElement.innerHTML = '';

    let total = 0;

    for (let producto in productosSeleccionados) {
        let cantidad = productosSeleccionados[producto];
        let precio = preciosProductos[producto];
        console.log(`Producto: ${producto}, Cantidad: ${cantidad}, Precio: ${precio}`); // Verificar el precio
        let subtotal = cantidad * precio;

        total += subtotal;

        detalleCompraElement.innerHTML += `<p>${producto}: ${cantidad} unidades - $${subtotal}</p>`;
    }

    detalleCompraElement.innerHTML += `<p><strong>Total de la compra:</strong> $${total}</p>`;
}


window.onload = asignarEventos;
