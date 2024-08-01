import { BrowserWindow, Menu, Tray, dialog, nativeImage } from "electron";
import icon from '../../resources/icon.png?asset';
import { addChannel, clearChannel } from '../shared/types';
import { clearAllConfig, getConfig } from './store-node';
const path = require('path');
const fs = require('fs');

let tray;

function desginTray(mainWindow: BrowserWindow) {

    let trayIcon = nativeImage.createFromPath(icon)
    trayIcon = trayIcon.resize({ width: 16, height: 16 });
    tray = new Tray(trayIcon)

    const contextMenu = Menu.buildFromTemplate([
        {
            label: '主页', type: 'normal', click: () => {
                mainWindow.webContents.send(addChannel, "")
            }
        },
        {
            label: '手动配置', type: 'normal', click: () => {
                mainWindow.webContents.send(addChannel, "configPage")
            }
        },
        {
            label: '二维码配置', type: 'normal', click: () => {
                mainWindow.webContents.send(addChannel, "qrPage")
            }
        },
        { label: '', type: 'separator', checked: true },
        {
            label: '清空配置', type: 'normal', click: () => {
                clearAllConfig()
                mainWindow.webContents.send(clearChannel)
            }
        },
        {
            label: '导出配置', type: 'normal', click: async () => {
                const { canceled, filePath } = await dialog.showSaveDialog({
                    title: 'Save JSON File',
                    defaultPath: 'ali验证密钥配置.json',
                    filters: [{ name: 'JSON Files', extensions: ['json'] }],
                });

                if (!canceled && filePath) {
                    fs.writeFileSync(filePath, JSON.stringify(getConfig(), null, 2));
                }
            }
        },
        { label: '', type: 'separator', checked: true },
        { label: '推出', role: 'quit' }
    ])

    tray.setContextMenu(contextMenu)
    tray.on('click', () => {
        mainWindow.show()
    })
}

export default desginTray