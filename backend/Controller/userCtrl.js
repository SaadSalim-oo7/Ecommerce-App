let userSchema = require('../Model/userSchema');
let bcrypt = require("bcrypt")
let jwt = require('jsonwebtoken')
let {ObjectId} = require("mongodb")


const verifyUser = async (req, res) => {
    let {Email, Password} = req.body;
    if (!Email || !Password) {
      return res.json({
        Error : "Missing Email or Password"
      })
    }
    let user = await userSchema.findOne({ Email : Email })
    if (user == null) {
      return res.json({
        Error : "No user is registered with this Email"
      })
    } else {
      let result = bcrypt.compareSync(Password, user.Password);
      if(result == false) {
        return res.json({
          Error : "Wrong Email or Password"
        })
      } else {
        let token = jwt.sign({ Email : user.Email, isAdmin : user.isAdmin}, "shhh");
        console.log(token);
        return res.json({
          Success : "Login Success",
          token : token
        })
      }
    }
  }

const registerUser = async(req, res)  => {
    try{
        let {Password, Email, Name, Age, City, isAdmin} = req.body
        if (!Password || !Email || !Name || !Age || !City || isAdmin == undefined ) {
            return res.status(206).json ({
                Error : 'Please give all fields'
            })
        }
        let hashedPassword = bcrypt.hashSync(Password, 10)
        req.body.Password = hashedPassword
        let users = new userSchema(req.body);
        let result = await users.save();
        return res.json({ Success : 'User stored in DB', userDetail : result })
    } catch (err) {
        return res.json(err)
    }
}

const isLoggedIn =  async (req, res, next) => {
    token = req.headers.authorization;
    if(!token) {
      return res.json({
        Error : "Login Required"
      })
    } try {
      let payload = jwt.verify(token, "shhh");
      req.payload = payload
      next();
    } catch(err) {
      return res.json(err)
    } 
  }

const isAdmin = (req, res,next) => {
    if (req.payload.isAdmin == true) {
      next()
    } else {
      return res.json({ Error : "Only admins can access this"})
    }
  }

const getAllUser = async (req, res) => {
    let users = await userSchema.find();
    return res.json(users);
  }
  
const getAUser =  async (req, res) => {
    let {id} = req.params
    let users = await userSchema.findOne({ _id : id});
    if (users == null) {
      return res.json({
        Error : 'No user found'
      })
    } else { return res.json({ userDetail : users })
  }
}

const updateUserdetails = async (req,res) => {
    let id = req.params;
    let result = await userSchema.findOneAndUpdate({ _id : new ObjectId(id) }, req.body, { new : true });
    if (result == null) {
      return res.json({
        Error : "User updation failed"
      })
    }else {
      return res.json({
        Success : "User updated successfully", result
      })
    }
  }

const checkUserExists = async (req, res, next) => {
    let id = req.params;
    let user = await userSchema.findOne({ _id : new ObjectId(id) })
    if (user == null) {
      return res.json({
        Error : "No user found"
      })
    } else {
       next();
    }
} 

const deleteUser = async (req, res) => {
    let id = req.params;
    let result = await userSchema.findOneAndDelete({ _id : new ObjectId(id) });
    return res.json({
      Success : "User delete successfully",
      user : result
    })
  }

module.exports = {
    registerUser,
    getAllUser,
    getAUser,
    updateUserdetails,
    checkUserExists,
    deleteUser,
    verifyUser,
    isLoggedIn,
    isAdmin
}