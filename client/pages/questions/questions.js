app.controller('questions', function ($scope) {

    $scope.questions = [new Question(), new Question(), new Question(), new Question(), new Question()];

    function Question() {
        this.value = "배고플때 선택은?";
    }

});