$(function() {
    //获取layer对象
    var layer = layui.layer;
    // 点击去注册链接
    $("#link-reg").on("click", function() {
            $(".login-box").hide();
            $(".reg-box").show();
        })
        // 点击去登录链接
    $("#link-login").on("click", function() {
            $(".login-box").show();
            $(".reg-box").hide();
        })
        //监听注册表单的提交事件
    $("#form_reg").on("submit", function(e) {
            e.preventDefault(); //阻止表单默认事件
            var data = { username: $("#form_reg [name=username]").val(), password: $("#form_reg [name=password]").val() };
            // 发起ajax的post请求
            $.post("/api/reguser", data, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("注册成功！请登录");
                //模拟人的点击行为（也就是以前pink老师说的手动点击事件）
                $("#link-login").click();
            });

        })
        // 监听登录表单的提交事件
    $("#form_login").submit(function(e) {
        //阻止表单的默认提交行为
        e.preventDefault();
        $.ajax({
            url: "/api/login",
            method: "POST",
            // 快速获取表单数据
            data: $(this).serialize(),
            success: function(res) {
                // status为0就是请求失败
                if (res.status !== 0) {
                    return layer.msg("登录失败！");
                }
                layer.msg("登录成功！");
                // 因为访问有权限的接口时需要token才可以访问，没有token是没有访问权限的
                // 所以登录成功后将得到token字符串，将它存储到localstorage中
                localStorage.setItem("token", res.token);
                // console.log(res.token);
                // 跳转到后台主页
                location.href = "/index.html";
            }
        });
    })
});