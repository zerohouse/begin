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
        .state('profile', {
            abstract: true,
            url: '/profile',
            controller: 'profile',
            templateUrl: "/dist/pages/profile/profile.html"
        })
        .state('profile.basic', {
            url: "/basic",
            templateUrl: "/dist/pages/profile/basic/basic.html"
        })
        .state('profile.photo', {
            url: "/photo",
            templateUrl: "/dist/pages/profile/photo/photo.html"
        })
        .state('profile.profile', {
            url: "/",
            templateUrl: "/dist/pages/profile/profile/profile.html"
        })
        .state('profile.history', {
            url: "/history",
            templateUrl: "/dist/pages/profile/history/history.html"
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
            url: "/questions/edit/:id",
            controller: "question.edit",
            templateUrl: "/dist/pages/questions/edit/edit.html"
        });

});
