app.directive('replies', function () {
    return {
        restrict: 'E',
        templateUrl: '/dist/directives/reply/replies/replies.html',
        scope: {
            replyId: '='
        },
        controller: function (req, $scope) {
            req.get('/api/replies').success(function (res) {
                $scope.replies = res.replies;
            });
        }

    }
});