app.controller('question', function ($scope, $stateParams) {

    $scope.$on("$stateChangeSuccess", function updatePage() {
        console.log($stateParams.id);
    });

    $scope.answers = ["영화관", "공연"];

});