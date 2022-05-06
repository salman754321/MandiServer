// Category Controller

let Category = require('../models/Category');

 let getAllCategory = async(req , res)=>{
    await Category.find({} , (err , categories)=>{
        if(!err){
            res.json({success:true , categories:categories})
        }
    })
}

// Only Admin can add new category and Category must be unique
let addCategory = async(req , res)=>{
    let category = new Category({
        name:req.body.name,
        description:req.body.description,
        image:req.body.image
    });
    await category.save((err , category)=>{
        if(!err){
            res.json({success:true , category:category})
        }
    })
}


module.exports = {
    getAllCategory,
    addCategory
}
