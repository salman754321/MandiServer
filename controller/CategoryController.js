// Category Controller

let Category = require('../models/Category');

 let getAllCategory = async(req , res)=>{
    await Category.find({} , (err , categories)=>{
        if(!err){
            console.log(categories);
            res.json({success:true , categories:categories})

        }
    })
}

// Only Admin can add new category and Category must be unique
let addCategory = async(req , res)=>{
    let category = new Category({
        name:req.body.name,
        subCategory:req.body.subCategory,
        bazar:req.body.bazar
    });

    // Uploading Image
    if(req.file){
        category.image = req.file.path;
    }
    console.log(category);
    await category.save((err , category)=>{
        if(!err){
            res.json({success:true , category:category})
        }
    })
}


let editCategory = async(req , res)=>{
    await Category.findByIdAndUpdate(req.params.id , {
        name:req.body.name,
        subCategory:req.body.subCategory,
        image:req.body.image,
        bazar:req.body.bazar
    } , (err , category)=>{
        if(!err){
            res.json({success:true , category:category})
        }
    }
    )
}

let getCategoryById = async(req , res)=>{
    await Category.findById(req.params.id , (err , category)=>{
        if(!err){
            res.json({success:true , category:category})
        }


    }
    )
}


let deleteCategory = async(req , res)=>{
    await Category.findByIdAndDelete(req.params.id , (err , category)=>{
        if(!err){
            res.json({success:true , category:category})
        }
    }
    )
}
module.exports = {
    getAllCategory,
    addCategory,
    editCategory,
    getCategoryById,
    deleteCategory
}
