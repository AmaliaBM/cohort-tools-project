const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;



//Mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MONGO_URI = "mongodb://localhost:27017/cohort-tools-api"
 
mongoose.connect(MONGO_URI)
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));
 

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...




// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
const cors = require("cors");


// MIDDLEWARE


// Research Team - Set up CORS middleware here:
// ...
app.use(cors({origin:["http://localhost:5173"]}));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

//ruta que nos lleva a visualizar todos la documentación

//RUTAS DE CRUD
//Importamos el Cohort.model y su schema
const Cohort = require("./models/Cohort.model")

//Importamos el Student.model y su schema
const Student = require("./models/Student.model")


app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});


app.get("/cohorts", (req, res) => {
  Cohort.find({})
  .then((cohorts) => {
    console.log("Retrieved cohorts", cohorts);
      res.json(cohorts)
  })
  .catch((error) => {
    console.error("Error while retrieving cohorts ->", error);
    res.status(500).json({error: "Failed to retrieve cohorts"});
  })
});

//ruta que hace que se busquen estudiantes
app.get("/students", (req, res) => {
  Student.find({})
  .then((students) => {
    console.log("Retrieved students", students);
      res.json(students)
  })
  .catch((error) => {
    console.error("Error while retrieving students ->", error);
    res.status(500).json({error: "Failed to retrieve students"});
  })
});

//ruta que crea estudiantes
app.post("/students", (req, res) => {
  console.log("ruta bien para crear estudiantes")
  Student.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    linkedinUrl: req.body.linkedinUrl,
    languages: req.body.languages,
    program: req.body.program, 
    background: req.body.background,
    image: req.body.image,
    projects: req.body.projects,
  })
   .then (() => {
    //si el código llega aquí significa que el documento se creo corrrectamente
   res.send("alumno creado correctamente")
  })
  .catch((error) => {
    console.error("Error while retrieving students ->", error);
    res.status(500).json({error: "Failed to retrieve students"});
  })
});

//ruta dinamica para estudiantes: busca dentro del estudiante el Id. de cohort
app.get("/students/cohort/:cohortId", (req,res) => {
    Student.findById(req.params.cohortId)
  .then(() =>{
  res.send("dentro del estudiante hemos encontrado el cohort concreto que buscábamos")
  })
  .catch((error) => {
    console.log(error)
  })
})

//ruta para buscar un student por su id
app.get("/students/:studentId", (req,res) => {
    Student.findById(req.params.studentId)
  .then(() =>{
  res.send("hemos encontrado estudiante por su id")
  })
  .catch((error) => {
    console.log(error)
  })
})

//ruta para editar un student 
app.put("/students/:studentId", async (req,res) => {
    Student.findById(req.params.studentId)
      try {
      const responseFromDB = await Student.findByIdAndUpdate(req.params.studentId, 
        req.body, {new: true})
      //Si queremos forzar mongo a que nos de documento dsps actualizacion.
      res.json(responseFromDB)
    } catch (error) {
      console.log(error)
    }
    })

//ruta para eliminar un student 

app.delete("/students/:studentId", (req, res) => {

  Student.findByIdAndDelete( req.params.studentId )
  .then (() => {

    res.send("Alumno eliminado")

  })
  .catch((error) => {
    console.log(error)
  })

})

//ruta que crea cohort
app.post("/cohorts", (req, res) => {
  console.log("ruta bien para crear cohorts")
  Cohort.create({
    inProgress: req.body.inProgress,
    cohortSlug: req.body.cohortSlug,
    cohortName: req.body.cohortName,
    program: req.body.program,
    format: req.body.format,
    campus: req.body.campus,
    startDate: req.body.startDate, 
    endDate: req.body.endDate,
    programManager: req.body.programManager,
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours
  })
   .then (() => {
    //si el código llega aquí significa que el documento se creo corrrectamente
   res.send("cohort creado correctamente")
  })
  .catch((error) => {
    console.error("Error while retrieving cohorts ->", error);
    res.status(500).json({error: "Failed to retrieve cohorts"});
  })
});

//ruta que hace que se busquen cohorts
app.get("/cohorts", (req, res) => {
  Cohort.find({})
  .then((cohorts) => {
    console.log("Retrieved cohorts", cohorts);
      res.json(cohorts)
  })
  .catch((error) => {
    console.error("Error while retrieving cohorts ->", error);
    res.status(500).json({error: "Failed to retrieve cohorts"});
  })
});

//ruta para buscar un cohort por su id
app.get("/cohorts/:cohortId", (req,res) => {
    Cohort.findById(req.params.cohortId)
  .then(() =>{
  res.send("hemos encontrado cohort por su id")
  })
  .catch((error) => {
    console.log(error)
  })
})

//ruta para editar un cohort 
app.put("/cohorts/:cohortId", async (req,res) => {
    Cohort.findById(req.params.cohortId)
      try {
      const responseFromDB = await Cohort.findByIdAndUpdate(req.params.cohortId, 
        req.body, {new: true})
      //Si queremos forzar mongo a que nos de documento dsps actualizacion.
      res.json(responseFromDB)
    } catch (error) {
      console.log(error)
    }
    })

//ruta para eliminar un cohort 

app.delete("/cohorts/:cohortId", (req, res) => {

  Cohort.findByIdAndDelete( req.params.cohortId )
  .then (() => {

    res.send("Cohort eliminado")

  })
  .catch((error) => {
    console.log(error)
  })

})





// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});