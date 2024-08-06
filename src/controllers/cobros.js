const MDB_COBROS = require("../database/schemas/cobros"); //MDB_ modelo de esquema DB

// funciones para obtener los cobros y crear uno nuevo.
// luego se las pasamos al get y al post respectivamente...en las RUTAS_COBROS(routes, alumnos.js)

const obtenerCobros = async (req, res) => {
  const response = await MDB_COBROS.find();

  res.send(response);
};

const crearCobro = async (req, res) => {
  const response = await MDB_COBROS.create({
    ...req.body,
  });

  console.log(response);

  res.send(response);
};

const eliminarCobro = async (req, res) => {
  try {
    const { id } = req.params; // Extrae el ID de los parámetros de la solicitud
    console.log(id);
    console.log(req.params.id);

    // Encuentra y elimina el cobro por ID
    const response = await MDB_COBROS.findByIdAndDelete(id);

    res.send({ status: "Cobro eliminado", response });
  } catch (error) {
    console.error("Error al eliminar el cobro:", error);
    res.status(500).send({ error: "Error al eliminar el cobro" });
  }
};

module.exports = {
  obtenerCobros,
  crearCobro,
  eliminarCobro,
};
