// --- Código de prueba solicitado por el profesor ---
const botonPrueba = document.querySelector<HTMLButtonElement>("#boton-prueba");
const mensajePrueba = document.querySelector<HTMLParagraphElement>("#mensaje-prueba");

if (botonPrueba !== null && mensajePrueba !== null) {
  botonPrueba.addEventListener("click", () => {
    mensajePrueba.textContent = "El catálogo está listo para comenzar";
  });
}


interface Producto {
    id: number;
    nombre: string;
    categoria: string;
    precio: number;
    stock: number;
}

// Estado global
let productos: Producto[] = [
    { id: 1, nombre: "Auriculares Bluetooth", categoria: "Electronica", precio: 49.99, stock: 15 },
    { id: 2, nombre: "Camiseta de Algodón", categoria: "Ropa", precio: 15.00, stock: 0 }
];

// Selección de elementos del DOM
const formProducto = document.getElementById('form-producto') as HTMLFormElement;
const inputNombre = document.getElementById('nombre') as HTMLInputElement;
const selectCategoria = document.getElementById('categoria') as HTMLSelectElement;
const inputPrecio = document.getElementById('precio') as HTMLInputElement;
const inputStock = document.getElementById('stock') as HTMLInputElement;

const filtroNombre = document.getElementById('filtro-nombre') as HTMLInputElement;
const filtroCategoria = document.getElementById('filtro-categoria') as HTMLSelectElement;
const filtroPrecioMax = document.getElementById('filtro-precio-max') as HTMLInputElement;
const filtroStock = document.getElementById('filtro-stock') as HTMLSelectElement;

const contenedorProductos = document.getElementById('lista-productos') as HTMLDivElement;
const elemTotalProductos = document.getElementById('total-productos') as HTMLElement;
const elemTotalStock = document.getElementById('total-stock') as HTMLElement;
const elemValorTotal = document.getElementById('valor-total') as HTMLElement;

// Función para renderizar los productos en pantalla
function renderizarProductos(): void {
    const textoNombre = filtroNombre.value.toLowerCase().trim();
    const catSeleccionada = filtroCategoria.value;
    const precioMax = filtroPrecioMax.value ? parseFloat(filtroPrecioMax.value) : Infinity;
    const opcionStock = filtroStock.value;

    // Filtrado de la lista
    const productosFiltrados = productos.filter(prod => {
        const cumpleNombre = prod.nombre.toLowerCase().includes(textoNombre);
        const cumpleCategoria = catSeleccionada === "" || prod.categoria === catSeleccionada;
        const cumplePrecio = prod.precio <= precioMax;
        
        let cumpleStock = true;
        if (opcionStock === "con-stock") cumpleStock = prod.stock > 0;
        if (opcionStock === "sin-stock") cumpleStock = prod.stock === 0;

        return cumpleNombre && cumpleCategoria && cumplePrecio && cumpleStock;
    });

    // Limpiar contenedor
    contenedorProductos.innerHTML = '';

    if (productosFiltrados.length === 0) {
        contenedorProductos.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #777;">No se encontraron productos.</p>';
        actualizarResumen(productosFiltrados);
        return;
    }

    // Dibujar tarjetas
    productosFiltrados.forEach(prod => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-producto';

        const stockTexto = prod.stock > 0 
            ? `<span class="stock-tag">Stock: ${prod.stock} u.</span>` 
            : `<span class="stock-tag agotado">Agotado</span>`;

        tarjeta.innerHTML = `
            <h3>${prod.nombre}</h3>
            <span class="categoria-tag">${prod.categoria}</span>
            <div class="precio-tag">$${prod.precio.toFixed(2)}</div>
            ${stockTexto}
        `;

        contenedorProductos.appendChild(tarjeta);
    });

    actualizarResumen(productosFiltrados);
}

// Función para actualizar los totales del resumen
function actualizarResumen(listaActual: Producto[]): void {
    const totalProd = listaActual.length;
    const totalStock = listaActual.reduce((acc, p) => acc + p.stock, 0);
    const valorTotal = listaActual.reduce((acc, p) => acc + (p.precio * p.stock), 0);

    elemTotalProductos.textContent = totalProd.toString();
    elemTotalStock.textContent = `${totalStock} u.`;
    elemValorTotal.textContent = `$${valorTotal.toFixed(2)}`;
}

// Evento: Agregar producto
formProducto.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    const nuevoProducto: Producto = {
        id: Date.now(),
        nombre: inputNombre.value.trim(),
        categoria: selectCategoria.value,
        precio: parseFloat(inputPrecio.value),
        stock: parseInt(inputStock.value, 10)
    };

    productos.push(nuevoProducto);
    formProducto.reset();
    renderizarProductos();
});

// Eventos: Escuchar cambios en los filtros
filtroNombre.addEventListener('input', renderizarProductos);
filtroCategoria.addEventListener('change', renderizarProductos);
filtroPrecioMax.addEventListener('input', renderizarProductos);
filtroStock.addEventListener('change', renderizarProductos);

// Inicializar la vista
renderizarProductos();