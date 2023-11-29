const express = require('express');
require('dotenv').config();

console.log( process.env );

// Creando el servidor de express
const app = express();

// Directorio Publico
app.use( express.static('public') );

// Rutas
// app.get('/', ( req, res ) => {

//   res.json({
//     ok: true
//   })

// });

// Escuchar peticiones
app.listen( process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});

/* ----------------------------------------------------------------

  use() en express es un middleware

  Un middleware es una simple funcion que se ejecuta cuando pasa por
  algun lugar, en este caso, use() es basicamente una funcion que se
  ejecuta en el momento en que alguien hace una peticion a mi servidor

---------------------------------------------------------------- */