"use strict";var mongoose=require("mongoose"),Schema=mongoose.Schema,ClientSchema=new Schema({personal:{name:{type:String,trim:!0},birthday:Date,age:Number,gender:{type:String,default:"Hombre"},address:{type:String,trim:!0},DNI:{type:String,match:/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i,unique:!0},locality:{type:String,trim:!0},province:{type:String,trim:!0},postal_code:{type:String,match:/[0-9]{5}/i}},attitude:{nature:{type:String,default:"Colaborativo"},temperament:{type:String,default:"Medio"}},contact:{email:{type:String,trim:!0,unique:!0},phoneOne:{type:String,match:/[0-9]{9}/,unique:!0},phoneTwo:{type:String,match:/[0-9]{9}/,unique:!0,default:""}},createdAt:{type:Date,default:Date.now},pets:{type:[Schema.Types.ObjectId],ref:"Pet"},comment:String});ClientSchema.pre("save",function(e){this.personal.name=this.personal.name.split(" ").map(function(e){return e.charAt(0).toUpperCase()+e.substring(1)}).join(" "),this.createdAt=this.createdAt.ToDateString(),this.personal.age=(new Date).getFullYear()-this.personal.birthday.getFullYear(),e()}),module.exports=mongoose.model("Client",ClientSchema);