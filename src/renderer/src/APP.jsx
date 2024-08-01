
import { Outlet } from "react-router-dom";
import { router } from "./routes/root";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { addChannel, clearChannel } from "@/shared/types";
import platform from '@renderer/packages/platform';
import { useAtom } from 'jotai';
import * as atoms from './stores/atoms';

export default function APP() {

    const [userConfigAtom, setUserConfigAtom] = useAtom(atoms.userConfigAtom)

    const navigate = useNavigate();

    useEffect(() => {
        platform.listenerClearConfig(clearChannel, () => {
            setUserConfigAtom([])
        })
        platform.listenerClearConfig(addChannel, (event, routerPath) => {
            navigate(routerPath, { replace: true });
        })
        return () => {
            platform.removeListener(clearChannel)
            platform.removeListener(addChannel)
        }
    }, [])

    return (
        <Outlet />
    )
}