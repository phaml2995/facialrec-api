const express = require('express')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({ //Connecting the api to the DB
	client: 'pg',
  	connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'ynuyasha295',
    database : 'smart-brain'
   }
});



const app = express();
const saltRounds = 10;

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req,res) =>{
	res.send('It is working');
})

app.post('/signin',(req,res) => {signin.handleSignin(req,res,db,bcrypt)})
													    //Dependency injection
app.post('/register', (req, res) => {register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id', (req,res) => {profile.handleProfile(req,res,db)})

app.put('/image',(req,res) =>{image.handleImage(req,res,db)})

app.post('/imageURL',(req,res) =>{image.handleApiCall(req,res,db)})



app.listen(process.env.PORT || 3000,() =>{
	console.log(`App is running on port ${process.env.PORT}`);
})





