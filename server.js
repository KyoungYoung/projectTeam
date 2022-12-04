const express = require('express');
const app = express();
const portNum = 3000;
const bodyParser = require('body-parser');
const passport = require('passport');
const LogalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const { initialize } = require('passport');


app.use(session({secret: '비밀코드',resave: true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

app.listen(portNum,()=>{
    console.log(`http://localhost:${portNum}`);
});
// css 연결
app.use(express.static('public/css'));
app.use(express.static('public/img'));
app.use(express.static('public/js'));

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html')
})
app.get('/login',(req,res) => {
    res.sendFile(__dirname + '/login.html');
})
app.get('/join',(req,res) => {
    res.sendFile(__dirname + '/join.html');

})
