// Import dependencies
const express = require('express')
const app = express()
const helmet = require("helmet")
const morgan = require('morgan')

const restaurants = require("./routes/restaurants")

app.use(express.json()) // parse json post data
app.use(helmet()); // secure http
app.use(morgan("dev")) // request logging

// Routes
app.get('/', (req, res) => {
    res.send("Resback Root")
});

//restaurant endpoint
app.use("/api/v1/restaurants/", restaurants)

// Port config
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
