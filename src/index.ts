// --- Código de prueba solicitado por el profesor ---
const botonPrueba = document.querySelector<HTMLButtonElement>("#boton-prueba");
const mensajePrueba = document.querySelector<HTMLParagraphElement>("#mensaje-prueba");

if (botonPrueba !== null && mensajePrueba !== null) {
  botonPrueba.addEventListener("click", () => {
    mensajePrueba.textContent = "El catálogo está listo para comenzar";
  });
}

// ACTIVIDAD 1 & 2: Interface Producto
interface Producto {
    id: number;
    nombre: string;
    categoria: string;
    precio: number;
    stock: number;
}

// ACTIVIDAD 2: Array con al menos 5 productos
let productos: Producto[] = [
    { id: 1, nombre: "Teclado", categoria: "Periféricos", precio: 25000, stock: 8 },
    { id: 2, nombre: "Mouse", categoria: "Periféricos", precio: 15000, stock: 0 },
    { id: 3, nombre: "Monitor", categoria: "Pantallas", precio: 180000, stock: 4 },
    { id: 4, nombre: "Auriculares", categoria: "Periféricos", precio: 35000, stock: 12 },
    { id: 5, nombre: "Silla Gamer", categoria: "Mobiliario", precio: 210000, stock: 3 }
];

// ACTIVIDAD 2: Agregar un nuevo producto
const nuevoProductoActividad2: Producto = {
    id: 6,
    nombre: "Webcam Full HD",
    categoria: "Periféricos",
    precio: 45000,
    stock: 5
};

productos.push(nuevoProductoActividad2);

console.log(productos);

// --- Selección de elementos del DOM ---
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

// --- Función para renderizar los productos en pantalla ---
function renderizarProductos(): void {
    const textoNombre = filtroNombre ? filtroNombre.value.toLowerCase().trim() : "";
    const catSeleccionada = filtroCategoria ? filtroCategoria.value : "";
    const precioMax = (filtroPrecioMax && filtroPrecioMax.value) ? parseFloat(filtroPrecioMax.value) : Infinity;
    const opcionStock = filtroStock ? filtroStock.value : "";

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
    if (contenedorProductos) {
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
    }

    actualizarResumen(productosFiltrados);
}

// --- Función para actualizar los totales del resumen ---
function actualizarResumen(listaActual: Producto[]): void {
    const totalProd = listaActual.length;
    const totalStock = listaActual.reduce((acc, p) => acc + p.stock, 0);
    const valorTotal = listaActual.reduce((acc, p) => acc + (p.precio * p.stock), 0);

    if (elemTotalProductos) elemTotalProductos.textContent = totalProd.toString();
    if (elemTotalStock) elemTotalStock.textContent = `${totalStock} u.`;
    if (elemValorTotal) elemValorTotal.textContent = `$${valorTotal.toFixed(2)}`;
}

// --- Evento: Agregar producto ---
if (formProducto) {
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
}

// --- Eventos: Escuchar cambios en los filtros ---
if (filtroNombre) filtroNombre.addEventListener('input', renderizarProductos);
if (filtroCategoria) filtroCategoria.addEventListener('change', renderizarProductos);
if (filtroPrecioMax) filtroPrecioMax.addEventListener('input', renderizarProductos);
if (filtroStock) filtroStock.addEventListener('change', renderizarProductos);

// Inicializar la vista
renderizarProductos();