import { TotpConfig } from "@/shared/types"
import { ElectronAPI, IpcRendererListener } from '@electron-toolkit/preload'
import { NativeImage } from "electron"

export class DesktopPlatform {
    public electronAPI: ElectronAPI
    constructor(electronAPI: ElectronAPI) {
        this.electronAPI = electronAPI
    }

    public async getConfig(): Promise<TotpConfig[]> {
        return this.electronAPI.ipcRenderer.invoke('getConfig')
    }
    public async setConfig(value: TotpConfig[]): Promise<void> {
        const valueJson = JSON.stringify(value)
        return this.electronAPI.ipcRenderer.invoke('setConfig', valueJson)
    }
    public async copyClipboardText(value: string) {
        this.electronAPI.ipcRenderer.invoke('copyClipboardText', value)
    }
    public async readClipboardImage():Promise<NativeImage> {
        console.log(this.electronAPI.ipcRenderer.invoke('readClipboardImage'))
        return this.electronAPI.ipcRenderer.invoke('readClipboardImage')
    }
    public async listenerClearConfig(channel: string, ipcListener: IpcRendererListener) {
        this.electronAPI.ipcRenderer.on(channel, ipcListener)
    }
    public async removeListener(channel: string) {
        this.electronAPI.ipcRenderer.removeAllListeners(channel)
    }
}

export default new DesktopPlatform(window.electron as any)
