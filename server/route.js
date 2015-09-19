module.exports = function (app) {
    app.get('/api/likes', function (req, res) {
        res.send('weaasfwweef');
    });
    require('./likes/likes.js')(app);
    require('./user/user.js')(app);
    require('./reply/reply.js')(app);
    require('./keywords/keywords.js')(app);
    require('./question/question.js')(app);
};