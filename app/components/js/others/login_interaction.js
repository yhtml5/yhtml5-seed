define(["search_common", "jquery"], function (common, $) {
    document.domain = 'iciba.com';
    var loginIframe = $(window.parent.document).find('#loginIframe');
    var loginType = loginIframe.attr('data-type') ? loginIframe.attr('data-type') : "login";
    var rmAccount = 1;
    var rmMobile = 1;
    switch (loginType) {
        case "login":
            createLoginCon('account');
            break;
        case "register":
            creatRegisterCon();
            break;
        default:
            break;
    }
    //calculate window parent window size
    function calculateWinSize() {
        var height = $('body').height();
        $(window.parent.document).find('.win').css({'height': height, 'margin-top': -(height / 2), 'visibility': 'visible'});
    }

    //placeholder show or hide
    function showPlaceholder(id, followEle) {
        $(id).focus(function () {
            $(this).prev().hide();
            $(this).next().hide();
        }).blur(function () {
            if ($(this).val() === '') {
                $(this).prev().show();
            }
        });
        if (followEle) {
            $(id).on('input change paste', function () {
                setTimeout(function () {
                    if ($(followEle).val() !== '') {
                        $(followEle).prev().hide();
                    }
                }, 10);
            });
        }
    }

    //validae email
    function validateEmail(val) {
        var pattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        return pattern.test(val);
    }

    //change image code
    function changeImgCode() {
        $('#chImgcode').click(function () {
            $('.i-login-imgcode').attr('src', 'http://my.iciba.com/auth.php?rand=' + Math.random());
        });
    }

    //third part login
    function thirdPartLogin() {
        $('.i-login-weibo').click(function () {
            $(window.parent)[0].location.href = "http://my.iciba.com/?c=login&m=sinaLogin";
        });
        $('.i-login-qq').click(function () {
            $(window.parent)[0].location.href = "http://my.iciba.com/?c=login&m=qqLogin";
        });
        $('.i-login-mi').click(function () {
            $(window.parent)[0].location.href = "http://my.iciba.com/?c=login&m=miLogin";
        });
    }

    //active Email Success
    function sendEmailSucc(data, type) {
        var content = '';
        content += '<div class="i-login-title">' + type + '</div>';
        content += '<div class="i-login-email">';
        content += '<i></i>';
        content += '<p>验证邮件已经发送到你的邮箱</p>';
        content += '<p class="i-login-uemail" data-email="' + data.email + '">' + data.email + '</p>';
        content += '<p>请进入邮箱，激活密码！</p>';
        content += '</div>';
        content += '<div class="i-login-btn" id="i-login-emailbtn" data-href="' + data.mail_url + '" style="margin-top:85px;">立即查收邮件</div>';
        content += '<div class="i-login-stext">';
        content += '<div>';
        content += '<span class="i-login-back">返回登录</span>';
        content += '<span class="i-login-resend">重新发送</span>';
        content += '<span class="i-login-noe">没有收到邮件？</span>';
        content += '<div class="clear"></div>';
        content += '</div>';
        content += '</div>';
        $('.i-login-con').html(content);
        $('#i-login-emailbtn').click(function () {
            var href = $(this).attr('data-href');
            $(window.parent)[0].open(href);
        });
        $('.i-login-back').click(function () {
            createLoginCon('account');
        });
        $('.i-login-resend').click(function () {
            $.ajax({
                url: './index.php?c=register&m=send_active',
                method: 'POST',
                data: {'email': $('.i-login-uemail').attr('data-email')},
                dataType: 'json',
                success: function (data) {
                    if (data.error_code == '0') {
                        $('.i-login-noe').html('已发送激活邮件，');
                    } else {
                        $('.i-login-resend').remove();
                        $('.i-login-noe').html(data.error);
                    }
                }
            });
        });
    }

    //listen enter keyup event
    $(document).keyup(function (e) {
        if (e.which === 13) {
            $('.i-login-btn').click();
        }
    });
    //login account or phoneno

    function createLoginCon(type) {
        var timer = null;

        function changeEntry() {
            $('.i-login-entry').on('click', 'li', function () {
                if ($(this).attr('data-type') === 'account') {
                    addAccountCon();
                } else if ($(this).attr('data-type') === 'phone') {
                    addPhoneCon();
                }
                if (timer) {
                    clearTimeout(timer);
                }
            });
        }

        function rememberAccount() {
            $('.i-login-checkbox').click(function () {
                if (!$(this).hasClass('checked')) {
                    $(this).addClass('checked');
                    rmAccount = 1;
                } else {
                    $(this).removeClass('checked');
                    rmAccount = 0;
                }
            });
        }

        function rememberMobile() {
            $('.i-login-checkbox').click(function () {
                if (!$(this).hasClass('checked')) {
                    $(this).addClass('checked');
                    rmMobile = 1;
                } else {
                    $(this).removeClass('checked');
                    rmMobile = 0;
                }
            });
        }

        //username or email login
        function accountLogin() {
            $('.i-login-btn').click(function () {
                if ($('#username').val() === '') {
                    $('#username').next().html('账号名不能为空').show();
                    return false;
                } else if ($('#password').val() === '') {
                    $('#password').next().html('密码不能为空').show();
                    return false;
                }
                $.ajax({
                    url: './index.php?c=sso&m=web_login',
                    method: 'POST',
                    data: {'username': $('#username').val(), 'password': $('#password').val(), 'remember': rmAccount.toString()},
                    dataType: 'json',
                    success: function (data) {
                        //console.log(data);
                        if (data.error_code === '10006') {
                            $('#username').next().html('用户不存在').show();
                        } else if (data.error_code === '100010') {
                            $('#password').next().html('用户名或密码错误').show();
                        } else if (data.error_code === '20175') {
                            $('#password').next().html('操作太频繁，请稍后再试').show();
                        } else if (data.error_code === '10007') {
                            $('#username').next().html('账号未激活，<a id="activeAcc" style="color:#1596f5;cursor:pointer;">点击激活</a>').show();
                            activeAccount();
                        } else if (data.error_code == '0') {
                            $(window.parent)[0].location.reload();
                        } else {
                            $('#password').next().html(data.error).show();
                        }
                    }
                });
            });
        }

        //active email
        function activeAccount() {
            $('#activeAcc').click(function () {
                $.ajax({
                    url: './index.php?c=register&m=send_active',
                    method: 'POST',
                    data: {'email': $('#username').val()},
                    dataType: 'json',
                    success: function (data) {
                        if (data.error_code == 0) {
                            sendEmailSucc(data, "账号激活");
                        }
                    }
                });
            });
        }

        function addAccountCon() {
            var content = '';
            content += '<ul class="i-login-entry">';
            content += '<li class="current" data-type="account">账号登录</li>';
            content += '<li data-type="phone">手机登录</li>';
            content += '<div class="clear"></div>';
            content += '</ul>';
            content += '<div class="i-login-input">';
            content += '<label for="username">昵称/邮箱</label>';
            content += '<input type="text" id="username" autocomplete="off" />';
            content += '<div class="i-login-error"></div>';
            content += '</div>';
            content += '<div class="i-login-input last">';
            content += '<label for="password">密码</label>';
            content += '<input type="password" id="password" autocomplete="off" />';
            content += '<div class="i-login-error"></div>';
            content += '</div>';
            content += '<div class="i-login-btn">登&nbsp;&nbsp;录</div>';
            content += '<div class="i-login-keep">';
            if (rmAccount) {
                content += '<label class="i-login-checkbox checked"></label>';
            } else {
                content += '<label class="i-login-checkbox"></label>';
            }
            content += '<span class="i-login-r">记住我</span>';
            content += '<span class="i-login-f" id="i-login-f">忘记密码？</span>';
            content += '<div class="clear"></div>';
            content += '</div>';
            content += '<div class="i-login-text">';
            content += '<p>没有账户？<span id="i-reg-email">邮箱注册</span> 或 <span id="i-login-phone">手机号直接登录</span></p>';
            content += '</div>';
            content += '<div class="i-login-quick">';
            content += '<span>快捷方式登录</span>';
            content += '<div class="i-login-third">';
            content += '<a class="i-login-weibo"></a>';
            content += '<a class="i-login-qq" id="i-login-qq"></a>';
            content += '<a class="i-login-mi"></a>';
            content += '</div>';
            content += '<div class="clear"></div>';
            content += '</div>';
            $('.i-login-con').html(content);
            changeEntry();
            showPlaceholder('#username', '#password');
            showPlaceholder('#password');
            accountLogin();
            rememberAccount();
            $('#i-reg-email').click(function () {
                creatRegisterCon();
            });
            $('#i-login-phone').click(function () {
                addPhoneCon();
            });
            $('#i-login-f').click(function () {
                createRegetPass();
            });
            thirdPartLogin();
            calculateWinSize();
        }

        //mobile login
        function vfTimeCountdown() {
            var second = 60;
            $('.i-login-vfcode').removeClass('active').off('click');
            function countDown() {
                $('.i-login-vfcode').html('重新发送(' + second + ')');
                timer = setTimeout(function () {
                    second--;
                    if (second >= 0) {
                        countDown();
                    } else {
                        clearTimeout(timer);
                        $('.i-login-vfcode').addClass('active').html('获取验证码').click(getVfcode);
                    }
                }, 1000);
            };
            return countDown;
        }

        function getVfcode() {
            var countDown = vfTimeCountdown();
            countDown();
            $.ajax({
                url: './index.php?c=sso&m=web_get_sms_code',
                method: 'POST',
                data: {mobile: $('#phoneno').val()},
                dataType: 'json',
                success: function (data) {
                    //console.log(data);
                    if (data.error_code === '20175') {
                        $('#vfcode').next().html('操作太频繁').show();
                    } else if (data.error_code === '20105') {
                        $('#vfcode').next().html('操作太频繁').show();
                    } else {
                        $('#vfcode').next().html(data.error).show();
                    }
                }
            });
        }

        function validatePhoneno(val) {
            var pattern = /^0?1[3|4|5|8][0-9]\d{8}$/i;
            return pattern.test(val);
        }

        function sendVfCode() {
            $('.i-login-vfcode').click(function () {
                if ($('#phoneno').val() === '') {
                    $('#phoneno').next().html('手机号码不能为空').show();
                    return false;
                }
                if (!validatePhoneno($('#phoneno').val())) {
                    $('#phoneno').next().html('手机号码不正确').show();
                    return false;
                }
                getVfcode();
            });
        }

        function mobileLogin() {
            $('#phoneno').on('input change paste', function () {
                var val = $(this).val();
                if ($(this).val().length > 11) {
                    $(this).val(val.substr(0, 11));
                }
            })
            $('.i-login-btn').click(function () {
                if ($('#phoneno').val() === '') {
                    $('#phoneno').next().html('手机号码不能为空').show();
                    return false;
                }
                if (!validatePhoneno($('#phoneno').val())) {
                    $('#phoneno').next().html('手机号码不正确').show();
                    return false;
                }
                if ($('#vfcode').val() === '') {
                    $('#vfcode').next().html('验证码不能为空').show();
                    return false;
                }
                $.ajax({
                    url: './index.php?c=sso&m=mobile_web_login',
                    method: 'POST',
                    data: {'username': $('#phoneno').val(), 'password': $('#vfcode').val(), 'remember': rmMobile.toString()},
                    dataType: 'json',
                    success: function (data) {
                        //console.log(data);
                        if (data.error_code === '202012') {
                            $('#vfcode').next().html('验证码错误').show();
                        } else if (data.error_code === '202015') {
                            $('#vfcode').next().html('验证码过期').show();
                        } else if (data.error_code == '0') {
                            $(window.parent)[0].location.reload();
                        } else {
                            $('#vfcode').next().html(data.error).show();
                        }
                    }
                });
            });
        }

        function addPhoneCon() {
            var content = '';
            content += '<ul class="i-login-entry">';
            content += '<li data-type="account">账号登录</li>';
            content += '<li class="current" data-type="phone">手机登录</li>';
            content += '<div class="clear"></div>';
            content += '</ul>';
            content += '<div class="i-login-input">';
            content += '<label for="phoneno">手机号码</label>';
            content += '<input type="text" id="phoneno">';
            content += '<div class="i-login-error"></div>';
            content += '</div>';
            content += '<div class="i-login-input last">';
            content += '<label for="vfcode">验证码</label>';
            content += '<input type="text" class="vfcode" id="vfcode">';
            content += '<div class="i-login-error" style="right:110px;"></div>';
            content += '<div class="i-login-vfcode active">获取验证码</div>';
            content += '</div>';
            content += '<div class="i-login-btn">登&nbsp;&nbsp;录</div>';
            content += '<div class="i-login-keep">';
            if (rmMobile) {
                content += '<label class="i-login-checkbox checked"></label>';
            } else {
                content += '<label class="i-login-checkbox"></label>';
            }
            content += '<span class="i-login-r">记住我</span>';
            content += '<div class="clear"></div>';
            content += '</div>';
            content += '<div class="i-login-text">';
            content += '<p>没有账户？<span id="i-reg-email">邮箱注册</span></p>';
            content += '</div>';
            content += '<div class="i-login-quick">';
            content += '<span>快捷方式登录</span>';
            content += '<div class="i-login-third">';
            content += '<a class="i-login-weibo"></a>';
            content += '<a class="i-login-qq"></a>';
            content += '<a class="i-login-mi"></a>';
            content += '</div>';
            content += '<div class="clear"></div>';
            content += '</div>';
            $('.i-login-con').html(content);
            changeEntry();
            showPlaceholder('#phoneno');
            showPlaceholder('#vfcode');
            sendVfCode();
            mobileLogin();
            rememberMobile();
            $('#i-reg-email').click(function () {
                creatRegisterCon();
            });
            thirdPartLogin();
            calculateWinSize();
        }

        if (type === 'account') {
            addAccountCon();
        } else {
            addPhoneCon();
        }
    }

    //register email
    function creatRegisterCon() {
        function registerEmail() {
            $('#i-reg-btn').click(function () {
                if ($('#email').val() === '') {
                    $('#email').next().html('邮箱地址不能为空').show();
                    return false;
                }
                if (!validateEmail($('#email').val())) {
                    $('#email').next().html('请输入正确的邮箱地址').show();
                    return false;
                }
                if ($('#passwordF').val() === '') {
                    $('#passwordF').next().html('密码不能为空').show();
                    return false;
                }
                if ($('#passwordS').val() === '') {
                    $('#passwordS').next().html('密码不能为空').show();
                    return false;
                }
                if ($('#imgcode').val() === '') {
                    $('#imgcode').next().html('验证码不能为空').show();
                    return false;
                }
                if ($('#passwordF').val().length < 6 || $('#passwordS').val().length > 16) {
                    $('#passwordF').next().html('密码为6-16个字符').show();
                    return false;
                }
                if ($('#passwordF').val() !== $('#passwordS').val()) {
                    $('#passwordS').next().html('两次密码不一致').show();
                    return false;
                }
                $.ajax({
                    url: './index.php?c=register&m=newuser',
                    method: 'POST',
                    data: {'email': $('#email').val(), 'pwd': $('#passwordF').val(), 'pwd1': $('#passwordS').val(), 'valid_code': $('#imgcode').val()},
                    dataType: 'json',
                    success: function (data) {
                        //console.log(data);
                        if (data.error_code == '20307') {
                            $('#imgcode').next().html('验证码错误').show();
                        } else if (data.error_code == '20308') {
                            $('#email').next().html('用户已存在，请直接登录').show();
                        } else if (data.error_code == '0') {
                            sendEmailSucc(data, "邮箱注册");
                        } else {
                            $('#email').next().html(data.error).show();
                        }
                        $('.i-login-imgcode').attr('src', 'http://my.iciba.com/auth.php?rand=' + Math.random());
                    }
                });
            });
        }

        function addRegisterCon() {
            var content = '';
            //dummy input fixed autocomplete bug
            content += '<input type="password" style="width:0;height:0;visibility:hidden;position:absolute;left:0;top:0;">';
            content += '<div class="i-login-title">邮箱注册</div>';
            content += '<div class="i-login-input">';
            content += '<label for="email">邮箱地址</label>';
            content += '<input type="text" id="email">';
            content += '<div class="i-login-error"></div>';
            content += '</div>';
            content += '<div class="i-login-input last">';
            content += '<label for="passwordF">密码（6－16个字符）</label>';
            content += '<input type="password" id="passwordF">';
            content += '<div class="i-login-error"></div>';
            content += '</div>';
            content += '<div class="i-login-input last">';
            content += '<label for="passwordS">确认密码</label>';
            content += '<input type="password" id="passwordS">';
            content += '<div class="i-login-error"></div>';
            content += '</div>';
            content += '<div class="i-login-input last">';
            content += '<label for="imgcode">验证码</label>';
            content += '<input type="text" class="imgcode" id="imgcode">';
            content += '<div class="i-login-error" style="right:90px;"></div>';
            content += '<img class="i-login-imgcode" src="http://my.iciba.com/auth.php">';
            content += '</div>';
            content += '<div class="i-login-chimgcode">看不清？<span id="chImgcode">换一换</span></div>';
            content += '<div class="i-login-btn" id="i-reg-btn">注&nbsp;&nbsp;册</div>';
            content += '<div class="i-login-text" style="margin-top:10px;">';
            content += '<p>已有账户？<span id="i-login-quick">立即登录</span></p>';
            content += '</div>';
            content += '<div class="i-login-quick">';
            content += '<span>快捷方式登录</span>';
            content += '<div class="i-login-third">';
            content += '<i class="i-login-weibo"></i>';
            content += '<i class="i-login-qq"></i>';
            content += '<i class="i-login-mi"></i>';
            content += '</div>';
            content += '<div class="clear"></div>';
            content += '</div>';
            $('.i-login-con').html(content);
            showPlaceholder('#email');
            showPlaceholder('#passwordF');
            showPlaceholder('#passwordS');
            showPlaceholder('#imgcode');
            changeImgCode();
            registerEmail();
            $('#i-login-quick').click(function () {
                createLoginCon('account');
            });
            thirdPartLogin();
            calculateWinSize();
        }

        addRegisterCon();
    }

    //reget password
    function createRegetPass() {
        function sendEmail() {
            $('#i-login-semail').click(function () {
                if ($('#email').val() === '') {
                    $('#email').next().html('邮箱地址不能为空').show();
                    return false;
                }
                if (!validateEmail($('#email').val())) {
                    $('#email').next().html('请输入正确的邮箱地址').show();
                    return false;
                }
                if ($('#imgcode').val() === '') {
                    $('#imgcode').next().html('验证码不能为空').show();
                    return false;
                }
                $.ajax({
                    url: './index.php?c=password&m=find_password_from_email',
                    method: 'POST',
                    data: {'email': $('#email').val(), 'authcode': $('#imgcode').val()},
                    dataType: 'json',
                    success: function (data) {
                        //console.log(data);
                        if (data.error_code == '11402') {
                            $('#imgcode').next().html('验证码错误').show();
                        } else if (data.error_code == '11303') {
                            $('#email').next().html('邮箱地址未注册').show();
                        } else if (data.error_code == '11403') {
                            $('#email').next().html('操作太频繁，请稍后再试').show();
                        } else if (data.error_code == '0') {
                            emailSuccess(data);
                        } else {
                            $('#email').next().html(data.error).show();
                        }
                        $('.i-login-imgcode').attr('src', 'http://my.iciba.com/auth.php?rand=' + Math.random());
                    }
                });
            });
        }

        function resendEmail() {
            $.ajax({
                url: './index.php?c=password&m=find_password_from_email',
                method: 'POST',
                data: {'email': $('.i-login-uemail').attr('data-email'), 'authcode': '65536'},
                dataType: 'json',
                success: function (data) {
                    if (data.error_code == '0') {
                        $('#i-login-resend').remove();
                        $('.i-login-noe').html('今天发送的邮件过多，请明天再试');
                    } else {
                        $('.i-login-noe').html(data.error).show();
                    }
                }
            });
        }

        function emailSuccess(data) {
            var content = '';
            content += '<div class="i-login-title">找回密码</div>';
            content += '<div class="i-login-email">';
            content += '<i></i>';
            content += '<p>验证邮件已经发送到你的邮箱</p>';
            content += '<p class="i-login-uemail" data-email="' + data.email + '">' + data.email + '</p>';
            content += '<p>请进入邮箱，激活密码！</p>';
            content += '</div>'
            content += '<div class="i-login-btn" id="i-login-emailbtn" style="margin-top:85px;" data-href="' + data.mail_url + '">立即查收邮件</div>';
            content += '<div class="i-login-stext">';
            content += '<div>';
            content += '<span class="i-login-back" id="i-login-back">返回登录</span>';
            content += '<span class="i-login-resend" id="i-login-resend">重新发送</span>';
            content += '<span class="i-login-noe">没有收到邮件？</span>';
            content += '<div class="clear"></div>';
            content += '</div>';
            content += '</div>';
            content += '</div>';
            $('.i-login-con').html(content);
            $('#i-login-emailbtn').click(function () {
                var href = $(this).attr('data-href');
                $(window.parent)[0].open(href);
            });
            $('#i-login-back').click(function () {
                createLoginCon('account');
            });
            $('#i-login-resend').click(function () {
                resendEmail();
            });
            calculateWinSize();
        }

        function addRegetPassCon() {
            var content = '';
            content += '<div class="i-login-title">找回密码</div>';
            content += '<div class="i-login-input">';
            content += '<label for="email">注册的邮箱</label>';
            content += '<input type="text" id="email">';
            content += '<div class="i-login-error"></div>';
            content += '</div>';
            content += '<div class="i-login-input last">';
            content += '<label for="imgcode">验证码</label>';
            content += '<input type="text" class="imgcode" id="imgcode">';
            content += '<div class="i-login-error" style="right:90px;"></div>';
            content += '<img class="i-login-imgcode" src="http://my.iciba.com/auth.php">';
            content += '</div>';
            content += '<div class="i-login-chimgcode">看不清？<span id="chImgcode">换一换</span></div>';
            content += '<div class="i-login-btn" id="i-login-semail">发&nbsp;&nbsp;送</div>';
            content += '<div class="i-login-text" style="margin-top:45px;">';
            content += '<p>没有账户？<span id="i-reg-email">邮箱注册</span> 或 <span id="i-login-phone">手机号直接登录</span></p>';
            content += '</div>';
            content += '<div class="i-login-quick">';
            content += '<span>快捷方式登录</span>';
            content += '<div class="i-login-third">';
            content += '<a class="i-login-weibo"></a>';
            content += '<a class="i-login-qq"></a>';
            content += '<a class="i-login-mi"></a>';
            content += '</div>';
            content += '<div class="clear"></div>';
            content += '</div>';
            $('.i-login-con').html(content);
            showPlaceholder('#email');
            showPlaceholder('#imgcode');
            changeImgCode();
            sendEmail();
            $('#i-reg-email').click(function () {
                creatRegisterCon();
            });
            $('#i-login-phone').click(function () {
                createLoginCon('phone');
            });
            thirdPartLogin();
            calculateWinSize();
        }

        addRegetPassCon();
    }


});