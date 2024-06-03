// Importacion de libreria
require("dotenv").config(); // utiliza las variables de entorno .env
const express = require("express");
const cors = require("cors"); //  para permitir solicitudes desde el frontend.

//Importacion de archivos(controllers, routes,etc...)
const connectDB = require("./src/database/connection"); // conexion mongodb
const RUTAS_ALUMNOS = require("./src/routes/alumnos"); // rutas get/ post/

// Instanciacion de EXPRESS(servidor)
const app = express();

app.use(cors()); // Habilitar CORS para todas las rutas

app.use(express.json()); // para que interprete Json().

// Declaraciones de servidor(rutas que se usan, middleware,etc)
app.use("/alumnos", RUTAS_ALUMNOS); //  1ero base, luego las rutas a utilizar

// Inicializacion del servidor
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
  connectDB(); // Recién ahi conecto la DB
});
