import path from "path"
import fs from "fs"
const filePath = path.join(path.resolve(), 'res/products.json')
let products=[]
try{
    let readData = fs.readFileSync(filePath, "utf8")
    console.log("Productos Leidos: \n", readData)
    products = JSON.parse (readData)
  } catch (error) {
        console.log("Archivo Productos no leído")
  }

export default class ProductsManager {
    static products=products

    static createProduct(producto){
        let nuevoProducto = {}
        nuevoProducto.pid = Date.now() //mecanismo para tener siempre ID unico.
        console.log(producto);
        if(typeof (producto.title)==="string")
            nuevoProducto.title=producto.title
        else throw new Error(`Título de producto (campo "title") inexistente o inválido. Debe ser de tipo String`)
        
        if(typeof (producto.description)==="string")
            nuevoProducto.description=producto.description
        else throw new Error(`Descripción de producto (campo "description") inexistente o inválido. Debe ser de tipo String`)
        
        if(typeof (producto.code)==="string")
            nuevoProducto.code=producto.code
        else throw new Error(`Código de producto (campo "code") inexistente o inválido. Debe ser de tipo String`)
        
        if(typeof (producto.price)==="number")
            nuevoProducto.price=producto.price
        else throw new Error(`Precio de producto (campo "price") inexistente o inválido. Debe ser un Numero`)
        
        if(typeof (producto.status)==="boolean")
            nuevoProducto.status=producto.status
        else throw new Error(`Estado de producto (campo "status") inexistente o inválido. Debe ser de tipo Boolean`)
        
        if(typeof (producto.stock)==="number")
            nuevoProducto.stock=producto.stock
        else throw new Error(`Stock de producto (campo "stock") inexistente o inválido. Debe ser un Numero`)
        
        if(typeof (producto.category)==="string")
            nuevoProducto.category=producto.category
        else throw new Error(`Categoría de producto (campo "category") inexistente o inválido. Debe ser de tipo String`)
        
        if(Array.isArray(producto.thumbnails))
            if(producto.thumbnails.every(thumb => typeof thumb === 'string') )
                nuevoProducto.thumbnails=producto.thumbnails
            else throw new Error(`Alguno de los valores de Thumbnails es inválido. Deben ser todos de tipo String`)
       
        products.push(nuevoProducto)
        fs.writeFileSync(filePath,JSON.stringify(products))
        console.log("Archivo escrito")
        return nuevoProducto
    }

    static modifyProduct(pid,producto){

        let productoEncontrado = products[products.findIndex((obj)=>obj.pid==pid)]

        if (!productoEncontrado)
            throw new Error({"error":`El producto buscado con PID ${pid} no existe`})
        
        if(typeof (producto.title)==="string")
            productoEncontrado.title=producto.title
        
        if(typeof (producto.description)==="string")
            productoEncontrado.description=producto.description
        
        if(typeof (producto.code)==="string")
            productoEncontrado.code=producto.code
        
        if(typeof (producto.price)==="number")
            productoEncontrado.price=producto.price
        
        if(typeof (producto.status)==="boolean")
            productoEncontrado.status=producto.status
        
        if(typeof (producto.stock)==="number")
            productoEncontrado.stock=producto.stock
        
        if(typeof (producto.category)==="string")
            productoEncontrado.category=producto.category

        if(Array.isArray(producto.thumbnails))
            if(producto.thumbnails.every(thumb => typeof thumb === 'string') )
                productoEncontrado.thumbnails=producto.thumbnails
       
        fs.writeFileSync(filePath,JSON.stringify(products))
        console.log("Archivo escrito")
        return productoEncontrado
    }

    static deleteProduct(id){
        let productoEncontrado = products.findIndex((obj)=>obj.pid==id)
        console.log(productoEncontrado);
        if (productoEncontrado<0){
            throw new Error(`El producto buscado con PID ${id} no existe`)
        }
        else
        {
            products.splice(productoEncontrado,1)
            fs.writeFileSync(filePath,JSON.stringify(products))
            console.log("Archivo escrito")
            return true
        }
    }
    

}