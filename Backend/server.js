// ----------------------requirement sections-----------------
// require the http
const http = require("http")
const app = require("./app")
// get the port no from the environment file
const port = process.env.PORT || 8080; //DEFAULT PORT 8080
// now create a new file .env 


// --------------------server section--------------------------
// create the server by the app
const server = http.createServer(app);

const { initialiseSocket } = require('./socket');
initialiseSocket(server);

// listen to the server
server.listen(port, () => {
    // this is a call back
    // if the server listens
    // then print that the
    console.log("server running on port" + port);
    // now we will move to the package.json
})
// but we will not use a fixed port , we will use the env var to know which port we will use 
// insrall package npm  i  dotenv cors
// and  require them in the app. js
