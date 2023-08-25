const router = require('express').Router();
const ObjectId = require('mongodb').ObjectId;

//memo page 접속시 db에서 글 찾아서 client로 보내기

router.get('/', (req, res) => {
    req.app.db.collection('memo').find().sort({ num: -1 }).toArray((err, result) => {
        res.status(200).json(result)
    })
})

//memo page 글발행 post요청 처리

router.post('/memoadd', (req, res) => {

    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const hours = ('0' + today.getHours()).slice(-2);
    const minutes = ('0' + today.getMinutes()).slice(-2);
    const dateString = year + '-' + month + '-' + day + ',' + hours + ':' + minutes;


    req.app.db.collection('counter').findOne({ name: 'memototal' }, (err, result) => {
        //총 게시물의 갯수를 total변수에 저장
        let total = result.num
        //memo collection에서 게시물갯수num+1, 제목과 글을 저장
        req.app.db.collection('memo').insertOne({ num: total + 1, text: req.body.memotext, date: dateString }, (err, result) => {
            //저장한 글을 item변수에 저장
            let item = result
            //counter collection inc함수를 써서 num+1을 한 후 위 item 저장글으로 client에 응답
            req.app.db.collection('counter').updateOne({ name: 'memototal' }, { $inc: { num: 1 } }, (err, result) => {
                res.status(200).json(item.ops[0])
            })
        })
    })
})

//memo page 글삭제 post요청 처리

router.post('/memodelete', (req, res) => {
    req.app.db.collection('memo').deleteOne({ _id: ObjectId(req.body._id) }, (err, result) => {
        res.status(200).json('삭제완료')
    })
})

module.exports = router;