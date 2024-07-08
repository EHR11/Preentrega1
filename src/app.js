import express from "express"
import routerProducts from "./api/products.js"
import routerCarts from "./api/carts.js"


const app= express()
console.log(app)

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const PORT = 8080

app.use("/api/products",routerProducts);
app.use("/api/carts",routerCarts);

app.listen(PORT,()=>{
    console.log(`Server Running on Port ${PORT}`);
})