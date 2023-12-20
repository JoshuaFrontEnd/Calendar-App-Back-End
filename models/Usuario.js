const { Schema, model } = require('mongoose');

// Cualquier objeto de mis usuarios debe de tener estos datos
const UsuarioSchema = Schema({

  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }

})

module.exports = model('Usuario', UsuarioSchema );