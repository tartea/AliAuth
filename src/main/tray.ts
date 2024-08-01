import { BrowserWindow, Menu, Tray } from "electron";
import icon from '../../resources/icon.png?asset';
import { addChannel, clearChannel } from '../shared/types';
import { clearAllConfig } from './store-node';
let tray;

function desginTray(mainWindow:BrowserWindow) {
    tray = new Tray(icon)

    const contextMenu = Menu.buildFromTemplate([
        {
            label: '主页', type: 'normal', click: () => {
                mainWindow.webContents.send(addChannel,"")
            }
        },
        {
            label: '手动配置', type: 'normal', click: () => {
                mainWindow.webContents.send(addChannel,"configPage")
            }
        },
        {
            label: '二维码配置', type: 'normal', click: () => {
                mainWindow.webContents.send(addChannel,"qrPage")
            }
        },
        {
            label: '清空配置', type: 'normal', click: () => {
                clearAllConfig()
                mainWindow.webContents.send(clearChannel)
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