const express = require('express');
const fs = require('fs');
const app = express();
const port = 3500;


app.listen(port, () => {
    console.log(`테스트 서버가 실행됩니다. http://localhost:${port}`);
})
app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html');
})