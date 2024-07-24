import express from "express"
import ProductsManager from "../api/productsMgr.js"

const router = express.Router()
router.get("/",(req,res)=>{
    res.render("home",{
        products:ProductsManager.products
    })
})
router.get("/realTimeProducts",(req,res)=>{
    res.render("realTimeProducts",{
        title:"Real Time Products"
    })
})
export default router