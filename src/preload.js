const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('configAPI', {
    getMainUrl: () => ipcRenderer.send('config:getMainUrl'),
    openUrl: (link) => ipcRenderer.send('config:openUrl', link),
    getLang: () => ipcRenderer.invoke('config:getLang').then((result) => {
        return result
    }),
    getTranslator: (lang) => ipcRenderer.invoke('config:getTranslator', lang).then((result) => {
        return result
    }),
    getSetting: () => ipcRenderer.invoke('config:getSetting').then((result) => {
        return result
    }),
    modifySetting: (key, value) => ipcRenderer.invoke('config:modifySetting', [key, value]),
    getFlagName: () => ipcRenderer.invoke('config:getFlagName').then((result) => {
        return result
    }),
})

contextBridge.exposeInMainWorld('electronAPI', {
    hideWindow: () => ipcRenderer.send('mainWindow:close'),
    miniWindow: () => ipcRenderer.send('mainWindow:mini'),
    exitWindow: () => ipcRenderer.send('mainWindow:exit'),
    changeWindow: (width, height) => ipcRenderer.send('mainWindow:change', [width, height]),
    openSystem: (status) => ipcRenderer.send('mainWindow:openSystem', status),
    getOpenSystem: () => ipcRenderer.invoke('mainWindow:getOpenSystem').then((result) => {
        return result
    }),
})

contextBridge.exposeInMainWorld('systemAPI', {
    sysProxyOn: (port) => ipcRenderer.send('system:sysProxyOn', port),
    sysProxyOff: () => ipcRenderer.send('system:sysProxyOff'),
    lanIP: () => ipcRenderer.invoke('system:lanIP').then((result) => {
        return result
    }),
})

contextBridge.exposeInMainWorld('indexAPI', {
    setTitle: () => ipcRenderer.send('index:set-title'),
    goUrl: (path) => ipcRenderer.send('index:goUrl', path),
    getPanelConfig: () => ipcRenderer.invoke('index:getPanelConfig').then((result) => {
        return result
    }),
    getDomain: () => ipcRenderer.invoke('index:getDomain').then((result) => {
        return result
    }),
    getUserInfo: () => ipcRenderer.invoke('index:getUserInfo').then((result) => {
        return result
    }),
    getSubscribe: () => ipcRenderer.invoke('index:getSubscribe').then((result) => {
        return result
    }),
    getNotice: () => ipcRenderer.invoke('index:getNotice').then((result) => {
        return result
    }),
    getClashYaml: (token) => ipcRenderer.invoke('index:getClashYaml', token).then((result) => {
        return result
    }),
    getInviteInfo: () => ipcRenderer.invoke('index:getInviteInfo').then((result) => {
        return result
    }),
    sendOrders: (title, content) => ipcRenderer.invoke('index:sendOrders', [title, content]).then((result) => {
        return result
    }),
    changePwd: (oldpwd, pwd, repwd) => ipcRenderer.invoke('index:changePwd', [oldpwd, pwd, repwd]).then((result) => {
        return result
    }),
    getClientVersion: () => ipcRenderer.invoke('index:getClientVersion').then((result) => {
        return result
    }),
    getStorePlan: () => ipcRenderer.invoke('index:getStorePlan').then((result) => {
        return result
    }),
    payWallet: (id) => ipcRenderer.invoke('index:payWallet', id).then((result) => {
        return result
    }),
    payPurchase: (price, type) => ipcRenderer.invoke('index:payPurchase', [price, type]).then((result) => {
        return result
    }),
    getStorePlanForID: (id) => ipcRenderer.invoke('index:getStorePlanForID', id).then((result) => {
        return result
    }),
    getPaymentMethod: () => ipcRenderer.invoke('index:getPaymentMethod').then((result) => {
        return result
    }),
    checkCoupons: (code, id) => ipcRenderer.invoke('index:checkCoupons', [code, id]).then((result) => {
        return result
    }),
})

contextBridge.exposeInMainWorld('loginAPI', {
    // 登录
    getAccount: () => ipcRenderer.invoke('login:getAccount').then((result) => {
        return result
    }),
    doLogin: (email, pwd) => ipcRenderer.invoke('login:doLogin', [email, pwd]).then((result) => {
        return result
    }),
    quickLogin: () => ipcRenderer.invoke('login:quickLogin').then((result) => {
        return result
    }),
    hasVertif: () => ipcRenderer.invoke('login:hasVertif').then((result) => {
        return result
    }),
    saveAccount: (email, pwd) => ipcRenderer.send('login:saveAccount', [email, pwd]),

    // 注册
    sendVerify: (email) => ipcRenderer.invoke('login:sendVerify', email).then((result) => {
        return result
    }),
    Register: (email, name, pwd, passwd, repasswd, emailcode) => ipcRenderer.invoke('login:register', [email, name, pwd, passwd, repasswd, emailcode]).then((result) => {
        return result
    }),
    resetPassword: (email, pwd, verify) => ipcRenderer.invoke('login:resetPassword', [email, pwd, verify]).then((result) => {
        return result
    }),
    logout: () => ipcRenderer.send('login:logout'),
    logNoOut: () => ipcRenderer.send('login:logNoOut')
})

contextBridge.exposeInMainWorld('coreAPI', {
    start: () => ipcRenderer.send('core:start'),
    stop: () => ipcRenderer.send('core:stop'),
    getServer: () => ipcRenderer.invoke('core:getServer').then((result) => {
        return result
    }),
    getDelay: (server) => ipcRenderer.invoke('core:getDelay', server).then((result) => {
        return result
    }),
    getConfig: () => ipcRenderer.invoke('core:getConfig').then((result) => {
        return result
    }),
    getProviders: () => ipcRenderer.invoke('core:getProviders').then((result) => {
        return result
    }),
    reloadConfig: (conf) => ipcRenderer.invoke('core:reloadConfig', conf).then((result) => {
        return result
    }),
    selectServer: (selector, server) => ipcRenderer.invoke('core:selectServer', [selector, server]).then((result) => {
        return result
    }),
    getCurrentServer: (selector) => ipcRenderer.invoke('core:getCurrentServer', selector).then((result) => {
        return result
    }),
    modifyConfig: (data) => ipcRenderer.invoke('core:modifyConfig', data).then((result) => {
        return result
    }),
})

contextBridge.exposeInMainWorld('serviceAPI', {
    serviceInstall: () => ipcRenderer.send('service:Install'),
    serviceUninstall: () => ipcRenderer.send('service:Uninstall'),
    serviceStart: () => ipcRenderer.send('service:Start'),
    serviceStop: () => ipcRenderer.send('service:Stop'),
    serviceReloadConfig: () => ipcRenderer.invoke('service:reloadConfig').then((result) => {
        return result
    }),
})

contextBridge.exposeInMainWorld('yamlAPI', {
    readYaml: () => ipcRenderer.invoke('yaml:readYaml').then((result) => {
        return result
    }),
    writeYaml: () => ipcRenderer.invoke('yaml:writeYaml'),
    tunYaml: () => ipcRenderer.send('yaml:tunYaml'),
})

contextBridge.exposeInMainWorld('panelAPI', {
    generateInviteCode: () => ipcRenderer.invoke('panel:generateInviteCode').then((result) => {
        return result
    }),
    userCheckIn: () => ipcRenderer.invoke('panel:userCheckIn').then((result) => {
        return result
    }),
    saveOrder: (cycle, plan_id) => ipcRenderer.invoke('panel:saveOrder', [cycle, plan_id]).then((result) => {
        return result
    }),
    cancelOrder: (trade) => ipcRenderer.invoke('panel:cancelOrder', trade).then((result) => {
        return result
    }),
    checkout: (trade, payment) => ipcRenderer.invoke('panel:checkout', [trade, payment]).then((result) => {
        return result
    }),
})