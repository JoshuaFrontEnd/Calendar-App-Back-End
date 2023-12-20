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
const readEvent = async ( req, res = response ) => {

  const eventos = await Evento.find().populate( 'user','name' );

  res.json({
    ok: true,
    eventos

  })

}

// Update
const updateEvent = async ( req, res = response ) => {

  // Obteniendo el id que viene en la url
  const eventoId = req.params.id;
  const uid = req.uid;

  try {

    const evento = await Evento.findById( eventoId );

    if ( !evento ) {
      return res.status( 404 ).json({
        ok: false,
        msg: 'No existe evento con ese id'
      });
    }

    if ( evento.user.toString() !== uid) {
      return res.status( 401 ).json({
        ok: false,
        msg: 'No tiene privilegios para editar este evento'
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid
    }

    // Acá actualizo el evento en la base de datos y el argumento "{ new: true }" es para que se vea en tiempo real la actualización en postman
    const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

    res.json({
      ok: true,
      evento: eventoActualizado
    });


  } catch ( error ) {

    console.log( error );
    res.status( 500 ).json({
      ok: false,
      msg: 'Hable con el administrador'
    });

  }

}

// Delete
const deleteEvent = async ( req, res = response ) => {

  // Obteniendo el id que viene en la url
  const eventoId = req.params.id;
  const uid = req.uid;

  try {

    const evento = await Evento.findById( eventoId );

    if ( !evento ) {
      return res.status( 404 ).json({
        ok: false,
        msg: 'No existe evento con ese id'
      });
    }

    if ( evento.user.toString() !== uid) {
      return res.status( 401 ).json({
        ok: false,
        msg: 'No tiene privilegios para eliminar este evento'
      });
    }

    // Acá actualizo el evento en la base de datos y el argumento "{ new: true }" es para que se vea en tiempo real la actualización en postman
    await Evento.findByIdAndDelete( eventoId );

    res.json({
      ok: true
    });


  } catch ( error ) {

    console.log( error );
    res.status( 500 ).json({
      ok: false,
      msg: 'Hable con el administrador'
    });

  }

}

module.exports = {
  readEvent,
  createEvent,
  updateEvent,
  deleteEvent
}