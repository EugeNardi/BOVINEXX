

const mongoose = require("mongoose");


const {Schema, model} = mongoose;

const ToroSchema =  new Schema({
    rp:String,
    nacimiento:Date,
    padre:String,
    madre:String,
    pn:String, 
    pd:String,
    p12:String,
    p18:String,
    ce12:String,
    ce18:String,
    ce:String,
    inmunizado:String,
    image: { type:String, require: false}, 
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

},{
    timestamps:true
   
});

const ToroModel = model("Toro", ToroSchema);

module.exports = ToroModel;


