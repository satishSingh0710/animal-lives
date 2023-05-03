const mongoose = require('mongoose')

const VolunteerSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    contact:{
      type:Number,
      required:true
    },
    about:{
      type:String
    },
    img:{
      data:Buffer,
      contentType: String
    }
  });
  
const VolunteerModel = mongoose.model("VolunteerModel", VolunteerSchema);
module.exports= VolunteerModel