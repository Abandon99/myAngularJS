

myApp.controller('loginCtrl',function ($scope,$http,$state) {

    $scope.jump = function () {

        console.log($scope.myParams);

        $http.post('/carrots-admin-ajax/a/login?'+$.param($scope.myParams))    //jQuery方法 == $.post('',{})
            .then(                                                              //
                function (response) {
                    if(response.data.code == 0) {
                        console.log('message:::',response.data.message);
                        $state.go('backstage.welcome');
                    }else {
                        console.log('message:::',response.data.message)
                        alert(response.data.message);
                    }
                }
            );

    };







});



