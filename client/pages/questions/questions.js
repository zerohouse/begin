app.controller('questions', function ($scope) {

    $scope.questions = [new Question(), new Question(), new Question(), new Question(), new Question()];

    function Question() {
        this.head = "배고플때 선택은?";
        this.description = "그러니깐.."
        this.date = new Date();

    }

});