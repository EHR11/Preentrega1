import express from "express"
import CartsManager from "../cartMgr.js";

const router = express.Router()

router.get('/', (req,res)=>{
    let limit=parseInt(req.query.limit)
    
    if (limit==NaN||limit<0)
        return res.status(400).json ({"error":"Bad Limit"})
    return res.json(CartsManager.carts.slice(0,limit))
});

router.get('/:cid', (req,res)=>{
    let cid=req.params.cid
    let carritoEncontrado = CartsManager.carts.find((obj)=>obj.cid==cid)
    if (!carritoEncontrado)
        return res.status(404).json({"error":`El carrito buscado con CID ${cid} no existe`})
    return res.status(200).json({"success":"Carrito Encontrado", "cart":carritoEncontrado})
});

router.post("/", (req,res)=>{
    try{
        let nuevoCarrito=CartsManager.createCart(req.body)
        if (nuevoCarrito){
            return res.status(201).json({"success" : `carrito creado con CID ${nuevoCarrito.cid}`,
             "cart": nuevoCarrito})
        }         
        else
            return res.status(400).json("{error: 'Nose' }")
    }
    catch(error){
        return res.status(400).json(error.message)
    }
});

router.post("/:cid/product/:pid", (req,res)=>{
    try{
        let nuevoCarrito=CartsManager.addProduct(req.params.cid,req.params.pid)
        if (nuevoCarrito){
            return res.status(201).json({"success" : `producto con PID ${req.params.pid} agregado`,
             "cart": nuevoCarrito})
        }         
        else
            return res.status(400).json("{error: 'Nose' }")
    }
    catch(error){
        return res.status(400).json(error.message)
    }       
})

router.delete("/:cid", (req,res)=>{
    try{
        let carritoEliminado=CartsManager.deleteCart(req.params.cid)
        if (nuevoCarrito){
            return res.status(201).json({"success" : `carrito con CID ${req.params.cid} eliminado`})
        }         
        else
            return res.status(400).json("{error: 'Nose' }")
    }
    catch(error){
        return res.status(400).json(error.message)
    }       
})

export default router;