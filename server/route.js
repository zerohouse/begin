module.exports = function (app) {
    app.get('/api/likes', function (req, res) {
        res.send('weaasfwweef');
    });
    require('./likes/likes.js')(app);
    require('./reply/reply.js')(app);
};