# Proyecto final del curso de Desarrollo de Aplicaciones Web 2024-2

### Descripción del proyecto

El proyecto consiste en una aplicación web con un frontend desarrollado con las tecnologías HTML, CSS y JavaScript. La aplicación estará complementada por una capa de backend desarrollada con Node.js y una base de datos aun por definir, para manejar de manera eficiente la información del inventario de productos.

La aplicación permitirá a un administrador gestionar el inventario de productos disponibles, donde podrá realizar acciones como agregar, editar y eliminar productos en la base de datos. Cada producto registrado en el inventario contendrá información clave como nombre, precio, cantidad disponible, descripción y categoría.

El administrador tendrá acceso a una interfaz gráfica agradable, amigable y fácil de usar, donde podrá visualizar todos los productos de manera organizada, aplicar filtros y gestionar el inventario de forma intuitiva. Además, los servicios del backend garantizarán una experiencia ágil, proporcionando respuestas rápidas a las operaciones solicitadas, como la creación, actualización y eliminación de productos.

### Funcionamiento de la aplicación

#### 1.Acceso a la aplicación:
<ul>
  <li>Cada administrador debe iniciar sesión con su cuenta antes de acceder al sistema de inventario. Para esto, implementaremos una página de inicio de sesión que requerirá el nombre de usuario y una contraseña.</li>
  <li>Si el administrador no tiene una cuenta, deberá ser registrado previamente por otro administrador autorizado.</li>
</ul>

#### 2.Inicio de sesión:
<ul>
  <li>Al ingresar correctamente sus credenciales, el administrador accederá a la interfaz principal de la aplicación. Cada acción realizada por un administrador quedará registrada, asociando su usuario a los cambios efectuados.</li>
</ul>

#### 3.Visualización del inventario::
<ul>
  <li>Una vez dentro, el administrador puede ver la lista de productos en el inventario, al igual que antes, con información clave como el nombre del producto, precio, cantidad y categoría.</li>
</ul>

#### 4.Agregar productos:
<ul>
  <li>El administrador puede añadir nuevos productos desde la sección "Añadir Producto". Los detalles del producto serán registrados y el sistema almacenará qué administrador realizó la acción.</li>
</ul>

#### 5.Editar productos:
<ul>
  <li>Al editar un producto existente, la acción también será registrada, guardando el nombre del administrador que hizo la modificación.</li>
</ul>

#### 6.Eliminar productos:
<ul>
  <li>Al eliminar un producto, el sistema también almacenará cuál administrador realizó la eliminación, y se requerirá confirmación antes de realizar esta acción crítica.</li>
</ul>

#### 7.Historial de cambios::
<ul>
  <li>La aplicación contará con una sección de "Historial de cambios" donde se podrán ver las acciones realizadas en el inventario (creación, modificación, eliminación de productos), junto con el nombre del administrador responsable de cada cambio y la fecha de la acción.</li>
</ul>

#### 8.Cerrar sesión:
<ul>
  <li>Una vez que el administrador haya terminado de trabajar, podrá cerrar sesión para asegurar que nadie más pueda realizar cambios desde su cuenta.</li>
</ul>

#### Funcionalidad clave adicional:
<ul>
  <li>Gestión de usuarios-administrador: <br>Los administradores pueden ser añadidos y eliminados por otros administradores con permisos especiales.</li>
   <li>Seguridad: <br>La aplicación tendrá un sistema básico de autenticación que garantice que solo usuarios autorizados puedan gestionar el inventario.</li>
  <li>Registro de cambios: <br>Cada cambio realizado en el inventario estará registrado y vinculado a un usuario, permitiendo un mejor control y trazabilidad.</li>
</ul>

### Requerimientos generales y entregables

#### Requerimientos

#### 1.Interfaz de usuario (Frontend):
<ul>
  <li>La aplicación debe contar con una interfaz de usuario amigable, desarrollada con HTML, CSS y JavaScript, para que los administradores puedan interactuar con el sistema de inventario.</li>
  <li>La interfaz debe permitir a los administradores realizar las operaciones de agregar, editar, eliminar y visualizar productos.</li>
  <li>Los administradores deben poder iniciar sesión para acceder a las funcionalidades del sistema, y cada acción realizada debe estar asociada al administrador responsable.</li>
</ul>

#### 2.Servidor (Backend):
<ul>
  <li>La aplicación debe contar con un backend desarrollado en Node.js, donde se implementará la lógica de negocio, incluida la autenticación de usuarios-administrador y el manejo de productos en el inventario.</li>
  <li>El backend debe permitir la creación, lectura, actualización y eliminación de productos, así como el registro y seguimiento de los cambios realizados por los administradores.</li>
</ul>

#### 3.Base de datos:
<ul>
  <li>Los datos que procesa la aplicación, incluyendo los productos del inventario y los perfiles de administradores, se deben almacenar en una base de datos conectada al servidor.</li>
  <li>La base de datos debe permitir consultas eficientes para gestionar grandes cantidades de productos y realizar búsquedas y filtros.</li>
</ul>

#### 4.Modelo de capas:
<ul>
  El backend debe implementarse bajo un modelo de capas que divida la lógica de negocio de la aplicación en:
  <li>Controladores: <br>Manejan las solicitudes HTTP.</li>
  <li>Servicios: <br>Lógica de negocio para gestionar el inventario y autenticación de administradores.</li>
  <li>Modelos de datos: <br>Definición de los esquemas para productos y usuarios en la base de datos.</li>
  <li>Repositorio: <br>Interacción directa con la base de datos.</li>
</ul>

#### 5.Comunicación entre frontend y backend:
<ul>
  <li>La comunicación entre la interfaz de usuario (frontend) y el servidor (backend) se debe implementar a través de una API REST, utilizando solicitudes y respuestas HTTP con el formato de datos JSON para transmitir la información.</li>
</ul>

#### 6.Despliegue:
<ul>
  <li>El proyecto se debe desplegar utilizando tecnología de contenedores como Docker para facilitar su configuración y despliegue en cualquier entorno.</li>
</ul>

#### Entregables

#### 1.Repositorio de GitHub:
<ul>
  <li>El código fuente de la aplicación se debe almacenar en un repositorio de Git alojado en GitHub.</li>
  <li>En la raíz del repositorio deben existir dos directorios: uno para el frontend y otro para el backend.</li>
</ul>

#### 2.Enlace al repositorio:
<ul>
  <li>Se debe compartir el enlace al repositorio de GitHub con todos los archivos del proyecto.</li>
</ul>

#### 3.Video de demostración:
<ul>
  <li>Se debe grabar y compartir un enlace a un video que documente el funcionamiento de la aplicación (live demo), mostrando cómo un administrador puede iniciar sesión, gestionar productos, y ver el historial de cambios.</li>
</ul>

### Aplicación Web para inventario de tienda de ropa (StockMaster).

#### 1./registro:
<ul>
  <li>Metodo: <br> POST.</li>
  <li>Descripción: <br>Este endpoint permitirá a un administrador registrar nuevos usuarios-administrador en el sistema. Solo los administradores con permisos adecuados podrán acceder a esta ruta para crear nuevas cuentas de administradores.</li>
</ul>

#### 2./login:
<ul>
  <li>Metodo: <br> POST.</li>
  <li>Descripción: <br>Permite a un administrador existente iniciar sesión en la aplicación.</li>
</ul>

#### 3./usuarios:
<ul>
  <li>Metodo: <br> GET.</li>
  <li>Descripción: <br>Retorna la lista de todos los administradores registrados en el sistema. Útil para gestionar y supervisar a los usuarios que tienen acceso a la aplicación.</li>
</ul>

#### 4./productos:
<ul>
  <li>Metodo: <br> GET.</li>
  <li>Descripción: <br>Devuelve la lista de productos del inventario. Permite aplicar filtros por categoría, nombre, o precio.</li>
  <li>#### Parámetros de consulta:
  <ul>
    <li>Categoria: <br>Filtrar por categoría de producto.</li>
    <li>Nombre: <br>Buscar un producto específico por su nombre.</li>
    <li>Precio: <br>Buscar un producto específico por un rango de precio.</li>
  </ul>
  </li>
</ul>

#### 5./productos:
<ul>
  <li>Metodo: <br> POST.</li>
  <li>Descripción: <br> Permite agregar un nuevo producto al inventario. Esta ruta solo estará accesible para administradores autenticados.</li>
</ul>

#### 6./productos/{id}:
<ul>
  <li>Metodo: <br> PUT.</li>
  <li>Descripción: <br> Permite actualizar los datos de un producto específico del inventario. Solo administradores autenticados podrán realizar esta acción.</li>
</ul>

#### 7./productos/{id}:
<ul>
  <li>Metodo: <br> DELETE</li>
  <li>Descripción: <br>Permite eliminar un producto del inventario. El sistema también registrará cuál administrador realizó la eliminación.</li>
</ul>

#### 8./historial:
<ul>
  <li>Metodo: <br> GET.</li>
  <li>Descripción: <br>Retorna el historial de cambios realizados en el inventario. Cada registro incluye la acción realizada (agregar, editar, eliminar), el nombre del administrador que la realizó y la fecha.</li>
</ul>

### Funcionamiento básico de la aplicación:

<ul>
  <li>Los administradores pueden iniciar sesión mediante el endpoint /login y realizar las operaciones en el inventario.</li>
  <li>Los productos pueden ser agregados, modificados y eliminados mediante los endpoints /productos, y todas las acciones estarán registradas en el historial.</li>
  <li>Se puede consultar el historial de cambios en el inventario mediante el endpoint /historial.</li>
  <li>Se podrán gestionar usuarios administradores con los endpoints /registro y /usuarios.</li>
</ul>
