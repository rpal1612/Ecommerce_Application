// //create uri
// //post call

// const authController=require("../controllers/auth.controller")

// module.exports = (app)=>{
//     app.post("/ecomm/api/v1/auth/signup", authController.signup)
// }

// routes/auth.route.js
const authController = require('../controllers/auth.controller');
const authMW=require("../middlewares/auth_mw")
module.exports = (app) => {
    app.post('/ecomm/api/v1/auth/signup',[authMW.verifySignUpBody],authController.signup);

    /**route for post call 
     * http://localhost:8888/ecomm/api/v1/auth/signin
     */
    app.post("/ecomm/api/v1/auth/signin",[authMW.verifySignInBody],authController.signin)
};