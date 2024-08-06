const MDB_ALUMNOS = require("../database/schemas/alumnos"); //MDB_ modelo de esquema DB

// funciones para obtener los alumnos y crear uno nuevo.
// luego se las pasamos al get y al post respectivamente...en las RUTAS_ALUMNOS(routes, alumnos.js)
const calcularEdad = (fechaNacimiento) => {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  return edad;
};

const obtenerAlumnoIndividual = async (req, res) => {
  const { id } = req.params;
  const alumno = await MDB_ALUMNOS.findById(id);
  res.send({ ...alumno._doc });
};

const obtenerAlumnos = async (req, res) => {
  try {
    const alumnos = await MDB_ALUMNOS.find(); // Obtiene todos los alumnos de la base de datos

    // Calcula la edad de cada alumno y añade la propiedad edad al objeto
    const response = alumnos.map((alumno) => {
      const edad = calcularEdad(alumno.fechaNacimiento);
      return {
        ...alumno._doc, // Copia todas las propiedades originales del documento de MongoDB
        edad, // Añade la nueva propiedad edad
      };
    });

    res.send(response); // Envía la respuesta con el array de alumnos con la edad añadida
  } catch (error) {
    res.status(500).send({ error: "Error al obtener los alumnos" }); // Manejo de errores
  }
};

const crearAlumno = async (req, res) => {
  const response = await MDB_ALUMNOS.create({
    ...req.body,
  });

  console.log(response);

  res.send(response);
};

const eliminarAlumno = async (req, res) => {
  try {
    const { id } = req.params; // Extrae el ID de los parámetros de la solicitud
    console.log(id);
    console.log(req.params.id);

    // Encuentra y elimina el alumno por ID
    const response = await MDB_ALUMNOS.findByIdAndDelete(id);

    res.send({ status: "Estudiande eliminado", response });
  } catch (error) {
    console.error("Error al eliminar el alumno:", error);
    res.status(500).send({ error: "Error al eliminar el alumno" });
  }
};

module.exports = {
  obtenerAlumnos,
  crearAlumno,
  eliminarAlumno,
  obtenerAlumnoIndividual,
};
