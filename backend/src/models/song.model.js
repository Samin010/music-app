import mongoose from 'mongoose'

const songSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true
  },

  artist:{
    type:String,
    required:true
  },

  imageUrl:{
    type:String,
    require:true
  },

  audioUrl:{
    type:String,
    require:true
  },

  duration:{
    type:Number,
    required:true
  },

  albumId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Album',
    required:false
  }
},{timestamps:true})

export const Song=mongoose.model('song',songSchema)