import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
    // eslint-disable-next-line no-unused-vars
    interface Window {
        electron?: ElectronAPI
    }
}

export {}
