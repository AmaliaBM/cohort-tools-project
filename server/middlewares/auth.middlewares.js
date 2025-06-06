const jwt = require("jsonwebtoken");


function verifyToken(req, res, next) {
  console.log("ejecutando middleware");

  try {
    const tokenText = req.headers.authorization;
    const token = tokenText.split(" ")[1];

    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    //Si llegamos hasta este punto, significa que el token fue validado correctamente.

    req.payload = payload; //Pasamos la info del usuario que hizo esta llamada a la ruta.

    next(); //continua con la ruta
  } catch (error) {
    res.status(401).json({ errorMessage: "Token no existe o no es válido" });
  }
}

module.exports = verifyToken;
