import { TotpConfig } from "@/shared/types"
import platform from '@renderer/packages/platform'

export enum StorageKey {
    UserConfig = 'user-config',
}

export default class StoreStorage {
    constructor() {
      
    }
    public async getItem(key: string, initialValue: TotpConfig[]): Promise<TotpConfig[]> {
        let value: TotpConfig[] = await platform.getConfig()
        if (value === undefined || value === null || value.length === 0) {
            value = initialValue
            this.setItem(key, value)
        }
        return value
    }
    public async setItem(_key: string, value: TotpConfig[]): Promise<void> {
        return platform.setConfig(value)
    }

    public removeItem(_key: string): Promise<void> {
        return new Promise(() => {

        })
    }
}
