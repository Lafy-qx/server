// Подключение monгуся
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const apartmentScheme = new Schema({
  // Фотография планировки всего подъезда (Принимает в себя ссылку на изображение)

  mainInfo: {
    type: Object,

    // Имя комплекса
    nameComplex: {
      type: String,
    },
    // Число квартир
    count: {
      type: Number,
    },
    // Кол-во этажей
    floors: {
      type: Number,
    },
    // Изображение этажа
    mainLayout: {
      type: String,
    },
    //  Номер подъезда
    entrance: {
      type: Number,
      required: true,
    },

  },


  // id дома которому принадлежат планировки
  houseID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'houses'
  },
  advantages: {
    type: Array(String)
  },

  // Изображение отдельной планировки по комнатам
  layoutImg: {
    type: String,
    required: true,
  },
  // Количество комнат (Отдельных планировок)
  rooms: {
    type: Number,
    required: true,
  },
  // Квадратных метров
  square: {
    type: String,
    required: true,
    trim: true,
  },
  // Цена
  price: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = apartmentScheme;