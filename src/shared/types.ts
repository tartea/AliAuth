export interface TotpConfig {
    uuid:string
    account: string
    secret: string
    remark: string
}
export const clearChannel = 'clear-all-config'
export const addChannel = 'add-config'