var db = require('./../db.js');
var like = db.model('like', db.Schema({
    likeId: String,
    likes: Array
}));

function logged(req, res) {
    if (!req.session.user) {
        res.send({err: "로그인이 필요한 서비스입니다."});
        return false;
    }
    return true;
}

module.exports = function (app) {
    app.get('/api/likes', function (req, res) {
        if (!logged(req, res))
            return;
        like.findOne({likeId: req.passed.id}, function (err, result) {
            res.send({err: err, result: result});
        });
    });

    app.put('/api/likes', function (req, res) {
        if (!logged(req, res))
            return;
        like.findOne({likeId: req.passed.id}, function (err, result) {
            if (result.likes.contains(req.session.user._id)) {
                res.send({err: err, result: result});
                return;
            }
            result.likes.push(req.session.user._id);
            result.save();
            res.send({err: err, result: result});
        });
    });

    app.delete('/api/likes', function (req, res) {
        if (!logged(req, res))
            return;
        like.update({likeId: req.passed.id}, function (err, result) {
            result.likes.pull(req.session.user._id);
            result.save();
            res.send({err: err, result: result});
        });
    });
};