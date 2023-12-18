// Para no perder intellisense declarar nuevamente express y agregar el valor por defecto "response" a "res" de las funcines
const { response } = require('express');
const { validationResult } = require('express-validator');

const crearUsuario = ( req, res = response ) => {

  const { name, email, password } = req.body;

  // 400 es el "status code"
  // Para mas informacion: https://www.restapitutorial.com/httpstatuscodes.html
  // Siempre hacer un "return" al retornar una respuesta, ya que si no se hace, va a retornar la respuesta del if y la de mas abajo, basicamente siempre se debe retornar una sola respuesta o express en la consola dara error
  // if ( name.length < 5 ) {
  //   return res.status( 400 ).json({
  //     ok: false,
  //     msg: 'El nombre debe de tener minimo 5 letras'
  //   })
  // }

  // Manejo de errores con "express-validator"
  const errors = validationResult( req );

  if ( !errors.isEmpty() ) {

    return res.status( 400 ).json({
      ok: false,
      errors: errors.mapped()
    })

  }

  res.json({
    ok: true,
    msg: 'registro',
    name,
    email,
    password
  })

}

const loginUsuario = ( req, res = response ) => {

  const errors = validationResult( req );

  if ( !errors.isEmpty() ) {

    return res.status( 400 ).json({
      ok: false,
      errors: errors.mapped()
    })

  }

  const { email, password } = req.body;

  if ( !errors.isEmpty() ) {

    return res.status( 400 ).json({
      ok: false,
      errors: errors.mapped()
    })

  }

  res.json({
    ok: true,
    msg: 'login',
    email,
    password
  })

}

const revalidarToken = ( req, res = response ) => {

  res.json({
    ok: true,
    msg: 'renew'
  })

}

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken
}