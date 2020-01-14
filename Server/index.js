require('dotenv').config()
const path = require('path')
const express = require("express");
const massive = require('massive')
const session = require ('express-session')
const {getUser, loginUser, registerUser, logout} = require('./controllers/authController')
const {getAllPost,createPost} = require ('./controllers/postController')
const {getAllUsers} = require ('./controllers/searchController')

const app = express()

app.use(express.json())

const {SERVER_PORT,CONNECTION_STRING} = process.env

massive(CONNECTION_STRING).then(db =>{
    app.set('db',db)
    console.log('Database Connected') 
 })
 .catch(err=>{console.log(err)})
 
 
 app.use(session({
     resave: false,
     saveUninitialized: true,
     secret: process.env.SESSION_SECRET,
     cookie: {
         maxAge: 1000 * 60 * 60 * 24 * 3
     }
 }))

 //auth
app.get('/auth/user', getUser)
app.post('/auth/register', registerUser)
app.post('/auth/login', loginUser)
app.post('/auth/logout', logout)

//post
app.get('/api/allPosts', getAllPost)
app.post('/api/post', createPost)

//search 
app.get('/api/userSearch', getAllUsers)

 app.listen(SERVER_PORT,()=> console.log(`Listening on port ${SERVER_PORT}`))
 