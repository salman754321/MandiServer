const path = require("path");
var multer = require("multer");


var storage= multer.diskStorage({
    destination:function(req , file ,cb){
        cb(null , "uploads/")
    },
    filename:function(req , file ,cb){
        let ext =path.extname(file.originalname)
        cb(null , Date.now()+ext)
    }
})

var upload = multer({
    storage:storage,
    fileFilter:function(req , file ,callback){
        if(file.mimetype =="image/png" || file.mimetype =="image/jpeg"){
            
            callback(null,true)
        }else{
            console.log(file.mimetype)
            console.log("only jpg and png ");
            callback(null , false)
        }
    },
    limits:{
        fileSize:1024 *1024*7
    }
})


module.exports=upload;