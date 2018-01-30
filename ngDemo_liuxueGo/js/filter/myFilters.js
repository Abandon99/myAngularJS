/**
 * Created by han on 2017/6/30.
//  */



/*
*
* 所有的过滤器应该写在这里 方便修改定义添加
*
* */

//没有注入，所以必须要写angular.module("myApp")。
angular.module("myApp")
.filter('statusFilter',function () {//function前面那个名字是固定格式。还有.filter这个方法也是固定格式
    var statusArray=[' 下线',"草稿","上线"];//这里是要过滤出来的内容。
    return function (status) {//括号里面的参数可以任意修改，从下面可以看出来，这个参数是数组下标
        //这里返回一个参数，替代第一个参数，不用再声明什么filter,直接引用后面那个名字就可以，找到这个东西
        return statusArray[status];
    }
})
.filter("pageTypeFilter",function () {
    var pageTypeArray=['首页banner','找职位banner','找精英banner','行业大图'];
    return function (type) {
        return pageTypeArray[type];
    }
})
.filter('timeFilter',function () {
    return function (a) {
        return time=new Date(a).toLocaleString();
    }
})
.filter('upDownFilter',function () {
    var sta = '';
    return function (s) {
        if(s == 1) {sta = '上线'}
        if(s == 2) {sta = '下线'}
        return sta
    }
})
.filter('approvedFilter',function () {
    var approvedArray=['未认证','已认证'];
    return function (approved) {
        return approvedArray[approved];
    }
})
// .filter('timebyFilter',function () {
//     return function (b) {
//         if(b == 2) {
//             return '无更新'
//         }else {
//             return time=new Date(a).toLocaleString();
//         }
//     }
// })
;















