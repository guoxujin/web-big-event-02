$(function () {

    var form = layui.form;

    // ----------------------- 表单验证 --------------------------
    form.verify({

        // 原密码
        oldPwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        // 新密码
        newPwd: function (value) {

            // 获取原密码
            var pwd = $('[name=oldPwd]').val();

            if (value === pwd) {
                return '新旧密码不能相同'
            }
        },

        // 确认密码
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {

                return '两次密码不一致, 请确认密码'
            }
        }
    })

    // ----------------------- 修改密码 ------------------------------
    $('.layui-form').on('submit', function (e) {

        e.preventDefault();

        $.ajax({
            url: '/my/updatepwd',
            type: 'post',
            dataType: 'json',
            data: $(this).serialize(),
            success: function (res) {

                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }

                layui.layer.msg('更新密码成功')
                
                localStorage.removeItem('token')

                window.parent.location.href = '/login.html'

            }
        });

    })

})