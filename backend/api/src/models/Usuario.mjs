// Usuario.mjs
class Usuario {
    constructor(userId, nombre, correo, contraseña, documento, rol) {
      this.userId = userId;
      this.nombre = nombre;
      this.correo = correo;
      this.contraseña = contraseña;
      this.documento = documento;
      this.rol = rol;      
    }
  
    esAdministrador() {
      return this.rol === 'ADMIN';
    }
  
    autenticar(contrasena) {
      return this.contraseña === contrasena;
    }
  }
  
  export { Usuario };
  