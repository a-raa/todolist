const router = require('express').Router();

router.get('/', logincheck, (req, res) => {
    console.log(req.user)
    res.status(200).json(req.user.id)
})

//로그인 여부 확인 미들웨어

function logincheck(req, res, next) {
    if (req.user) {
        next()
    } else {
        res.send('비회원')
    }
}

module.exports = router;