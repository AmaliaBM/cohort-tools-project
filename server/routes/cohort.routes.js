
const router=require("express").Router()
//RUTAS DE CRUD
//Importamos el Cohort.model y su schema
const Cohort = require("../models/Cohort.model")

//ruta que crea cohort
router.post("/", (req, res, next) => {
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
   res.sendStatus(201);
  })
  .catch((error) => {
    next(error);
  })
});

//ruta que hace que se busquen cohorts
router.get("/", (req, res, next) => {
  Cohort.find({})
  .then((respuesta) => {
     res.status(200).json(respuesta);
  })
  .catch((error) => {
    next(error)
  })
});

//ruta para buscar un cohort por su id
router.get("/:cohortId", (req,res,next) => {
    Cohort.findById(req.params.cohortId)
  .then((respuesta) => {
      res.status(200).json(respuesta);
  })
  .catch((error) => {
    next(error)
  })
})

//ruta para editar un cohort 
router.put("/:cohortId", async (req,res, next) => {
    Cohort.findById(req.params.cohortId)
      try {
      const responseFromDB = await Cohort.findByIdAndUpdate(req.params.cohortId, 
   { inProgress: req.body.inProgress,
    cohortSlug: req.body.cohortSlug,
    cohortName: req.body.cohortName,
    program: req.body.program,
    format: req.body.format,
    campus: req.body.campus,
    startDate: req.body.startDate, 
    endDate: req.body.endDate,
    programManager: req.body.programManager,
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours},
     {new: true})
      res.status(200).json(responseFromDB)
    } catch (error) {
     next(error);
    }
    })

//ruta para eliminar un cohort 

router.delete("/:cohortId", (req, res, next) => {

  Cohort.findByIdAndDelete( req.params.cohortId )

   .then (() => {

    res.sendStatus(202)

  })
  .catch((error) => {
    next(error);
  })

})

module.exports = router;

