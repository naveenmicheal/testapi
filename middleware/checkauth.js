const jwt = require("jsonwebtoken")

let checkauth =(authreq,authres,next)=>{
	try{
		let token = authreq.headers.authorization.split(" ")[1]
		if(!token)
		{	
			throw new Error()
		}
		jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
			if(decoded){
				console.log("Token Valid")
				authreq.body.storeid = decoded.store
				next()
			}
			else{
				console.log(err)	
				throw new Error()
			}
		})
	}
	catch(e){
		authres.json({status:"fail", data:"Token Validation Failed"})
	}
}

module.exports = checkauth