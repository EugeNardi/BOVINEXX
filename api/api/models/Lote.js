const mongoose = require("mongoose");

const {Schema, model} = mongoose;

const VacaSchema =  new Schema({
    lote : String,
    raza : String,
    cantidad : Number, 
    vacunacion : String,
    fecha : Date,
},{
    timestamps:true
   
});

const VacaModel = model("Vaca", VacaSchema);

module.exports = VacaModel;
