app.directive('affix', function ($window) {
    return {
        restrict: 'A',
        link: function (s, e, a) {
            angular.element($window).bind('scroll', function () {
                if (this.pageYOffset > 30) {
                    e.addClass('navbar-inverse');
                    e.removeClass('navbar-transparent');
                    return;
                }
                e.removeClass('navbar-inverse');
                e.addClass('navbar-transparent');
            });
        }
    }
});