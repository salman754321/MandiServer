var Offer = require('../models/Offer');
const Post = require('../models/Post');
let giveoffer = async(req , res , next)=>{
    let user = req.user;
    let post = req.body.post;
    let pp = Post.findById(post);
    let to = pp.addedBy;

    
    let newOffer = new Offer({
        
        by:user._id,
        post:post,
        to:to,
        quantity:req.body.quantity,

    });
    await newOffer.save((err , offer)=>{
        if(!err){
            res.json({success:true , offer:offer});
        }
        else{
            res.json({success:false , err:err});
        }
    }
    );
}