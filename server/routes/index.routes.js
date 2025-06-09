const router=require("express").Router()
const User = require('../models/User.model');

router.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const authRouter = require("./auth.routes");
router.use("/auth", authRouter)

const verifyToken = require("../middlewares/auth.middlewares")


//GET /api/users/:id
router.get("/users/:userId", verifyToken, (req, res, next) => {
  const { userId } = req.params;

    if (req.payload._id !== userId) {
    return res.status(403).json({ message: "No autorizado" });
  }

  User.findById(userId)
    .then((user) => {
      if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
      res.status(200).json(user);
    })
    .catch((error) => next(error));
});
  
  
  //TODO LA LOGICA QUE TIENE QE ENVIAR LA RESPUESTA DE UN USUARIO EN CONCRETO
  //TODO SIMILAR A UNIR CANCIONES CON ARTISTAS.



const studentRouter = require ("./student.routes")
router.use("/students", studentRouter)

const cohortRouter = require("./cohort.routes")
router.use("/cohorts", cohortRouter)

module.exports = router;