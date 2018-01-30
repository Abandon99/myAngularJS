
var myApp = angular.module("myApp", ['ui.router','oc.lazyLoad','angularFileUpload']);

myApp.config(function ($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/html/login');
    $stateProvider
    .state('login', {
        url: '/html/login',
        templateUrl: '/html/login.html',
        resolve: {
            loadMyFile: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(["css/login.css"]);
            }]
        }
    })
    
    .state('backstage.welcome', {
        url: 'html/welcome',
        templateUrl: 'html/welcome.html'
    })
    
    .state('backstage', {
        url: '/html/backstage',
        templateUrl: 'html/backstage.html',
        resolve: {
            loadMyFile: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(["css/backstage.css"]);
            }]
        }
    })

    .state('backstage.article', {
        url: '/html/article?type&status&startAt&endAt&page&size',
        templateUrl: 'html/article.html'
    })


    .state('backstage.add', {
        url: '/html/add?show&title&type&url&img&content&id',
        templateUrl: 'html/add.html'
    })
    
    .state('article', {
        url: '/html/article',
        templateUrl: 'html/article.html',
        resolve: {
            loadMyFile: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(["css/backstage.css"]);
            }]
        }
    })
});


  




