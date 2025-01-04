import { User } from "../models/user.model.js"

export const authCallback=async(req,res)=>{
  console.log('Req object is:',req.body)
  try{
     const {id,firstName,lastName,imageUrl}=req.body
    //  check if user already exists
    const user=await User.findOne({clerkId:id})
   
    if(!user){
      // signup
      await User.create({
        clerkId:id,
        fullname:`${firstName} ${lastName}`,
        imageUrl,
      })
    }
    else{
      res.status(400).json({error:'User already exists'})
    }
    res.status(200).json({message:'User created successfully'})
  }
  catch(error){
   console.log('Error in Auth Controller',error)
   res.status(500).json({error:'Internal server error'})
  }
}