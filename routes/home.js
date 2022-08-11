const express = require('express');
const { leerUrl, agregarUrl, eliminarUrl, editarUrlForm, editarUrl, redireccionamiento } = require('../controllers/homeController');
const { formPerfil, editarImagenPerfil } = require('../controllers/perfilController');
const urlValidation = require('../middlewares/urlValidation');

const verificarUser = require('../middlewares/verificarUser');
const router = express.Router();

router.get("/", verificarUser, leerUrl);
router.post("/", verificarUser, urlValidation, agregarUrl);
router.get("/eliminar/:id",verificarUser, eliminarUrl);
router.get("/editar/:id", verificarUser,editarUrlForm);
router.post("/editar/:id", verificarUser, urlValidation, editarUrl);

router.get("/perfil", verificarUser, formPerfil);
router.post("/perfil", verificarUser, editarImagenPerfil);

router.get("/:shortURL", redireccionamiento);


module.exports = router;

