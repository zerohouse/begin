var db = require('./../db.js');
var scheme = db.Schema({
    type: String,
    keyword: String,
    hit: Number
});
scheme.index({type: 1, keyword: 1}, {unique: true});
var Keyword = db.model('keyword', scheme);

module.exports = function (app) {
    app.get('/api/keywords', function (req, res) {
        var query = {};
        query.type = req.passed.type;
        query.keyword = new RegExp('.*' + req.passed.keyword + '.*');
        Keyword.find(query).sort({hit: -1}).limit(5).exec(function (err, result) {
            res.send({err: err, result: result});
        });
    });

    app.post('/api/keywords', function (req, res) {
        console.log(req.passed);
        Keyword.findOneAndUpdate(req.passed, {$inc: {hit: 1}}, {upsert: true}, function (err, result) {
            res.send({err: err, result: result});
        });
    });
};