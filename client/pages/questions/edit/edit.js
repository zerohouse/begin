app.controller('question.edit', function ($scope, alert, Upload, req, $state, $stateParams) {

    $scope.question = {};
    $scope.question.answers = [];


    $scope.get = function () {
        req.get('/api/question', {_id: $stateParams.id}).success(function (res) {
            if (res.result)
                angular.copy(res.result, $scope.question);
        });
    };

    $scope.get();

    $scope.tempSave = function () {
        req.post('/api/question/temp', $scope.question).success(function (res) {
            if (!res.err)
                alert('임시 저장 되었습니다.');
        });
    };

    $scope.save = function () {
        $scope.question.save = true;
        req.post('/api/question', $scope.question).success(function (res) {
            if (res.err)
                return;
            alert('저장 되었습니다.');
            $state.go('question', {id: res.result._id});
        });
    };


    $scope.addAnswer = function (answer) {
        if ($scope.question.answers.length > 9) {
            alert("답변은 10개까지만 등록가능합니다.");
            return;
        }
        $scope.question.answers.push({text: answer});
        $scope.answer = '';
    };

    var length = 10;
    $scope.next = function () {
        var no;
        if ($scope.question.cover == undefined)
            no = parseInt(Math.random() * length);
        else
            no = $scope.question.cover.split('.')[0];
        no++;
        if (isNaN(no))
            no = parseInt(Math.random() * length);
        if (no > length)
            no = 0;
        no = no + ".jpg";
        $scope.question.cover = no;
    };

    $scope.$watch('cover', function (file) {
        if (file == undefined)
            return;
        Upload.upload({
            url: '/api/question/upload',
            file: file,
            method: 'POST'
        }).progress(function (evt) {
            $scope.uploading = true;
            $scope.uploaded = parseInt(100.0 * evt.loaded / evt.total);
        }).success(function (data, status, headers, config) {
            $scope.question.cover = data;
            $scope.uploading = false;
        }).error(function (data, status, headers, config) {
            $scope.uploading = false;
        });
    });

});