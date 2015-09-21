app.controller('questions', function ($scope, req) {

    $scope.questions = [];

    $scope.info = {
        limit: 10,
        page: 0
    };

    $scope.get = function () {
        req.get('/api/questions', $scope.info).success(function (res) {
            $scope.questions = $scope.questions.concat(res);
            $scope.info.page++;
        });
    };

    $scope.get();

    function Question() {
        this.head = "배고플때 선택은?";
        this.description = "그러니깐..";
        this.date = new Date();
    }

});