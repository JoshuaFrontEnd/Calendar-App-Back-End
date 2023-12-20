// Para no perder intellisense declarar nuevamente express y agregar el valor por defecto "response" a "res" de las funcines
const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async ( req, res = response ) => {

  // 400 es el "status code"
  // Para mas informacion: https://www.restapitutorial.com/httpstatuscodes.html
  // Siempre hacer un "return" al retornar una respuesta, ya que si no se hace, va a retornar la respuesta del if y la de mas abajo, basicamente siempre se debe retornar una sola respuesta o express en la consola dara error
  // if ( name.length < 5 ) {
  //   return res.status( 400 ).json({
  //     ok: false,
  //     msg: 'El nombre debe de tener minimo 5 letras'
  //   })
  // }

  const { email, password } = req.body;

  try {

    // Validando si existe el correo

    // let usuario = Usuario.findOne({ email: email});
    let usuario = await Usuario.findOne({ email });

    if ( usuario ) {
      return res.status( 400 ).json({
        ok: false,
        msg: 'Ya existe un usuario con ese correo'
      })
    }

    usuario = new Usuario( req.body );

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();

    usuario.password = bcrypt.hashSync( password, salt );

    await usuario.save();

    // Generar JWT
    const token = await generarJWT( usuario.id, usuario.name );

    res.status( 201 ).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    })

  } catch ( error ) {

    console.log( error );

    res.status( 500 ).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })

  }



}

const loginUsuario = async ( req, res = response ) => {

  const { email, password } = req.body;

  try {

    const usuario = await Usuario.findOne({ email });

    if ( !usuario ) {
      return res.status( 400 ).json({
        ok: false,
        msg: 'No existe un usuario con ese correo'
      })
    }

    // Confirmar los passwords
    const validPassword = bcrypt.compareSync( password, usuario.password );

    if ( !validPassword ) {
      return res.status( 400 ).json({
        ok: false,
        msg: 'Password incorrecto'
      })
    }

    // Generar JWT
    const token = await generarJWT( usuario.id, usuario.name );

    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    })

  } catch ( error ) {

    console.log( error );

    res.status( 500 ).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })

  }

}

const revalidarToken = async ( req, res = response ) => {

  const { uid, name } = req;

  // Generando nuevo token
  const token = await generarJWT( uid, name );

  res.json({
    ok: true,
    token
  })

}

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken
}