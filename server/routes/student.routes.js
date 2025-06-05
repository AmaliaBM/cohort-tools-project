

const router=require("express").Router()


//RUTAS DE CRUD
//Importamos el Student.model y su schema
const Student = require("../models/Student.model")

//ruta que hace que se busquen estudiantes http://localhost:5005/api/students
router.get("/", (req, res, next) => {  //*
  Student.find({})
  .then((respuesta) => {
      res.status(200).json(respuesta);
  })
  .catch((error) => {
    next(error)
    
  })
});

//ruta que crea estudiantes http://localhost:5005/api/students
router.post("/", async (req, res, next) => {
  console.log(req.body);

  try {
    await Student.create({
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
      cohort: req.body.cohort,
    });

    res.sendStatus(201);
  } catch (error) {
    next(error)
  }
});

//ruta dinamica para estudiantes: busca dentro del estudiante el Id. de cohort  http://localhost:5005/api/students/cohort/:cohortId
router.get("/cohort/:cohortId", (req,res, next) => {
  Student.find({cohort:req.params.cohortId})
  .populate('cohort')
  .then((respuestaDeLaBaseDeDatos) =>{
  res.status(200).json(respuestaDeLaBaseDeDatos)
  })
  .catch((error) => {
    next(error)
  })
})

//ruta para buscar un student por su id http://localhost:5005/api/students/:studentId
router.get("/:studentId", async (req, res, next) => {
  console.log(req.params);

  try {
    const respuestaDeBaseDatosStudentPorId = await Student.findById(req.params.studentId)
      .populate("cohort");

    res.status(200).json(respuestaDeBaseDatosStudentPorId);
  } catch (error) {
    next(error);
  }
});

//ruta para editar un student http://localhost:5005/api/students/:studentId
router.put("/:studentId", async (req,res, next) => {
    Student.findById(req.params.studentId)
      try {
      const responseFromDB = await Student.findByIdAndUpdate(req.params.studentId, 
        req.body, {new: true})
      res.status(200).json(responseFromDB)
    } catch (error) {
     next(error);
    }
    })

//ruta para eliminar un student http://localhost:5005/api/students/:studentId

router.delete("/:studentId", (req, res, next) => {

  Student.findByIdAndDelete( req.params.studentId )
  .then (() => {

    res.sendStatus(202)

  })
  .catch((error) => {
    next(error);
  })

})

module.exports = router;