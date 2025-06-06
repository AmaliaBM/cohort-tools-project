const router=require("express").Router()


router.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const authRouter = require("./auth.routes");
router.use("/auth", authRouter)

const verifyToken = require("../middlewares/auth.middlewares")


//GET /api/users/:id
router.get("/users/:userId", verifyToken, (req, res, next) => {
  
  //TODO LA LOGICA QUE TIENE QE ENVIAR LA RESPUESTA DE UN USUARIO EN CONCRETO
  //TODO SIMILAR A UNIR CANCIONES CON ARTISTAS.

  console.log(req.payload)
  res.send("esta info es para usuarios que ya están logueados")
})


const studentRouter = require ("./student.routes")
router.use("/students", studentRouter)

const cohortRouter = require("./cohort.routes")
router.use("/cohorts", cohortRouter)

module.exports = router;