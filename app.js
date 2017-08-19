const express =require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const app = express();
const users = require('./routes/users');
const config = require('./configure/dataB');

const port = 3000;

//connect to database
mongoose.connect(config.database);

//verification of the connection
mongoose.connection.on('connected',() =>{
    console.log('connected to database '+config.database);
})

//database error 
mongoose.connection.on('error',(err) =>{
    console.log('database error '+err);
})

//cors middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'clientSide')));

app.use('/users',users);

//body parser middleware
app.use(bodyParser.json());  

app.get('/', (req,res) =>{
    res.send('soufiane is here');
});

app.listen(port,() => {
    console.log('soufiane server started on port :'+port);
});