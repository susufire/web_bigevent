$(function() {
    var form = layui.form;
    var layer = layui.layer;
    // 创建自定义的验证规则
    form.verify({
        nickname: function(value) {
            if (value.length > 6) return "昵称长度必须在1~6个字符之间！";
        }
    })

    initUserInfo();

    // 获取用户信息
    function initUserInfo() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("获取用户信息失败！");
                }
                console.log(res);

                // 调用form.val()快速为表单赋值
                form.val("formUserInfo", res.data);
            }
        })
    }

    // 重置表达数据
    $("#btnReset").on("click", function(e) {
        // 阻止表单的默认重置行为（默认重置将所有表单内容清空）
        e.preventDefault();
        // 调用函数再次发起ajax请求将获取到的数据渲染到表单中
        initUserInfo();
    })

    // 监听表单提交事件
    $(".layui-form").on("submit", function(e) {
        // 阻止表单默认提交事件
        e.preventDefault();
        // 发起ajax请求
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("更新用户信息失败！");
                }
                layer.msg("更新用户信息成功！");

                // 调用父页面的方法，重新渲染用户的头像和用户信息
                window.parent.getUserInfo();
            }
        })
    })
})