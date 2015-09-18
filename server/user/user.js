var db = require('./../db.js');
var User = db.model('user', db.Schema({
    email: {type: String, index: true, unique: true},
    password: String,
    name: String,
    gender: String,
    profile: Object,
    photos: Array,
    Date: Date
}));
var logger = require('./../utils/logger.js');


User.schema.path('email').validate(function (value) {
    return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(value);
}, 'Invalid email');


function logged(req, res) {
    if (!req.session.user) {
        res.send({err: "로그인이 필요한 서비스입니다."});
        return false;
    }
    return true;
}

module.exports = function (app) {
    app.post('/api/user/login', function (req, res) {
        User.findOne(req.passed, function (err, result) {
            if (result == null) {
                res.send({err: err, result: result});
                return;
            }
            result.password = undefined;
            req.session.user = result;
            req.session.save();
            res.send({err: err, result: result});
        });
    });

    app.post('/api/user', function (req, res) {
        var user = new User(req.passed);
        user.save(function (err, result) {
            res.send({err: err, result: result});
        });
    });

    app.put('/api/user/profile', function (req, res) {
        if (!logged(req, res))
            return;
        if (req.session.user.email != req.passed.email)
            return;
        User.update({email: req.session.user.email}, {profile: req.passed.profile}).exec(function (err, result) {
            req.session.user.profile = req.passed.profile;
            req.session.save();
            res.send({err: err, result: result});
        });
    });

    app.post('/api/user/upload', function (req, res) {
        if (!req.session.user)
            return;
        try {
            if (req.session.user.photos == undefined)
                req.session.user.photos = [];
            req.session.user.photos.push(req.files.file.name);
            if (req.session.user.photos.length > 3)
                req.session.user.photos.splice(0, 1);
            res.send(req.session.user);
            req.session.save();
            User.update({email: req.session.user.email}, {photos: req.session.user.photos}).exec();
        } catch (e) {
            logger.debug(e);
        }
    });

    app.post('/api/user/photo/remove', function (req, res) {
        if (!req.session.user)
            return;
        if (!req.session.user.photos)
            return;
        req.session.user.photos.remove(req.passed.photo);
        req.session.save();
        User.update({email: req.session.user.email}, {photos: req.session.user.photos}).exec(function (err, result) {
            res.send({err: err, result: result});
        });
    });

    app.get('/api/user/session', function (req, res) {
        if (req.session.user) {
            res.send({user: req.session.user});
            return;
        }
        res.send({});
    });

    app.get('/api/logout', function (req, res) {
        req.session.destroy();
        res.send({});
    });
};