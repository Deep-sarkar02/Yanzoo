const express = require("express")
const app = express();

// require the env
const dotenv = require("dotenv")
// now config the file
dotenv.config();
// set up the corse
const cors = require("cors")

// require the function from the db.js
const connectToDb = require("./db/db");


// require the userroutes
const userroutes = require('./routes/user.routes')
const mapsRoute = require('./routes/maps.routes')
// we will require the ride routes
const rideRoutes = require('./routes/rides.routes')
//step - 6
// require the cookeie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser()); // use the cookie parser middleware to parse the cookies



// call the conncet to db
connectToDb()
// app.use 
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))





// ------------------------Routes section------------------------------
// create the route
app.get("/", (req, res) => {
    res.send("hello world");
})

//user routes
// create the route and also we iwll pass trhe param
app.use('/users', userroutes)



// step - 14
// captain routes
const captainroutes = require('./routes/captain.routes');
app.use('/captains', captainroutes);
// use the maps route
app.use('/maps', mapsRoute);
// for the rides route
app.use('/rides', rideRoutes);








// export the app
module.exports = app;
// now create the  server file

