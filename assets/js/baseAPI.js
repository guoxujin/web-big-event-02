

// 每次调用 $.get() 或 $.post() 或 $.ajax() 的时候
// 会先调用  ajaxPrefilter 这个函数
// 在这个函数中, 可以拿到我们给 Ajax 提供的配置对象

$.ajaxPrefilter(function (options) {


    options.url = 'http://ajax.frontend.itheima.net' + options.url

    // 统一为有权限的接口设置 headers 请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || '',
        }
    }


    // 全局统一挂载 complete 回调函数   拦截所有响应, 判断身份认证信息
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {

            localStorage.removeItem('token')

            location.href = '/login.html'
        }
    }

})