$(function() {
    // 调用 getUserInfo函数获取用户基本信息
    getUserInfo();

    var layer = layui.layer;
    // 点击按钮实现退出登录功能
    $("#btnLogout").on("click", function() {
        // 提示用户是否退出
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1、清空本地存储里面的token
            localStorage.removeItem("token");
            // 2、页面跳转到登录页面
            location.href = "/login.html";
            // 注意！这是layui官方带的，不要删除，是关闭comfirm询问框
            layer.close(index);
        });
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
            url: "/my/userinfo",
            method: "GET",
            // headers: {
            //     Authorization: localStorage.getItem("token") || ""
            // },
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg("获取用户信息失败！");
                }
                renderAvatar(res.data);
            },
            //在baseAPI中统一挂载这个函数了，后面不需要每次都写这么一大段。
            //不论请求成功还是失败都会调用这个complete回调函数
            // complete: function(res) {
            //     // console.log("执行了complete回调");
            //     // console.log(res);
            //     // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            //         // 1、清空本地存储的token
            //         localStorage.removeItem("token");
            //         // 2、跳转到登录login页面
            //         location.href = "/login.html";
            //     }
            // }
        })
        //1、渲染用户的头像
    function renderAvatar(user) {
        var name = user.username || user.nickname;
        // 2、设置欢迎文本
        $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
        // 3、按需渲染用户头像
        if (user.user_pic !== null) {
            // 3.1渲染图片头像
            $(".layui-nav-img").attr("src", user.user_pic).show();
            //    隐藏文本头像
            $(".text-avatar").hide();
        } else {
            // 3.2渲染文本头像
            $(".layui-nav-img").hide();
            var first = name[0].toUpperCase();
            $(".text-avatar").html(first).show();
        }
    }
}