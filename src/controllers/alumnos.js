const MDB_ALUMNOS = require("../database/schemas/alumnos"); //MDB_ modelo de esquema DB

// funciones para obtener los alumnos y crear uno nuevo.
// luego se las pasamos al get y al post respectivamente...en las RUTAS_ALUMNOS(routes, alumnos.js)

const obtenerAlumnos = async (req, res) => {
  const response = await MDB_ALUMNOS.find();

  res.send(response);
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
    await MDB_ALUMNOS.findByIdAndDelete(id);
    
    res.send({ status: 'Estudiande eliminado' });
  } catch (error) {
    console.error('Error al eliminar el alumno:', error);
    res.status(500).send({ error: 'Error al eliminar el alumno' });
  }
};

module.exports = {
  obtenerAlumnos,
  crearAlumno,
  eliminarAlumno
};
