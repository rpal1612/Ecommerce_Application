/**
 * creating category 
 * post :  http://localhost:8888/ecomm/api/v1/auth/categories
 * {
 *         name : "household",
 *         description :"this will contain all household description"
 * }
 */
const category_model=require("../models/category.model")
exports.createNewCategory=async(req,res)=>{
    //read the request body
    console.log("Request received:", req.body);
    //create category object
    const cat_data={
        name : req.body.name,
        description : req.body.description
    }
    //insert into mongoDB
    try{
        const category=await category_model.create(cat_data);
        return res.status(201).send(category)
    }catch(err){
        console.log("error while creating the category",err)
        return res.status(500).send({
            message:("error while creating the category")
        })
    }
    
    //return response of created category
}

//controller to fetch all the categories
exports.getAllCategories=async(req,res)=>{
    try{
        const categories=await category_model.find();
        res.status(200).send(categories);
    }catch(err){
        console.log("error while getting all the categories",err)
        return res.status(500).send({
            message:"Internal server error while getting all categories "
        })
    }
}

//controller to get category based on name 
exports.getSingleCategory=async(req,res)=>{
    try{
        const category=await category_model.find({name: req.params.category_name});
        res.status(200).send(category)
    }catch(err){
        console.log("Error while getting the category with name",err);
        return res.status(500).send({
            message:"Ïnternal server error while getting the category"
        })
    }
}

exports.editCategory = async (req,res)=>{
    try{
        const category = await category_model.findOne({name : req.params.category_name})
 
        category.name = req.body.name ? req.body.name : category.name
        category.description = req.body.description ? req.body.description : category.description
        
        console.log(category)
        const updatedCategory = await category.save();
 
        console.log(`#### Category '${updatedCategory.name}' data updated ####`);
        res.status(200).send(updatedCategory);
 
     }catch(err){
        console.log("#### Error while updating category data #### ", err.message);
        res.status(500).send({
            message : "Internal server error while updating category data"
        });
    }
 }