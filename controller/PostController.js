// Post Controller
// --------------------------------------------------------------------------------

let Post = require('../models/Post');
let User = require('../models/User');
let SubCategory = require('../models/SubCategory');


let getAllPosts = async(req , res)=>{
    await Post.find({} , (err , posts)=>{
        if(!err){
            res.json({success:true , posts:posts})
        }
    })
}


let getAllPostsBySubCategory = async(req , res)=>{
    await Post.find({subCategory:req.params.id} , (err , posts)=>{
        if(!err){
            res.json({success:true , posts:posts})
        }
    })
}


let getAllPostsByUser = async(req , res)=>{
    await Post.find({addedBy:req.params.id} , (err , posts)=>{
        if(!err){
            res.json({success:true , posts:posts})
        }
    })
}


let ApprovePost = async(req , res)=>{
    await Post.findByIdAndUpdate(req.params.id , {isApproved:true} , (err , post)=>{
        if(!err){
            res.json({success:true , post:post})
        }
    })
}


let addPost = async(req , res)=>{
    let subCategory = await SubCategory.findById(req.body.subCategory);
    if(!subCategory){
        res.json({success:false , msg:'SubCategory not found'})
    }
    else{
        let post = new Post({
            product:req.body.product,
            subCategory:subCategory._id,
            addedBy:req.user._id,
            Quantity:req.body.Quantity,
            price:req.body.price
        }
        );
        await post.save((err , post)=>{
            if(!err){
                res.json({success:true , post:post})
            }
        }
        )
    }
}


let getPostById = async(req , res)=>{
    await Post.findById(req.params.id , (err , post)=>{
        if(!err){
            res.json({success:true , post:post})
        }
    })
}


let deletePost = async(req , res)=>{
    await Post.findByIdAndDelete(req.params.id , (err , post)=>{
        if(!err){
            res.json({success:true , post:post})
        }
    })
}




module.exports = {
    getAllPosts,
    getAllPostsBySubCategory,
    getAllPostsByUser,
    ApprovePost,
    addPost,
    getPostById,
    deletePost
}