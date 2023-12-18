const { Schema, model } = require('mongoose');

// Cualquier objeto de mis usuarios debe de tener estos datos
const UsuarioSchema = Schema({

  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  }

})

module.exports = model('Usuario', UsuarioSchema );