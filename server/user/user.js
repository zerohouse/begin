var db = require('./../db.js');
var User = db.model('user', db.Schema({
    email: String,
    password: String,
    name: String,
    gender: String,
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
    app.get('/api/users', function (req, res) {
        if (!logged(req, res))
            return;
        User.find({replyId: req.passed.id}, function (err, result) {
            res.send({err: err, result: result});
        });
    });

    app.post('/api/user', function (req, res) {
        if (!logged(req, res))
            return;
        var reply = new Reply(req.passed);
        reply.save(function (err, result) {
            res.send(err, result);
        });
    });

};