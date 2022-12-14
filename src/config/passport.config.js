import passport from "passport";
import local from "passport-local";
import userDao from '../dao/MongoDAO/Users.js'
import { createHash, isValidPassword } from '../utils.js'

const LocalStrategy = local.Strategy;
const userService= new userDao()

const initializePassport = () => {
  passport.use('register', new LocalStrategy({passReqToCallback:true, usernameField:'email'},
  async (req,email,password,done) => {
    try {
      const {name,last_name,age,nickname,avatar} = req.body;
  
      if(!email||!name||!last_name||!age||!nickname||!avatar||!password) return done(null,false,{message:'Incomplete values'})
      console.log(req.body.email)
      const user = await userService.getByEmail(req.body.email)
      console.log(user)

      if(user) return done(null,false,{message:'User already exists'})
      

      const newUser={
        email,
        name,
        last_name,
        age,
        nickname,
        avatar,
        password:createHash(password)
      }
      let result = await userService.save(newUser);
      return done(null,result)

    }catch(error) {
      done(error)
    }
  }))

  passport.use('login',new LocalStrategy({usernameField:'email'},async (email,password,done) => {
   
    console.log(email,password)
		if (!email || !password) return done(null,false,{message:'Incomplete values'})
	
		let user = await userService.getByEmail(email)
    console.log(user)
    if(!user) return done(null,false,{message:'Incorrect credentials'})
    
    if(!isValidPassword(user,password)) return done(null,false,{message:'Incorrect password'})
    console.log(user,password)
    return done(null, user);

		
  }))


  passport.serializeUser((user, done) => {
    done(null,user._id)
  })
  passport.deserializeUser(async(id, done) => {
    let result = await userService.getById({_id:id})
    return done(null,result)

  })

}

export default initializePassport;