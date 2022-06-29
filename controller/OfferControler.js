var Offer = require('../models/Offer');
const Post = require('../models/Post');

let giveoffer = async(req , res , next)=>{
    let user = req.user;
    let post = req.body.post;
    console.log(req.body)
    let pp =await Post.findById(post);
    let to = pp.addedBy;
    

    
    let newOffer = new Offer({
        
        by:user._id,
        Post:post,
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
// get all offers by user or to user
let getAllOffers = async(req , res , next)=>{
    let user = req.user;
    await Offer.find({$or:[{by:user._id},{to:user._id}]} , (err , offers)=>{
        if(!err){
            res.json({success:true , offers:offers});
        }else{
            res.json({success:false , err:err});
        }
    }
    ).populate(["by" , "to" , "Post"]);
}

let acceptOffer = async(req , res , next)=>{
    let user = req.user;
    let offer = req.body.offer;
    await Offer.findById(offer , (err , offer)=>{
        if(!err){
            offer.isAccepted = true;
            offer.save();
            res.json({success:true , offer:offer});
        }else{
            res.json({success:false , err:err});
        }
    }
    ).populate(["by" , "to" , "Post"]);
}


let rejectOffer = async(req , res , next)=>{
    let user = req.user;
    let offer = req.body.offer;
    await Offer.findOneAndDelete(offer , (err , offer)=>{
        if(!err){
            res.json({success:true , offer:offer});
        }else{
            res.json({success:false , err:err});
        }
    }
    ).populate(["by" , "to" , "Post"]);
}

module.exports = {
    giveoffer,
    getAllOffers,
    rejectOffer,
    acceptOffer
}