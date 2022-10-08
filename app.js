const express = require('express');
const fs = require('fs');
const app = express();
const port = 3500;


app.listen(port, () => {
    console.log(`테스트 서버가 실행됩니다. http://localhost:${port}`);
})


// 시작 페이지 불러오기
app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html');
})


// 로그인 페이지 불러오기
app.get('/Interface/login.html',(req,res) => {
    res.sendFile(__dirname + '/Interface/login.html')
});


// 시작 페이지 사진 가져오기
app.use('/',(req,res) => {
    fs.readFile('./asset/img/hansei_1.jpeg', (err, data) => {
        res.writeHead(200);
        res.write(data);
        res.end();
    })
})


