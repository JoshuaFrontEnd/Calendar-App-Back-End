const { Schema, model } = require('mongoose');

// Cualquier objeto de mis eventos debe de tener estos datos
const EventoSchema = Schema({

  title: {
    type: String,
    required: true
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }

})

// Modificando el esquema para quitar la informacion "__v" y reemplazar "_id" por "id", esto no cambia en la base de datos, solo al visualizar la informacion en formato JSON
EventoSchema.method('toJSON', function(){
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
})

module.exports = model('Evento', EventoSchema );