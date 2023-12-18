const mongoose = require('mongoose');

const dbConnection = async () => {

  // Uso un "try/catch" porque si falla la conexion de la base de datos necesito verificarlo
  try {

    await mongoose.connect( process.env.DB_CNN );
    console.log('DB Online');

  } catch ( error ) {

    console.log( error );
    throw new Error('Error a la hora de inicializar BD');

  }

}

module.exports = {
  dbConnection
}