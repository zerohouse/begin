app.directive('questionHeader', function () {
    return {
        restrict: 'E',
        templateUrl: '/dist/directives/question/question-header/question-header.html',
        scope: {
            question: '='
        }


    }
});