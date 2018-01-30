

myApp.controller('addCtrl',function ($scope,$http,$stateParams,FileUploader,$state,myConstant) {
    //引全局变量
    $scope.typeList = myConstant.typeList;
    $scope.industryList = myConstant.industryList;

    //初始化变量对象
    $scope.addParams = {};

    //判断新增还是编辑
    if($stateParams.id !== undefined) {
        $http({
            method:'get',
            url: '/carrots-admin-ajax/a/article/'+$stateParams.id
        })
            .then(
                function successCallback(response) {
                    //获取到整个article，进而可以修改后再统一发请求
                    $scope.addParams = response.data.data.article;
                },
                function errorCallback(response) {
                }
            );
    }




    //上线还是草稿
    $scope.onLine = function (sta) {

        $scope.addParams.status = sta;

        // if(sta == 2) {
        //     $scope.addParams.status = 2;
        // }else {
        //     $scope.addParams.status = 1;
        // }

        //编辑
        if($stateParams.id !== undefined) {
            $http({
                method:'put',
                url: '/carrots-admin-ajax/a/u/article/'+$stateParams.id,
                params:$scope.addParams
            })
                .then(
                    function successCallback(reponse) {
                    },
                    function errorCallback(reponse) {
                        console.log("链接错误")
                    }
                )
        }
        //新增
        else {
            // $http.post('/carrots-admin-ajax/a/u/article',$scope.addParams)

                $http({
                    method:'post',
                    url: '/carrots-admin-ajax/a/u/article',
                    params:$scope.addParams
                })
                .then(
                    function successCallback(reponse) {
                        console.log();
                    },
                    function errorCallback(reponse) {
                    }
                )
        }
        $state.go('backstage.article');
    };

    //【文件上传】 插件启动
    var uploader=$scope.uploader = new FileUploader();
    uploader.url='/carrots-admin-ajax/a/u/img/task';    /*以下是设置了两个必须的属性*/
    uploader.onSuccessItem = function (item, response) {
        console.log('图片上传成功我擦嘞');
        console.log(response.data.url);
        //imgUrl是上传成功后服务器返回的 一个图片地址
        $scope.addParams.img = response.data.url;
    };



});
