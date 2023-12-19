const jwt = require('jsonwebtoken');

// Los "JWT" se componen de "header - Payload - Verify Signature"

// Acá mandamos en los atributos, el "Payload" que se compone de la información que se va a enviar al token, esta informacion no debe ser sensible, por lo que no se deben colocar contraseñas
const generarJWT = ( uid, name ) => {

  return new Promise( ( resolve, reject ) => {

    const payload = { uid, name };

    jwt.sign( payload, process.env.SECRET_JWT_SEED, {

      expiresIn: '2h'

    }, ( err, token ) => {

      if ( err ) {

        console.log( err );
        reject('No se pudo generar el token');

      }

      resolve( token );

    });

  })

}

module.exports = {
  generarJWT
}