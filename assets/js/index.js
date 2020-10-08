$(function () {

    getUserInfo();

    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {

            // 清空本地存储的token
            localStorage.removeItem('token')

            location.href = '/login.html'

            layer.close(index);
        });
    })

})

// 获取用户信息函数封装
// 注意 : 后面代码中需要使用这个方法, 但是只有全局函数才可以调用, 所有写在入口函数外面

function getUserInfo() {

    $.ajax({
        url: '/my/userinfo',
        type: 'get',
        // headers: {
        //     Authorization: localStorage.getItem('token') || '',
        // },

        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败');

            }

            renderAvatar(res.data)
            // console.log(res);
        },
        // 不论成功还是失败, 都会调用 complete 回调函数
        // complete: function (res) {
        //     // console.log(res);
            
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {

        //         localStorage.removeItem('token')

        //         location.href = '/login.html'

        //     }
        // }
    });
}

function renderAvatar(user) {

    // 获取用户名
    var name = user.nickname || user.username

    // 设置欢迎语
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    // 如果有图片
    if (user.user_pic !== null) {
        // 让图片显示
        $('.layui-nav-img').attr('src', user.user_pic).show()
        // 文字隐藏
        $('.text-avatar').hide()

    } else {
        // 图片隐藏
        $('.layui-nav-img').hide()


        // 文字首字母大写且显示
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}

