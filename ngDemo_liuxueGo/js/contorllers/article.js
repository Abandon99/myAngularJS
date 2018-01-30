//=====>article页面 控制器


myApp.controller('articleCtrl',['$scope','$state','$http','$stateParams',function ($scope,$state,$http,$stateParams) {
    $scope.listParams = {};

    $scope.dateSearch = function () {
        $scope.listParams.startAt = Date.parse($scope.startAt);
        $scope.listParams.endAt = Date.parse($scope.endAt) + 86399999;

        // if (isNaN($scope.listParams.startAt)) {
        //     $scope.listParams.startAt = ""
        // }
        // if (isNaN($scope.listParams.endAt)) {
        //     $scope.listParams.endAt = ""
        // }

        console.log($scope.listParams.startAt);

        //判断时间先后顺序是否正确
        // if ($scope.listParams.endAt<$scope.listParams.startAt) {
        //     alert('兄弟这个弹窗就是给你准备的，时间先后不分啊！');
        //     return;
        // }
            //此处用简写还是不行，
            //$http.get('/carrots-admin-ajax/a/article/search',$scope.listParams)

            $http({
                method:'get',
                url:'carrots-admin-ajax/a/article/search',
                params:$scope.listParams
            })
            .then(
                function successCallback(response) {
                    //获取页数，存数组，repeat翻页
                    $scope.pageNum  = Math.ceil(response.data.data.total/response.data.data.size);
                    $scope.pageNumArry =[];
                    for(var i=0;i<$scope.pageNum;i++) {
                        $scope.pageNumArry.push(i+1);
                    }
                    $scope.list = response.data.data.articleList;
                },
                function errorCallback() {
                    console.log('链接错误大哥。再试试呗。。')

                });
    };

    //将url传过来的参数赋值给作用域下 listParams 。
    $scope.listParams = $stateParams;

    $scope.startAt = new Date( $scope.listParams.startAt);
    $scope.endAt = new Date( $scope.listParams.endAt);

    $scope.dateSearch();

    //清空
    $scope.clearOption = function () {
        $state.go('backstage.article',{
            size:10,
            page:1,
            startAt:'',
            endAt:'',
            type:'',
            status:''
        })
    };

    //更改状态
    $scope.upDown = function () {
        //设置开关量判定是否打开confirm
        $scope.change = true;

        $scope.listParams.id  =$scope.list[this.$index].id;
        $scope.listParams.status = $scope.list[this.$index].status;
    };

    //更改状态确定
    $scope.confirm = function () {
        //三元操作符。。。溜溜、。。。。
        $scope.listParams.status == 1?$scope.listParams.status =2 : $scope.listParams.status = 1;

        $http({
            method: 'put',
            url: '/carrots-admin-ajax/a/u/article/status',
            params: $scope.listParams

        })
            .then(
                function successCallback(response) {
                    // 请求成功执行代码
                    if(response.data.code == 0) {
                        console.log('更改成功');
                        // window.location.reload();
                        $scope.dateSearch();
                    }else {
                        console.log('更改失败');
                    }
                },
                function errorCallback(response) {
                    // 请求失败执行代码
                }
            );
        $scope.change = false;

    };

    //更改状态取消
    $scope.cancel = function () {
        $scope.change = false;
    };

    //删除
    $scope.deleteList = function () {

        var id = $scope.list[this.$index].id;

        $http.delete('/carrots-admin-ajax/a/u/article/'+id)
            .then(
                function successCallback(response) {
                    // 请求成功执行代码
                    if(response.data.code == 0) {
                        console.log('删除成功...刷新页面。。。')
                        $scope.dateSearch();
                    }else {alert('删除失败')}
                },
                function errorCallback(response) {
                    // 请求失败执行代码
                    alert('请稍后再试')
                }
            );
    } ;

    //编辑
    $scope.jumpEdit = function () {
        //跳编辑页面并传参：
        $state.go('backstage.add',{id:$scope.list[this.$index].id})
    };

    //点击页数访问相应page
    $scope.gogo = function () {
        $scope.listParams.page = this.$index+1;
        $state.go('backstage.article',{page : $scope.listParams.page})
    };

    //后退页数
    $scope.back = function () {
        if($stateParams.page == undefined) {
            $stateParams.page = 1;
        }
        if($stateParams.page == 1) {//第一页时退到最后一页
            $scope.listParams.page = $scope.pageNum;
        }else {
            $scope.listParams.page--;
        }
        // $scope.newPage();
        $state.go('backstage.article',{page:$scope.listParams.page})
    };

    //前进页数
    $scope.forward = function () {
        if($stateParams.page == undefined) {
            $stateParams.page = 1;
        }
        if($stateParams.page == $scope.pageNum) {//最后一页时前进到第一页
            $scope.listParams.page = 1;
        }else  {
            console.log(typeof $scope.listParams.page);
            $scope.listParams.page++;
        }
        // $scope.newPage();
        $state.go('backstage.article',{page:$scope.listParams.page})
    };

    //首页
    $scope.firstPage = function () {
        $state.go('backstage.article',{page:1})
    };

    //末页
    $scope.lastPage = function () {
        $state.go('backstage.article',{page:$scope.pageNum})
    };

    //去第几页的 页数 和 size
    $scope.sure = function () {
        $state.go('backstage.article',{size:$scope.maxSize,page:$scope.toPage})
    };

}]);




