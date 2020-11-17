const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const helmet = require("helmet")
const cors = require("cors")
require("dotenv").config()

const user = require("./routes/user")
const secure = require("./routes/secure")

const app = express()
const port = process.env.PORT || 5000

app.use(helmet())
app.use(cors())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))
app.use(express.json({limit: '10mb'}))

let dboptions={
	dbName:"testdb",
	useNewUrlParser: true, 
	useUnifiedTopology: true,
	useCreateIndex:true,
	autoIndex: true
}
// eslint-disable-next-line	
mongoose.connect(process.env.DBURI,dboptions)

let db = mongoose.connection
db.on("error", ()=>console.log("DB Connection Error"))
db.once("open",()=>console.log("Connction DB Done"))

app.use("/user",user)
app.use("/secure",secure)

app.get("/",(req,res)=>{
	res.json({
		name:"Test API",
		status:"live"
	})
})


console.log("========================================================")

app.listen(port,()=>console.log(`App listening on ${port}`))