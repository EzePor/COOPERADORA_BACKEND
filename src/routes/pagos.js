const express = require("express");
const RUTAS_PAGOS = express.Router();
const { getPagos, postPagos } = require("../controllers/pagos");

RUTAS_PAGOS.route("/").get(getPagos).post(postPagos);

module.exports = RUTAS_PAGOS;
