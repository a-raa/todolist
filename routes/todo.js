const router = require('express').Router();
const ObjectId = require('mongodb').ObjectId;

router.get('/', (req, res) => {
    req.app.db.collection('todo').find().sort({ num: -1 }).toArray((err, result) => {
        console.log(result)
        res.json(result)
    })
})

router.post('/todoadd', (req, res) => {

    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const dateString = year + '-' + month + '-' + day;

    req.app.db.collection('counter').findOne({ name: 'todototal' }, (err, result) => {
        let total = result.num

        req.app.db.collection('todo').insertOne({
            num: total + 1,
            todoitem: req.body.todotext,
            date: dateString,
            startday: req.body.startday,
            endday: req.body.endday,
            writer: req.body.writer
        }, (err, result) => {
            let item = result
            req.app.db.collection('counter').updateOne({ name: 'todototal' }, { $inc: { num: 1 } }, (err, result) => {
                res.status(200).json(item.ops[0])
            })
        })
    })
})

router.post('/tododelete', (req, res) => {
    req.app.db.collection('todo').deleteOne({_id: ObjectId(req.body._id)}, (err, result) => {
        res.status(200).json('삭제완료')
    })
})


module.exports = router;

