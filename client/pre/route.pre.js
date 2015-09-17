app.config(["$locationProvider", function ($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('main', {
            url: "/",
            controller: "main",
            templateUrl: "/dist/pages/main/main.html"
        })
        .state('register', {
            url: "/register",
            controller: "register",
            templateUrl: "/dist/pages/register/register.html"
        })
        .state('questions', {
            url: "/questions",
            controller: "questions",
            templateUrl: "/dist/pages/questions/questions.html"
        })
        .state('question', {
            url: "/question/:id",
            controller: "question",
            templateUrl: "/dist/pages/questions/question/question.html"
        })
        .state('questionEdit', {
            url: "/questions/edit",
            controller: "question.edit",
            templateUrl: "/dist/pages/questions/edit/edit.html"
        });

});
