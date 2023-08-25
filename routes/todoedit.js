const router = require('express').Router();


//todoedit page 정보 처리
router.post('/', (req, res) => {
    const resultNum = parseInt(req.body.todo_id)
    req.app.db.collection('todo').findOne({ num: resultNum }, (err, result) => {
        res.status(200).json(result)
    })
})

//todoedit page 글수정 처리

router.post('/todochange', (req, res) => {
    const change_text = req.body.todo[0].todoitem
    const total = parseInt(req.body.todo[0].num)

    req.app.db.collection('todo').updateOne({ num: total }, { $set: { todoitem: change_text } }, (err, result) => {
        res.status(200).json('수정 완료!!')
    })
})



module.exports = router;