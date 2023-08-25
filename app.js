
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const express = require('express')
const path = require('path');
const app = express();
const cookieParser = require("cookie-parser");
const flash = require('connect-flash');

const passport = require('passport');
const session = require('express-session')

const LocalStrategy = require('passport-local').Strategy;

const crypto = require('crypto');




//cors
const cors = require('cors');
const { nextTick } = require('process');
app.use(cors({
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
    secret: 'secret code',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: false,
    },
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//로그인 체크 passport
passport.use(new LocalStrategy({
    usernameField: 'input_id',
    passwordField: 'input_pw',
    session: true,
    passReqToCallback: false,
}, function (loginid, loginpw, done) {

    db.collection('user').findOne({ id: loginid }, function (err, result) {
        if (err) return done(err)

        if (!result) return done(null, false, { message: '존재하지않는 아이디입니다' })

        crypto.randomBytes(32, (err, buf) => {
            crypto.pbkdf2(loginpw, result.salt, 1000, 32, 'sha512', (err, key) => {

                if(key.toString('base64') != result.pw) {
                    return done(null, false, {message : '비번 틀림'})
                }

                if(key.toString('base64') == result.pw) {
                    return done(null, result)
                } 

            })
        })
    })}
));




//세션 저장 코드 (쿠키 발행)
passport.serializeUser(function (user, done) {
    console.log('passport session save : ', user.id);
    done(null, user.id)
});

passport.deserializeUser(function (id, done) {
    db.collection('user').findOne({ id: id }, (err, result) => {
        done(null, result)
    })
});


//---------------------------------------

let db;

//db 연결

MongoClient.connect(process.env.MONGODB_URI, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.log(err)
    db = client.db('todolist');
    app.db = db;

    app.listen(4000, (req, res) => {
        console.log('listening on 4000')
    });
})


//router 연결
app.use('/api/memo', require('./routes/memo.js'));
app.use('/api/memoedit', require('./routes/memoedit.js'));
app.use('/api/login', require('./routes/login.js'));
app.use('/api/mypage', require('./routes/mypage.js'));
app.use('/api/join', require('./routes/join.js'));
app.use('/api/todo', require('./routes/todo.js'));
app.use('/api/todoedit', require('./routes/todoedit.js'));


app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/', function (req, res) {
    if(req.user) {
        //다른파일에서 사용할 때 app.userid
        res.json(req.user.id)
    } else {
        console.log('로그인 안됨')
        res.json('비회원')
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})


//라우팅

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'))
})