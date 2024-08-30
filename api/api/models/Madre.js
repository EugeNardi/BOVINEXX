const mongoose = require("mongoose");

const {Schema, model} = mongoose;

const MadreSchema =  new Schema({
    rp : String,
    nacimiento : Date,
    peso : String,
    pn: String,
    estado : String,
    toro : String,
    servicio : Date, 
    abma : String,
    tatu: String,
    image: { type:String, require: false}, 
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
},{
    timestamps:true
   });

const MadreModel = model("Madre", MadreSchema);

module.exports = MadreModel;




