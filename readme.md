<h1>Segunda Preentrega del curso "<i>Programación Backend I: Desarrollo Avanzado de Backend</i>"</h1>

<h2>Consigna:</h2>

<h3>Configurar nuestro proyecto para que trabaje con Handlebars y websocket.</h3>
<h3>Aspectos a Incluir</h3>

 * Configurar el servidor para integrar el motor de plantillas Handlebars e instalar un servidor de socket.io al mismo.
   
 * Crear una vista “home.handlebars” la cual contenga una lista de todos los productos agregados hasta el momento
   
 * Además, crear una vista “realTimeProducts.handlebars”, la cual vivirá en el endpoint “/realtimeproducts” en nuestro views router, ésta contendrá la misma lista de productos, sin embargo, ésta trabajará con websockets.
   * Al trabajar con websockets, cada vez que creemos un producto nuevo, o bien cada vez que eliminemos un producto, se debe actualizar automáticamente en dicha vista la lista.
    
<h3>Sugerencias</h3>

 * Ya que la conexión entre una consulta HTTP y websocket no está contemplada dentro de la clase. Se recomienda que, para la creación y eliminación de un producto, Se cree un formulario simple en la vista  realTimeProducts.handlebars. Para que el contenido se envíe desde websockets y no HTTP. Sin embargo, esta no es la mejor solución, leer el siguiente punto.
   
 * Si se desea hacer la conexión de socket emits con HTTP, deberás buscar la forma de utilizar el servidor io de Sockets dentro de la petición POST. ¿Cómo utilizarás un emit dentro del POST?


<h2>Requisitos: </h2>

  * Express
  * Handlebars
  * Socket.io

<h2>Instalación: </h2>

  - git clone https://github.com/EHR11/Preentrega1/tree/Preentrega2
  - cd Preentrega
  - npm install

<h2>Ejecución del servidor:</h2>

  - npm start

<h2>Rutas:</h2>

  - "/" mostrará una talba estática de productos
  - "/realtimeproducts" mostrará una tabla dinámica, con opciones para cargar y eliminar productos
