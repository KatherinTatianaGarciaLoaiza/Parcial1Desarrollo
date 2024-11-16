import { TOKEN_MAX_AGE, TOKEN_SECRET } from "../config/config.mjs";
import jwt from "jsonwebtoken";

const setContentType = (req, res, next) => {
  res.set("content-type", "application/json");
  next();
};

const createToken = (userData) => {
  return jwt.sign(userData, TOKEN_SECRET, { expiresIn: TOKEN_MAX_AGE });
};

const checkToken = (token) => {
  try {
    const result = jwt.verify(token, TOKEN_SECRET);
    console.log(result, token);
    return true;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      console.log("el token está vencido");
    }
    console.log(err);
    return false;
  }
};

const authenticateDoctor = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Token no proporcionado" });
  }

  if (!checkToken(token)) {
    return res.status(401).send({ message: "Token inválido o expirado" });
  }

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    req.doctor = decoded; 
    next(); 
  } catch (err) {
    console.error("Error al procesar el token:", err);
    return res.status(500).send({ message: "Error interno en la autenticación" });
  }
};

export { setContentType, createToken, checkToken, authenticateDoctor };