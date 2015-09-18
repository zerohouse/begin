app.directive('autocomplete', function ($timeout, req) {
    return {
        restrict: 'E',
        templateUrl: '/dist/directives/autocomplete/autocomplete.html',
        controller: function ($scope, alert, $timeout) {
            $scope.selected = -1;

            $scope.values = [];
            if (!$scope.ngModel) {
                $scope.ngModel = [];
            }

            $scope.hide = function () {
                $timeout(function () {
                    $scope.focus = false;
                    if (!$scope.$$phase)
                        $scope.$apply();
                }, 100);
            };

            $scope.add = function () {
                console.log(1);
                var keyword = $scope.values[$scope.selected] == undefined ? $scope.keyword : $scope.values[$scope.selected].keyword;
                if (keyword == '')
                    return;
                if ($scope.ngModel.contains(keyword)) {
                    alert("이미 추가되었습니다.");
                    return;
                }
                $scope.ngModel.push(keyword);
                $scope.keyword = '';
                req.post('/api/keywords', {type: $scope.type, keyword: keyword}).success(function (res) {
                    if (!res.err)
                        $scope.values = res.result;
                });
            };

            $scope.select = function (val) {
                $scope.selected = val;
            };

            var timer;
            $scope.keypress = function (e) {
                switch (e.keyCode) {
                    case 38:
                        $scope.selected--;
                        if ($scope.selected < -1)
                            $scope.selected = $scope.filtered.length - 1;
                        break;
                    case 40:
                        $scope.selected++;
                        if ($scope.selected > $scope.filtered.length - 1)
                            $scope.selected = -1;
                        break;
                    case 13:
                        $scope.add();
                        break;
                    default :
                        $timeout.cancel(timer);
                        timer = $timeout(function () {
                            req.get('/api/keywords', {
                                type: $scope.type,
                                keyword: $scope.keyword
                            }).success(function (res) {
                                if (!res.err)
                                    $scope.values = res.result;
                            });
                        }, 300);
                }
            }
        },
        link: function (s, e, a) {
            e.on('click', function () {
                $timeout(function () {
                    $(e).find('input').focus();
                });
            });
        },
        scope: {
            ngModel: '=',
            values: '=',
            type: '@',
            placeholder: '@'
        }
    }
});