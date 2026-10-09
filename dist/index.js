"use strict";
// --- Código de prueba solicitado por el profesor ---
const botonPrueba = document.querySelector("#boton-prueba");
const mensajePrueba = document.querySelector("#mensaje-prueba");
if (botonPrueba !== null && mensajePrueba !== null) {
    botonPrueba.addEventListener("click", () => {
        mensajePrueba.textContent = "El catálogo está listo para comenzar";
    });
}
// ACTIVIDAD 2: Array con al menos 5 productos
let productos = [
    { id: 1, nombre: "Teclado", categoria: "Periféricos", precio: 25000, stock: 8 },
    { id: 2, nombre: "Mouse", categoria: "Periféricos", precio: 15000, stock: 0 },
    { id: 3, nombre: "Monitor", categoria: "Pantallas", precio: 180000, stock: 4 },
    { id: 4, nombre: "Auriculares", categoria: "Periféricos", precio: 35000, stock: 12 },
    { id: 5, nombre: "Silla Gamer", categoria: "Mobiliario", precio: 210000, stock: 3 }
];
// ACTIVIDAD 2: Agregar un nuevo producto
const nuevoProductoActividad2 = {
    id: 6,
    nombre: "Webcam Full HD",
    categoria: "Periféricos",
    precio: 45000,
    stock: 5
};
productos.push(nuevoProductoActividad2);
console.log(productos);
// --- Selección de elementos del DOM ---
const formProducto = document.getElementById('form-producto');
const inputNombre = document.getElementById('nombre');
const selectCategoria = document.getElementById('categoria');
const inputPrecio = document.getElementById('precio');
const inputStock = document.getElementById('stock');
const filtroNombre = document.getElementById('filtro-nombre');
const filtroCategoria = document.getElementById('filtro-categoria');
const filtroPrecioMax = document.getElementById('filtro-precio-max');
const filtroStock = document.getElementById('filtro-stock');
const contenedorProductos = document.getElementById('lista-productos');
const elemTotalProductos = document.getElementById('total-productos');
const elemTotalStock = document.getElementById('total-stock');
const elemValorTotal = document.getElementById('valor-total');
// --- Función para renderizar los productos en pantalla ---
function renderizarProductos() {
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
        if (opcionStock === "con-stock")
            cumpleStock = prod.stock > 0;
        if (opcionStock === "sin-stock")
            cumpleStock = prod.stock === 0;
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
function actualizarResumen(listaActual) {
    const totalProd = listaActual.length;
    const totalStock = listaActual.reduce((acc, p) => acc + p.stock, 0);
    const valorTotal = listaActual.reduce((acc, p) => acc + (p.precio * p.stock), 0);
    if (elemTotalProductos)
        elemTotalProductos.textContent = totalProd.toString();
    if (elemTotalStock)
        elemTotalStock.textContent = `${totalStock} u.`;
    if (elemValorTotal)
        elemValorTotal.textContent = `$${valorTotal.toFixed(2)}`;
}
// --- Evento: Agregar producto ---
if (formProducto) {
    formProducto.addEventListener('submit', (e) => {
        e.preventDefault();
        const nuevoProducto = {
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
if (filtroNombre)
    filtroNombre.addEventListener('input', renderizarProductos);
if (filtroCategoria)
    filtroCategoria.addEventListener('change', renderizarProductos);
if (filtroPrecioMax)
    filtroPrecioMax.addEventListener('input', renderizarProductos);
if (filtroStock)
    filtroStock.addEventListener('change', renderizarProductos);
// Inicializar la vista
renderizarProductos();
// Crear 2 proyectos
const proyectoWeb = { id: 1, nombre: "E-Commerce TypeScript", tecnologias: ["HTML", "CSS", "TS"] };
const proyectoApp = { id: 2, nombre: "App Mobile Registro", tecnologias: ["React Native", "TS"] };
// Crear 4 alumnos
const alumnos = [
    { id: 1, nombre: "Santiago", email: "santiago@email.com", proyecto: proyectoWeb },
    { id: 2, nombre: "María", proyecto: proyectoApp },
    { id: 3, nombre: "Lucas", email: "lucas@email.com", proyecto: null },
    { id: 4, nombre: "Sofia", proyecto: null }
];
if (mensajePrueba !== null) {
    let listadoAlumnos = "<strong>Alumnos y Proyectos:</strong><br>";
    alumnos.forEach(alumno => {
        const tieneProyecto = alumno.proyecto !== null
            ? `Tiene proyecto: "${alumno.proyecto.nombre}"`
            : "Sin proyecto asignado";
        listadoAlumnos += `- ${alumno.nombre}: ${tieneProyecto}<br>`;
    });
    mensajePrueba.innerHTML = listadoAlumnos;
}
//comprobacion por consola
console.log("Proyectos:", [proyectoWeb, proyectoApp]);
console.log("Alumnos", alumnos);
// ---------------------------- Fin activ 3-------------
