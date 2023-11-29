// Para no perder intellisense declarar nuevamente express y agregar el valor por defecto "response" a "res" de las funcines
const { response } = require('express');

const crearUsuario = ( req, res = response ) => {

  res.json({
    ok: true,
    msg: 'registro'
  })

}

const loginUsuario = ( req, res = response ) => {

  res.json({
    ok: true,
    msg: 'login'
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