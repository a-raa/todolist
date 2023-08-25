const router = require('express').Router();
const crypto = require('crypto');


router.post('/', (req, res) => {
    const idCheck = /^[a-z]+[a-z0-9]{5,19}$/g;
    const pwCheck = /^[A-Za-z0-9]{6,12}$/;

    const id = req.body.join_id;
    const pw = req.body.join_pw;
    req.app.db.collection('user').findOne({ id: id }, (err, result) => {
        //아이디 중복체크
        if (result) { res.json('아이디가 중복되었습니다') }

        if (!result) {
            if (!idCheck.test(id)) {
                res.json('아이디 형식에 맞게 써주세요')
            }
            else if (!pwCheck.test(pw)) {
                res.json('비밀번호 형식에 맞게 써주세요')
            }
            else {
                crypto.randomBytes(32, (err, buf) => {
                    const salt = buf.toString('base64')
                    console.log(salt)
                    crypto.pbkdf2(pw, salt, 1000, 32, 'sha512', (err, key) => {
                        console.log('password', key.toString('base64'))
                        req.app.db.collection('user').insertOne({ id: id, pw: key.toString('base64'), salt: salt }, (err, result) => {
                            res.status(200).json('가입 완료')
                        })
                    })
                })
            }
        }
    })
})





module.exports = router;

