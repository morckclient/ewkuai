let flag_arr = [];
let user_money;
let class_level;
let ssrSubToken;
let user_reg_date;
let global_mode = false;

window.onload = function () {
    window.loginAPI.hasVertif().then(r => {
        if (r) {
            login_page();
            setTimeout(() => {
                login();
            }, 800)
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
    mail_list();
}

function mail_list() {
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
        loading_frame('发送中...');
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
            } else {
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
}

function register() {
    let inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length - 1; i++) {
        inputs[i].style.outline = 'none';
        inputs[i].style.border = '0';
        if (inputs[i].value === '') {
            inputs[i].className = 'input-mini mint';
            inputs[i].focus();
            return
        }
    }
    if (inputs[3].value !== inputs[4].value) {
        inputs[4].value = '';
        inputs[4].placeholder = '两次密码输入不一致';
        inputs[4].className = 'input-mini mint';
        inputs[4].focus();
        return
    }
    loading_frame('请求中...');
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
                timer: 2000,
                showConfirmButton: false,
                backdrop: `
                    rgba(0,0,0,0.4)
                `
            });
        } else {
            Swal.close();
            let alert = document.getElementById('reg-success');
            let myModal = new bootstrap.Modal(alert, {keyboard: false});
            myModal.show();
            window.loginAPI.saveAccount(mail.value + mail_domain.innerText, passwd.value);
        }
    })
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
        window.open(result + '/password/reset', '_blank', 'width=420,height=840,menubar=no,toolbar=no,status=no,scrollbars=no')
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
    loading_frame('登录中...');
    let email = document.getElementById('login-user').value;
    let pwd = document.getElementById('login-pwd').value;
    window.loginAPI.doLogin(email, pwd).then((result) => {
        if (result['ret'] === 1) {
            Swal.showLoading()
            window.loginAPI.saveAccount(email, pwd);
            home_page();
        } else {
            Swal.close();
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

function loading_frame(value) {
    Swal.fire({
        html: '<div id="animation" style="margin: auto;margin-bottom: 26px;width: 56%; height: 56%;"></div><a style="text-align: center;">' + value + '</a>',
        width: '260px',
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
    });
    let lottie_loading = lottie.loadAnimation({
        container: document.getElementById('animation'),
        autoplay: true,
        loop: true,
        renderer: 'svg',
        path: 'assets/animation/loading.json',
    })
    lottie_loading.setSpeed(0.6);
}

function home_page() {
    loading_frame('获取中...');
    document.body.style.background = 'url(assets/img/img_bg.png)';
    document.body.innerHTML = '<div class="modal fade" role="dialog" tabindex="-1" id="lie" style="-webkit-app-region: no-drag;">\n' +
        '        <div class="modal-dialog" role="document">\n' +
        '            <div class="modal-content">\n' +
        '                <div class="login_box" style="overflow: auto;border: none;margin-top: 10%;height: 800px;">\n' +
        '                   <button id="server-close" type="button" style="display: none" data-bs-dismiss="modal" aria-label="Close"></button>\n' +
        '                    <h4 style="color: #0186fd;text-align: center;">VIP线路</h4>\n' +
        '                    <button class="get_btn" id="re-get-server" onclick="reGetServer(this)"></button>\n' +
        '                    <div style="padding: 20px;">\n' +
        '                        <div class="d-flex align-items-center btn-box btn-yan2" style="font-size: 15px;color: #4e5e6d;" onclick="selectServer(this, true)">\n' +
        '                            <p style="width: 80%;margin: 0 20px;">自动选择</p>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <div id="server-list" style="padding: 20px;">\n' +
        '                        <p style="color: #4e5e6d;">推荐线路</p>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div id="header-close" class="header-close close-black">\n' +
        '       <button style="border: none; background: url(assets/img/mini-fill.png);width:24px;height:24px; margin-right: 10px;"\n' +
        '            onclick="mini_win()">\n' +
        '       </button>\n' +
        '       <button style="border: none; background: url(assets/img/close-fill.png);width:24px;height:24px;"\n' +
        '            onclick="close_win()">\n' +
        '       </button>\n' +
        '    </div>\n' +
        '    <div id="home" class="login_bg" style="width: 100%;height: 900px;">\n' +
        '        <div class="d-sm-flex align-items-sm-center logo-box" style="padding-top: 45px;">\n' +
        '            <div style="float: left;text-align: left;width: 50%;"><img src="assets/img/iconx29.png" style="width: 34px;height:28px;-webkit-app-region: no-drag;" onclick="menu_page(false)"></div>\n' +
        '            <div style="float: left;text-align: right;width: 50%;"><img src="assets/img/iconx28.png" style="width: 34px;height:28px;-webkit-app-region: no-drag;" onclick="menu_page(true)"></div>\n' +
        '        </div>\n' +
        '        <div class="login_box" style="-webkit-app-region: no-drag;">\n' +
        '         <div class="d-sm-flex justify-content-sm-center align-items-sm-center" style="width: 80%;margin: 50px auto;-webkit-app-region: no-drag;">\n' +
        '                <div class="d-flex d-sm-flex d-md-flex justify-content-center align-items-center justify-content-sm-center align-items-sm-center" style="width: 100%;background-size: contain;text-align: center;-webkit-app-region: no-drag;">\n' +
        '                    <div class="d-flex justify-content-center align-items-center" style="position: absolute;top: 70px;right: 10%;width: 50px;height: 40px;background: url(assets/img/iconx30.png) no-repeat;background-size: contain;-webkit-app-region: no-drag;">\n' +
        '                        <p id="conn-prog" style="margin-top: 5px;color: #229fff;">0%</p>\n' +
        '                    </div>\n' +
        '                    <div style="margin: auto;position: absolute;-webkit-app-region: no-drag;">\n' +
        '                        <img id="conn-1" src="assets/img/y2.png" style="width: 100px;-webkit-app-region: no-drag;" onclick="proxy(this, true)"><a href="#" style="font-size: 27px;">\n' +
        '                            <p id="conn-2" style="-webkit-app-region: no-drag;" onclick="proxy(this, true)">一键加速</p>\n' +
        '                        </a></div>\n' +
        '                    <div id="conn-3" style="background: url(assets/img/y.png) center / contain no-repeat;-webkit-app-region: no-drag;" onclick="proxy(this, true)">                     \n' +
        '                         <div id="firstLottie" style="width: 100%;"></div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="d-sm-flex justify-content-sm-center align-items-sm-center" style="width: 80%;margin: 50px auto;-webkit-app-region: no-drag;" data-bs-toggle="modal" data-bs-target="#lie">\n' +
        '                <div class="d-flex justify-content-center align-items-center btn-box btn-yan2" style="margin-top: 40px;padding-right: 20px;-webkit-app-region: no-drag;">\n' +
        '                    <p id="server-name" style="margin: auto;color: #4e5e6d;font-size: 15px;-webkit-app-region: no-drag;"><img id="server-name-flag" src="assets/img/iconx10.png" style="height: 30px;margin-right: 10px;-webkit-app-region: no-drag;">节点选择</p><svg xmlns="http://www.w3.org/2000/svg" viewBox="-96 0 512 512" width="1em" height="1em" fill="currentColor" style="color: #4e5e6d;-webkit-app-region: no-drag;">\n' +
        '                        <path d="M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160 384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516 223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62 7.781 29.58 19.75S319.8 237.5 310.6 246.6z"></path>\n' +
        '                    </svg>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div style="position: fixed;bottom: 0;padding: 0 40px 20px 40px;"><img src="assets/img/text.png" style="width: 100%;"></div>\n' +
        '        </div>\n' +
        '    </div>';
    loading_frame('获取中...');
    connect_play(false);
    re_get_play();

    //获取token下载节点
    window.indexAPI.getUserInfo().then((result) => {
        ssrSubToken = result['info']['ssrSubToken'];
        window.indexAPI.getClashYaml(ssrSubToken).then((res) => {
            if (res === 'ok') {
                //window.yamlAPI.tunYaml()
                setTimeout(() => {
                    window.coreAPI.reloadConfig('new').then(() => {
                    });
                }, 500);
                setTimeout(() => {
                    getServer();
                }, 1000);
            } else {
                document.getElementById('server-name').innerText = '套餐已到期';
                Swal.close();
            }
        })
    })

}

function flag_Regular(name) {
    let pic = 'assets/img/Unknown.png';
    for (let i = 0; i < flag_arr.length; i++) {
        let flag_name = flag_arr[i].replace('.png', '');
        let patt = RegExp(flag_name);
        if (patt.test(name)) {
            pic = `assets/img/flag/${flag_arr[i]}`;
        }
    }
    return pic
}

function getServer() {
    let server_body = document.getElementById('server-list');
    window.coreAPI.getServer().then((result) => {
        try {
            if (result['status_code'] === 200) {
                let get_list = result['proxies']['Proxy']['all'];
                let new_server = new Set(get_list);
                new_server.delete('自动选择');
                let server_list = [...new_server];
                for (let i = 0; i < server_list.length; i++) {
                    let server_div = document.createElement('div');
                    server_div.className = 'd-flex align-items-center btn-box btn-yan2 jie';
                    server_div.setAttribute('onclick', 'selectServer(this, true)');
                    server_div.innerHTML = '<p style="width: 80%;margin: 0 20px;"><img src="' + flag_Regular(server_list[i]) + '" style="margin-right: 10px;width: 28px;height: 28px;border-radius: 25%;">' + server_list[i] + '</p>';
                    server_body.appendChild(server_div);
                }
                Swal.close();
                get_current_server(result);
            }
        } catch (e) {
            getServer();
        }
    });
}

function get_current_server(result) {
    let ser_list_div = document.getElementsByClassName('d-flex align-items-center btn-box btn-yan2');
    for (let i = 0; i < ser_list_div.length; i++) {
        let server_now = result['proxies']['Proxy']['now'];
        if (ser_list_div[i].innerText.includes(server_now)) {
            selectServer(ser_list_div[i], false);
            break;
        }
    }
}

function re_get_play() {
    const ico = document.getElementById('re-get-server');
    ico.innerHTML = ''
    const animation = lottie.loadAnimation({
        container: ico,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: "assets/animation/refresh.json"
    });
    animation.setSpeed(0.7);
    ico.addEventListener('click', () => {
        animation.playSegments([0, 60], true);
        animation.addEventListener('complete', () => {
            ico.setAttribute('onclick', 'reGetServer(this)');
        });
    });
}

function reGetServer(obj) {
    window.coreAPI.reloadConfig('default').then((res) => {
        if (res === 204) {
            obj.setAttribute('onclick', '');
            window.indexAPI.getClashYaml(ssrSubToken).then((res) => {
                if (res === 'ok') {
                    if (global_mode) {
                        window.coreAPI.reloadConfig('global').then(() => {
                        });
                    } else {
                        window.coreAPI.reloadConfig('new').then(() => {
                        });
                    }
                    document.getElementById('server-list').innerHTML = '';
                    setTimeout(() => {
                        getServer();
                    }, 1000);
                } else {
                    document.getElementById('server-name').innerText = '套餐已到期';
                    Swal.close();
                }
            })
        }
    });

}

function selectServer(obj, closed) {
    let server_divs = document.getElementsByClassName('check-img');
    for (let i = 0; i < server_divs.length; i++) {
        server_divs[i].parentNode.removeChild(server_divs[i]);
    }
    let img_div = document.createElement('div');
    img_div.className = 'check-img';
    img_div.style.width = '20%';
    img_div.innerHTML = '<img src="assets/img/iconx31.png" style="width: 26px;">';
    obj.appendChild(img_div);
    document.getElementById('server-name').innerHTML = '<img id="server-name-flag" src="' + flag_Regular(obj.innerText) + '" style="height: 30px;margin-right: 10px;border-radius: 25%;-webkit-app-region: no-drag;">' + obj.innerText;
    window.coreAPI.selectServer('Proxy', obj.innerText).then(() => {
    });
    if (closed) {
        setTimeout(() => {
            document.getElementById('server-close').click();
        }, 200)
    }
}

function connect_play(auto, direction, obj) {
    let lottie_div = document.getElementById('firstLottie');
    lottie_div.innerHTML = '';
    let ani = lottie.loadAnimation({
        container: lottie_div,
        autoplay: false,
        loop: false,
        renderer: 'svg',
        path: 'assets/animation/connect.json',
    });
    ani.setSpeed(1.2);
    ani.setDirection(direction);
    if (auto) {
        if (direction === 1) {
            ani.playSegments([0, 60], true);
            ani.addEventListener('complete', () => {
                obj.setAttribute('onclick', 'proxy(this, false)');
            });
        } else {
            ani.playSegments([60, 0], true);
            ani.addEventListener('complete', () => {
                document.getElementById('conn-2').innerText = '一键加速';
                obj.setAttribute('onclick', 'proxy(this, true)');
            });
        }
    }
    ani.addEventListener('enterFrame', (res) => {
        res = Math.ceil(res['currentTime'] * 2);
        if (res < 100) {
            document.getElementById('conn-prog').innerText = `${res}%`;
        } else if (res > 100) {
            document.getElementById('conn-prog').innerText = '100%';
            document.getElementById('conn-2').innerText = '停止加速';
        }
    });

}

function proxy(obj, status) {
    obj.setAttribute('onclick', '');
    if (status) {
        connect_play(true, 1, obj);
        window.systemAPI.sysProxyOn(25532);
    } else {
        connect_play(true, -1, obj);
        window.systemAPI.sysProxyOff();
    }
}

function menu_page(state) {
    document.getElementById('home').style.display = 'none';
    loading_frame('获取中...');
    let menu_div = document.createElement('div');
    menu_div.id = 'menu-page';
    menu_div.className = 'login_bg';
    menu_div.style.width = '100%';
    menu_div.style.height = '900px';
    menu_div.innerHTML = '<div id="menu-top" class="d-sm-flex align-items-sm-center logo-box">\n' +
        '            <div><img id="back-btn" src="assets/img/iconx19.png" style="height: 40px;-webkit-app-region: no-drag;" onclick="back_home()"></div>\n' +
        '            <div style="margin-top: 15px;display: flex;">\n' +
        '                <div style="float: left;width: 60%;">\n' +
        '                    <p id="user-mail" class="d-flex align-items-center"><img src="assets/img/y/icon7.png" style="height: 15px;"><img src="assets/img/y/jiantou.png" style="margin-left: 10px;height: 12px;margin-right: 10px;"></p>\n' +
        '                </div>\n' +
        '                <div style="float: left;margin-left: 5%">\n' +
        '                    <p id="user-wallet" style="white-space: nowrap;"><img src="assets/img/y/iconx8.png" style="height: 15px;"><img src="assets/img/y/jiantou.png" style="margin-left: 10px;height: 12px;margin-right: 10px;"></p>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div id="menu-body" class="login_box" style="top: 15%;height: 90%;">\n' +
        '            <div class="d-sm-flex justify-content-sm-center align-items-sm-center input-box">\n' +
        '                <div class="container" style="padding: 0;">\n' +
        '                    <div class="row">\n' +
        '                        <div class="col-8 col-md-9 col-lg-9 col-xl-9 col-xxl-10">\n' +
        '                            <div class="d-flex d-sm-flex align-items-center align-items-sm-center text-input">\n' +
        '                                <p id="user-expire" class="d-flex align-items-center" style="margin: 0;font-size: 15px;"><img src="assets/img/iconx9.png" style="float: left;width: 32px;margin-left: 10px;margin-right: 10px;">到期：</p>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="col-4 col-md-3 col-lg-3 col-xl-3 col-xxl-2"><button id="shop" class="btn btn-primary btn-box btn-yan" type="button" style="font-size: 1.2rem;" onclick="click_menu(this)">续费</button></div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="d-sm-flex justify-content-sm-center align-items-sm-center input-box">\n' +
        '                <div style="background-color: #DFE9F6;height: 118px;border-radius: 30px;padding: 15px;">\n' +
        '                    <p style="font-size: 20px;color: #949EAB;">流量</p>\n' +
        '                    <div style="height: 42px;">\n' +
        '                        <div class="d-flex justify-content-center align-items-center" style="z-index: 1;position: absolute;width: 346px;height: 42px;">\n' +
        '                            <p id="user-data" class="d-flex justify-content-center" style="margin: 0;">0/0GB</p>\n' +
        '                        </div>\n' +
        '                        <div style="z-index: 0;position: absolute;width: 346px;height: 42px;">\n' +
        '                            <div id="data-prog" style="width: 12%;height: 42px;border-radius: 30px;background-image: linear-gradient(270deg, #00E1D7 0%, #00A2C7 100%);"></div>\n' +
        '                        </div>\n' +
        '                        <div style="width: 100%;height: 100%;border-radius: 30px;background: #B4C9EA;"></div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="d-flex d-sm-flex align-items-center justify-content-sm-center align-items-sm-center input-box line-box">\n' +
        '                <div style="width: 70%;">\n' +
        '                    <div style="float: left;"><img src="assets/img/iconx10.png" style="height: 25px;"><img src="assets/img/iconx0.png" style="height: 20px;margin-left: 10px;margin-right: 10px;"></div>\n' +
        '                    <p style="margin: 0;">全局模式</p>\n' +
        '                </div>\n' +
        '                <div class="d-flex justify-content-end align-items-center" style="width: 30%;"><label class="switch">\n' +
        '  <input id="global-mode" type="checkbox" onclick="global_switch()">\n' +
        '  <span class="slider round"></span>\n' +
        '</label></div>\n' +
        '            </div>\n' +
        '            <div id="invite" class="d-flex d-sm-flex align-items-center justify-content-sm-center align-items-sm-center input-box line-box" onclick="click_menu(this)">\n' +
        '                <div style="width: 70%;">\n' +
        '                    <div style="float: left;"><img src="assets/img/iconx11.png" style="height: 25px;"><img src="assets/img/iconx0.png" style="height: 20px;margin-left: 10px;margin-right: 10px;"></div>\n' +
        '                    <p style="margin: 0;">邀请奖励</p>\n' +
        '                </div>\n' +
        '                <div class="d-flex justify-content-end align-items-center" style="width: 30%;"><a href="#">邀请返利 &gt;</a></div>\n' +
        '            </div>\n' +
        '            <div id="orders" class="d-flex d-sm-flex align-items-center justify-content-sm-center align-items-sm-center input-box line-box" onclick="click_menu(this)">\n' +
        '                <div style="width: 70%;">\n' +
        '                    <div style="float: left;"><img src="assets/img/iconx12.png" style="height: 25px;"><img src="assets/img/iconx0.png" style="height: 20px;margin-left: 10px;margin-right: 10px;"></div>\n' +
        '                    <p style="margin: 0;">反馈问题</p>\n' +
        '                </div>\n' +
        '                <div class="d-flex justify-content-end align-items-center" style="width: 30%;"><a href="#">&gt;</a></div>\n' +
        '            </div>\n' +
        '            <div id="domain" class="d-flex d-sm-flex align-items-center justify-content-sm-center align-items-sm-center input-box line-box" onclick="click_menu(this)">\n' +
        '                <div style="width: 60%;">\n' +
        '                    <div style="float: left;"><img src="assets/img/iconx13.png" style="height: 25px;"><img src="assets/img/iconx0.png" style="height: 20px;margin-left: 10px;margin-right: 10px;"></div>\n' +
        '                    <p style="margin: 0;">访问官网</p>\n' +
        '                </div>\n' +
        '                <div class="d-flex justify-content-end align-items-center" style="width: 40%;"><a href="#">获得手机端 &gt;</a></div>\n' +
        '            </div>\n' +
        '            <div id="change-pwd" class="d-flex d-sm-flex align-items-center justify-content-sm-center align-items-sm-center input-box line-box" onclick="click_menu(this)">\n' +
        '                <div style="width: 70%;">\n' +
        '                    <div style="float: left;"><img src="assets/img/iconx5.png" style="height: 25px;"><img src="assets/img/iconx0.png" style="height: 20px;margin-left: 10px;margin-right: 10px;"></div>\n' +
        '                    <p style="margin: 0;">修改密码</p>\n' +
        '                </div>\n' +
        '                <div class="d-flex justify-content-end align-items-center" style="width: 30%;"><a href="#">&gt;</a></div>\n' +
        '            </div>\n' +
        '            <div id="logout" class="d-flex d-sm-flex align-items-center justify-content-sm-center align-items-sm-center input-box line-box" onclick="click_menu(this)">\n' +
        '                <div style="width: 70%;">\n' +
        '                    <div style="float: left;"><img src="assets/img/iconx2.png" style="height: 25px;"><img src="assets/img/iconx0.png" style="height: 20px;margin-left: 10px;margin-right: 10px;"></div>\n' +
        '                    <p style="margin: 0;">登出账号</p>\n' +
        '                </div>\n' +
        '                <div class="d-flex justify-content-end align-items-center" style="width: 30%;"><a href="#">&gt;</a></div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div id="invite-page" class="login_box" style="top: 15%;height: 90%;display: none">\n' +
        '            <div class="input-box">\n' +
        '                <p style="color: #008BF9;font-size: 20px;">您的专属邀请链接<img src="assets/img/iconx18.png" style="height: 20px;margin-left: 10px;"></p>\n' +
        '            </div>\n' +
        '            <div class="d-sm-flex justify-content-sm-center align-items-sm-center input-box">\n' +
        '                <div class="container" style="padding: 0;">\n' +
        '                    <div class="row">\n' +
        '                        <div class="col-8 col-md-9 col-lg-9 col-xl-9 col-xxl-10">\n' +
        '                            <div class="d-flex d-sm-flex align-items-center align-items-sm-center text-input">\n' +
        '                                <div style="width: 80%;">\n' +
        '                                    <p id="invite-code" style="margin: 0;margin-left: 10px;font-size: 20px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width: 98%;"></p>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="col-4 col-md-3 col-lg-3 col-xl-3 col-xxl-2"><button class="btn btn-primary btn-box btn-yan" type="button" style="font-size: 1.2rem;" onclick="copy_code()">复制</button></div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="input-box"><p id="invite-title"></p></div>\n' +
        '            <div class="d-sm-flex justify-content-sm-center align-items-sm-center input-box" style="margin-top: 20%;">\n' +
        '                <div class="d-flex align-items-center" style="background-color: #DFE9F6;height: 118px;border-radius: 30px;padding: 15px;">\n' +
        '                    <div class="container">\n' +
        '                        <div class="row d-flex align-items-center">\n' +
        '                            <div class="col-6 col-md-6">\n' +
        '                                <div>\n' +
        '                                    <h4 style="color: #334756;text-align: center;">已邀请人数</h4>\n' +
        '                                </div>\n' +
        '                                <div>\n' +
        '                                    <h4 id="invite-count" style="color: #0084F1;text-align: center;"></h4>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <div class="col-6 col-md-6" style="border-left-style: solid;border-left-color: #CDDEF6;">\n' +
        '                                <div>\n' +
        '                                    <h4 style="color: #334756;text-align: center;">已获得返利</h4>\n' +
        '                                </div>\n' +
        '                                <div>\n' +
        '                                    <h4 id="invite-money" style="color: #0084F1;text-align: center;"></h4>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div id="orders-page" class="login_box" style="top: 15%;height: 90%;display: none">\n' +
        '            <div class="d-flex align-items-center input-box line-box">\n' +
        '                <div style="display: inherit;width: 60px;"><img src="assets/img/iconx12.png" style="float: left;margin: auto;width: 30px;"><img src="assets/img/iconx0.png" style="height: 14px;float: left;margin: auto;margin-left: 1px;"></div>\n' +
        '                <div style="display: flex;"><input id="order-contact" type="text" style="width: 300px;font-size: 20px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;border: 2px solid #DEE2E3;border-radius: 8px;outline: none;padding: 5px;" placeholder="请填写联系方式"></div>\n' +
        '            </div>\n' +
        '            <div class="d-flex align-items-center input-box line-box">\n' +
        '                <div style="display: inherit;width: 60px;"><img src="assets/img/iconx12.png" style="float: left;margin: auto;width: 30px;"><img src="assets/img/iconx0.png" style="height: 14px;float: left;margin: auto;margin-left: 1px;"></div>\n' +
        '                <div style="display: flex;"><input id="order-title" type="text" style="width: 300px;font-size: 20px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;border: 2px solid #DEE2E3;border-radius: 8px;outline: none;padding: 5px;" placeholder="请填写工单标题"></div>\n' +
        '            </div>\n' +
        '            <div class="d-flex align-items-center input-box line-box"><textarea id="order-content" style="width: 100%;border: 2px solid #DEE2E3;border-radius: 14px;height: 240px;padding: 20px;outline: none;resize: none;-webkit-app-region: no-drag;" placeholder="请简要描述你要反馈的问题和意见"></textarea></div>\n' +
        '            <div class="d-sm-flex justify-content-sm-center align-items-sm-center input-box" style="margin-top: 20px;"><button class="btn btn-primary btn-box btn-login" type="button" onclick="submitOrder()">提交</button></div>\n' +
        '        </div>\n' +
        '        <div id="pwd-page" class="login_box" style="display: none">\n' +
        '            <div class="d-sm-flex justify-content-sm-center align-items-sm-center input-box">\n' +
        '                <div class="d-flex d-sm-flex align-items-center align-items-sm-center text-input">\n' +
        '                    <div style="display: inherit;width: 60px;"><img src="assets/img/iconx5.png" style="float: left;margin: auto;width: 20px;"><img src="assets/img/iconx0.png" style="height: 14px;float: left;margin: auto;margin-left: 1px;"></div><input id="old-password" type="text" class="input-mini" placeholder="请输入旧密码"">\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="d-sm-flex justify-content-sm-center align-items-sm-center input-box">\n' +
        '                <div class="d-flex d-sm-flex align-items-center align-items-sm-center text-input">\n' +
        '                    <div style="display: inherit;width: 60px;"><img src="assets/img/iconx5.png" style="float: left;margin: auto;width: 20px;"><img src="assets/img/iconx0.png" style="height: 14px;float: left;margin: auto;margin-left: 1px;"></div><input id="password" class="input-mini" placeholder="请输入新密码">\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="d-sm-flex justify-content-sm-center align-items-sm-center input-box">\n' +
        '                <div class="d-flex d-sm-flex align-items-center align-items-sm-center text-input">\n' +
        '                    <div style="display: inherit;width: 60px;"><img src="assets/img/iconx5.png" style="float: left;margin: auto;width: 20px;"><img src="assets/img/iconx0.png" style="height: 14px;float: left;margin: auto;margin-left: 1px;"></div><input id="re-password" class="input-mini" placeholder="请确认新密码">\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="d-sm-flex justify-content-sm-center align-items-sm-center input-box"><button id="change-btn" class="btn btn-primary btn-box btn-login" onclick="change_pwd()">确认修改</button></div>\n' +
        '        </div>\n' +
        '        <div id="shop-page" class="login_box" style="top: 15%;height: 90%;display: none">\n' +
        '            <div class="d-sm-flex justify-content-sm-center align-items-sm-center input-box" style="padding-top: 0;text-align: center;">\n' +
        '                <p style="font-size: 20px;color: #0186fd;">请选择您的 <img src="assets/img/iconx9.png" style="height: 20px;">&nbsp;套餐<img src="assets/img/iconx24.png" style="height: 30px;"></p>\n' +
        '            </div>\n' +
        '            <div class="d-sm-flex justify-content-sm-center align-items-sm-center input-box">\n' +
        '                <div class="container">\n' +
        '                    <div id="plan-row" class="row">\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="d-sm-flex justify-content-sm-center align-items-sm-center input-box" style="padding-top: 0;text-align: center;">\n' +
        '                <p style="font-size: 20px;color: #b7b7b7;">请选择支付方式</p>\n' +
        '                <div class="container">\n' +
        '                    <div class="row">\n' +
        '                        <div class="col-6 col-md-6" style="-webkit-app-region: no-drag;">\n' +
        '                            <div id="alipay" class="alipay" onclick="select_payment(this)"></div>\n' +
        '                        </div>\n' +
        '                        <div class="col-6 col-md-6" style="-webkit-app-region: no-drag;">\n' +
        '                            <div id="epusdt" class="epusdt" onclick="select_payment(this)"></div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="d-sm-flex justify-content-sm-center align-items-sm-center input-box" style="margin-top: 20px;"><button id="buy" class="btn btn-primary btn-box btn-login" type="button" onclick="buy()">支付</button></div>\n' +
        '        </div>';
    document.body.appendChild(menu_div);

    window.indexAPI.getUserInfo().then((result) => {
        user_reg_date = result['info']['user']['reg_date'];
        user_money = result['info']['user']['money'];
        class_level = result['info']['user']['class'];
        document.getElementById('user-mail').innerHTML = '<img src="assets/img/y/icon7.png" style="height: 15px;"><img src="assets/img/y/jiantou.png" style="margin-left: 10px;height: 12px;margin-right: 10px;">' + result['info']['user']['email'];
        document.getElementById('user-wallet').innerHTML = '<img src="assets/img/y/iconx8.png" style="height: 15px;"><img src="assets/img/y/jiantou.png" style="margin-left: 10px;height: 12px;margin-right: 10px;">' + `${result['info']['user']['money']}元`;
        let date = new Date(result['info']['user']['expire_in']);
        document.getElementById('user-expire').innerHTML = '<img src="assets/img/iconx9.png" style="float: left;width: 32px;margin-left: 10px;margin-right: 10px;">' + `到期：${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
        let used_data = Math.round((result['info']['user']['d'] / 1024 / 1024 / 1024) + (result['info']['user']['u'] / 1024 / 1024 / 1024));
        let total_data = Math.round(result['info']['user']['transfer_enable'] / 1024 / 1024 / 1024);
        document.getElementById('user-data').innerText = `${used_data}GB/${total_data}GB`;
        let prog = (used_data / total_data) * 100 < 12 ? 12 : (used_data / total_data) * 100 >= 100 ? 104 : (used_data / total_data) * 100;
        document.getElementById('data-prog').style.width = `${prog}%`;
        document.getElementById('global-mode').checked = global_mode;
        Swal.close();
        if (state) {
            document.getElementById('shop').click();
        }
        window.indexAPI.getInviteInfo().then((res) => {
            document.getElementById('invite-code').innerText = res['inviteInfo']['code']['code'];
            document.getElementById('invite-money').innerText = res['inviteInfo']['paybacks_sum'];
            document.getElementById('invite-count').innerText = res['inviteInfo']['paybacks']['total'];
            document.getElementById('invite-title').innerHTML = `<a style="color: #A7ADB1;">请将上述链接发送给好友，</a>好友购买套餐金额的 ${res['inviteInfo']['code_payback']}% 将返现至您的账户中。`;
        })

    })
}

function back_home() {
    let menu_page = document.getElementById('menu-page');
    menu_page.parentNode.removeChild(menu_page);
    document.getElementById('home').style.display = '';
}

function back_menu() {
    document.getElementById('menu-body').style.display = '';
    document.getElementById('invite-page').style.display = 'none';
    document.getElementById('orders-page').style.display = 'none';
    document.getElementById('pwd-page').style.display = 'none'
    document.getElementById('shop-page').style.display = 'none'
    document.getElementById('back-btn').setAttribute('onclick', 'back_home()');
}

function click_menu(obj) {
    switch (obj.id) {
        case 'invite':
            document.getElementById('menu-body').style.display = 'none';
            document.getElementById('invite-page').style.display = '';
            document.getElementById('back-btn').setAttribute('onclick', 'back_menu()');
            break;
        case 'orders':
            document.getElementById('menu-body').style.display = 'none';
            document.getElementById('orders-page').style.display = '';
            document.getElementById('back-btn').setAttribute('onclick', 'back_menu()');
            break;
        case 'domain':
            window.indexAPI.goUrl('');
            break;
        case 'change-pwd':
            document.getElementById('menu-body').style.display = 'none';
            document.getElementById('pwd-page').style.display = '';
            document.getElementById('back-btn').setAttribute('onclick', 'back_menu()');
            break;
        case 'logout':
            logout();
            break;
        case 'shop':
            document.getElementById('plan-row').innerHTML = '';
            document.getElementById('menu-body').style.display = 'none';
            document.getElementById('shop-page').style.display = '';
            document.getElementById('back-btn').setAttribute('onclick', 'back_menu()');
            shop();
            break;
    }
}

function global_switch() {
    if (global_mode) {
        window.coreAPI.reloadConfig('new').then((res) => {
            if (res === 204) {
                global_mode = false;
            }
        });
    } else {
        window.coreAPI.reloadConfig('global').then((res) => {
            if (res === 204) {
                global_mode = true;
            }
        });
    }
}

function copy_code() {
    let code = `https://ewkuai.com/auth/register?code=${document.getElementById('invite-code').innerText}`;
    navigator.clipboard.writeText(code).then(() => {
    });
    Swal.fire({
        text: '复制成功',
        width: '220px',
        timer: 1000,
        showConfirmButton: false,
        backdrop: `
                    rgba(0,0,0,0.4)
                `
    })
}

function submitOrder() {
    let title = document.getElementById('order-title');
    let content = document.getElementById('order-content');
    let contact = document.getElementById('order-contact');
    if (title.value === '' || content.value === '') {
        Swal.fire({
            text: '请确认填写内容',
            width: '220px',
            timer: 1200,
            showConfirmButton: false,
            backdrop: `
                    rgba(0,0,0,0.4)
                `
        });
        return;
    }
    window.indexAPI.sendOrders(title.value, `${content.value}。  联系方式：${contact.value}`).then((result) => {
        Swal.fire({
            text: result['msg'],
            width: '220px',
            timer: 1500,
            showConfirmButton: false,
            backdrop: `
                    rgba(0,0,0,0.4)
                `
        }).then(() => {
            document.getElementById('back-btn').click();
        });
    });
}

function change_pwd() {
    let old_pwd = document.getElementById('old-password');
    let pwd = document.getElementById('password');
    let re_pwd = document.getElementById('re-password');
    if (pwd.value !== re_pwd.value) {
        re_pwd.value = '';
        re_pwd.placeholder = '两次密码输入不一致';
        re_pwd.className = 'input-mini mint';
        re_pwd.focus();
        return
    }
    loading_frame('请求中...');
    window.indexAPI.changePwd(old_pwd.value, pwd.value, re_pwd.value).then((result) => {
        Swal.fire({
            text: result['msg'],
            width: '220px',
            timer: 1500,
            showConfirmButton: false,
            backdrop: `
                    rgba(0,0,0,0.4)
                `
        }).then(() => {
            if (result['ret'] === 1) {
                window.loginAPI.getAccount().then((result) => {
                    let res = result.split(",");
                    window.loginAPI.saveAccount(res[0], pwd.value);
                    window.loginAPI.logNoOut();
                });
            }
        });
    })
}

function logout() {
    Swal.fire({
        title: '退出登陆',
        text: '确认退出当前账户？',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        backdrop: `
                    rgba(0,0,0,0.4)
                `,
    }).then((result) => {
        if (result.isConfirmed) {
            window.loginAPI.logout();
        }
    });
}

function shop() {
    loading_frame('获取中...');
    window.indexAPI.getStorePlan().then((result) => {
        let index = 0;
        let list = result['arr']['shops'];
        let targetTime = new Date(user_reg_date).getTime();
        let timeDiff = new Date() - targetTime;
        if (timeDiff > 24 * 60 * 60 * 1000) {
            for (let i = list.length - 1; i >= 0; i--) {
                if (list[i]['name'].includes("试用")) {
                    list.splice(i, 1);
                }
            }
        }
        if (class_level > 0) {
            for (let i = list.length - 1; i >= 0; i--) {
                if (list[i]['name'].includes("试用")) {
                    list.splice(i, 1);
                }
            }
        }
        for (let i = 0; i < list.length; i++) {
            if (!list[i]['name'].includes('流量包')) {
                index++;
                let list_div = document.createElement('div');
                list_div.className = 'col-6 col-md-6';
                let list_div_u = document.createElement('div');
                list_div_u.className = 'shop-box';
                list_div_u.setAttribute('onclick', 'select_plan(this)');
                let list_p = document.createElement('p');
                list_p.innerText = `${index}. ${list[i]['name']} ¥${list[i]['price'].split('.')[0]}`;
                list_p.setAttribute('id', 'shop-div')
                list_p.setAttribute('data-id', list[i]['id']);
                list_p.setAttribute('data', list[i]['price']);
                let list_ul = document.createElement('ul');
                list_ul.setAttribute('style', 'color: rgba(0,0,0,0.5);padding-left: 15px;margin-top: 12px;');
                let list_content = JSON.parse(list[i]['content'])['content_extra'].replaceAll('check-', '').split(';');
                for (let x = 0; x < list_content.length; x++) {
                    let li = document.createElement('li');
                    li.innerText = list_content[x];
                    list_ul.appendChild(li);
                }
                list_p.appendChild(list_ul);
                list_div_u.appendChild(list_p);
                list_div.appendChild(list_div_u);
                document.getElementById('plan-row').appendChild(list_div);
            }
        }
        Swal.close()
    })
}

let price;
let shop_id;

function select_plan(obj) {
    let box = document.getElementsByClassName('shop-box');
    for (let i = 0; i < box.length; i++) {
        box[i].className = 'shop-box';
        box[i].getElementsByTagName('ul')[0].style.color = 'rgba(0,0,0,0.5)';
    }
    obj.className = 'shop-box shop-on';
    obj.getElementsByTagName('ul')[0].style.color = 'rgba(255,255,255,0.8)';
    price = obj.getElementsByTagName('p')[0].getAttribute('data');
    shop_id = obj.getElementsByTagName('p')[0].getAttribute('data-id');
}

let type;

function select_payment(obj) {
    type = obj.className
    document.getElementById('alipay').className = 'alipay';
    document.getElementById('epusdt').className = 'epusdt';
    obj.className = `${obj.className}-active`;
}

function buy_wallet(state) {
    window.indexAPI.payWallet(shop_id).then((result) => {
        if (result['ret'] === 1) {
            Swal.fire({
                text: state === 1 ? '使用余额购买成功！' : '购买成功！',
                width: '220px',
                timer: 1800,
                showConfirmButton: false,
                backdrop: `
                    rgba(0,0,0,0.4)
                `
            }).then(() => {
                window.systemAPI.sysProxyOff();
                global_mode = false;
                home_page();
            });
        } else {
            Swal.fire({
                text: `${result['msg']}`,
                width: '220px',
                timer: 1800,
                showConfirmButton: false,
                backdrop: `
                    rgba(0,0,0,0.4)
                `
            });
        }
    });
}

function buy() {
    if (price === null || price === '' || price === undefined) {
        Swal.fire({
            text: '请选择一个套餐',
            width: '220px',
            timer: 1500,
            showConfirmButton: false,
            backdrop: `
                    rgba(0,0,0,0.4)
                `
        })
        return;
    }
    if (type === null || type === '' || type === undefined) {
        Swal.fire({
            text: '请选择支付方式',
            width: '220px',
            timer: 1500,
            showConfirmButton: false,
            backdrop: `
                    rgba(0,0,0,0.4)
                `
        });
        return;
    }
    loading_frame('请求中...');
    let res = price - user_money;
    if (res <= 0) {
        buy_wallet(1);
    } else {
        window.indexAPI.payPurchase(res, type).then((result) => {
            if (result['ret'] === 1) {
                if (result['type'] === 'url') {
                    const open_url = window.open(result['url'], '_blank', 'width=650,height=850,menubar=no,toolbar=no,status=no,scrollbars=no');
                    const timer = setInterval(function () {
                        if (open_url.closed) {
                            clearInterval(timer);
                            window.indexAPI.MoneyInfo().then((r) => {
                                if (r['money'] !== user_money) {
                                    buy_wallet(0);
                                } else {
                                    Swal.fire({
                                        text: '取消购买',
                                        width: '220px',
                                        timer: 1500,
                                        showConfirmButton: false,
                                        backdrop: `
                                            rgba(0,0,0,0.4)
                                            `
                                    });
                                }
                            });
                        }
                    }, 1000);
                } else {
                    Swal.fire({
                        text: '支付时发生错误！',
                        width: '220px',
                        timer: 1500,
                        showConfirmButton: false,
                        backdrop: `
                            rgba(0,0,0,0.4)
                        `
                    });
                }
            } else {
                Swal.fire({
                    text: result['msg'],
                    width: '220px',
                    timer: 1500,
                    showConfirmButton: false,
                    backdrop: `
                    rgba(0,0,0,0.4)
                `
                });
            }
        })
    }
}