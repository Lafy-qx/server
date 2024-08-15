// Библиотеки
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");

// Подключение к бд
const url = "mongodb://localhost:27017/Ilya";

// Связка с сервером
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,PUT,POST,DELETE',
  optionsSuccessStatus: 200 // некоторые браузеры не поддерживают короткие ответы CORS, так что это устанавливает код ответа 200
};
const app = express();
var cors = require('cors')


app.use(cors(corsOptions))
app.use(express.json());

// Схема квартир
const apartmentScheme = require("./models/ApartmentSchema");
const Apartment = mongoose.model("apartment", apartmentScheme);

// Получение всех квартир
app.get("/api/HouseParams/:param/apartments/:paramHouse", async (req, res) => {
  try {
    const ApartmentInfo = await Apartment.find({ houseID: req.params.paramHouse });
    res.json(ApartmentInfo);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Добавление квартир
app.post("/api/apartments", async (req, res) => {
  console.log(req.body);
  if (!req.body) {
    return res.sendStatus(400);
  }
  // Запись данных из запроса в переменные
  const mainLayout = req.body.mainLayout;
  const nameComplex = req.body.nameComplex;
  const floors = req.body.floors;
  const count = req.body.count;
  const entrance = req.body.entrance;

  const houseID = req.body.houseID;
  const layoutImg = req.body.layoutImg;
  const rooms = req.body.rooms;
  const square = req.body.square;
  const price = req.body.price;
  const advantages = req.body.advantages;
  // Добавление переменных в объект
  const apartmentInfo = {
    mainInfo: {
      mainLayout: mainLayout,
      nameComplex: nameComplex,
      floors: floors,
      count: count,
      entrance: entrance,
      advantages: advantages
    },

    // Сами планировки
    layoutImg: layoutImg,
    square: square,
    price: price,
    houseID: houseID,
    rooms: rooms,
  };
  // Добавление объекта данных в коллекцию БД
  try {
    const data = await Apartment.create(apartmentInfo);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Схема домов
const houseSchema = require("./models/HouseSchema");
const House = mongoose.model("house", houseSchema);

// Получение всех домов в ЖК
app.get("/api/AllHouse", async (req, res) => {
  try {
    const HouseItem = await House.find({});
    res.json(HouseItem);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Получение домов по параметру
app.get("/api/house/:param", async (req, res) => {
  try {
    const HouseItem = await House.find({ complexID: req.params.param });
    res.json(HouseItem);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Добавление Домов
app.post("/api/house", async (req, res) => {
  console.log(req.body);
  if (!req.body) {
    return res.sendStatus(400);
  }

  if (!req.body.nameComplex || !req.body.complexID) {
    return res.sendStatus(400);
  }

  // Изображение планировки подъезда
  const nameComplex = req.body.nameComplex;
  const complexID = req.body.complexID

  const houseInfo = {
    nameComplex: nameComplex,
    complexID: complexID
  };

  try {
    const data = await House.create(houseInfo);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Валидация для пост запросов из форм
const { check, validationResult } = require("express-validator");

// Схема бронирования
const bookingScheme = require("./models/BookingScheme");
const Booking = mongoose.model("booking", bookingScheme);

const errorsFunc = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) res.status(400).message("Ошибка валидации").json({ errors: errors.array() });
};

// Добавление брони
app.post("/api/booking", [
  check("name", "Name is required").notEmpty(),
  check("phone", "Phone is required").notEmpty(),
  check("email", "Email is required").notEmpty().isEmail(),
], async (req, res) => {
  console.log(req.body);
  errorsFunc(req, res); 

  
  const bookingName = req.body.name;
  const bookingPhone = req.body.phone;
  const email = req.body.email;

  const bokingInfo = {
    name: bookingName,
    phone: bookingPhone,
    email: email,

  };

  try {
    const data = await Booking.create(bokingInfo);
    res.json(data);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Схема Комплексов
const сomplexScheme = require("./models/ComplexScheme");
const { log } = require("console");
const Complex = mongoose.model("complex", сomplexScheme);
// Получение комплексов
app.get("/api/complex", async (req, res) => {
  try {
    const ComplexItem = await Complex.find({});
    res.json(ComplexItem);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Добавление комплексов
app.post("/api/complex", async (req, res) => {
  console.log(req.body);
  if (!req.body) {
    return res.sendStatus(400);
  }

  if (!req.body.title || !req.body.content) {
    return res.sendStatus(400);
  }

  const titleComplex = req.body.title;
  const img = req.body.img;
  const contentComplex = req.body.content;
  const complexSwiper = req.body.complexSwiper;
  const private = req.body.private
  const location = req.body.location
  const locationImg = req.body.locationImg
  const layout = req.body.layout
  const layoutImg = req.body.layoutImg


  const complexInfo = {
    title: titleComplex,
    content: contentComplex,
    img: img,
    complexSwiper: complexSwiper,
    private: private,
    location: location,
    locationImg: locationImg,
    layout: layout,
    layoutImg: layoutImg
  };

  try {
    const data = await Complex.create(complexInfo);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Запуск в браузере
async function run() {
  try {
    await mongoose.connect(url);
    app.listen(3000);
    console.log("Успешное подключение http://localhost:3000/");
  } catch (error) {
    console.log(error);
  }
}

run().catch(console.log);
