const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

app.use(express.json());
app.use (cors());
dotenv.config();

//creating connection
const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
);
//check db connection 
db.connect((err) =>{
    //if there is an error 
    if(err) return console.log("Error connecting to the db!!!");

    //if it is a success
    console.log("Connection to the db is successful as id:", db.threadId);

    //GET Method goes here

app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');
// Question 1:  Retrieve all patients
app.get('/data', (req,res) =>{
    db.query('SELECT * FROM patients', (err, results) =>{
        if(err) {
            console.error(err);
            return res.status(500).send('Error from retrieving the data.');
        } else{
            //Displays the record
            res.render('data', {results: results});
        }
    });
});

// Question 2: Retrieve all providers
app.get('/provider', (req,res) =>{
    db.query('SELECT * FROM providers', (err, results) =>{
        if(err) {
            console.error(err);
            return res.status(500).send('Error from retrieving the data.');
        } else{
            //Displays the record
            res.render('provider', {results: results});
        }
    });
});


//Question 3: Filter patients by First Name
app.get('/patients', (req,res) =>{
    db.query('SELECT * FROM patients  WHERE first_name = ?', [req.query.first_name], (err, results) =>{

        if(err) {
            console.error(err);
            return res.status(500).send('Error from retrieving the data.');
        } else{
            //Displays the record
            res.render('patients', {results: results});
        }
    });
});

//Question 4: Retrieve all providers by their specialty
app.get('/specialty', (req,res) =>{
    db.query('SELECT * FROM providers WHERE provider_specialty = ?', [req.query.provider_specialty],(err, results) =>{
        if(err) {
            console.error(err);
            return res.status(500).send('Error from retrieving the data.');
        } else{
            //Displays the record
            res.render('specialty', {results: results});
        }
    });
});



});



// root route for the server 
app.get('/',(req,res) => {
    res.send('Server Successful!');
});
app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port ${process.env.PORT}`);
    //port listening then send msg to the browser
    console.log("Sent  message to the browser...");
    
});