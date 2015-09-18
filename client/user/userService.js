app.factory('user', function (req) {
    var user = {};
    user.email = 'parksungho86@gmail.com';
    user.password = 'qkrtjdgh1';
    req.get('/api/user/session').success(function (res) {
        if (!res.user)
            return;
        angular.copy(res.user, user);
        if (!res.user.email)
            return;
        user.logged = true;
    });
    return user;
});

app.factory('users', function () {
    return {};
});
