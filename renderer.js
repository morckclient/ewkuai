var flag_arr = []
var connect_mode
var connect_status = false
var server_loading_over = false

window.onload = function () {
    window.loginAPI.hasVertif().then(r => {
        if (r) {
            //quick_loading()
        } else {
            //back_login()
        }
    })
    window.indexAPI.setTitle();
    window.configAPI.getFlagName().then((result) => {
        for (let res in result) {
            flag_arr.push(result[res])
        }
    })
}

function get_acc() {
    window.loginAPI.getAccount().then((result) => {
        if (result !== '') {
            let res = result.split(",");
            document.getElementById('login-user').value = res[0];
            document.getElementById('login-pwd').value = res[1];
        }
    })
}

function close_win() {
    window.electronAPI.hideWindow();
}

function exit_win() {
    window.electronAPI.exitWindow()
}

function mini_win() {
    window.electronAPI.miniWindow();
}

function sign_up_page() {
    document.body.style = 'background: url(assets/img/img_bg.png) top / 100% 100% no-repeat;-webkit-app-region: drag;';
    document.body.innerHTML = '<div class="modal fade" role="dialog" tabindex="-1" id="reg-success">\n' +
        '<div class="modal-dialog modal-dialog-centered" role="document">\n' +
        '        <div class="modal-content">\n' +
        '                <div class="modal-body" style="background: url(assets/img/img_success_wind.png) top / cover no-repeat;height: 100%;">\n' +
        '                    <p style="margin-top: 70%;color: #bebebe;font-size: 20px;text-align: center;">恭喜注册成功！<br></p>\n' +
        '                </div>\n' +
        '                <div class="modal-footer" style="border: none;"><button class="btn btn-box btn-login" type="button" onclick="login_page()">去登录</button></div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="modal fade" role="dialog" tabindex="-1" id="failure">\n' +
        '        <div class="modal-dialog modal-dialog-centered" role="document">\n' +
        '            <div class="modal-content">\n' +
        '                <div class="modal-body" style="background: url(assets/img/img_failure_wind.png) top / cover no-repeat;height: 100%;">\n' +
        '                    <p style="margin-top: 70%;color: #bebebe;font-size: 20px;text-align: center;">邮箱已注册！<br></p>\n' +
        '                </div>\n' +
        '                <div class="modal-footer" style="border: none;"><button class="btn btn-box btn-login" type="button">重新注册</button></div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '<div id="header-close" class="header-close close-black" style="margin-top: 8px;">\n' +
        '    <button style="border: none; background: url(assets/img/mini-fill.png);width:24px;height:24px; margin-right: 10px;"\n' +
        '            onclick="mini_win()">\n' +
        '    </button>\n' +
        '    <button style="border: none; background: url(assets/img/close-fill.png);width:24px;height:24px; margin-right: 10px;"\n' +
        '            onclick="exit_win()">\n' +
        '    </button>\n' +
        '</div>\n' +
        '    <div class="login_bg" style="width: 100%;height: 900px;">\n' +
        '        <div class="d-sm-flex align-items-sm-center logo-box">\n' +
        '            <h1>欢迎注册<img src="assets/img/img_logo.png" style="width: 70px;margin-left: 20px;"></h1>\n' +
        '        </div>\n' +
        '        <div class="login_box">\n' +
        '            <div class="d-sm-flex justify-content-sm-center align-items-sm-center input-box">\n' +
        '                <div class="d-flex d-sm-flex align-items-center align-items-sm-center text-input">\n' +
        '                    <div style="display: inherit;width: 60px;"><img src="assets/img/iconx2.png" style="float: left;margin: auto;width: 20px;"><img src="assets/img/iconx0.png" style="height: 14px;float: left;margin: auto;margin-left: 1px;"></div><input id="name" type="text" class="input-mini" placeholder="请输入名字">\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="d-sm-flex justify-content-sm-center align-items-sm-center input-box">\n' +
        '                <div class="d-flex d-sm-flex align-items-center align-items-sm-center text-input">\n' +
        '                    <div style="display: inherit;width: 60px;"><img src="assets/img/iconx3.png" style="float: left;margin: auto;width: 20px;"><img src="assets/img/iconx0.png" style="height: 14px;float: left;margin: auto;margin-left: 1px;"></div><input id="mail" type="text" class="input-mini" placeholder="请输入邮箱" style="width: 40%;">\n' +
        '                    <div class="dropdown" style="text-align: right;"><button class="btn dropdown-toggle dropdown-box" aria-expanded="false" data-bs-toggle="dropdown" type="button" id="mail-show">@gmail.com</button>\n' +
        '                        <div class="dropdown-menu" id="mail-item"></div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="d-sm-flex justify-content-sm-center align-items-sm-center input-box">\n' +
        '                <div class="container" style="padding: 0;">\n' +
        '                    <div class="row">\n' +
        '                        <div class="col-8 col-md-9 col-lg-9 col-xl-9 col-xxl-10">\n' +
        '                            <div class="d-flex d-sm-flex align-items-center align-items-sm-center text-input">\n' +
        '                                <div style="display: inherit;width: 60px;"><img src="assets/img/iconx4.png" style="float: left;margin: auto;width: 20px;"><img src="assets/img/iconx0.png" style="height: 14px;float: left;margin: auto;margin-left: 1px;"></div><input id="mail-code" type="text" class="input-mini" placeholder="输入邮箱验证码">\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="col-4 col-md-3 col-lg-3 col-xl-3 col-xxl-2"><button id="send-code" class="btn btn-primary btn-box btn-yan" type="button" style="font-size: 1rem;" onclick="email_code()">获取验证码</button></div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="d-sm-flex justify-content-sm-center align-items-sm-center input-box">\n' +
        '                <div class="d-flex d-sm-flex align-items-center align-items-sm-center text-input">\n' +
        '                    <div style="display: inherit;width: 60px;"><img src="assets/img/iconx5.png" style="float: left;margin: auto;width: 20px;"><img src="assets/img/iconx0.png" style="height: 14px;float: left;margin: auto;margin-left: 1px;"></div><input id="password" class="input-mini" placeholder="请输入密码">\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="d-sm-flex justify-content-sm-center align-items-sm-center input-box">\n' +
        '                <div class="d-flex d-sm-flex align-items-center align-items-sm-center text-input">\n' +
        '                    <div style="display: inherit;width: 60px;"><img src="assets/img/iconx5.png" style="float: left;margin: auto;width: 20px;"><img src="assets/img/iconx0.png" style="height: 14px;float: left;margin: auto;margin-left: 1px;"></div><input id="re-password" class="input-mini" placeholder="请再次输入密码">\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="d-sm-flex justify-content-sm-center align-items-sm-center input-box"><button id="sign-btn" class="btn btn-primary btn-box btn-login" onclick="register()">注册</button></div>\n' +
        '            <div style="text-align: center; margin-top: 30px; font-size: 18px;">已有账号？' +
        '               <a style="color: #007bff;" href="#" onclick="login_page()">返回登录</a>' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>';
    //邮箱后缀
    const mail_list = ['@gmail.com', '@qq.com', '@outlook.com', '@163.com', '@126.com', '@yeah.net', '@foxmail.com'];
    let mail_item = document.getElementById('mail-item');
    for (let i = 0; i < mail_list.length; i++) {
        let a_mail = document.createElement('a');
        a_mail.setAttribute('class', 'dropdown-item');
        a_mail.setAttribute('onclick', 'select_mail_domain(this)');
        a_mail.innerText = mail_list[i];
        mail_item.appendChild(a_mail);
    }
}

function select_mail_domain(obj) {
    document.getElementById('mail-show').innerText = obj.innerText;
}

function email_code() {
    let send_code_btn = document.getElementById('send-code');
    send_code_btn.disabled = true;
    let mail = document.getElementById('mail');
    let mail_domain = document.getElementById('mail-show');
    let email = mail.value + mail_domain.innerText;
    if (mail.value === '' || mail.value === undefined) {
        document.getElementById('mail').className = 'mint';
        send_code_btn.disabled = false;
    } else {
        window.loginAPI.sendVerify(email).then((result) => {
            if (result['status_code'] === 200) {
                Swal.fire({
                    text: result['msg'],
                    width: '240px',
                    timer: 1800,
                    showConfirmButton: false,
                    backdrop: `
                    rgba(0,0,0,0.4)
                `
                });
                let i = 60
                let t = setInterval(countDown, 1000);

                function countDown() {
                    send_code_btn.innerHTML = `${i}`;
                    if (i === 0) {
                        clearInterval(t);
                        send_code_btn.disabled = false;
                        send_code_btn.innerHTML = '重发';
                    }
                    i--;
                }
            }
        })
    }
}

function register() {
    let sign_btn = document.getElementById('sign-btn');
    let inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length - 1; i++) {
        if (inputs[i].value === '') {
            inputs[i].className = 'mint';
            inputs[i].focus();
            return
        } else {
            inputs[i].style.border = '0';
        }
    }
    if (inputs[3].value !== inputs[4].value) {
        inputs[4].value = '';
        inputs[4].placeholder = '两次密码输入不一致';
        inputs[4].className = 'mint';
        inputs[4].focus();
        return
    }
    sign_btn.disabled = true;
    let name = document.getElementById('name');
    let mail = document.getElementById('mail');
    let mail_domain = document.getElementById('mail-show');
    let passwd = document.getElementById('password');
    let repasswd = document.getElementById('re-password');
    let emailcode = document.getElementById('mail-code');
    window.loginAPI.Register(mail.value + mail_domain.innerText, name.value, passwd.value, repasswd.value, emailcode.value).then((result) => {
        if (result['ret'] === 0) {
            Swal.fire({
                text: result['msg'],
                width: '240px',
                timer: 1800,
                showConfirmButton: false,
                backdrop: `
                    rgba(0,0,0,0.4)
                `
            });
        } else {
            let alert = document.getElementById('reg-success');
            let myModal = new bootstrap.Modal(alert, {keyboard: false});
            myModal.show();
            window.loginAPI.saveAccount(mail.value + mail_domain.innerText, passwd.value);
        }
    })
    sign_btn.disabled = false;
}

function login_page() {
    window.coreAPI.start();
    document.body.style.background = 'url(assets/img/img_bg.png)';
    document.body.innerHTML = '<div class="login_bg" style="width: 100%;height: 900px;">\n' +
        '        <div class="d-sm-flex align-items-sm-center logo-box">\n' +
        '            <h1>欢迎登录<img src="assets/img/img_logo.png" style="width: 70px;margin-left: 20px;"></h1>\n' +
        '        </div>\n' +
        '<div id="header-close" class="header-close close-black" style="margin-top: 8px;">\n' +
        '    <button style="border: none; background: url(assets/img/mini-fill.png);width:24px;height:24px; margin-right: 10px;"\n' +
        '            onclick="mini_win()">\n' +
        '    </button>\n' +
        '    <button style="border: none; background: url(assets/img/close-fill.png);width:24px;height:24px; margin-right: 10px;"\n' +
        '            onclick="exit_win()">\n' +
        '    </button>\n' +
        '</div>\n' +
        '        <div class="login_box">\n' +
        '            <div class="d-sm-flex justify-content-sm-center align-items-sm-center input-box">\n' +
        '                <div class="d-flex d-sm-flex align-items-center align-items-sm-center text-input">\n' +
        '                    <div style="display: inherit;width: 60px;"><img src="assets/img/iconx3.png" style="float: left;margin: auto;width: 20px;"><img src="assets/img/iconx0.png" style="height: 14px;float: left;margin: auto;margin-left: 1px;"></div><input id="login-user" type="text" class="input-mini" placeholder="请输入邮箱">\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="d-sm-flex justify-content-sm-center align-items-sm-center input-box">\n' +
        '                <div class="d-flex d-sm-flex align-items-center align-items-sm-center text-input">\n' +
        '                    <div style="display: inherit;width: 60px;"><img src="assets/img/iconx5.png" style="float: left;margin: auto;width: 20px;"><img src="assets/img/iconx0.png" style="height: 14px;float: left;margin: auto;margin-left: 1px;"></div><input id="login-pwd" type="password" class="input-mini" placeholder="请输入密码">\n' +
        '                    <div style="display: inherit;width: 60px;">\n' +
        '                        <div style="-webkit-app-region: no-drag;"><img src="assets/img/iconx7.png" style="float: left;margin: auto;width: 30px;" onclick="show_pwd()"></div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="d-sm-flex justify-content-sm-center align-items-sm-center input-box" style="margin-top: 220px;"><button id="login-btn" class="btn btn-primary btn-box btn-login" type="button" onclick="login()">登录</button></div>\n' +
        '            <div class="d-sm-flex input-box" style="margin-top: 30px;font-size: 18px;">\n' +
        '                <div style="width: 40%;float: left;text-align: left;"><a href="#" onclick="forget_pwd()">忘记密码？</a></div>\n' +
        '                <div style="float: right;text-align: right;width: 60%;">\n' +
        '                    <p>没有账号？<a href="#" onclick="sign_up_page()">前往注册</a></p>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>';
    get_acc();
}

function show_pwd() {
    let pwd = document.getElementById('login-pwd');
    if (pwd.type === 'password') {
        pwd.type = 'text';
    } else {
        pwd.type = 'password';
    }
}

function forget_pwd() {
    window.indexAPI.getDomain().then((result) => {
        window.open(result + '/password/reset', '_blank','width=420,height=840,menubar=no,toolbar=no,status=no,scrollbars=no')
    });
}

function login() {
    let login_btn = document.getElementById('login-btn');
    let input = document.getElementsByTagName('input');
    for (let i = 0; i < input.length; i++) {
        if (input[i].value === '') {
            input[i].className = 'mint';
            input[i].focus();
            return
        } else {
            input[i].style.border = '0';
        }
    }
    login_btn.disabled = true;
    Swal.fire({
        //text: '登录中...',
        html: '<div id="animation" style="margin: auto;margin-bottom: 26px;width: 56%; height: 56%;"></div><a style="text-align: center;">登录中...</a>',
        width: '260px',
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
    });
    lottie.loadAnimation({
        container: document.getElementById('animation'),
        autoplay: true,
        loop: true,
        renderer: 'svg',
        path: 'assets/animation/loading.json',
    }).setSubframe(false);

    let email = document.getElementById('login-user').value;
    let pwd = document.getElementById('login-pwd').value;
    window.loginAPI.doLogin(email, pwd).then((result) => {
        if (result['ret'] === 1) {
            Swal.showLoading()
            window.loginAPI.saveAccount(email, pwd);
            home_page();
        } else {
            login_btn.disabled = false;
            Swal.fire({
                text: result['msg'],
                width: '240px',
                timer: 1800,
                showConfirmButton: false,
                backdrop: `
                    rgba(0,0,0,0.4)
                `
            });
        }
    })
}

function home_page() {
    Swal.close();
    document.body.style.background = 'url(assets/img/img_bg.png)';
    document.body.innerHTML = '<div class="modal fade" role="dialog" tabindex="-1" id="lie" style="-webkit-app-region: no-drag;">\n' +
        '        <div class="modal-dialog" role="document">\n' +
        '            <div class="modal-content">\n' +
        '                <div class="login_box" style="overflow: auto;border: none;margin-top: 10%;height: 800px;">\n' +
        '                    <h4 style="color: #0186fd;text-align: center;">VIP线路</h4>\n' +
        '                    <div style="padding: 20px;">\n' +
        '                        <div class="d-flex align-items-center btn-box btn-yan2" style="/*padding: 20px;*/font-size: 15px;color: #4e5e6d;">\n' +
        '                            <p style="width: 80%;margin: 0 20px;">&nbsp;自动选择</p>\n' +
        '                            <div style="width: 20%;"><img src="assets/img/iconx31.png" style="width: 26px;"></div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <div style="padding: 20px;">\n' +
        '                        <p style="color: #4e5e6d;">推荐线路</p>\n' +
        '                        <div class="d-flex align-items-center btn-box btn-yan2 jie">\n' +
        '                            <p style="width: 80%;margin: 0 20px;"><img src="assets/img/flag_016.svg" style="margin-right: 10px;">美国</p>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="login_bg" style="width: 100%;height: 900px;">\n' +
        '        <div class="d-sm-flex align-items-sm-center logo-box">\n' +
        '            <div style="float: left;text-align: left;width: 50%;"><img src="assets/img/iconx29.png" style="width: 40px;"></div>\n' +
        '            <div style="float: left;text-align: right;width: 50%;"><img src="assets/img/iconx28.png" style="width: 40px;"></div>\n' +
        '        </div>\n' +
        '        <div class="login_box">\n' +
        '            <div class="d-sm-flex justify-content-sm-center align-items-sm-center" style="width: 80%;margin: 50px auto;-webkit-app-region: no-drag;">\n' +
        '                <div class="d-flex d-sm-flex d-md-flex justify-content-center align-items-center justify-content-sm-center align-items-sm-center" style="width: 100%;background-size: contain;text-align: center;">\n' +
        '                    <div class="d-flex justify-content-center align-items-center" style="position: absolute;top: 70px;right: 10%;width: 50px;height: 40px;background: url(assets/img/iconx30.png) no-repeat;background-size: contain;">\n' +
        '                        <p id="value-par" style="margin-top: 5px;color: #229fff;">0%</p>\n' +
        '                    </div>\n' +
        '                    <div style="margin: auto;position: absolute;"><img src="assets/img/y2.png" style="width: 150px;"><a href="#" style="font-size: 27px;-webkit-app-region: no-drag;">\n' +
        '                            <p>一键加速</p>\n' +
        '                        </a></div>\n' +
        '                    <div style="background: url(assets/img/y.png) center / contain no-repeat;"><img id="connect-img" src="assets/img/y/y_0.png" style="width: 100%;"></div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="d-sm-flex justify-content-sm-center align-items-sm-center" style="width: 80%;margin: 50px auto;-webkit-app-region: no-drag;" data-bs-toggle="modal" data-bs-target="#lie">\n' +
        '                <div class="d-flex justify-content-center align-items-center btn-box btn-yan2" style="margin-top: 40px;padding-right: 20px;-webkit-app-region: no-drag;">\n' +
        '                    <p style="margin: auto;color: #4e5e6d;font-size: 15px;margin-left: 34%;-webkit-app-region: no-drag;">节点选择&nbsp; &nbsp;<img src="assets/img/iconx10.png" style="height: 30px;-webkit-app-region: no-drag;"></p><svg xmlns="http://www.w3.org/2000/svg" viewBox="-96 0 512 512" width="1em" height="1em" fill="currentColor" style="color: #4e5e6d;-webkit-app-region: no-drag;">\n' +
        '                        <path d="M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160 384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516 223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62 7.781 29.58 19.75S319.8 237.5 310.6 246.6z"></path>\n' +
        '                    </svg>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div style="position: fixed;bottom: 0;padding: 0px 40px 20px 40px;"><img src="assets/img/text.png" style="width: 100%;"></div>\n' +
        '        </div>\n' +
        '    </div>';

    //获取token下载节点
    window.indexAPI.getUserInfo().then((result) => {
        let ssrSubToken = result['info']['ssrSubToken'];
        window.indexAPI.getClashYaml(ssrSubToken).then((res) => {
            if (res === 'ok') {
                //window.yamlAPI.tunYaml()
                setTimeout(() => {
                    window.coreAPI.reloadConfig('new').then(() => {});
                }, 500);
            }
        }).then(() => {
            setTimeout(() => {
                getServer();
            }, 1000)
        })
    })

}

function getServer() {

}
