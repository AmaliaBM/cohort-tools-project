const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;



//Mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
 
mongoose
  .connect("mongodb://localhost:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));


//Schema cohorts

const cohortSchema = new Schema({
  inProgress: {type: Boolean, default: false},
  cohortSlug: {type: String},
	cohortName: {type: String},
  program: {type: String, enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"]},
  format: {type: String, enum: ["Full Time", "Part Time"]},
  campus: {type: String, enum: ["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Lisbon", "Remote"]},

  startDate: {type: Date, default: Date.now},
  endDate: {type: Date},
  programManager: {type: String, required: true},
  leadTeacher: {type: String, required: true},
  totalHours: {type: Number, default: 360}

});

 //Create model
const Cohort = mongoose.model("Cohort", cohortSchema);

//Export model
module.exports = Cohort;



//Schema students
const studentSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
	email: {type: String, required: true, unique:true},
  phone: {type:String, required: true},
  linkedinUrl: {type:String, default: ""},
  languages: {type: String, enum: ["English", "Spanish", "French", "German", "Portuguese", "Dutch", "Other"]},
  program: {type: String, enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"]},
  background: {type:String, default: "" },
  image: {type:String, default: 'https://i.imgur.com/r8bo8u7.png' },
  projects: Array,
  cohort: Schema.Types.ObjectId

});

 //Create model
const Student = mongoose.model("Student", studentSchema);

//Export model

module.exports = Student;

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
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});


app.get("/cohorts", (req, res) => {
  Cohort.find({}) //este es el modelo
  .then((cohorts) => {
    console.log("Retrieved cohorts", cohorts);
      res.json(cohorts)
  })
  .catch((error) => {
    console.error("Error while retrieving cohorts ->", error);
    res.status(500).json({error: "Failed to retrieve cohorts"});
  })
});

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

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});