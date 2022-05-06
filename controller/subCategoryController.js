
let SubCategory = require('../models/SubCategory');
let Category = require('../models/Category');
let Product = require('../models/Product');


let getAllSubCategory = async(req , res)=>{
    await SubCategory.find({} , (err , subCategories)=>{
        if(!err){
            res.json({success:true , subCategories:subCategories})
        }
    })
}


let addSubCategory = async(req , res)=>{
    let Category = await Category.findById(req.body.Category);
    if(!Category){
        res.json({success:false , msg:'Category not found'})
    }else{

    let subCategory = new SubCategory({
        name:req.body.name,
        description:req.body.description,
        Category:Category._id
    });
    await subCategory.save((err , subCategory)=>{
        if(!err){
            res.json({success:true , subCategory:subCategory})
        }
    })
}
}


