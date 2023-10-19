const mongoose = require("mongoose");

const {Schema, model} = mongoose;

const VacaSchema =  new Schema({
    caravana:String,
    categoria:String,
    raza : String,
    peso : Number, 
    vacunacion:String,
    sector:String,
},{
    timestamps:true
   
});

const VacaModel = model("Vaca", VacaSchema);

module.exports = VacaModel;
