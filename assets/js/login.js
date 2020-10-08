$(function () {

    // 点击 注册按钮
    $('#link_reg').on('click', function () {

        $('.login-box').hide().next('div').show()

    });

    // 点击 登录按钮
    $('#link_login').on('click', function () {

        $('.reg-box').hide().prev('.login-box').show()

    });

    // ------------------------- 表单验证 --------------------------
    // leyui 的表单验证
    let form = layui.form;
    // layui 的弹出层
    let layer = layui.layer;

    form.verify({

        // 密码的校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],

        // 确认密码的校验规则
        repwd: function (value) {

            // 获取第一次输入的密码
            var pwd = $('.reg-box [name=password]').val()

            if (pwd !== value) {
                return '两次密码不一致,请确认密码'
            }
        }
    })

    // ------------------------ 注册功能 -----------------------------
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();

        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        };

        $.ajax({
            url: '/api/reguser',
            type: 'post',
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    // return console.log(res.message);
                    return layer.msg(res.message)
                }
                // console.log('注册成功');
                layer.msg('注册成功,请登录!');
                // 成功之后调用点击事件
                $('#link_login').click()
                // 清空注册文本框的内容
                $('#form_reg .layui-input').val('')

            }
        });

    });


    $('#form_login').submit(function (e) {
        e.preventDefault()

        $.ajax({
            url: '/api/login',
            type: 'post',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }

                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        });
    })

})