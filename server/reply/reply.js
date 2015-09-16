var db = require('./../db.js');
var Reply = db.model('reply', db.Schema({
    replyId: String,
    writer: String,
    reply: String,
    Date: Date
}));

function logged(req, res) {
    if (!req.session.user) {
        res.send({err: "로그인이 필요한 서비스입니다."});
        return false;
    }
    return true;
}

module.exports = function (app) {
    app.get('/api/replies', function (req, res) {
        if (!logged(req, res))
            return;
        Reply.find({replyId: req.passed.id}, function (err, result) {
            res.send({err: err, result: result});
        });
    });

    app.post('/api/reply', function (req, res) {
        if (!logged(req, res))
            return;
        var reply = new Reply(req.passed);
        reply.save(function (err, result) {
            res.send(err, result);
        });
    });

};