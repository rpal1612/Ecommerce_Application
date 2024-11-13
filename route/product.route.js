const productController=require("../controllers/product.controller")
const auth_mw= require("../middlewares/auth_mw")

module.exports=(app)=>{
    app.post("/ecomm/api/v1/auth/products",[auth_mw.verifyToken,auth_mw.isAdmin],productController.createNewProducts)
    app.get("/ecomm/api/v1/auth/products",[auth_mw.verifyToken],productController.getAllProducts)
}   