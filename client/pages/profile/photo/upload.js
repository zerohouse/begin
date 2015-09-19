app.controller('upload', function ($scope, Upload, user, req) {

    $scope.user = user;

    $scope.$watch('picture', function (file) {
        if (file == undefined)
            return;
        if (user.photos.length > 2) {
            if (!confirm('첫번째 사진이 지워집니다 업로드 하시겠습니까?'))
                return;
        }
        Upload.upload({
            url: '/api/user/upload',
            file: file,
            method: 'POST'
        }).progress(function (evt) {
            $scope.uploading = true;
            $scope.uploaded = parseInt(100.0 * evt.loaded / evt.total);
        }).success(function (data, status, headers, config) {
            $scope.uploading = false;
            angular.copy(data, user);
            user.logged = true;
        }).error(function (data, status, headers, config) {
            $scope.uploading = false;
        });
    });


    $scope.remove = function (photo) {
        if (!confirm('삭제하시겠습니까?'))
            return;
        req.post('/api/user/photo/remove', {photo: photo}).success(function (res) {
            user.photos.remove(photo);
        });
    }

});