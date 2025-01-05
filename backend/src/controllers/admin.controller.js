import { Album } from "../models/album.model.js"
import { Song } from "../models/song.model.js"
import cloudinary from "../db/cloudinary.js"


// helper function for cloudinary uploads
const uploadToCloudinary=async(file)=>{
  try{
    const result=await cloudinary.uploader.upload(file.tempFilePath,{
      resource_type:'auto'
    })
    return result.secure_url
  }
  catch(error){
    console.log('Error in uploadToCLoudianry',error)
    throw new Error('Error uploading to cloudinary')
  }
}


export const createSong=async(req,res,next)=>{
  try{
    if(!req.files || !req.files.audioFile || !req.files.imageFile){
      res.status(400).json({message:"Please upload all files"})
      return
    }

    const {title,artist,albumId,duration}=req.body
    const audioFile=req.files.audioFile
    const imageFile=req.files.imageFile 
   
    const imageUrl=uploadToCloudinary(imageFile)
    const audioUrl=uploadToCloudinary(audioFile)


    const song = new Song({
      title,
      artist,
      imageUrl,
      audioUrl, 
      duration,
      albumId: albumId || null,
    });

    await song.save()

    // if song belong to an album, update album's songs array
    if(albumId){
      await Album.findByIdAndUpdate(albumId,{
        $push:{songs:song._id}
      })
    }
   res.status(201).json(song)
  }
  catch(error){
  console.log('Error in create song controller:',error)
  next(error)
  }
}