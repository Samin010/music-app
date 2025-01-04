
import { clerkClient } from "@clerk/express";

// check if user is logged in or authenticated
export const protectRoute=async(req,res,next)=>{
  if(!req.auth.userId){
    res.status(401).json({message:'Unauthorized-User not logged in'})
    return
  }

  next()
}

// check if user is admin
export const requireAdmin=async(req,res,next)=>{
  try{

    const currentUser= await clerkClient.users.getUser(req.auth.userId)
    const isAdmin=process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress

    if(!isAdmin){
      res.status(403).json({message:'Forbidden-User not admin'})
      return
    }

    next()
  }
  catch(error){
    res.status(500).json({error:'Internal server error'})
  }
}