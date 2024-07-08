import express from "express"
import path from "path"
import fs from "fs"

const router = express.Router()
const filePathCarritos = path.join(path.resolve(), "res/carts.json")
const filePathProductos =path.join(path.resolve(), "res/products.json")

router.get('/', (req,res)=>{
    let cartsObj = {carts:[]}
    try{
        let readData = fs.readFileSync(filePathCarritos, "utf8")
        console.log("Carritos Leidos: \n", readData)
        cartsObj = JSON.parse (readData)
      } catch (error) {
            console.log("Archivo Carritos no leido")
      }
    finally{
    let limit=parseInt(req.query.limit)
    
    if (limit==NaN||limit<0)
        return res.status(400).json ({"error":"Bad Limit"})
    return res.json(cartsObj.carts.slice(0,limit))
    }
});

router.get('/:cid', (req,res)=>{
    let cartsObj = {carts:[]}
    try{
        let readData = fs.readFileSync(filePathCarritos, "utf8")
        console.log("Carritos Leidos: \n", readData)
        cartsObj = JSON.parse (readData)
      } catch (error) {
            console.log("Archivo Carritos no leido")
      }
    finally{
    let cid=req.params.cid
    let carritoEncontrado = cartsObj.carts.find((obj)=>obj.cid==cid)
    if (!carritoEncontrado)
        return res.status(404).json({"error":`El carrito buscado con CID ${cid} no existe`})
    return res.status(200).json({"success":"Carrito Encontrado", "cart":carritoEncontrado})
    }
});

router.post("/", (req,res)=>{
    let cartsObj = {carts:[]}
    try{
        let readData = fs.readFileSync(filePathCarritos, "utf8")
        console.log("carritos Leidos: \n", readData)
        cartsObj = JSON.parse (readData)
      } catch (error) {
            console.log("Archivo carritos no leido")
      }
    finally{
        let productsObj = {products:[]}
        try{
            let readData = fs.readFileSync(filePathProductos, "utf8")
            console.log("Productos Leidos: \n", readData)
            productsObj = JSON.parse (readData)
          } catch (error) {
                console.log("Archivo Productos no leido")
          }
        
        let nuevoCarrito = {}

        nuevoCarrito.cid = Date.now() //mecanismo para tener siempre ID unico.
        nuevoCarrito.products= []

        let reqProducts=req.body.products

        reqProducts.forEach(product => {
            if(productsObj.products.find(pr=>pr.pid==product.pid))
                nuevoCarrito.products.push({"pid":product.pid,"quantity":product.quantity||1})
            else return res.status(404).json({"error":`El producto de PID ${product.pid} no existe`})
        });
               
        cartsObj.carts.push(nuevoCarrito)
        fs.writeFileSync(filePathCarritos,JSON.stringify(cartsObj))
        console.log("Archivo escrito")
        
        return res.status(201).json({"success":`carrito creado con CID ${nuevoCarrito.cid}`,"product":nuevoCarrito})
    }
})

router.post("/:cid/product/:pid", (req,res)=>{
    let cartsObj = {carts:[]}
    try{
        let readData = fs.readFileSync(filePathCarritos, "utf8")
        cartsObj = JSON.parse (readData)
        console.log(cartsObj);
      } catch (error) {
            console.log("Archivo carritos no leido")
      }
    finally{
        let productsObj = {products:[]}
        try{
            let readData = fs.readFileSync(filePathProductos, "utf8")
            console.log("Productos Leidos: \n", readData)
            productsObj = JSON.parse (readData)
          } catch (error) {
                console.log("Archivo Productos no leido")
          }

        let cid=req.params.cid
        let pid=req.params.pid

        let carritoEncontrado = cartsObj.carts[cartsObj.carts.findIndex((obj)=>obj.cid==cid)]

        if (!carritoEncontrado)
            return res.status(404).json({"error":`El carrito buscado con CID ${cid} no existe`})
        
        let productoEncontrado = productsObj.products.find(product=>product.pid==pid)
        if (!productoEncontrado)
            return res.status(404).json({"error":`El producto a agregar con PID ${pid} no existe`})

        let productoACargar = carritoEncontrado.products.findIndex(prod=>prod.pid==pid)
        console.log(productoACargar);
        if (productoACargar==-1)
            carritoEncontrado.products.push({"pid":parseInt(pid), "quantity":1})
        else
            carritoEncontrado.products[productoACargar].quantity++        
       
        fs.writeFileSync(filePathCarritos,JSON.stringify(cartsObj))
        console.log("Archivo escrito")
        
        return res.status(200).json({"success":`carrito con PID ${carritoEncontrado.cid} modificado`, "product":carritoEncontrado})
    }
})

export default router;