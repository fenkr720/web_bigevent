$(function() {
    $("#link_reg").on('click', function() {
        // 展示登录
        $('.login-box').hide();
        // 隐藏注册
        $('.reg-box').show();
    })
    $("#link_login").on('click', function() {
        // 展示登录
        $('.login-box').show();
        // 隐藏注册
        $('.reg-box').hide();
    })
    layui.form.verify({
        pwd: [/^[\S]{6,12}$/, '密码应为6-12位,并且不能有空格'],
        repwd: function(value) {
            let pwd = $('.reg-box input[name=password]').val();
            if (pwd !== value) {
                return '二次密码一致!';
            }
        }
    })
    $("#form_reg").on('submit', function(e) {
            e.preventDefault();
            var data = $(this).serialize();
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg(res.message);
                $("#link_login").click();
            })
        })
        //监听登录事件
    $("#form_login").submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            data: $(this).serialize(),
            url: '/api/login',
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('登录失败');
                }
                layui.layer.msg('登录成功');
                localStorage.setItem('token', res.token)
                location.href = '/index.html';
            }
        })
    })
})