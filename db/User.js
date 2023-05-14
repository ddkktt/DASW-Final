const {mongoose} = require('./connectdb')
const { nanoid} = require('nanoid')

let userSchema =  mongoose.Schema({
    uid: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Nombres: {
        type: String,
        required: true
    },
    Apellidos: {
        type: String,
        required: true
    }
    
})

userSchema.statics.getUserByEmail = async(email) =>{
    let doc = await User.findOne({email});
    console.log(doc);
    return doc;
}

userSchema.statics.getUser = async(filtros)=>{
    let docs = await User.find(filtros)
    console.log(docs);
    return docs;
}


userSchema.statics.getUserById= async(uid) => {
    let doc = await  User.findOne({uid})
    console.log(doc);
    return doc
}

//User.getUsers({},true)
userSchema.statics.getUsers =   async (filtros={}, isAdmin=false)=>{
    let projection = {_id:0, email:1, password:1, Nombres:1, Apellidos:1}
    let skip=0
    let limit = 1000
    
    if (isAdmin) projection.password = 1
    let docs = await User.find(filtros, projection)
    console.log(docs);
    return docs;
}

userSchema.statics.getUserByEmail = async (email)=>{
    let doc = await User.findOne({email},{
_id:0, email:1, Nombres:1, Apellidos:1, password:1
    })
    console.log(doc);
    return doc
}

userSchema.statics.addUser = async (newUser)=>{
    //aquí podemos validar el newUser

    let newUserDB = User(newUser)
    await newUserDB.save()
    return newUserDB;

}

userSchema.statics.updateUser = async (email, userData) => {
    let newUser = await User.findOneAndUpdate({ email }, { $set: userData }, { new: true })
    console.log(newUser);
    return newUser;
  }
  
  userSchema.methods.update = async function(userData) {
    let data = await this.updateOne(userData)
    console.log("update", data);
    return this
  }

userSchema.statics.deleteUser = async (email)=>{
    let doc = await User.findOneAndDelete({email})
    return doc;
}

const User = mongoose.model('User',userSchema)


//User.getUsers()

// updateUser("test3@test.com", {username:"test33333", password:"54321"})
// getUserByEmail("test3@test.com")

//  getUsers({email:'test3@test.com'})
// getUsers({username: new RegExp('TEST','i')})
// addUser({
//     email:"test3@test.com",
//  username:"test3",
//   password:"12345"
// })

module.exports = {User}