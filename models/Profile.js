"use strict";var mongoose=require("mongoose"),Schema=mongoose.Schema,ProfileSchema=new Schema({title:{type:String,trim:!0},imageURL:String,description:String});module.exports=mongoose.model("Profile",ProfileSchema);