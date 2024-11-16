import { TOKEN_MAX_AGE, TOKEN_SECRET } from "../config/config.mjs";
import jwt from "jsonwebtoken";

const setContentType = (req, res, next) => {
  res.set("content-type", "application/json");
  next();
};

const createToken = (userData) => {
  return jwt.sign(userData, TOKEN_SECRET, { expiresIn: TOKEN_MAX_AGE });  
};

const authenticateDoctor = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    if (decoded.role !== 'doctor') {
      return res.status(403).send({ message: "Acceso denegado" });
    }
    req.doctor = decoded;
    next();
  } catch (err) {
    console.error("Error al procesar el token:", err);
    return res.status(401).send({ message: "Token inválido o expirado" });
  }
};

export { setContentType, createToken, authenticateDoctor };