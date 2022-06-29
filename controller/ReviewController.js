let Review = require('../models/Review');


let addReview = async(req , res , next)=>{
    let user = req.user;
    let post = req.body.post;
    let comment = req.body.comment;
    let rating = req.body.rating;
    let newReview = new Review({
        user:user._id,
        post:post,
        comment:comment,
        rating:rating
    });
    await newReview.save((err , review)=>{
        if(!err){
            res.json({success:true , review:review});
        }
        else{
            res.json({success:false , err:err});
        }
    }
    );
}


let getAllReviews = async(req , res , next)=>{
    await Review.find({} , (err , reviews)=>{
        if(!err){
            res.json({success:true , reviews:reviews});
        }
        else{
            res.json({success:false , err:err});
        }
    }
    ).populate(["user" , "post"]);
}

let getReviewsByUser = async(req , res , next)=>{
    let user = req.user;
    await Review.find({user:user._id} , (err , reviews)=>{
        if(!err){
            res.json({success:true , reviews:reviews});
        }
        else{
            res.json({success:false , err:err});
        }
    }
    ).populate(["user" , "post"]);
}


module.exports = {
    addReview,
    getAllReviews,
    getReviewsByUser
}