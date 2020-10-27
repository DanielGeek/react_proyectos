// Function Declaretion
function saludar(nombre) {

    console.log('Bienvenido ' + nombre);
}
saludar('Daniel');

// Function Expresion

const cliente = function (nombreCliente) {
    console.log(`Mostrando datos del cliente: ${nombreCliente}`);
}
cliente('Daniel');

// Template Strings
// const nombre = 'Daniel';
// const trabajo = 'Desarrollador Web';

// Concatenar js
// console.log('Nombre: ' + nombre + ', Trabajo: ' + trabajo);
// console.log(`Nombre: ${nombre}, Trabajo: ${trabajo}`);

// Concatenar con múltiples líneas
// const contenedorApp = document.querySelector('#app');
// let html = `
//         <ul>
//             <li>Nombre: ${nombre} </li>
//             <li>Trabajo: ${trabajo} </li>
//         </ul>
//     `;

// contenedorApp.innerHTML = html; 

// scope
// const musica = 'Rock';

// if (musica) {
//     const musica = 'Grunge';
//     console.log('dentro del if:', musica);
// }

// console.log('Fuera del IF', musica);
