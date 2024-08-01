import '@renderer/assets/config_page.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import * as atoms from '../stores/atoms';
import { useAtom } from 'jotai';

export default function ConfigPage() {

    const [userConfigAtom, setUserConfigAtom] = useAtom(atoms.userConfigAtom)

    const navigate = useNavigate();
    const [accountError, setAccountError] = useState(false)
    const [secretError, setSecretError] = useState(false)

    const [account, setAccount] = useState('');
    const [secret, setSecret] = useState('');
    const [remark, setRemark] = useState('');

    const saveConfig = async () => {
        if (!account || account.length === 0) {
            setAccountError(true)
            return
        }
        if (!secret || secret.length === 0) {
            setSecretError(true)
            return
        }
        const newItems = [...userConfigAtom,{
            account:account,
            secret:secret,
            remark:remark,
            uuid:new Date().getTime()
        } ];
        await setUserConfigAtom(newItems);
        backHome()
    }
    const backHome = () => {
        navigate("/", { replace: true })
    }

    return (
        <>
            <div>
                <div className="config_form">
                    <input placeholder="账号名" className={`config_line config_input ${accountError ? 'accountError' : ''}`}
                        value={account} onChange={(e) => {
                            setAccount(e.target.value)
                            if (accountError) {
                                setAccountError(false)
                            }
                        }}
                    />
                    {
                        accountError && <span className="error_toast">请为此账号输入名称</span>
                    }
                    <input placeholder="密钥" className={`config_line config_input ${secretError ? 'error_input' : ''}`}
                        value={secret} onChange={(e) => {
                            setSecret(e.target.value)
                            if (secretError) {
                                setSecretError(false)
                            }
                        }}
                    />
                    {
                        secretError && <span className="error_toast">密钥值太短</span>
                    }
                    <input placeholder="备注" className="config_line config_input"
                        value={remark} onChange={e => setRemark(e.target.value)}
                    />
                    <div className="config_line config_btn" onClick={saveConfig}>保存</div>
                </div>
            </div >
        </>
    )
}