const express = require("express")
const router = express.Router()	
const jwt = require("jsonwebtoken")
const auth = require("../middleware/checkauth.js")

router.get("/",auth,(req,res)=>{
	res.json({
		status:"You Are in Protected Route"
	})
})

module.exports = router