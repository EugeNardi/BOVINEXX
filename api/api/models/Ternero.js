const mongoose = require("mongoose");

const {Schema, model} = mongoose;

const TerneroSchema =  new Schema({
    rp:String,
    nacimiento:Date,
    genero:String,
    madre:String,
    padre:String,
    pn:String,
    pd:String,
    peso:String,
    ce:String, 
    tatu:String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

},{
    timestamps:true
   
});

const TerneroModel = model("Ternero", TerneroSchema);

module.exports = TerneroModel;



