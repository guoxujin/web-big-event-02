$(function () {

    // ---------------------- 表单验证 ------------------------

    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '用户昵称为1到6位之间'
            }
        }
    });


    // --------------------- 修改用户信息功能 -----------------------

    // 初始化用户信息
    initUserIofo();
    function initUserIofo() {
        $.ajax({
            url: '/my/userinfo',
            type: 'GET',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败');
                }

                // console.log(res)
                form.val('formUserInfo', res.data)

            }
        });
    };

    // ---------------------- 重置功能 -----------------------------
    $('#btnReset').on('click', function (e) {

        // 阻止表单的默认重置行为
        e.preventDefault();

        initUserIofo();
    })

    
    // ---------------------- 修改功能 ------------------------------
    // 监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault();

        $.ajax({
            url: '/my/userinfo',
            type: 'post',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }

                layer.msg('更新用户信息成功')

                // 调用服页面中的方法, 重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        });


    })
})