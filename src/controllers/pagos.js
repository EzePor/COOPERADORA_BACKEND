const MDB_PAGOS = require("../database/schemas/Pagos");

const getPagos = async (req, res) => {
  const pagos = await MDB_PAGOS.find()
    .populate("alumno_id")
    .populate("cobro_id");
  res.send({ pagos });
};

const postPagos = async (req, res) => {
  try {
    const { body } = req;

    const response = await MDB_PAGOS.create(body);

    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getPagos,
  postPagos,
};
