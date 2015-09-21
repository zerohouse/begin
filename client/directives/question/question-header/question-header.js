app.directive('questionHeader', function () {
    return {
        restrict: 'E',
        templateUrl: '/dist/directives/question/question-header/question-header.html',
        scope: {
            question: '='
        },
        controller: function ($scope, req, user, alert) {
            $scope.like = function () {
                if (!user.logged) {
                    alert("로그인이 필요한 서비스 입니다.");
                    return;
                }
                $scope.question.likes.toggle(user.email);
                req.post('/api/question/update', $scope.question).success();
            };
        }
    }
});