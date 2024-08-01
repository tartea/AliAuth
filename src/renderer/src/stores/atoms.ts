import { TotpConfig } from "@/shared/types"
import { atomWithStorage } from 'jotai/utils'
import storage, { StorageKey } from '../storage'

export const userConfigAtom = atomWithStorage<TotpConfig[]>(StorageKey.UserConfig, [], storage)

// function defaultConfig(): TotpConfig[] {
//     return [{
//         uuid: '1',
//         account: "222",
//         secret: "SAIFQADB4ZNCQ4IJIW64TWSDEN2TC3CW",
//         remark: "remark"
//     }, {
//         uuid: '12',
//         account: "33",
//         secret: "SAIFQADB4ZNCQ4IJIW64TWSDEN2TC3CW",
//         remark: "remark"
//     }]
// }