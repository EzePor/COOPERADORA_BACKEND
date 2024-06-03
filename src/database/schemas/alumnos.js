// se realiza el esquema de almacenamieno de datos utilizando la conexion a la DB

const mongoose = require("mongoose");

const alumnosSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  dni: Number,
  direccion: String,
  telefono: String,
  email: String,
  fechaNacimiento: Date,
  fechaIngreso: Date,
});
// luego exportamos este esquema para utilizarlo en alumnos.js/controllers
module.exports = mongoose.model("Alumnos", alumnosSchema); // 1 nombre DB, 2 el esquema
