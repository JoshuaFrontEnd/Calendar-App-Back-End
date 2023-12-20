const { response } = require('express');

// Create
const createEvent = ( req, res = response ) => {

  console.log( req.body );

  res.json({
    ok: true,
    msg: 'createEvent'
  })

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