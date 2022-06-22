// Post Controller
// --------------------------------------------------------------------------------

let Post = require('../models/Post');

let Category = require('../models/Category');


let getAllPosts = async(req , res)=>{
    await Post.find({} , (err , posts)=>{
        if(!err){
            console.log(posts);
            res.json({success:true , posts:posts})
        }
    }).populate(['addedBy' , 'Category']);
}


let getAllPostsByCategory = async(req , res)=>{
    await Post.find({Category:req.body.id} , (err , posts)=>{
        if(!err){
            res.json({success:true , posts:posts})
        }
    })
}


let getAllPostsByUser = async(req , res)=>{
    await Post.find({addedBy:req.body.id} , (err , posts)=>{
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
  let category = await Category.findById(req.body.Category);
  if(!category){
      res.json({success:false , msg:'Category not found'})
  }
    else{
        console.log(req.body);
        let post = new Post({
            Product:req.body.Product,
            Category:category,
            addedBy:req.user._id,
            Quantity:req.body.Quantity,
            price:req.body.price
        }
        );
        await post.save((err , post)=>{
            console.log(1,post);
            if(!err){
                console.log(post);
                res.json({success:true , post:post})
            }else{
                res.json({success:false , err:err})
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

let getPostByAgriBazar = async(req , res)=>{
    let categories = await Category.find({bazar:"Agri bazar"});
    await Post.find({Category:{$in:categories}} , (err , posts)=>{
        if(!err){
            res.json({success:true , posts:posts})
        }
    }).populate(['addedBy' , 'Category']);
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
    getAllPostsByCategory,
    getAllPostsByUser,
    ApprovePost,
    addPost,
    getPostById,
    deletePost
}