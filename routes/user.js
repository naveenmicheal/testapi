const express = require("express")
const util = require("util")
const router = express.Router()	
// const Joi = require("joi")
const jwt = require("jsonwebtoken")
const usermodel = require("../dbmodels/usermodel")
const bcrypt = require("bcrypt")
const shortid = require("shortid")
require("dotenv").config()


// JOI validation	
// const schema = Joi.object({
// 	username:Joi.string().min(3).max(100).trim().required(),
// 	userid:Joi.string().min(3).max(20).trim().required(),
// 	email:Joi.string().min(2).trim().max(100).required(),
// 	password:Joi.string().min(2).trim().max(800).required(),
// })

router.post("/signup",(req,res)=>{
	try{
		const passwordhash = util.promisify(bcrypt.hash)
		passwordhash(req.body.password,3)
			.then(hashedpassword=>{
				let userobj = new usermodel({
					username:req.body.username,
					email:req.body.email,
					password:hashedpassword,
					type:req.body.type,
					createdat:new Date().toString()+"-"+req.connection.remoteAddress
				})
				userobj.save()
					.then(result=>res.json({
						status:"success",
						info:result
					}))
					.catch(error=>res.json({status:"fail",info:error}))
			})
	}
	catch(e){
		res.json({status:"fail",info:"Unknown"})
	}
})

router.post("/login",async (req,res)=>{
	try{
		let status = null
		let data = await usermodel.findOne({"email":req.body.email})
		if(data){
			// console.log(data)
			const passwordcompare = util.promisify(bcrypt.compare)
			let check = await passwordcompare(req.body.password,data["password"])
			if(check){
				let sign = util.promisify(jwt.sign)
				let token = await sign(
					{user:data["_id"]},
					process.env.JWT_SECRET,
					{expiresIn:"10h"}
				)
				status = "success"
				res.json({
					status:"success",
					token
				})	
			}
		}
		if(status === null){
			throw new Error("Authentication Failed")
		}
	}
	catch(err){
		res.json(
			{
				status:"fail",
				info:err.message
			})
	}
})


module.exports = router