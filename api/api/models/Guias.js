const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const GuiaSchema = new Schema({
    guia: { type: String, required: true }, // store the file path as a string
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true
});

const GuiaModel = model("Guia", GuiaSchema);

module.exports = GuiaModel;
