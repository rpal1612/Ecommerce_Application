const cartController = require("../controllers/cart.controller")
const auth_mw= require('../middlewares/auth_mw')

module.exports = (app)=>{
    app.post("/ecomm/api/v1/carts", [auth_mw.verifyToken ], cartController.createNewCart);
    app.put("/ecomm/api/v1/carts/:id", [auth_mw.verifyToken ], cartController.updateCart);
}