import express from "express"
import path from "path"
import fs from "fs"

const router = express.Router()
const filePath = path.join(path.resolve(), 'res/products.json')

router.get('/', (req,res)=>{
    let productsObj = {products:[]}
    try{
        let readData = fs.readFileSync(filePath, "utf8")
        console.log("Productos Leidos: \n", readData)
        productsObj = JSON.parse (readData)
      } catch (error) {
            console.log("Archivo Productos no leido")
      }
    finally{
    let limit=parseInt(req.query.limit)
    
    if (limit==NaN||limit<0)
        return res.status(400).json ({"error":"Bad Limit"})
    return res.json(productsObj.products.slice(0,limit))
    }
});

router.get('/:pid', (req,res)=>{
    let productsObj = {products:[]}
    try{
        let readData = fs.readFileSync(filePath, "utf8")
        console.log("Productos Leidos: \n", readData)
        productsObj = JSON.parse (readData)
      } catch (error) {
            console.log("Archivo Productos no leido")
      }
    finally{
    let pid=req.params.pid
    let productoEncontrado = productsObj.products.find((obj)=>obj.pid==pid)
    if (!productoEncontrado)
        return res.status(404).json({"error":`El producto buscado con PID ${pid} no existe`})
    return res.json(productoEncontrado)
    }
});

router.post("/", (req,res)=>{
    let productsObj = {products:[]}
    try{
        let readData = fs.readFileSync(filePath, "utf8")
        console.log("Productos Leidos: \n", readData)
        productsObj = JSON.parse (readData)
      } catch (error) {
            console.log("Archivo Productos no leido")
      }
    finally{
        let nuevoProducto = {}

        nuevoProducto.pid = Date.now() //mecanismo para tener siempre ID unico.
        
        if(typeof (req.body.title)==="string")
            nuevoProducto.title=req.body.title
        else return res.status(400).json({"error":`Título de producto (campo "title") inexistente o inválido. Debe ser de tipo String`})
        
        if(typeof (req.body.description)==="string")
            nuevoProducto.description=req.body.description
        else return res.status(400).json({"error":`Descripción de producto (campo "description") inexistente o inválido. Debe ser de tipo String`})
        
        if(typeof (req.body.code)==="string")
            nuevoProducto.code=req.body.code
        else return res.status(400).json({"error":`Código de producto (campo "code") inexistente o inválido. Debe ser de tipo String`})
        
        if(typeof (req.body.price)==="number")
            nuevoProducto.price=req.body.price
        else return res.status(400).json({"error":`Precio de producto (campo "price") inexistente o inválido. Debe ser un Numero`})
        
        if(typeof (req.body.status)==="boolean")
            nuevoProducto.status=req.body.status
        else return res.status(400).json({"error":`Estado de producto (campo "status") inexistente o inválido. Debe ser de tipo Boolean`})
        
        if(typeof (req.body.stock)==="number")
            nuevoProducto.stock=req.body.stock
        else return res.status(400).json({"error":`Stock de producto (campo "stock") inexistente o inválido. Debe ser un Numero`})
        
        if(typeof (req.body.category)==="string")
            nuevoProducto.category=req.body.category
        else return res.status(400).json({"error":`Categoría de producto (campo "category") inexistente o inválido. Debe ser de tipo String`})
        
        if(Array.isArray(req.body.thumbnails))
            if(req.body.thumbnails.every(thumb => typeof thumb === 'string') )
                nuevoProducto.thumbnails=req.body.thumbnails
            else return res.status(400).json({"error":`Alguno de los valores de Thumbnails es inválido. Deben ser todos de tipo String`})
       
        productsObj.products.push(nuevoProducto)
        fs.writeFileSync(filePath,JSON.stringify(productsObj))
        console.log("Archivo escrito")
        
        return res.status(201).json({"success":`producto creado con PID ${nuevoProducto.pid}`,"product":nuevoProducto})
    }
})

router.put("/:pid", (req,res)=>{
    let productsObj = {products:[]}
    try{
        let readData = fs.readFileSync(filePath, "utf8")
        productsObj = JSON.parse (readData)
        console.log(productsObj);
      } catch (error) {
            console.log("Archivo Productos no leido")
      }
    finally{
        let pid=req.params.pid

        let productoEncontrado = productsObj.products[productsObj.products.findIndex((obj)=>obj.pid==pid)]

        if (!productoEncontrado)
            return res.status(404).json({"error":`El producto buscado con PID ${pid} no existe`})
        
        if(typeof (req.body.title)==="string")
            productoEncontrado.title=req.body.title
        
        if(typeof (req.body.description)==="string")
            productoEncontrado.description=req.body.description
        
        if(typeof (req.body.code)==="string")
            productoEncontrado.code=req.body.code
        
        if(typeof (req.body.price)==="number")
            productoEncontrado.price=req.body.price
        
        if(typeof (req.body.status)==="boolean")
            productoEncontrado.status=req.body.status
        
        if(typeof (req.body.stock)==="number")
            productoEncontrado.stock=req.body.stock
        
        if(typeof (req.body.category)==="string")
            productoEncontrado.category=req.body.category

        if(Array.isArray(req.body.thumbnails))
            if(req.body.thumbnails.every(thumb => typeof thumb === 'string') )
                productoEncontrado.thumbnails=req.body.thumbnails
       
        fs.writeFileSync(filePath,JSON.stringify(productsObj))
        console.log("Archivo escrito")
        
        return res.status(200).json({"success":`producto con PID ${productoEncontrado.pid} modificado`, "product":productoEncontrado})
    }
})

router.delete('/:pid', (req,res)=>{
    let productsObj = {products:[]}
    try{
        let readData = fs.readFileSync(filePath, "utf8")
        console.log("Productos Leidos: \n", readData)
        productsObj = JSON.parse (readData)
      } catch (error) {
            console.log("Archivo Productos no leido")
      }
    finally{
    let pid=req.params.pid
    let productoEncontrado = productsObj.products.findIndex((obj)=>obj.pid===pid)
    if (!productoEncontrado)
        return res.status(404).json({"error":`El producto buscado con PID ${pid} no existe`})
    productsObj.products.splice(productoEncontrado,1)
    fs.writeFileSync(filePath,JSON.stringify(productsObj))
        console.log("Archivo escrito")
    return res.status(200).json({"success":`Producto con PID ${pid} eliminado`})
    }
});




export default router;
