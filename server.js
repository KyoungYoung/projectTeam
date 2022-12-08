const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const passport = require('passport');
const LogalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const { initialize } = require('passport');

app.set('view engine','ejs');
app.set('views',__dirname + '/views')
// db
const MongoClient = require('mongodb').MongoClient;
let db;

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

app.use(session({secret: '비밀코드',resave: true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());


// css 연결
app.use(express.static('public/css'));
app.use(express.static('public/img'));
app.use(express.static('public/js'));

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html')
})
app.get('/login',(req,res) => {
    res.render('login.ejs');
})
app.get('/join',(req,res) => {
    res.render('join.ejs');
})
app.post('/login',passport.authenticate('local', {failureRedirect : '/fail'}),(req,res)=>{
    res.redirect('/')
});
app.get('/mypage', function (req,res) {
    res.render('mypage.ejs', {})
})
app.get('/mypage', loginTrue, function (req, res) { 
    console.log(req.user); 
    res.render('mypage.ejs', { 사용자: req.user }) 
}) 

function loginTrue(req, res, next) { 
    if (req.user) { 
        next() 
    } 
    else { 
        res.send('로그인안하셨는데요?') 
    } 
}


passport.use(new LocalStrategy({
    usernameField: 'id', //사용자가 제출한 아이디가 어디 적혔는지
    passwordField: 'pw', //사용자가 제출한 비번이 어디 적혔는지
    session: true, //세션을 만들건지
    passReqToCallback: false, //아이디/비번말고 다른 정보검사가 필요한지
}, function (inputID, inputPW, done) {
    //console.log(inputID, inputPW);
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

passport.serializeUser(function (user, done) {
    done(null, user.id)
    });

passport.deserializeUser(function (yourID, done) {
    db.collection('login').findOne({ id: yourID }, function (err, result) {
        done(null, result)
    })
});