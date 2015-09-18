module.exports = function (app) {
    app.use(require('multer')({
        dest: './dist/uploads/',
        rename: function (fieldname, filename) {
            function ran(length) {
                var result = "";
                var r = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
                for (var i = 0; i < length; i++) {
                    result += r.charAt(parseInt(Math.random() * r.length));
                }
                return result;
            }

            return Date.now() + ran(5);
        },
        limits: {fileSize: 1 * 1024 * 1024}, // limit To 1MB
        onFileUploadStart: function (file, req) {
            if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/gif')
                return false;
        },
        onFileUploadComplete: function (file) {
        }
    }));
};