const MDB_PAGOS = require("../database/schemas/Pagos");

const getPagos = async (req, res) => {
  const pagos = await MDB_PAGOS.find()
    .populate("alumno_id")
    .populate("cobro_id");
  res.send({ pagos });
};

const getPagoById = async (req, res) => {
  try {
    const { id } = req.params; // Extrae el ID de los parámetros de la solicitud

    // Encuentra el pago por ID y realiza las operaciones de populate
    const pago = await MDB_PAGOS.findById(id)
      .populate("alumno_id")
      .populate("cobro_id");

    if (!pago) {
      return res.status(404).send({ error: "Pago no encontrado" });
    }

    res.send(pago); // Envía el pago encontrado
  } catch (error) {
    console.error("Error al obtener el pago:", error);
    res.status(500).send({ error: "Error al obtener el pago" });
  }
};

const postPagos = async (req, res) => {
  try {
    const { body } = req;
    const response = await MDB_PAGOS.create(body);
    res.send({ ...response._doc });
  } catch (error) {
    res.status(500).send(error);
  }
};

const putPago = async (req, res) => {
  try {
    const { body } = req;
    const { id } = body;
    const response = await MDB_PAGOS.findByIdAndUpdate(id, { pagado: true });
    res.send({ ...response._doc });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getPagos,
  getPagoById,
  postPagos,
  putPago,
};
