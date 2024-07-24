import path from "path"
import fs from "fs"
import ProductsManager from "./productsMgr.js"
const filePath = path.join(path.resolve(), './res/carts.json')
let carts=[]
try{
    let readData = fs.readFileSync(filePath, "utf8")
    console.log("Carritos Leidos: \n", readData)
    carts = JSON.parse (readData)
  } catch (error) {
        console.log("Archivo Carritos no leído")
  }

export default class CartsManager {
    static carts=carts

    static createCart(carrito){
        let nuevoCarrito = {}

        nuevoCarrito.cid = Date.now() //mecanismo para tener siempre ID unico.
        nuevoCarrito.products= []

        let reqProducts=carrito.products

        reqProducts.forEach(product => {
            if(ProductsManager.products.find(pr=>pr.pid==product.pid)){
                if (typeof product.pid != "number")
                    throw new Error(`error: El campo PID del producto ${reqProducts.findIndex(pr=>pr==product)} no existe o es Invalido: Debe ser de tipo Number`)
                if (typeof product.quantity != "number")
                    throw new Error(`error: El campo Cantidad del producto ${reqProducts.findIndex(pr=>pr==product)} no existe o es Invalido: Debe ser de tipo Number`)
                nuevoCarrito.products.push({"pid":product.pid,"quantity":product.quantity||1})
            }
            else throw new Error(`El producto de PID ${product.pid} no existe`)
        });
               
        carts.push(nuevoCarrito)
        fs.writeFileSync(filePath,JSON.stringify(carts))
        console.log("Archivo escrito")
        return nuevoCarrito
    }

    static addProduct(cid,pid){

        let carritoEncontrado = carts[CartsManager.carts.findIndex((obj)=>obj.cid==cid)]

        if (!carritoEncontrado)
            throw new Error(`error: El carrito buscado con CID ${cid} no existe`)
        
        let productoEncontrado = ProductsManager.products.find(product=>product.pid==pid)
        if (!productoEncontrado)
            throw new Error(`error: El producto a agregar con PID ${pid} no existe`)

        let productoACargar = carritoEncontrado.products.findIndex(prod=>prod.pid==pid)
        console.log(productoACargar);
        if (productoACargar==-1)
            carritoEncontrado.products.push({"pid":parseInt(pid), "quantity":1})
        else
            carritoEncontrado.products[productoACargar].quantity++        
       
        fs.writeFileSync(filePath,JSON.stringify(carts))
        console.log("Archivo escrito")
        return carritoEncontrado
    }

    static deleteCart(id){
        let carritoEncontrado = carts.findIndex((obj)=>obj.pid==id)
        console.log(carritoEncontrado);
        if (carritoEncontrado<0){
            throw new Error(`El carrito buscado con CID ${id} no existe`)
        }
        else
        {
            carts.splice(carritoEncontrado,1)
            fs.writeFileSync(filePath,JSON.stringify(carts))
            console.log("Archivo escrito")
            return true
        }
    }
}