// 使用 $.ajaxPrefilter(fn); 来拦截每次ajax请求。并对请求参数做处理
$.ajaxPrefilter(function (option) {
    // option表示ajax配置项
    option.url = 'http://localhost:3006' + option.url;

    if (option.url.indexOf('/my/') > -1) {
        option.headers = {
            Authorization: localStorage.getItem('token')
        };

        option.complete = function (xhr) {
            if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败') {
                // 清除过期或假token
                localStorage.removeItem('token');
                // 跳转到登录页
                location.href = 'login.html'
            }
        }
    }
});