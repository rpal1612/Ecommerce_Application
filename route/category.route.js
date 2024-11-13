//http://localhost:8888/ecomm/api/v1/auth/categories
const category_controller=require("../controllers/category.controller")
const auth_mw = require("../middlewares/auth_mw")

module.exports=(app)=>{
    app.post("/ecomm/api/v1/auth/categories",[auth_mw.verifyToken,auth_mw.isAdmin],category_controller.createNewCategory)
    app.get("/ecomm/api/v1/auth/categories", [auth_mw.verifyToken ], category_controller.getAllCategories);
    app.get("/ecomm/api/v1/auth/categories/:category_name", [auth_mw.verifyToken ], category_controller.getSingleCategory);
    app.put("/ecomm/api/v1/auth/categories/:category_name", [auth_mw.verifyToken, auth_mw.isAdmin ], category_controller.editCategory);
}   