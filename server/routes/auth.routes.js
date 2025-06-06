const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/auth.middlewares");

const User = require("../models/User.model");


// POST "/api/auth/signup" => Ruta para registrar un usuario
router.post("/signup", async (req, res, next) => {
  //deberia recibir la data del usuario

  console.log(req.body);
  const { name, email, password } = req.body;
  //1. que todos los campos existan y tengas valores
  if (!name || !email || !password) {
    res.status(400).json({
      errorMessage:
        "Todos los campos son obligatorios (username, email, password",
    });
    return;
  }

  //3. validaciones de la contraseña
  let regexPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  if (regexPassword.test(password) === false) {
    res.status(400).json({
      errorMessage:
        "La contraseña no es válida, debe contener al menos una letra, un número, un carácter especial y entre 8 y 16 caracteres",
    });
    return;
  }

  try {
    //3. Que el email sea unico
    //*Sería findOne porque queremos encontrar el primer documento que cumpla con esta condición, es igual que el find de js
    const foundUser = await User.findOne({ email: email });
    //*console.log(foundUser);
    if (foundUser !== null) {
      res.status(400).json({
        errorMessage: "Ya existe un usuario con ese correo electrónico",
      });
      return;
    }
    //4. (opcional) que los valores tengan el tipo de data correcto
    //*Seria lo mismo que el paso 3

    //5. (opcional) que el username sea único (si aplica)

    // Cifrado de la contraseña
    const hashPassword = await bcrypt.hash(password, 12);
    //*12 es la cantidad de cifrado qe queremos añadir
    //*Hash viene de la documentacion oficial bcrypt

    //crear el documento en la base de datos
    await User.create({
      name,
      email,
      password: hashPassword,
    });

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
  }
});


// POST "/api/auth/login" => Validar las credenciales del usuario

router.post("/login", async (req, res, next) => {
  console.log(req.body);

  const { email, password } = req.body;

  //1. validar que recibimos los campos
  if (!email || !password) {
    res.status(400).json({
      errorMessage: "Todos los campos son obligatorios (email, password)",
    });
    return;
  }

  try {
    //2. validar que el usuario existe
    const foundUser = await User.findOne({ email: email });
    console.log(foundUser);
    if (foundUser === null) {
      res.status(400).json({
        errorMessage: "Usuario no registrado",
      });
      return;
    }
    //3. validar que la contraseña es correcta
    const isPasswordCorrect = await bcrypt.compare( password, foundUser.password)
    if(isPasswordCorrect === false) {
        res.status(400).json({
        errorMessage: "La contraseña no es válida",
      });
      return;
    }

    //EN ESTE MOMENTO HEMOS TERMINADO LA AUTENTICACIÓN. El usuario es quien dice ser.

    //*Aquí entonces es donde creamos la llave virtual (Token) para entregarsela al cliente.
    const payload = { //Toda la info que le entregamos del usuario
        _id: foundUser._id, //requerido
        email: foundUser.email //opcional´
        //!Aquí iría rol de profesor o de admin y rol de alumno.
    }
                                        //*No se debe exponer, por ello, se aloja en el .env
    const authToken = jwt.sign( payload, process.env.TOKEN_SECRET, {
        algorithm:"HS256",
        expiresIn: "7d" //7 dias
    } )

    res.status(200).json({authToken}) //es lo mismo que authToken: authToken

  } catch (error) {
    console.log(error);
  }
});


//GET "/api/auth/verify" => Validar el token (luego de generarlo
//y cuando el usuario vuelva a la app luego)

router.get("/verify", verifyToken, (req, res) => {
    res.json({ payload: req.payload })
})

module.exports = router;