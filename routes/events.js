/* ----------------------------------------------------------------

  Events Routes
  host + /api/events

---------------------------------------------------------------- */

const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { createEvent, readEvent, updateEvent, deleteEvent } = require('../controllers/events');

const router = Router();

// Para evitar colocar la validacion del token en cada peticion podemos hacer la validacion de la siguiente manera:
router.use( validarJWT );

// Create
router.post(
  '/',
  [
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligatoria').custom( isDate ),
    check('end','Fecha de finalizacion es obligatoria').custom( isDate ),
    validarCampos
  ],
  createEvent );

// Read
router.get('/', readEvent );

// Update
router.put(
  '/:id',
  [
      check('title','El titulo es obligatorio').not().isEmpty(),
      check('start','Fecha de inicio es obligatoria').custom( isDate ),
      check('end','Fecha de finalización es obligatoria').custom( isDate ),
      validarCampos
  ],
  updateEvent );

// Delete
router.delete('/:id', deleteEvent );

module.exports = router;