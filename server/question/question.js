var db = require('./../db.js');
var Question = db.model('question', db.Schema({
    writer: String,
    head: String,
    body: String,
    answers: Array,
    cover: String,
    Date: Date
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
    app.post('/api/question/temp', function (req, res) {
        if (!logged(req, res))
            return;
        Temp.update({writer: req.session.user.email}, req.passed, {upsert: true}, function (err, result) {
            res.send({err: err, result: result});
        });
    });

    app.get('/api/question', function (req, res) {
        if (req.passed.id) {
            Question.findOne({writer: req.session.user.email}, function (err, result) {
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

    app.post('/api/question/upload', function (req, res) {
        if (!req.session.user)
            return;
        try {
            res.send(req.files.file.name);
        } catch (e) {
            logger.debug(e);
        }
    });

};