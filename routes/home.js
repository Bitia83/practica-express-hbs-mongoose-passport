const express = require('express');
const { leerUrl, agregarUrl, eliminarUrl, editarUrlForm, editarUrl, redireccionamiento } = require('../controllers/homeController');
const urlValidation = require('../middlewares/urlValidation');
const router = express.Router();

router.get("/", leerUrl);
router.post("/",urlValidation, agregarUrl);
router.get("/eliminar/:id", eliminarUrl);
router.get("/editar/:id", editarUrlForm);
router.post("/editar/:id", urlValidation, editarUrl);
router.get("/:shortURL", redireccionamiento);


module.exports = router;

