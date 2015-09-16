(function () {
    var scope;
    app.controller('alert', function ($scope) {
        scope = $scope;
    });
    app.factory('alert', function ($timeout) {
        return function (message, success, duration) {
            if (!duration) {
                duration = 3000;
                $timeout.cancel(this.hide);
            }
            this.hide = $timeout(function () {
                scope.showing = false;
            }, duration);
            scope.alert = {alert: message, date: new Date(), success: success};
            scope.showing = true;
            if (!scope.$$phase) {
                scope.$apply();
            }
        };
    });
})();