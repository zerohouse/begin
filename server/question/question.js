var db = require('./../db.js');
var Question = db.model('question', db.Schema({
    writer: String,
    head: String,
    body: String,
    answers: Array,
    cover: String,
    date: {type: Date, default: Date.now},
    likes: [],
    like: Number
}));
var Temp = db.model('questionTemp', db.Schema({
    writer: {type: String, index: true, unique: true},
    head: String,
    body: String,
    answers: Array,
    cover: String,
    Date: Date
}));
var logger = require('./../utils/logger.js');


function logged(req, res) {
    if (!req.session.user) {
        res.send({err: "로그인이 필요한 서비스입니다."});
        return false;
    }
    return true;
}

module.exports = function (app) {
    app.get('/api/question', function (req, res) {
        if (req.passed._id) {
            Question.findOne({_id: req.passed._id}, function (err, result) {
                res.send({err: err, result: result});
            });
            return;
        }
        if (!logged(req, res))
            return;
        Temp.findOne({writer: req.session.user.email}, function (err, result) {
            res.send({err: err, result: result});
        });
    });


    app.post('/api/question/temp', function (req, res) {
        if (!logged(req, res))
            return;
        req.passed._id = undefined;
        Temp.update({writer: req.session.user.email}, req.passed, {upsert: true}, function (err, result) {
            res.send({err: err, result: result});
        });
    });

    app.post('/api/question', function (req, res) {
        if (!logged(req, res))
            return;
        if (!req.passed.save) {
            Temp.update({
                writer: req.session.user.email
            }, req.passed, {}, function (err, result) {
                res.send({err: err, result: result});
            });
            return;
        }
        delete req.passed._id;
        var q = new Question(req.passed);
        q.save(function (err) {
            res.send({err: err, result: q});
        });
    });

    app.post('/api/question/update', function (req, res) {
        Question.update({
            _id: req.passed._id
        }, req.passed, {}, function (err, result) {
            res.send({err: err, result: result});
        });
    });

    app.post('/api/question/upload', function (req, res) {
        if (!req.session.user)
            return;
        try {
            res.send(req.files.file.name);
        } catch (e) {
            logger.debug(e);
        }
    });

    app.get('/api/questions', function (req, res) {
        Question.find().sort({'date': -1}).limit(req.passed.limit).skip(req.passed.skip).exec(function (err, results) {
            res.send(results);
        });
    });


};