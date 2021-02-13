const mongoose = require('mongoose');

console.log("-----------------------")
console.log("Awaiting DB connection")
console.log("-----------------------")

// Connect to DB
let db; 
if(process.env.RUN === "local") db = "mongodb://localhost:27017/viaplay-local"
else if (process.env.NODE_ENV === "dev") db = "mongodb://mongo-test:27017/viaplay-test"
else db = "mongodb://mongo:27017/viaplay"  

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(() => console.log("Connected to", db, "\n-----------------------"))
.catch(err => console.log("Error connecting to DB", err.message))

const url_regex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;

// Restaurant Schema 
const restaurantSchema = new mongoose.Schema({
    opening_hours:[{
        type: String,
        require: true,
        trim: true,
        maxlength: 255 
    }],

    address: {
        type: String,
        require: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },

    phone_number: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 20
    },

    location: {
        type: Map,
        of: String,
        required: true
    },

    icon: {
        type: String,
        required: true,
        validate:{
          validator: function(value){
                return url_regex.test(value)
            },
          message: "{value} is not a valid URL!"  
        }  
    },

    name: {
        type: String,
        require: true,
        minlength: 1,
        maxlength: 255
    },

    price_level: {
        type: Number,
        min: 1,
        max: 3,
    },

    rating: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 5
    },

    google_maps_url: {
        type: String,
        required: true,
        validate:{
            validator: function(value){
                  return url_regex.test(value)
              },
            message: "{value} is not a valid URL!"  
        }
    },

    website: {
        type: String,
        validate:{
            validator: function(value){
                  return url_regex.test(value)
              },
            message: "{value} is not a valid URL!"  
        }
    },

    photo: {
        type: String,
        validate:{
            validator: function(value){
                  return url_regex.test(value)
              },
            message: "{value} is not a valid URL!"  
        }
    },

    id: {
        type: Number,
    }
})

// Collection 
const Restaurant = mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant