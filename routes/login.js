
const router = require('express').Router();
const passport = require('passport');


//로그인 

router.post('/', passport.authenticate('local', {
    failureRedirect: '/fail'
}), function(req, res) {
    res.redirect('/?valid=' + req.app.userid)
})

router.get('/fail', (req, res) => {
    res.json('로그인 실패')
})


module.exports = router;