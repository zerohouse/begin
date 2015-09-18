app.controller('body', function (user, $scope, req) {
    $scope.user = user;

    $scope.logout = function () {
        req.get('/api/logout').success(function () {
            angular.copy({}, user);
        });
    };
});