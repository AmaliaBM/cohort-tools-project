
process.loadEnvFile();

//Mongoose (servidor creado)
require("./db/index.js")

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

const express = require("express");


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

//
//const Schema = mongoose.Schema;

const config = require("./config")

config(app)

// MIDDLEWARE


// Research Team - Set up CORS middleware here:
// ...

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

//RUTAS DE CRUD

const indexRouter = require("./routes/index.routes.js")
app.use("/api", indexRouter)

/*app.get("/cohorts", (req, res) => {
  Cohort.find({})
  .then((cohorts) => {
    console.log("Retrieved cohorts", cohorts);
      res.json(cohorts)
  })
  .catch((error) => {
    console.error("Error while retrieving cohorts ->", error);
    res.status(500).json({error: "Failed to retrieve cohorts"});
  })
});*/

//* Gestores de errores
const handleErrors = require("./errors")
handleErrors(app)

const PORT = process.env.PORT || 5005;
// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});