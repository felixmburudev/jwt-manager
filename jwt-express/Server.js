require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const cors = require('cors') 
const requireAuth = require('./requireAuth')
const app = express() 
app.use(cors())
app.use(bodyParser.json())
const db = mysql.createConnection({
    host: process.env.DB_HOST ,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})
db.connect((error) =>{
    if(error){ console.log("this error occured while connecting to mysql " + error)}
    else{ console.log("Connected to Database")}
})
app.post('/signup', (req, res)=>{
  const {email, password , username}= req.body 
  //
  bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
    if (hashErr) {
      console.error('Error hashing password:', hashErr) 
      res.status(500).send('Error saving user') 
      return 
    }
    
  const query ='SELECT COUNT(*) AS count FROM auth WHERE email = ?'
  db.query(query, [email], (err, results)=>{
    if(err){ 
      res.status(500).send('Error Creating Account')}
    else{
      const emailExist =results[0].count > 0
      if(emailExist){    
        res.status(400).send('Account already Exists')
      }
      else{
        const q = "INSERT INTO auth (username,email, password) VALUES(?,?,?)"
        db.query(q, [username,email, hashedPassword], (error, results)=>{
          if(error){
            res.status(400).send('Failed to Create Account')}
          else{
            res.status(200).send('Account Create')
          }
        })
      }
    }
  })  
})
/////
})
app.post("/login", (req, res)=>{
    const {email, password }= req.body 
  db.query('SELECT * FROM auth WHERE email = ?', [email], (err, results) => {
    if (err) {
      res.status(500).send('Database error: ' + err.message) 
      return 
    }
    if (results.length > 0 ) {

      //
      bcrypt.compare(password, results[0].password, (compareErr, result) => {
        if (compareErr) {
          console.error('Error comparing passwords:', compareErr) 
          res.status(400).send('Error comparing passwords') 
          return 
        }
  
        if (result) {
          console.log('Password is correct!') 
          const token = jwt.sign({ username: results[0].username },  process.env.JWT_SIGNATURE, {
                expiresIn: 86400 //  24 hours
            }) 
            return res.status(200).json({ message: 'success', auth: true, token }) 
        } else {
          console.log('Password is incorrect!') 
          res.status(401).json({ message: 'Invalid username or password' }) 
        }
      }) 
    }
  }) 
})
////////////
app.get('/protected', requireAuth, (req, res) => {  
  console.log("U are authorised")
  const query = 'SELECT username FROM auth'
  db.query(query,(error, results)=>{
    if(error){
      return  res.status(4).send('You have access to this protected route' ) 
    
    }
    else{
      // console.log(JSON.stringify(results))
     return res.status(200).send(results)}
  })
  }) 
app.listen(3000 ,() =>{
    console.log(`server running at port : 3000`) 
})
