app.controller('question.edit', function ($scope, alert) {

    $scope.answers = ["1", "2", "3"];

    $scope.addAnswer = function (answer) {
        if ($scope.answers.length > 5) {
            alert("답변은 6개까지만 등록가능합니다.");
            return;
        }
        if ($scope.answers.contains(answer)) {
            alert("이미 추가된 답변입니다.");
            return;
        }
        $scope.answers.push(answer);
        $scope.answer = '';
    }

});