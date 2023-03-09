module.exports = {
    packagerConfig: {
        icon: 'src/config/ewkuai'
    },
    plugins: [],
    rebuildConfig: {},
    makers: [
        {
            name: '@electron-forge/maker-squirrel',
            config: {
                icon: 'src/config/ewkuai.ico',
                setupIcon: 'src/config/ewkuai.ico',
            },
        },
        {
            name: '@electron-forge/maker-dmg',
            config: {
                icon: 'src/config/ewkuai.icns',
            },
        },
    ],
};
