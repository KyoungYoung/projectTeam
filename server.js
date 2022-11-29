const express = require('express');
const app = express();
const portNum = 3000;

app.listen(portNum,()=>{
    console.log(`http://localhost:${portNum}`);
});
// css 연결
app.use(express.static('public/css'));
app.use(express.static('public/img'));

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html')
})
app.get('/login',(req,res) => {
    res.sendFile(__dirname + '/login.html');
})
app.get('/join',(req,res) => {
    res.sendFile(__dirname + '/join.html');

})
