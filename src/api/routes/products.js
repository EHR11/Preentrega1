import express from "express"
import ProductsManager from "../productsMgr.js";

const router = express.Router()

router.get('/', (req,res)=>{
    let limit=parseInt(req.query.limit)
    console.log(ProductsManager.products);
    if (limit==NaN||limit<0){
        if (req.socketIO && req.socketIO.emit)
            console.log("sendingError")
            req.socketIO.emit("getProductsError", "Error: Bad Limit");
        return res.status(400).json ({"error":"Bad Limit"})
    }
    if (req.socketIO && req.socketIO.emit){
                console.log("sendingResult")
                req.socketIO.emit("getProductsResult", ProductsManager.products.slice(0,limit));
            }
    return res.json(ProductsManager.products.slice(0,limit))
});

router.get('/:pid', (req,res)=>{
    let pid=req.params.pid
    let productoEncontrado = ProductsManager.products.find((obj)=>obj.pid==pid)
    if (!productoEncontrado)
        return res.status(404).json({"error":`El producto buscado con PID ${pid} no existe`})
    return res.json(productoEncontrado)
});

router.post("/", (req,res)=>{
    try{
        console.log(req.body);
        let NuevoProducto=ProductsManager.createProduct(req.body)
        if (NuevoProducto){
            if (req.socketIO && req.socketIO.emit)
                req.socketIO.emit("createProductResult", `producto con PID ${req.params.pid} creado`);
            return res.status(201).json({"success":`producto creado con PID ${NuevoProducto.pid}`,"product":NuevoProducto})
        }
        else{
            console.log(error)
            if (req.socketIO && req.socketIO.emit)
                req.socketIO.emit("createProductError", `Error Inesperado`);
            return res.status(400).json("{error: 'Error Inesperado' }")
        }    
    }
    catch(error){
        if (req.socketIO && req.socketIO.emit)
            req.socketIO.emit("createProductError", `${error}`);
        return res.status(400).json(error)
    }
})

router.put("/:pid", (req,res)=>{
    try{
        console.log(req.body);
        let productoEncontrado=ProductsManager.modifyProduct(req.params.pid, req.body)
        if (productoEncontrado)
            return res.status(201).json({"success":`producto con PID ${productoEncontrado.pid} modificado`,"product":productoEncontrado})
        else
            return res.status(400).json("{error: 'Nose' }")
    }
    catch(error){
        return res.status(400).json(error)
    }
});

router.delete('/:pid', (req,res)=>{
    try{
        let productoEliminado=ProductsManager.deleteProduct(req.params.pid)
        console.log(productoEliminado);
        if (productoEliminado){
            if (req.socketIO && req.socketIO.emit)
                req.socketIO.emit("deleteProductResult", `producto con PID ${req.params.pid} eliminado`);
            return res.status(201).json({"success":`producto con PID ${req.params.pid} eliminado`})
        }
        else{
            if (req.socketIO && req.socketIO.emit)
                req.socketIO.emit("deleteProductError", `Error Inesperado`);
            return res.status(400).json("{error: 'Error Inesperado' }") 
        }
    }
    catch(error){
        console.log(error.message)
        if (req.socketIO && req.socketIO.emit)
            req.socketIO.emit("deleteProductError", `${error.message}`);
        return res.status(400).json({"error":error.message})
    }
});




export default router;
