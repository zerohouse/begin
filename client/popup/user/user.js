app.controller('user', function ($scope, req, alert, popup, user) {

    $scope.user = user;

    $scope.mailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    $scope.send = function () {
        if ($scope.param == 'register') {
            $scope.register();
            return;
        }
        $scope.login();
    };

    $scope.register = function () {
        req.post('/api/user', user).success(function (res) {
            if (res.err) {
                console.log(res.err);
                alert("이메일 형식이 맞지 않거나 이미 가입한 이메일입니다.");
                return;
            }
            alert("가입되었습니다.");
            popup('user', 'login');
        });
    };

    $scope.login = function () {
        req.post('/api/user/login', {email: user.email, password: user.password}).success(function (res) {
            if (!res.result) {
                alert("유효하지 않은 로그인 정보입니다.");
                return;
            }
            alert("로그인 되었습니다.");
            angular.copy(res.result, user);
            user.logged = true;
            //$rootScope.$apply();
            popup.hide();
        });
    };

    var state = $scope.state = {};
    state.register = {};
    state.login = {};
    state.register.btn = "회원가입";
    state.login.btn = "로그인";

});