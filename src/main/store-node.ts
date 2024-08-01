// @ts-nocheck
import Store from 'electron-store'
import { TotpConfig } from '../shared/types'

interface StoreType {
    totpConfigs: TotpConfig[]
}

export const store = new Store<StoreType>({
    name:"totp_config",
    clearInvalidConfig: true,
})


export function setConfig(dataJson) {
    const configs = JSON.parse(dataJson)
    store.set<'totp_config'>('totpConfigs', configs)
}

export function getConfig(): TotpConfig[] {
    let configs = store.get<'totp_config'>('totpConfigs')
    if (!configs) {
        configs = []
        store.set<'totpConfigs'>('totpConfigs', configs)
    }
    return configs
}

/// 清空配置
export function clearAllConfig(){
    store.set<'totp_config'>('totpConfigs', [])
}