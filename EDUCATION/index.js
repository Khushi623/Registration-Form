var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))//when we need html file we need public
app.use(bodyParser.urlencoded({
  extended:true
}))

 mongoose.connect('mongodb://localhost:27017/khushi')
 var db=mongoose.connection
 db.on('error',()=> console.log("Error in connecting to Database"))
 db.once('open',()=> console.log("Connected to Database"))

 app.post("/sign_up",(req,res) =>{
  var fullName =req.body.fullName
  var email=req.body.email
  var location=req.body.location
  var skills=req.body.skills
  var occupation=req.body.occupation
  var contribution=req.body.contribution

  var data={
    "fullName": fullName,
    "email":email,
    "location":location,
    "skills":skills,
    "occupation":occupation,
    "contribution":contribution
  }
  db.collection('data').insertOne(data,(err,collection)=>{
    if(err){
      throw err;
    }
    console.log("Record Inserted Succesfully")
    return res.redirect('signup_succesful.html')
  })
  //return res.redirect('signup_succesful.html')
 })

app.get("/",(req,res) =>{//establish connection between localhost and file
  res.set({
    "Allow-acces-Allow-Origin":'*'//using localhost
  })
  return res.redirect('index.html')
}).listen(3000);

console.log("Listening on port 3000")