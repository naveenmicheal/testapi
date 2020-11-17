const mongoose = require("mongoose")

const userschema = mongoose.Schema({
	username:{
		type:String,
		required:true,
		unique: true,
		min:4,
		max:15
	},
	email:{
		type:String,
		required:true,
		unique: false,
		min:5,
		max:30
	},
	password:{
		type:String,
		required:true,
		unique: true,
		min:8,
		max:200
	},
	type:{
		type:String,
		required:true,
		max:30
	},
	createdat:{
		type:String,
		required: true,
	}


})
module.exports = mongoose.model("usersdata", userschema)