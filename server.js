const express = require('express');
const hbs = require('hbs');         //view engine for express app
const fs = require('fs');

let port = process.env.PORT || 3000;

let app = express();  //Creates an Express application

//registering partials and helper
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',()=>new Date().getFullYear());
hbs.registerHelper('screamIt', (text)=> text.toUpperCase())

app.set('view engine','hbs');       //setting view engine for app

app.use((req,res,next)=>{
   var timeStamp = new Date().toString();
   fs.appendFile('server.log',`${timeStamp} : ${req.method}, ${req.url} \n`,(err)=>{
       if(err) console.log('unablet to log the file.');
   })
   next();
});//app middleware to log server-request

// app.use((req,res,next)=>{
//         res.render('maintenance.hbs');
// })// middleware in-case of site maintenance

app.use(express.static(__dirname + '/public'));   

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle :'Weather app',
        welcomeMessage:'Welcome to app',
        features : [
            'show min temp', 'show max temp','humidity','windSpeed', 'latitude','longitude'
        ]
    });
});


app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page'
    });
});

app.get('/features',(req,res)=>{
    res.send({
        temperature:'44C',
        weather :'Mostly cloudly',
        max_temperature:'45c',
        min_temperature: '35c',
    });
});

app.get('/bad',(req,res)=>{
    res.send({ECODE:404,
        errorMessage:'Page not found error 404'});
});

app.listen(port,()=> console.log(`Server is running at ${port}`));         //start server
