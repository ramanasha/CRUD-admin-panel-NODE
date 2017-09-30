"use strict";var mongoose=require("mongoose"),Schema=mongoose.Schema,PetSchema=new Schema({personal:{name:{type:String,trim:!0},age:Number,gender:String,breed:{type:String,trim:!0},castrated:Boolean,coat:String,nature:String},clinicalData:{bite:Boolean,vaccines:[{type:String,trim:!0}],microchip:{type:String,match:/[0-9]{15}/i},diseases:[String]},comment:String,owner:{type:Schema.Types.ObjectId,ref:"Client"}});module.exports=mongoose.model("Pet",PetSchema);