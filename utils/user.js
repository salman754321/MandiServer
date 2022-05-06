 const getuser = (user) =>{

    const fields = ["id" , "name" ,"cnic", "email" , "username"  ,"mobilephone"  , "role" ,"status"]
    let newuser = {};

        fields.forEach((field)=>{
            console.log(user[field])
            newuser[field] = user[field]
            
        })
        console.log(newuser)

        return newuser;
}

module.exports = getuser;