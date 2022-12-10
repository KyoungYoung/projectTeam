const express = require('express');
const app = express();
const port = 3000;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const { initialize } = require('passport');

// form 데이터 서버에 전송
app.use(express.urlencoded({extended: true}));
// 로그인
app.use(session({secret: 'secret1234',resave: true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

// ejs
app.set('view engine','ejs');
app.set('views',__dirname + '/views')
// db
const MongoClient = require('mongodb').MongoClient;
let db;

// server, db 연결
MongoClient.connect('mongodb+srv://admin1:kky1234@cluster0.3btbfxm.mongodb.net/graduate?retryWrites=true&w=majority', { useUnifiedTopology: true },(err, client) => {
	if (err) return console.log(err);
	db = client.db('graduate');
    // 컬렉션에 데이터베이스 넣기
	// db.collection('login').insertOne({name : 'kky', _id : 1}, (err, result) => {
	//     console.log('저장완료'); 
	// });

	//서버띄우는 코드 여기로 옮기기
    app.listen(port,()=>{
        console.log(`http://localhost:${port}`);
    }); 
});
//


// css 연결
app.use(express.static('public/css'));
app.use(express.static('public/img'));
app.use(express.static('public/js'));

// get 요청
app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html')
})
app.get('/login',(req,res) => {
    res.render('login.ejs');
})
app.get('/join',(req,res) => {
    res.render('join.ejs');
})

// 로그인 후 아이디, 비번 검사
app.post('/login',passport.authenticate('local', {failureRedirect : '/fail'}),(req,res)=>{
    res.redirect('/')
})

// 회원가입
app.post('/join', (req, res) => {
    db.collection('login').insertOne({ id: req.body.id, pw: req.body.pw }, function (err, result) {
      res.redirect('/')
    })
  })
// 로그인 세션 값 가진 마이페이지
app.get('/mypage',loginOk,(req,res)=>{
    console.log(`마이페이지의 들어온 유저 정보: ${req.user}`);
    res.render('mypage.ejs',{user:req.user})
})

function loginOk(req,res,next){
    if(req.user){
        next()
    }else{
        res.send('로그인 x 상태')
    }
}




// 로그인
passport.use(new LocalStrategy({
    usernameField: 'id', //사용자가 제출한 아이디가 어디 적혔는지
    passwordField: 'pw', //사용자가 제출한 비번이 어디 적혔는지
    session: true, //세션을 만들건지
    passReqToCallback: false, //아이디/비번말고 다른 정보검사가 필요한지
}, function (inputID, inputPW, done) {
    console.log(inputID, inputPW);
    db.collection('login').findOne({ id: inputID }, function (err, result) {
        if (err) return done(err)
        
        if (!result) return done(null, false, { message: '존재하지않는 아이디요' })
        if (inputPW == result.pw) {
            return done(null, result)
        } else {
            return done(null, false, { message: '비번틀렸어요' })
        }
    })
}));


// 세션 데이터 저장 후 세션의 id정보를 쿠키로 보냄
// id 이용해서 세션 저장시키는 코드(로그인 성공시 발동)
passport.serializeUser(function (user, done) {
    console.log('done');
    done(null, user.id)
});
// 마이페이지 접속시 발동, 로그인한 유저의 개인정보를 db에서 찾는 역할
passport.deserializeUser(function (userId, done) {
    db.collection('login').findOne({id:userId},(err,result)=>{
        done(null,result)
    })
});
