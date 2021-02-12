const express = require("express");
const router = express.Router();
const db = require("../models/restaurants");

// --------------------------------------------------------------------------------
// Fetch all restaurants - Supports Sorting
router.get("/", async (req, res) => {
    let restaurants;
    let sort_by = "id";
    let order = 1;
    
    // Overwrite sort_by and order if passed in query parameters
    if(req.query){
        sort_by = req.query.sort_by;
        order = req.query.order
    }

    // Fetch restaurants
    if(sort_by == "rating") restaurants = await db.find().select({"name": 1, "price_level": 1, "rating": 1, "id": 1}).sort({ rating: order });
    else if (sort_by == "price_level") restaurants = await db.find().select({"name": 1, "price_level": 1, "rating": 1, "id": 1}).sort({ price_level: order })
    else if (sort_by == "name") restaurants = await db.find().select({"name": 1, "price_level": 1, "rating": 1, "id": 1}).sort({ name: order })  
    else restaurants = await db.find().select({"name": 1, "price_level": 1, "rating": 1, "id": 1}).sort({ id: order })

    // if restaurant(s) exists in DB
    if (restaurants.length >= 1){
        console.log("Fetched restaurants")
        return res
        .status(200)
        .json({error: false, message: restaurants.length +" restaurants found", data: restaurants})
        .end();
    }

    // else if DB is empty
    return res
    .status(200)
    .json({error: false, message: "DB empty. No restaurants found."})
    .end();
});

// --------------------------------------------------------------------------------
// Add a new restaurant
router.post("/", async (req, res) => {

    // assign id value for new document by fetching the lastest id value in the collection
    let id = await db.findOne().sort({id:-1}).limit(1)
    .then((restaurant) => {
        if(restaurant) return restaurant.id + 1
        else return 0})
    .catch(err => console.log("Error creating id: ", err.message))

    const restaurant = db({
        opening_hours: req.body.opening_hours,
        address: req.body.address,
        phone_number: req.body.phone_number,
        location: req.body.location,
        icon: req.body.icon,
        name: req.body.name,
        price_level: req.body.price_level,
        rating: req.body.rating,
        google_maps_url: req.body.google_maps_url,
        website: req.body.website,
        photo: req.body.photo,
        id: id
    });

    // try adding restaurant instance to DB
    try {
        const result = await restaurant.save();
        console.log("Created: ", result);
        return res
        .status(200)
        .json({error: false, message:"Restaurant Added to DB.", data: result})
        .end();
    } 
    // Return exception if adding failed
    catch (ex) {
        console.log(ex);
        return res
        .status(400)
        .json({error: true, message: ex.message})
        .end();
    }
});

// --------------------------------------------------------------------------------
// Add >1 restaurants
router.post("/multiple", async (req, res) => {
    data = req.body.restaurants;
    let instance;

    // assign id value for new document by fetching the lastest id value in the collection
    let id = await db.findOne().sort({id:-1}).limit(1)
    .then((restaurant) => {
        if(restaurant) return restaurant.id + 1
        else return 0})
    .catch(err => console.log("Error creating id: ", err.message))
    
    for (i = 0; i < data.length; i++){
        instance = db({
            opening_hours: data[i]['opening_hours'],
            address: data[i]['address'],
            phone_number: data[i]['phone_number'],
            location: data[i]['location'],
            icon: data[i]['icon'],
            name: data[i]['name'],
            price_level: data[i]['price_level'],
            rating: data[i]['rating'],
            google_maps_url: data[i]['google_maps_url'],
            website: data[i]['website'],
            photo: data[i]['photo'],
            id: id            
        })

        // try adding multiple restaurants instance to DB
        try {
            await instance.save();
            console.log("Created id:", id);
        } 
        // Return exception if adding failed
        catch (ex) {
            console.log(ex);
            return res
            .status(400)
            .json({error: true, message: ex.message})
            .end();
        }
        id += 1;
    }

    return res
    .status(200)
    .json({error: false, message:"Restaurants Added to DB."})
    .end();

    
});

// --------------------------------------------------------------------------------
// Delete all restaurants 
router.delete('/all', async(req,res) => {
    // try deleting all restaurant instances from DB 
    try{
        await db.deleteMany();
        console.log("Deleted all Restaurants");
        return res
        .status(200)
        .json({error: false, message: "Deleted all restaurant" })
        .end();
    }
    // Return exception if deletion failed
    catch (ex) {
        console.log(ex);
        return res
        .status(400)
        .json({error: true, message: ex.message})
        .end();
    }
})

// --------------------------------------------------------------------------------
// Update an exisiting restaurant
router.put("/:id", async (req, res) => {
    const restaurant = await db.findOne({ id: req.params.id });
    
    // if restaurant with supplied instane does not exists
    if (!restaurant) {
        console.log("Instance not found - ", req.params.id);
        return res
        .status(404)
        .json({error: true, message: "Restaurant with supplied ID not found!"})
        .end();
    }
    
    // Overwrite instance with new data
    restaurant.opening_hours = req.body.opening_hours,
    restaurant.address = req.body.address,
    restaurant.phone_number = req.body.phone_number,
    restaurant.location = req.body.location,
    restaurant.icon = req.body.icon,
    restaurant.name = req.body.name,
    restaurant.price_level = req.body.price_level,
    restaurant.rating = req.body.rating,
    restaurant.google_maps_url = req.body.google_maps_url,
    restaurant.website = req.body.website,
    restaurant.photo = req.body.photo;

    // try updating restaurant instance to DB
    try {
        const result = await restaurant.save();
        console.log("Updated Restaurant: ", result);
        return res
        .status(200)
        .json({error: false, message: "Updated restaurant", data: result});
    } 

    // Return exception if updation failed
    catch (ex) {
        console.log(ex);
        return res
        .status(400)
        .json({error: true, message: ex.message})
        .end();
    }
});
// --------------------------------------------------------------------------------
// Delete an exisiting restaurant
router.delete("/:id", async (req, res) => {
    const restaurant = await db.findOne({ id: req.params.id });

    // if restaurant with supplied instane does not exists
    if (!restaurant){
        console.log("Instance not found - ", req.params.id);
        return res
        .status(404)
        .json({error: true, message: "Restaurant with supplied ID not found!"})
        .end();
    }

    // try deleting restaurant instance from DB 
    try {
        await restaurant.deleteOne();
        console.log("Deleted Restaurant: ", restaurant);
        return res
        .status(200)
        .json({error: false, message: "Deleted restaurant", restaurant: restaurant })
        .end();
    } 
    
    // Return exception if deletion failed
    catch (ex) {
        console.log(ex);
        return res
        .status(400)
        .json({error: true, message: ex.message})
        .end();
    }
});

// --------------------------------------------------------------------------------
// Fetch information about a specific restaurant
router.get("/:id", async (req, res) => {

    const restaurant = await db.findOne({ id: req.params.id });
    
    // if restaurant with supplied instane does not exists
    if (!restaurant){
        console.log("Instance not found - ", req.params.id)
        return res
        .status(404)
        .json({error:true, message: "Restaurant with supplied ID not found!"})
        .end();
    }

    console.log("Restaurant: ", restaurant);
    return res
    .status(200)
    .json({error: false, message:"Restaurant found.", data: restaurant})
    .end();
});

module.exports = router