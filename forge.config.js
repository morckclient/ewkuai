module.exports = {
    packagerConfig: {
        icon: '/src/config/okanc'
    },
    plugins: [],
    rebuildConfig: {},
    makers: [
        {
            name: '@electron-forge/maker-squirrel',
            config: {
                icon: '/src/config/ewkuai.ico',
                setupIcon: '/src/config/ewkuai.ico',
            },
        },
        {
            name: '@electron-forge/maker-deb',
            config: {
                options: {
                    icon: '/src/config/ewkuai.png'
                }
            },
        },
        {
            name: '@electron-forge/maker-dmg',
            config: {
                icon: '/src/config/ewkuai.icns',
            },
        },
    ],
};
