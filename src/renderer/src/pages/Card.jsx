
import '@renderer/assets/card.css'
import platform from '@renderer/packages/platform'
import { useEffect, useState } from 'react'
import { interval } from 'rxjs'
import { map } from 'rxjs/operators'
import { TOTP } from "totp-generator"
import CircularCountdown from './CircularCountdown'

export default function Card({ totpConfig, onDelete }) {
    const [totpCode, setTotpCode] = useState('000000')

    const [circleSeconds,setCircleSeconds] = useState(0)

    const configDesc = `${totpConfig.account}${totpConfig.remark && totpConfig.remark.length > 0 ? " (" + totpConfig.remark + ")" : ""}`

    // const [counter, setCounter] = useAtom(counterAtom)
    useEffect(() => {
        generateCode()
        const subscription = interval(1000).subscribe(data => {
            // 获取当前时间
            const seconds = new Date().getSeconds();
            const surplusSeconds = seconds % 30
            setCircleSeconds(surplusSeconds)
            if (surplusSeconds == 0) {
                generateCode()
            }
        })
        return () => {
            subscription.unsubscribe()
        }
    }, [totpConfig.uuid])

    const copyCode = () => {
        platform.copyClipboardText(totpCode)
    }

    const generateCode = () => {
        try {
            const { otp } = TOTP.generate(totpConfig.secret, { period: 30 })
            setTotpCode(otp)
        } catch (e) {
            setTotpCode("生成失败！")
        }
    }

    return (
        <div className="config_card" >
            <div className="card_left">
                <div className="card_totp_code">{totpCode}</div>
                <div className="card_totp_explain">
                    {configDesc}
                </div>
            </div>
            <div className="card_right">
                <CircularCountdown circleSeconds={circleSeconds}/>
                <div className="card_btn card_green" onClick={copyCode}>
                    复制
                </div>
                <div className="card_btn card_red" onClick={onDelete} >
                    删除
                </div >

            </div >
        </div >

    )
}