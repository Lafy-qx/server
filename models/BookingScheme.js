// Подключение monгуся
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingScheme = new Schema({
  name: {
    type: String,
    required: true,
    mixlength: 1,
    maxlength: 30,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    mixlength: 1,
    maxlength: 12,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    max: 100,
    trim: true,
  },
//   Дом, этаж, комплекс?
});

module.exports =  bookingScheme;
