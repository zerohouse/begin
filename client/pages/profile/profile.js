app.controller('profile', function ($state, $scope, user, req, alert) {
    $scope.user = user;

    $scope.state = $state;

    $scope.save = function () {
        var update = {};
        update.email = user.email;
        update.profile = user.profile;
        req.put('/api/user/profile', update).success(function (res) {
            if (!res.err)
                alert("저장 되었습니다.");
        });
    }
});