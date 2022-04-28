$(function() {

    // 调用函数获取用户基本信息
    getUserInfo();


    // 点击按钮，实现退出功能
    $('#btnLogout').on('click', function() {
        // 提示用户是否确认退出
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // console.log('ok');
            // 1.清空本地存储中的token
            localStorage.removeItem('token');

            // 2.重新跳转到登录页面
            location.href = '/login.html'


            // 关闭confirm询问框
            layer.close(index);
        });
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败!')
            }
            console.log(res);
            // 调用renderAvatar渲染用户的对象
            renderAvatar(res.data);


        },
        // complete: function(res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token');
        //         location.href = '/login.html'
        //     }
        // }

    })

}

function renderAvatar(data) {
    var name = data.nickname || data.username

    $('#welcome').html('欢迎 &nbsp;&nbsp;' + name)
    if (data.user_pic !== null) {
        // 渲染图片头像
        $('.text-avatar').hide();
        $('.layui-nav-img').attr('src', data.user_pic).show();
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide();
        var frist = name[0].toUpperCase()
        $('.text-avatar').html(frist).show()
    }
}