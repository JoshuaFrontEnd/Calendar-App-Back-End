/* ----------------------------------------------------------------

  Events Routes
  host + /api/events

---------------------------------------------------------------- */

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { createEvent, readEvent, updateEvent, deleteEvent } = require('../controllers/events');

const router = Router();

// Para evitar colocar la validacion del token en cada peticion podemos hacer la validacion de la siguiente manera:
router.use( validarJWT );

// Create
router.post('/', createEvent );

// Read
router.get('/', readEvent );

// Update
router.put('/:id', updateEvent );

// Delete
router.delete('/:id', deleteEvent );

module.exports = router;