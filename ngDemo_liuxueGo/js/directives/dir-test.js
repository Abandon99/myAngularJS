//
//
// //测试自定义指令。。。。请忽略
//
// myApp.directive('test',function () {
//
//     return {
//
//         restrict:'AE',
//         replace:false,
//         template:'<h1>hello world ,{{scope.name}}</h1>',
//
//         link:function (scope, element, attr) {
//             scope.name = attr.name;
//             scope.hh = 2333;
//
//             //给元素绑定鼠标进入事件。。。
//             element.bind('mouseenter',function () {
//                 // scope.cons();
//                 scope.$apply('cons()');
//             })
//
//         }
//
//     }
//
//
// });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
