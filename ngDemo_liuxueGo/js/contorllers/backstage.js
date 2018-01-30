

//=====>backstage 页面 控制器
myApp.controller('backstageCtrl',function ($state,$scope,$http){
    $scope.quit = function () {
        $http({
            method:'post',
            url:'/carrots-admin-ajax/a/logout/'
        })
            .then(
                function successCallback(response) {
                    $state.go('login')
                },
                function errorCallback(response) {

                }
            );
    };






    //测试自定义指令。。
    $scope.cons = function () {
        console.log('你大爷的angular。。。')
    }




});




