// Usuario.mjs
class Usuario {
    constructor(userId, nombre, correo, contraseña, rol, documento) {
      this.userId = userId;
      this.nombre = nombre;
      this.correo = correo;
      this.contraseña = contraseña;
      this.rol = rol; 
      this.documento = documento;
    }
  
    esAdministrador() {
      return this.rol === 'administrador';
    }
  
    autenticar(contrasena) {
      return this.contraseña === contrasena;
    }
  }
  
  export { Usuario };
  