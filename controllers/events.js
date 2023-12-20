const { response } = require('express');
const Evento = require('../models/Evento');


// Create
const createEvent = async ( req, res = response ) => {

  const evento = new Evento( req.body );

  console.log( req.uid );

  try {

    // Obtengo el id del usuario
    evento.user = req.uid;

    // Grabo el evento en la base de datos
    const eventoGuardado = await evento.save();

    res.json({
      ok: true,
      evento: eventoGuardado
    })


  } catch (error) {

    res.status( 500 ).json({
      ok: false,
      msg: 'Hable con el administrador'
    })

  }

}

// Read
const readEvent = ( req, res = response ) => {

  res.json({
    ok: true,
    msg: 'readEvent'
  })

}

// Update
const updateEvent = ( req, res = response ) => {

  res.json({
    ok: true,
    msg: 'updateEvent'
  })

}

// Delete
const deleteEvent = ( req, res = response ) => {

  res.json({
    ok: true,
    msg: 'deleteEvent'
  })

}

module.exports = {
  readEvent,
  createEvent,
  updateEvent,
  deleteEvent
}