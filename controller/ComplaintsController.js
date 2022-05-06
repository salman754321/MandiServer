// get all Complaints
// GET /complaints
// GET /complaints/
// GET /complaints/index
// GET /complaints/index.html
// GET /complaints/index.htm

//Get All Complaints With the user Details Who Complained

let Complaints = require('../models/Complaints');

let getAllComplaints = async(req , res , next)=>{
   //Get All Complaints With the user Details Who Complained
    await Complaints.find({} , (err , complaints)=>{
        if(!err){
            res.json({success:true , complaints:complaints});
        }else{
            res.json({success:false , err:err});
        }}).populate("user");

}

let addComplaint = async(req , res , next)=>{
    let user = req.user;
    let description = req.body.description;
    let newComplaint = new Complaints({
        description:description,
        user:user._id
    });
    await newComplaint.save((err , complaint)=>{
        if(!err){
            res.json({success:true , complaint:complaint});
        }
        else{
            res.json({success:false , err:err});
        }
    }
    );
}

let ResolveComplaint = async(req , res , next)=>{
    let id = req.body.id;
    await Complaints.findById(id , (err , complaint)=>{
        if(!err){
            complaint.status = "resolved";
            complaint.save();
            res.json({success:true , complaint:complaint});
        }else{
            res.json({success:false , err:err});
        }
    }
    ).populate("user");
}


  

module.exports = {
    getAllComplaints,
    addComplaint,
    ResolveComplaint
}
