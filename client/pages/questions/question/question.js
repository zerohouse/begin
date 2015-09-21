app.controller('question', function ($scope, $stateParams, req) {

    $scope.question = {};

    $scope.get = function () {
        req.get('/api/question', {_id: $stateParams.id}).success(function (res) {
            if (res.result)
                angular.copy(res.result, $scope.question);
        });
    };

    $scope.$on("$stateChangeSuccess", function updatePage() {
        $scope.get();
    });

});