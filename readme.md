<h1>Primera Preentrega del curso "<i>Programación Backend I: Desarrollo Avanzado de Backend</i>"</h1>

<h2>Enunciado:</h2>

<h3>Desarrollar el servidor basado en Node.JS y express, que escuche en el puerto 8080 y disponga de dos grupos de rutas: /products y /carts. Dichos endpoints estarán implementados con el router de express, con las siguientes especificaciones:</h3>
 
 Para el manejo de productos, el cual tendrá su router en _/api/products/_, configurar las siguientes rutas:
  - La ruta raíz _GET/_ deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior)
  - La ruta _GET/:pid_ deberá traer sólo el producto con el id proporcionado
  - La ruta raíz _POST/_ deberá agregar un nuevo producto con los campos:
    -  id: Number/String (A tu elección, el id NO se manda desde body, se autogenera como lo hemos visto desde los primeros entregables, asegurando que NUNCA se repetirán los ids en el archivo)
    -  title:String,
    -  description:String,
    -  code:String,
    -  price:Number
    -  status:Boolean
    -  stock:Number
    -  category:String
    -  thumbnails:Array de Strings que contenga las rutas donde están almacenadas las imágenes referentes a dicho producto
      - Status es true por defecto.
      - Todos los campos son obligatorios, a excepción de thumbnails
  - La ruta _PUT/:pid_ deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.
  - La ruta _DELETE/:pid_ deberá eliminar el producto con el pid indicado.

Para el carrito, el cual tendrá su router en _/api/carts/_, configurar dos rutas:
  - La ruta raíz _POST/_ deberá crear un nuevo carrito con la siguiente estructura:
    - Id:Number/String (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere).
    - products: Array que contendrá objetos que representen cada producto
  - La ruta _GET/:cid_ deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.
  - La ruta _POST/:cid/product/:pid_ deberá agregar el producto al arreglo "products" del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
    - product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)
    - quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno. Además, si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto.

La persistencia de la información se implementará utilizando el file system, donde los archivos "productos,json" y "carrito.json", respaldan la información. 
No es necesario realizar ninguna implementación visual, todo el flujo se puede realizar por Postman o por el cliente de tu preferencia.

<h2>Requisitos: </h2>
  - Express

<h2>Instalación: </h2>
  - git clone https://github.com/EHR11/Preentrega1
  - cd Preentrega1
  - npm install

<h2>Ejecución del servidor:</h2>
  - npm start

<h2>Llamados:</h2>
  - Utilizar la coleccion de Postman del repo
