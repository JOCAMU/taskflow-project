const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

router.get('/', taskController.obtenerTareas);
router.post('/', taskController.crearTarea);
router.delete('/:id', taskController.eliminarTarea);
router.patch('/:id', taskController.actualizarTarea);

module.exports = router;
