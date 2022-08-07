const express = require('express');
const { leerUrl, agregarUrl, eliminarUrl } = require('../controllers/homeController');
const router = express.Router();

router.get("/", leerUrl);
router.post("/", agregarUrl);
router.get("/eliminar/:id", eliminarUrl);


module.exports = router;

