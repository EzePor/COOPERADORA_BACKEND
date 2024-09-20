const express = require("express");
const RUTAS_PAGOS = express.Router();
const {
  getPagos,
  getPagoById,
  postPagos,
  putPago,
} = require("../controllers/pagos");

RUTAS_PAGOS.route("/").get(getPagos).post(postPagos);

RUTAS_PAGOS.route("/:id").put(putPago).get(getPagoById);

module.exports = RUTAS_PAGOS;
