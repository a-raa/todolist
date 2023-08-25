const router = require('express').Router();


//memoedit page 정보 처리
router.post('/', (req, res) => {
    const resultNum = parseInt(req.body.memo_id)
    req.app.db.collection('memo').findOne({ num: resultNum }, (err, result) => {
        res.status(200).json(result)
    })
})

//memoedit page 글수정 처리

router.post('/memochange', (req, res) => {
    const change_text = req.body.memo[0].text
    const total = parseInt(req.body.memo[0].num)
    
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const hours = ('0' + today.getHours()).slice(-2);
    const minutes = ('0' + today.getMinutes()).slice(-2);
    const dateString = year + '-' + month + '-' + day + ',' + hours + ':' + minutes;

    req.app.db.collection('memo').updateOne({ num: total }, { $set: { text: change_text } }, (err, result) => {
        console.log(result.modifiedCount)
        res.status(200).json('수정 완료!!')
    })
})



module.exports = router;