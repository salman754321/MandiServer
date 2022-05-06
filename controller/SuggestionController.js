var Suggestion = require('../models/Suggestions');

let getAllSuggestions = async(req , res , next)=>{
    //Get All Complaints With the user Details Who Complained
    console.log("getAllSuggestions")
        await Suggestion.find({} , (err , suggestions)=>{
            if(!err){
                res.json({success:true , suggestions:suggestions});
            }
            else{
                res.json({success:false , err:err});
            }
        }).populate("user");
    }

    let addSuggestion = async(req , res , next)=>{
        let user = req.user;
        let title = req.body.title;
        let description = req.body.description;
        let newSuggestion = new Suggestion({
            title:title,
            description:description,
            user:user._id
        });
        await newSuggestion.save((err , suggestion)=>{
            if(!err){
                res.json({success:true , suggestion:suggestion});
            }
            else{
                res.json({success:false , err:err});
            }
        }
        );
    }

    let getSuggestionByuser = async(req , res , next)=>{
        let user = req.user;
        await Suggestion.find({user:user._id} , (err , suggestion)=>{
            if(!err){
                res.json({success:true , suggestion:suggestion});
            }
            else{
                res.json({success:false , err:err});
            }
        }
        ).populate("user");
    }

    module.exports = {
        getAllSuggestions,
        addSuggestion,
        getSuggestionByuser
    }

