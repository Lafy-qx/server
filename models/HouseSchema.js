// Подключение monгуся
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const houseScheme = new Schema({
  // Имя комплекса
  nameComplex: {
    type: String,
    required: true,
  },
  complexID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'complexes'
  }
});

module.exports = houseScheme;
