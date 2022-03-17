$(function () {
    // 点击去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 点击去登录账号的链接
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
        
    })

    // 从layui获取form对象
    var form = layui.form;
    var layer = layui.layer;
    // 通过layui.verify()自定义校验规则
    form.verify({
        // 自定义了一个叫做pwd的校验规则
        pwd:[
            /^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形象拿到的是确认密码框中的内容
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        console.log("触发成功");
        e.preventDefault();
        $.post('/api/reguser',
            {
                username: $('#form_reg [name="username"]').val(),
                password: $('#form_reg [name="password"]').val(),
            },
            function (res) {
                if (res.status !== 0) {
                    // return alert(res.message)
                    return layer.msg(res.message);
                }
                // alert('注册成功')
                layer.msg('注册成功，请登录！');
                // 模拟人的点击行为
                $('#link_login').click();

            }
        )
    })

    // 监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        console.log("触发成功");
        e.preventDefault();
        $.post('/api/login',
            {
                username: $('#form_login [name="username"]').val(),
                password: $('#form_login [name="password"]').val(),
            },
            function (res) {
                if (res.status !== 0) {
                    // return alert(res.message)
                    return layer.msg(res.message);
                }
                // alert('注册成功')
                layer.msg(res.message);
                // 模拟人的点击行为
                // $('#link_login').click();
                // alert('')
                localStorage.setItem('token', res.token);
                location.href ="/index.html"

            }
        )
    })
});