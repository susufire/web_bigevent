// 注意：每次调用$.ajax()或$.get()或$.post()的时候
// 会先调用ajaxPrefilter函数
// 在这个函数中可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // console.log(options.url);
    // 在发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = "http://ajax.frontend.itheima.net" + options.url;
    console.log(options.url);

    // 统一为有权限的接口，设置headers请求头
    // 注意！！判断该接口是不是有/my/,有它就是需要权限的接口，需要权限的接口才加上headers属性
    // 没有/my/的接口不需要加上headers请求头，比如登录和注册
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = { Authorization: localStorage.getItem("token") || "" };
    }

    // 全局挂载complete函数
    //不论请求成功还是失败都会调用这个complete回调函数
    options.complete = function(res) {
        // console.log("执行了complete回调");
        // console.log(res);
        // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 1、清空本地存储的token
            localStorage.removeItem("token");
            // 2、跳转到登录login页面
            location.href = "/login.html";
        }
    }

})