// Подключение гуся
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const complexScheme = new Schema({
    title: {
        type: String,
        required: true,
        mixlength: 1,
        maxlength: 30,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        mixlength: 1,
        trim: true,
    },
    img: {
        type: String,
        required: true,
    },
    complexSwiper: {
        type: Array(String)
    },

    private: {
        type: String,
        required: true,
        mixlength: 1,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        mixlength: 1,
        trim: true,
    },
    locationImg: {
        type: String,
        required: true,
    },

    layout: {
        type: String,
        required: true,
        mixlength: 1,
        trim: true,
    },
    layoutImg: {
        type: String,
        required: true,
    }

});

module.exports = complexScheme;
