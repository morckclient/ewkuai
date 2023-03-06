const {app, BrowserWindow, Menu, globalShortcut, Tray, ipcMain, net, session, nativeImage} = require('electron')
const {exists, mkdir, writeFile, readdir, cp, readFileSync, writeFileSync, unlink, createWriteStream} = require('fs');
const os = require('os');
const path = require('path');
const yaml = require('js-yaml');
const {exec, execFile} = require('child_process');
const https = require("https");

app.on('ready', () => {
    session.defaultSession.setProxy({proxyRules: 'direct://'})
})  // 让Electron直连所有地址,不使用系统代理

const prompt_options = {
    name: 'Ewkuai',
    icns: path.join(__dirname, 'config/ewkuai.icns'),
}

const sys_path = os.homedir()
let home_dir
if (process.platform === 'darwin') {
    home_dir = path.join(sys_path, 'Morck')
} else {
    home_dir = path.join(sys_path, 'AppData\\Local\\Morck')
}
const vertif = path.join(home_dir, 'vertif')
const auth = path.join(home_dir, 'auth')
const token = path.join(home_dir, 'token')
const setting = path.join(home_dir, 'setting')
const clash_config = path.join(home_dir, 'config.yaml')
const new_config = path.join(home_dir, 'new_config.yaml')
const service_config = path.join(home_dir, 'service.xml')
const service_run = path.join(home_dir, 'service.exe')
const wintun = path.join(home_dir, 'wintun.dll')
const clash_core_win = path.join(home_dir, 'clash-core.exe')
const clash_core_mac = path.join(home_dir, 'clash-core')
const service_log = path.join(home_dir, 'service.wrapper.log')
const mmdb = path.join(home_dir, 'Country.mmdb')

const i18n = path.join(__dirname, 'config/i18n')
const flag = path.join(__dirname, 'assets/img/flag')
const service_core = path.join(__dirname, '/bin/clash-core.exe')
const service_core_mac = path.join(__dirname, '/bin/clash-core')
const sysproxy = path.join(__dirname, '/bin/sysproxy.exe')
const mac_proxy = path.join(__dirname, '/bin/system_proxy')
const service_bin_exe = path.join(__dirname, '/bin/service.exe')
const service_bin_xml = path.join(__dirname, '/bin/service.xml')
const bin_wintun = path.join(__dirname, '/bin/wintun.dll')
const bin_clash_config = path.join(__dirname, '/bin/config.yaml')
const bin_mmdb = path.join(__dirname, '/bin/Country.mmdb')

function mk_home_dir(home_dir) {
    exists(home_dir, function (exists) {
        if (!exists) {
            mkdir(home_dir, () => {
            });
            copy_service()
        }
    });
}

function read_file(path) {
    return new Promise(function (resolve, reject) {
        try {
            let res = readFileSync(path, 'utf8')
            resolve(res)
        } catch (e) {
        }
    })
}

function read_dir(dir) {
    return new Promise(function (resolve, reject) {
        readdir(dir, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

function mk_setting_file(path) {
    const w_s = {
        'lang': "zh-cn",
        'http': 25530,
        'socks': 25531,
        'mixed': 25532,
        'wlan': false,
        'ipv6': false,
        'boot': false,
    }
    exists(path, function (exists) {
        if (exists) {
        } else {
            writeFile(path, JSON.stringify(w_s), () => {
            })
        }
    });
}

function copy_service() {
    exists(home_dir, function (exists) {
        if (exists) {
            cp(bin_clash_config, clash_config, () => {
            });
            cp(bin_mmdb, mmdb, () => {
            });
            if (process.platform === 'darwin') {
                cp(service_core_mac, clash_core_mac, () => {
                });
                let cmd = `chmod 777 ${clash_core_mac}`
                prompt.exec(cmd, prompt_options, () => {
                });
            } else {
                cp(service_core, clash_core_win, () => {
                });
                cp(service_bin_exe, service_run, () => {
                });
                cp(service_bin_xml, service_config, () => {
                });
                cp(bin_wintun, wintun, () => {
                });
            }
        }
    })
}

mk_home_dir(home_dir)
mk_setting_file(setting)
unlink(service_log, () => {
})

function sys_proxy(status, port) {
    const enable_proxy_cmd = `sudo networksetup -setwebproxy "USB 10/100/1000 LAN" 127.0.0.1 ${port};
    sudo networksetup -setsecurewebproxy "USB 10/100/1000 LAN" 127.0.0.1 ${port};
    sudo networksetup -setsocksfirewallproxy "USB 10/100/1000 LAN" 127.0.0.1 ${port};
    sudo networksetup -setproxybypassdomains "USB 10/100/1000 LAN" *.local、169.254/16、10.24;
    sudo networksetup -setwebproxy "Wi-Fi" 127.0.0.1 ${port};
    sudo networksetup -setsecurewebproxy "Wi-Fi" 127.0.0.1 ${port};
    sudo networksetup -setsocksfirewallproxy "Wi-Fi" 127.0.0.1 ${port};
    sudo networksetup -setproxybypassdomains "Wi-Fi" *.local、169.254/16、10.24;
    sudo networksetup -setwebproxy "Bluetooth PAN" 127.0.0.1 ${port};
    sudo networksetup -setsecurewebproxy "Bluetooth PAN" 127.0.0.1 ${port};
    sudo networksetup -setsocksfirewallproxy "Bluetooth PAN" 127.0.0.1 ${port};
    sudo networksetup -setproxybypassdomains "Bluetooth PAN" *.local、169.254/16、10.24;
    sudo networksetup -setwebproxy "Thunderbolt Bridge" 127.0.0.1 ${port};
    sudo networksetup -setsecurewebproxy "Thunderbolt Bridge" 127.0.0.1 ${port};
    sudo networksetup -setsocksfirewallproxy "Thunderbolt Bridge" 127.0.0.1 ${port};
    sudo networksetup -setproxybypassdomains "Thunderbolt Bridge" *.local、169.254/16、10.24
    `;

    const enable_proxy_cmd_1 = `networksetup -setwebproxy "USB 10/100/1000 LAN" 127.0.0.1 ${port};
    networksetup -setsecurewebproxy "USB 10/100/1000 LAN" 127.0.0.1 ${port};
    networksetup -setsocksfirewallproxy "USB 10/100/1000 LAN" 127.0.0.1 ${port};
    networksetup -setproxybypassdomains "USB 10/100/1000 LAN" *.local、169.254/16、10.24;
    networksetup -setwebproxy "Wi-Fi" 127.0.0.1 ${port};
    networksetup -setsecurewebproxy "Wi-Fi" 127.0.0.1 ${port};
    networksetup -setsocksfirewallproxy "Wi-Fi" 127.0.0.1 ${port};
    networksetup -setproxybypassdomains "Wi-Fi" *.local、169.254/16、10.24;
    networksetup -setwebproxy "Bluetooth PAN" 127.0.0.1 ${port};
    networksetup -setsecurewebproxy "Bluetooth PAN" 127.0.0.1 ${port};
    networksetup -setsocksfirewallproxy "Bluetooth PAN" 127.0.0.1 ${port};
    networksetup -setproxybypassdomains "Bluetooth PAN" *.local、169.254/16、10.24;
    networksetup -setwebproxy "Thunderbolt Bridge" 127.0.0.1 ${port};
    networksetup -setsecurewebproxy "Thunderbolt Bridge" 127.0.0.1 ${port};
    networksetup -setsocksfirewallproxy "Thunderbolt Bridge" 127.0.0.1 ${port};
    networksetup -setproxybypassdomains "Thunderbolt Bridge" *.local、169.254/16、10.24
    `;


    const disable_proxy_cmd = `sudo networksetup -setwebproxystate "USB 10/100/1000 LAN" off;
    sudo networksetup -setsecurewebproxystate "USB 10/100/1000 LAN" off;
    sudo networksetup -setsocksfirewallproxystate "USB 10/100/1000 LAN" off;
    sudo networksetup -setwebproxystate "Wi-Fi" off;
    sudo networksetup -setsecurewebproxystate "Wi-Fi" off;
    sudo networksetup -setsocksfirewallproxystate "Wi-Fi" off;
    sudo networksetup -setwebproxystate "Bluetooth PAN" off;
    sudo networksetup -setsecurewebproxystate "Bluetooth PAN" off;
    sudo networksetup -setsocksfirewallproxystate "Bluetooth PAN" off;
    sudo networksetup -setwebproxystate "Thunderbolt Bridge" off;
    sudo networksetup -setsecurewebproxystate "Thunderbolt Bridge" off;
    sudo networksetup -setsocksfirewallproxystate "Thunderbolt Bridge" off
    `;

    const disable_proxy_cmd_1 = `networksetup -setwebproxystate "USB 10/100/1000 LAN" off;
    networksetup -setsecurewebproxystate "USB 10/100/1000 LAN" off;
    networksetup -setsocksfirewallproxystate "USB 10/100/1000 LAN" off;
    networksetup -setwebproxystate "Wi-Fi" off;
    networksetup -setsecurewebproxystate "Wi-Fi" off;
    networksetup -setsocksfirewallproxystate "Wi-Fi" off;
    networksetup -setwebproxystate "Bluetooth PAN" off;
    networksetup -setsecurewebproxystate "Bluetooth PAN" off;
    networksetup -setsocksfirewallproxystate "Bluetooth PAN" off;
    networksetup -setwebproxystate "Thunderbolt Bridge" off;
    networksetup -setsecurewebproxystate "Thunderbolt Bridge" off;
    networksetup -setsocksfirewallproxystate "Thunderbolt Bridge" off
    `;

    if (status) {
        exec(enable_proxy_cmd_1, () => {
        });
        exec(enable_proxy_cmd, () => {
        });
    } else {
        exec(disable_proxy_cmd_1, () => {
        });
        exec(disable_proxy_cmd, () => {
        });
    }
}

function createWindow(windowTitle, iconPath) {
    // Hide window top menu
    Menu.setApplicationMenu(null);
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 900,
        frame: false, // 隐藏标题栏
        transparent: true,  //背景透明
        backgroundColor: '#00000000',
        resizable: false,   //不允许用户改变窗口大小
        icon: iconPath,
        titleBarStyle: 'hidden',
        webPreferences: {
            devTools: true,
            backgroundThrottling: true,   //设置应用在后台正常运行
            nodeIntegration: true,     //设置能在页面使用nodejs的API
            preload: path.join(__dirname, 'preload.js'),
        }
    })

    // and load the index.html of the app.
    mainWindow.loadFile('index.html');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    let image;
    if (process.platform === 'darwin') {
        image = nativeImage.createFromPath(path.join(__dirname, 'config/ewkuaiTemplate@2x.png'));
        image.setTemplateImage(true);
        app.dock.hide();
        mainWindow.setWindowButtonVisibility(false);
    } else {
        image = iconPath;
    }
    let tray = new Tray(image);
    tray.setToolTip(windowTitle);

    if (process.platform === 'darwin') {
        tray.on('click', () => {       //点击图标的响应事件，这里是切换主窗口的显示和隐藏
            mainWindow.show()
        })
    } else {
        tray.on('double-click', () => {       //点击图标的响应事件，这里是切换主窗口的显示和隐藏
            mainWindow.show()
        })
    }

    tray.on('right-click', () => {    //右键点击图标时，出现的菜单，通过Menu.buildFromTemplate定制。
        const menuConfig = Menu.buildFromTemplate([
            {
                label: '显示主界面',
                click: () => {
                    mainWindow.show();
                }
            }, {
                label: '退出',
                click: () => {
                    exit_all();
                    app.quit();
                }
            }
        ])
        tray.popUpContextMenu(menuConfig)
    })

    ipcMain.on('mainWindow:close', () => {
        mainWindow.hide()
    })

    ipcMain.on('mainWindow:mini', () => {
        mainWindow.minimize()
    })

    ipcMain.on('mainWindow:exit', () => {
        app.quit()
    })

    ipcMain.on('mainWindow:change', (event, args) => {
        mainWindow.setSize(args[0], args[1])
    })

    ipcMain.handle('mainWindow:getOpenSystem', (event) => {
        return app.getLoginItemSettings().openAtLogin
    })

    ipcMain.on('mainWindow:openSystem', (event, status) => {
        if (!app.isPackaged) {
            app.setLoginItemSettings({
                openAtLogin: status,
                path: process.execPath
            })
        } else {
            app.setLoginItemSettings({
                openAtLogin: status
            })
        }
    })

    ipcMain.on('login:logout', () => {
        unlink(vertif, () => {
        })
        exit_all()
        mainWindow.reload()
    })

    process.on('exit', function () {
        exit_all()
    });
}

function req_post(url, postData, conn_type, callback) {
    let request = net.request({
        url: url,
        method: 'POST',
        headers: {
            'Content-Type': conn_type,
        },
        proxy: null
    });

    request.on('response', (response) => {
        response.on('data', (data) => {
            let ret = JSON.parse(data.toString());
            ret['cookie'] = response.headers['set-cookie'];
            ret['status_code'] = response.statusCode;
            callback(ret);
        })
    })

    request.on('error', (e) => {
    });

    request.write(postData);

    request.end();
}

function req_post_auth(url, auth, callback) {
    let request = net.request({
        url: url,
        method: 'POST',
        headers: {
            'cookie': auth
        },
        proxy: null
    });

    //request.write(data)

    request.on('response', (response) => {
        response.on('data', (data) => {
            let ret = JSON.parse(data.toString())
            ret['status_code'] = response.statusCode
            callback(ret)
        })
    })

    request.on('error', (e) => {

    });

    request.end()
}

function req_get(url, header_data, conn_type, callback) {
    header_data['Content-Type'] = conn_type
    let request = net.request({
        url: url,
        method: 'GET',
        headers: header_data,
        proxy: null
    });

    request.on('response', (response) => {
        response.on('data', (data) => {
            try {
                let ret = JSON.parse(data.toString())
                ret['status_code'] = response.statusCode
                callback(ret)
            } catch (e) {
                //req_get(url, header_data, conn_type, callback)
            }
        })
    })

    request.on('error', (e) => {

    });

    request.end()
}

function req_get_content(url) {
    return new Promise((resolve) => {
        let request = net.request({
            url: url,
            method: 'GET',
            proxy: null
        });
        let data = "";
        request.on('response', (response) => {
            response.on('data', (chunk) => {
                data += chunk;
                response.on('end', () => {
                    resolve(data)
                })
            })
        })

        request.on('error', (e) => {

        });

        request.end()
    })
}

function core_get(url, callback) {
    let request = net.request({
        url: url,
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    });

    request.on('response', (response) => {
        response.on('data', (data) => {
            try {
                let ret = JSON.parse(data.toString())
                ret['status_code'] = response.statusCode
                callback(ret)
            } catch (e) {
                callback(data.toString())
            }
        })
    })

    request.on('error', (e) => {

    });

    request.end()
}

function core_delete(callback) {
    let request = net.request({
        url: 'http://127.0.0.1:9090/connections',
        method: 'DELETE',
    });

    request.on('response', (response) => {
        callback(response.statusCode)
    })

    request.on('error', (e) => {

    });

    request.end()
}

function read_yaml(path) {
    let fileContents = readFileSync(path, 'utf8');
    return yaml.load(fileContents, {'json': true})
}

function write_yaml(path, contents) {
    let yamlStr = yaml.dump(contents);
    writeFileSync(path, yamlStr, 'utf8');
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    const iconPath = path.join(__dirname, './config/ewkuai.png')
    const windowTitle = 'Ewkuai';
    const domainUrl = 'https://ewkuai.com'
    const version = 'v1.0.0'
    createWindow(windowTitle, iconPath)

    exit_all()

    let core_path = path.join(home_dir, 'clash-core')
    execFile(core_path, ['-d', home_dir], () => {
    })

    app.on('activate', function () {
        // On macOS, it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    ipcMain.on('system:sysProxyOn', (event, args) => {
        if (process.platform === 'darwin') {
            sys_proxy(true, args);
        } else {
            let sysproxy_cmd = sysproxy + ' global 127.0.0.1:' + args + ' localhost;127.*;10.*;172.16.*;172.17.*;172.18.*;172.19.*;172.20.*;172.21.*;172.22.*;172.23.*;172.24.*;172.25.*;172.26.*;172.27.*;172.28.*;172.29.*;172.30.*;172.31.*;192.168.*'
            exec(sysproxy_cmd, () => {
            });
        }
    })

    ipcMain.on('system:sysProxyOff', (event) => {
        if (process.platform === 'darwin') {
            sys_proxy(false)
        } else {
            exec(sysproxy + ' off', () => {
            });
        }
    })

    ipcMain.handle('system:lanIP', (event) => {
        let IPAddress = '';
        const interfaces = os.networkInterfaces();
        for (const devName in interfaces) {
            const i_face = interfaces[devName];
            for (let i = 0; i < i_face.length; i++) {
                const alias = i_face[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1') {
                    if (alias.cidr.split('/')[1] === '24') {
                        IPAddress = alias.address;
                        return IPAddress
                    }
                }
            }
        }
        return IPAddress;
    })

    ipcMain.on('config:getMainUrl', (event) => {
        exec('start ' + domainUrl)
    })

    ipcMain.on('config:openUrl', (event, args) => {
        exec('start ' + args)
    })

    ipcMain.handle('config:getLang', (event) => {
        return read_dir(i18n)
    })

    ipcMain.handle('config:getTranslator', (event, args) => {
        let p = path.join(i18n, args)
        return read_file(p)
    })

    ipcMain.handle('config:getSetting', (event) => {
        return read_file(setting)
    })

    ipcMain.handle('config:modifySetting', (event, args) => {
        let key = args[0]
        let value = args[1]
        read_file(setting).then((result) => {
            let res = JSON.parse(result)
            res[key] = value
            writeFile(setting, JSON.stringify(res), () => {
            })
        })
    })

    ipcMain.handle('config:getFlagName', (event) => {
        return read_dir(flag)
    })

    ipcMain.handle('login:getAccount', (event) => {
        return read_file(vertif)
    })

    ipcMain.on('login:saveAccount', (event, args) => {
        writeFile(vertif, args[0] + ',' + args[1], err => {
        })
    })

    ipcMain.handle('login:doLogin', (event, args) => {
        const postData = JSON.stringify({
            'email': args[0],
            'passwd': args[1],
        })
        return new Promise((resolve, reject) => {
            req_post(domainUrl + '/auth/login', postData, 'application/json', (result) => {
                let cookie = '';
                if (result['ret'] !== 0) {
                    let cookies = result['cookie'];
                    for (let item of cookies) {
                        cookie += item.split(';')[0] + ';';
                    }
                    writeFileSync(auth, cookie, 'utf-8');
                }
                resolve(result);
            })
        })
    })

    ipcMain.handle('login:quickLogin', () => {
        let acc = readFileSync(vertif, 'utf-8')
        let res = acc.split(",");
        const postData = JSON.stringify({
            'email': res[0],
            'password': res[1],
        })
        return new Promise((resolve, reject) => {
            req_post(domainUrl + '/api/v1/passport/auth/login', postData, 'application/json', (result) => {
                if (result['status_code'] === 200) {
                    writeFileSync(auth, result['data']['auth_data'], 'utf-8')
                    writeFileSync(token, result['data']['token'], 'utf-8')
                    resolve(null)
                } else if (result['status_code'] === 422) {
                    let item = ''
                    for (let key in result['errors']) {
                        item += ' ' + result['errors'][key];
                    }
                    resolve(item)
                } else {
                    resolve(result['message'])
                }
            })
        })
    })

    ipcMain.handle('login:hasVertif', () => {
        return new Promise((resolve, reject) => {
            exists(vertif, function (exists) {
                resolve(exists)
            });
        })
    })

    ipcMain.handle('login:sendVerify', (event, args) => {
        const postData = JSON.stringify({
            'email': args,
        })
        return new Promise((resolve, reject) => {
            req_post(domainUrl + '/auth/send', postData, 'application/json', (result) => {
                resolve(result)
            })
        })
    })

    ipcMain.handle('login:register', (event, args) => {
        //let postData = 'email=' + args[0] + '&name=' + args[1] + '&passwd=' + args[2] + '&repasswd=' + args[3] + '&code=0&emailcode=' + args[4];
        let postData = JSON.stringify({
            'email': args[0],
            'name': args[1],
            'passwd': args[2],
            'repasswd': args[3],
            'code': '0',
            'emailcode': args[4]
        });
        return new Promise((resolve, reject) => {
            let url = domainUrl + '/auth/register'
            req_post(url, postData, 'application/json', (result) => {
                resolve(result)
            })
        })
    })

    ipcMain.handle('login:resetPassword', (event, args) => {
        const postData = 'email=' + args[0] + '&password=' + args[1] + '&email_code=' + args[2]
        return new Promise((resolve, reject) => {
            req_post(domainUrl + '/api/v1/passport/auth/forget', postData, 'application/x-www-form-urlencoded', (result) => {
                if (result['status_code'] === 200) {
                    resolve(null)
                } else if (result['status_code'] === 422) {
                    let item = ''
                    for (let key in result['errors']) {
                        item += ' ' + result['errors'][key];
                    }
                    resolve(item)
                } else {
                    resolve(result['message'])
                }
            })
        })
    })

    ipcMain.on('index:set-title', (event) => {
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win.setTitle(windowTitle)
    })

    ipcMain.on('index:goUrl', (event, args) => {
        exec('start ' + domainUrl + args)
    })

    ipcMain.handle('index:getDomain', (event) => {
        return new Promise((resolve, reject) => {
            resolve(domainUrl)
        })
    })

    ipcMain.handle('index:getPanelConfig', (event) => {
        return new Promise((resolve, reject) => {
            read_file(auth).then((result) => {
                req_get(domainUrl + '/api/v1/okanc/getConfig', {'authorization': result}, 'application/json', (result) => {
                    resolve(result)
                })
            });
        })
    })

    ipcMain.handle('index:getUserInfo', (event) => {
        return new Promise((resolve, reject) => {
            read_file(auth).then((result) => {
                req_get(domainUrl + '/getuserinfo', {'cookie': result}, 'application/json', (result) => {
                    resolve(result)
                })
            });
        })
    })

    ipcMain.handle('index:getSubscribe', (event) => {
        return new Promise((resolve, reject) => {
            read_file(auth).then((result) => {
                req_get(domainUrl + '/api/v1/user/getSubscribe', {'authorization': result}, 'application/json', (result) => {
                    if (result['status_code'] === 200) {
                        resolve(result)
                    } else {
                        resolve('获取用户订阅信息失败！')
                    }
                })
            });
        })
    })

    ipcMain.handle('index:getNotice', (event) => {
        return new Promise((resolve, reject) => {
            read_file(auth).then((result) => {
                req_get(domainUrl + '/api/v1/user/notice/fetch', {'authorization': result}, 'application/json', (result) => {
                    if (result['status_code'] === 200) {
                        resolve(result)
                    } else {
                        resolve('获取公告信息失败！')
                    }
                })
            });
        })
    })

    ipcMain.handle('index:getClashYaml', (event, args) => {
        return new Promise((resolve, reject) => {
            let sub_url = domainUrl + '/link/' + args + '?clash=2'
            req_get_content(sub_url).then((data) => {
                let y2j = yaml.load(data)
                let server_name = [];
                for (let i = 0; i < y2j['proxies'].length; i++) {
                    server_name.push(y2j['proxies'][i]['name']);
                }
                y2j['proxy-groups'][0]['proxies'].unshift('自动选择');
                y2j['proxy-groups'].unshift({
                    'name': '自动选择',
                    'type': 'url-test',
                    'proxies': server_name,
                    'url': 'http://www.gstatic.com/generate_204',
                    'interval': 86400
                });
                y2j['log-level'] = 'silent'
                y2j['profile'] = {'store-selected': true}
                y2j['auto-redir'] = {'enable': true, 'auto-route': true}
                y2j['dns'] = {
                    'enable': true,
                    'default-nameserver': ['223.5.5.5', '8.8.8.8', '119.29.29.29', '114.114.114.114'],
                    'enhanced-mode': 'fake-ip',
                    'fake-ip-range': '198.18.0.1/16',
                    'listen': '0.0.0.0:53',
                    'use-hosts': true,
                    'nameserver': ['https://dns.alidns.com/dns-query', 'https://dns.rubyfish.cn/dns-query', 'https://223.5.5.5/dns-query', 'tls://101.101.101.101:853', 'https://dns.pub/dns-query', 'https://dns.114514.al:2096/dns-query'],
                    'fallback': ['https://doh.dns.sb/dns-query', 'tcp://208.67.222.222:443', 'tls://dns.google', 'tls://8.8.8.8:853', 'tls://dns.rubyfish.cn:853', 'tls://dns.114514.al:853', 'https://1.0.0.1/dns-query', 'https://public.dns.iij.jp/dns-query', 'https://dns.twnic.tw/dns-query'],
                    'fake-ip-filter': ['www.msftncsi.com', 'msftconnecttest.com', 'www.msftconnecttest.com', 'stun.*.*', 'stun.*.*.*', '+.stun.*.*', '+.stun.*.*.*', '+.stun.*.*.*.*'],
                    'fallback-filter': {
                        'geoip': true,
                        'geoip-code': 'CN',
                        'ipcidr': ['240.0.0.0/4'],
                        'domain': ['+.google.com', '+.facebook.com', '+.youtube.com']
                    }
                }
                y2j['tun'] = {
                    'enable': true,
                    'stack': 'system',
                    'dns-hijack': ['198.18.0.2:53'],
                    'ebpf': {
                        'redirect-to-tun': ['eth0']
                    },
                    'auto-route': true,
                    'auto-detect-interface': true
                }
                // writeFileSync(new_config, y2j)
                write_yaml(new_config, y2j)
                resolve('ok')
            })
        })
    })

    ipcMain.handle('index:getInvitor', (event) => {
        return new Promise((resolve, reject) => {
            read_file(auth).then((result) => {
                req_get(domainUrl + '/api/v1/user/invite/fetch', {'authorization': result}, 'application/json', (result) => {
                    if (result['status_code'] === 200) {
                        resolve(result)
                    } else {
                        resolve('获取用户邀请管理失败！')
                    }
                })
            });
        })
    })

    ipcMain.handle('index:getClientVersion', (event) => {
        return new Promise((resolve, reject) => {
            resolve(version)
        })
    })

    ipcMain.handle('index:getStorePlan', (event) => {
        return new Promise((resolve, reject) => {
            read_file(auth).then((result) => {
                req_get(domainUrl + '/api/v1/user/plan/fetch', {'authorization': result}, 'application/json', (result) => {
                    if (result['status_code'] === 200) {
                        resolve(result)
                    } else {
                        resolve('获取商店套餐失败！')
                    }
                })
            });
        })
    })

    ipcMain.handle('index:getStorePlanForID', (event, args) => {
        return new Promise((resolve, reject) => {
            read_file(auth).then((result) => {
                req_get(domainUrl + '/api/v1/user/plan/fetch?id=' + args, {'authorization': result}, 'application/json', (result) => {
                    if (result['status_code'] === 200) {
                        resolve(result)
                    } else {
                        resolve('获取商店套餐失败！')
                    }
                })
            });
        })
    })

    ipcMain.handle('index:getPaymentMethod', () => {
        return new Promise((resolve, reject) => {
            read_file(auth).then((result) => {
                req_get(domainUrl + '/api/v1/user/order/getPaymentMethod', {'authorization': result}, 'application/json', (result) => {
                    if (result['status_code'] === 200) {
                        resolve(result)
                    } else {
                        resolve('获取支付方式失败！')
                    }
                })
            });
        })
    })

    ipcMain.handle('index:checkCoupons', (event, args) => {
        return new Promise((resolve, reject) => {
            read_file(auth).then((result) => {
                req_post_auth(domainUrl + '/api/v1/user/coupon/check' + '?code=' + args[0] + '&plan_id=' + args[1], result, (res) => {
                    resolve(res)
                })
            })
        })
    })

    ipcMain.on('core:start', () => {
        if (process.platform === 'darwin') {
            execFile(clash_core_mac, ['-d', home_dir], () => {
            })
        } else {
            execFile(clash_core_win, ['-d', home_dir], () => {
            })
        }
    })

    ipcMain.on('core:stop', () => {
        if (process.platform === 'darwin') {
            exec('killall -m clash-core', () => {
            });
        } else {
            exec('taskkill /f /im clash-core.exe', () => {
            });
        }
    })

    ipcMain.handle('core:getServer', (event) => {
        return new Promise((resolve, reject) => {
            core_get('http://127.0.0.1:9090/proxies', (result) => {
                resolve(result)
            })
        })
    })

    ipcMain.handle('core:getDelay', (event, args) => {
        return new Promise((resolve, reject) => {
            let url = 'http://127.0.0.1:9090/proxies/' + args + '/delay?timeout=2500&url=https://www.google.com'
            core_get(url, (result) => {
                if (result['status_code'] === 200) {
                    resolve(result)
                } else {
                    resolve(result)
                }
            })
        })
    })

    ipcMain.handle('core:getConfig', () => {
        return new Promise(async (resolve, reject) => {
            let url = 'http://127.0.0.1:9090/configs'
            await core_get(url, (result) => {
                if (result['status_code'] === 200) {
                    resolve(result)
                } else {
                    resolve(result)
                }
            })
        })
    })

    ipcMain.handle('core:reloadConfig', (event, args) => {
        return new Promise((resolve, reject) => {
            core_delete(() => {
            });
            let url = 'http://127.0.0.1:9090/configs'
            let data = {'path': args === 'default' ? clash_config : new_config}
            let request = net.request({
                url: url,
                method: 'PUT',
            });

            request.on('response', (response) => {
                resolve(response.statusCode)
            });

            request.on('error', () => {

            });

            request.write(JSON.stringify(data))

            request.end()

        });
    })

    ipcMain.handle('core:selectServer', (event, args) => {
        return new Promise((resolve, reject) => {
            core_delete(() => {
            });
            let url = 'http://127.0.0.1:9090/proxies/' + args[0]
            let data = {'name': args[1]}
            let request = net.request({
                url: url,
                method: 'PUT',
            });

            request.write(JSON.stringify(data))

            request.on('response', (response) => {
                resolve(response.statusCode)
            });

            request.on('error', (e) => {

            });

            request.end()

        });
    })

    ipcMain.handle('core:getCurrentServer', (event, args) => {
        return new Promise((resolve, reject) => {
            let url = 'http://127.0.0.1:9090/proxies/' + args
            core_get(url, (result) => {
                resolve(result['now']);
            })
        })
    })

    ipcMain.handle('core:getProviders', () => {
        return new Promise((resolve, reject) => {
            let url = 'http://127.0.0.1:9090/providers/proxies'
            core_get(url, (result) => {
                resolve(result);
            })
        })
    })

    ipcMain.handle('core:modifyConfig', (event, args) => {
        return new Promise((resolve, reject) => {
            let url = 'http://127.0.0.1:9090/configs'
            let request = net.request({
                url: url,
                method: 'PATCH',
            });

            request.write(JSON.stringify(args))

            request.on('response', (response) => {
                resolve(response.statusCode)
            });

            request.on('error', (e) => {

            });

            request.end()

        });
    })

    ipcMain.on('service:Install', (event) => {
        exec(service_run + ' install')
    })

    ipcMain.on('service:Uninstall', (event) => {
        exec(service_run + ' uninstall')
    })

    ipcMain.on('service:Start', (event) => {
        exec(service_run + ' start')
    })

    ipcMain.on('service:Stop', (event) => {
        exec(service_run + ' stop')
    })

    ipcMain.handle('service:reloadConfig', () => {
        return new Promise((resolve, reject) => {
            core_delete(() => {
            });
            let url = 'http://127.0.0.1:9090/configs'
            let data = {'path': service_config}
            let request = net.request({
                url: url,
                method: 'PUT',
            });

            request.write(JSON.stringify(data))

            request.end();

            request.on('response', (response) => {
                resolve(response.statusCode)
            });

        });
    })

    ipcMain.handle('yaml:readYaml', () => {
        return new Promise((resolve, reject) => {
            resolve(read_yaml(new_config))
        })
    })

    ipcMain.on('yaml:tunYaml', () => {
        let data = read_yaml(new_config)
        data['log-level'] = 'silent'
        data['profile'] = {'store-selected': true}
        data['auto-redir'] = {'enable': true, 'auto-route': true}
        data['dns'] = {
            'enable': true,
            'default-nameserver': ['223.5.5.5', '8.8.8.8', '119.29.29.29', '114.114.114.114'],
            'enhanced-mode': 'fake-ip',
            'fake-ip-range': '198.18.0.1/16',
            'listen': '0.0.0.0:53',
            'use-hosts': true,
            'nameserver': ['https://dns.alidns.com/dns-query', 'https://dns.rubyfish.cn/dns-query', 'https://223.5.5.5/dns-query', 'tls://101.101.101.101:853', 'https://dns.pub/dns-query', 'https://dns.114514.al:2096/dns-query'],
            'fallback': ['https://doh.dns.sb/dns-query', 'tcp://208.67.222.222:443', 'tls://dns.google', 'tls://8.8.8.8:853', 'tls://dns.rubyfish.cn:853', 'tls://dns.114514.al:853', 'https://1.0.0.1/dns-query', 'https://public.dns.iij.jp/dns-query', 'https://dns.twnic.tw/dns-query'],
            'fake-ip-filter': ['www.msftncsi.com', 'msftconnecttest.com', 'www.msftconnecttest.com', 'stun.*.*', 'stun.*.*.*', '+.stun.*.*', '+.stun.*.*.*', '+.stun.*.*.*.*'],
            'fallback-filter': {
                'geoip': true,
                'geoip-code': 'CN',
                'ipcidr': ['240.0.0.0/4'],
                'domain': ['+.google.com', '+.facebook.com', '+.youtube.com']
            }
        }
        data['tun'] = {
            'enable': true,
            'stack': 'system',
            'dns-hijack': ['198.18.0.2:53'],
            'ebpf': {
                'redirect-to-tun': ['eth0']
            },
            'auto-route': true,
            'auto-detect-interface': true
        }
        write_yaml(new_config, data)
    })

    ipcMain.handle('panel:generateInviteCode', () => {
        return new Promise((resolve, reject) => {
            read_file(auth).then((result) => {
                req_get(domainUrl + '/api/v1/user/invite/save', {'authorization': result}, 'application/json', (result) => {
                    resolve(result)
                })
            });
        })
    })

    ipcMain.handle('panel:userCheckIn', () => {
        return new Promise((resolve, reject) => {
            read_file(auth).then((result) => {
                req_post_auth(domainUrl + '/api/v1/okanc/checkIn', result, (result) => {
                    resolve(result)
                })
            });
        })
    })

    ipcMain.handle('panel:saveOrder', (event, args) => {
        return new Promise((resolve, reject) => {
            read_file(auth).then((result) => {
                req_post_auth(domainUrl + '/api/v1/user/order/save' + '?period=' + args[0] + '&plan_id=' + args[1], result, (result) => {
                    resolve(result)
                })
            });
        })
    })

    ipcMain.handle('panel:cancelOrder', (event, args) => {
        return new Promise((resolve, reject) => {
            read_file(auth).then((result) => {
                req_post_auth(domainUrl + '/api/v1/user/order/cancel' + '?trade_no=' + args, result, (result) => {
                    resolve(result)
                })
            });
        })
    })

    ipcMain.handle('panel:checkout', (event, args) => {
        return new Promise((resolve, reject) => {
            read_file(auth).then((result) => {
                req_post_auth(domainUrl + '/api/v1/user/order/checkout' + '?trade_no=' + args[0] + '&method=' + args[1], result, (result) => {
                    resolve(result)
                })
            });
        })
    })

})


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

app.on('will-quit', () => {
    // 注销所有快捷键
    //globalShortcut.unregisterAll()
})

function exit_all() {
    if (process.platform !== 'darwin') {
        exec('taskkill /f /im clash-core.exe', () => {
        });
        exec(sysproxy + ' off', () => {
        });
        exec(service_run + ' stop')
        exec(service_run + ' uninstall')
    } else {
        sys_proxy(false);
        exec('killall -m clash-core', () => {
        });
    }
}