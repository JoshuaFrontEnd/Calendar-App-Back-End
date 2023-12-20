const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = ( req, res = response, next ) => {

  // En el curso el profesor explica que enviaremos el "token" mediante los "headers" y que cuando son personalizados existe un estandar para nombrar el "header" con "x-algo" por ejemplo: "x-token"
  const token = req.header('x-token');

  if ( !token ) {
    return res.status( 401 ).json({
      ok:false,
      msg: 'No hay token en la petición'
    })
  }

  try {

    const { uid, name } = jwt.verify(
      token,
      process.env.SECRET_JWT_SEED
    )

    req.uid = uid;
    req.name = name;

  } catch ( error ) {

    if ( !token ) {
      return res.status( 401 ).json({
        ok:false,
        msg: 'Token no valido'
      })
    }

  }

  next();

}

module.exports = {
  validarJWT
}

/*----------------------------------------------------------------

  ¿Qué son los headers?

  Los Headers son una parte de las peticiones HTTP que tienen las request/response para enviar información. Usualmente acerca del navegador, información del servidor, versiones usadas, etc.

  https://diego.com.es/headers-del-protocolo-http#:~:text=Los%20HTTP%20headers%20son%20la,solicitada%2C%20del%20servidor%2C%20etc.&text=La%20primera%20l%C3%ADnea%20es%20la,Lo%20dem%C3%A1s%20son%20headers%20HTTP.

---------------------------------------------------------------- */