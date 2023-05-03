const mongoose = require('mongoose')

const HelpSchema = new mongoose.Schema({
    location: {
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
const HelpModel = mongoose.model("HelpModel", HelpSchema);

module.exports= { HelpModel, VolunteerModel }