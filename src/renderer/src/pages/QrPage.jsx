import platform from '@renderer/packages/platform';
import { useAtom } from 'jotai';
import jsQR from 'jsqr';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../assets/qr_page.css';
import * as atoms from '../stores/atoms';

const QRImageUploader = () => {

    const [userConfigAtom, setUserConfigAtom] = useAtom(atoms.userConfigAtom)

    const [imageData, setImageData] = useState(null);
    const [qrCode, setQrCode] = useState(null);
    const [codeError, setCodeError] = useState(false);
    const [imageSrc, setImageSrc] = useState('');

    const navigate = useNavigate();

    const handleFileChange = (file) => {
        setCodeError(false);
        setQrCode(null);
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);

                    // 获取图像数据
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const dataArray = imageData.data; // 这是一个 Uint8ClampedArray
                    setImageData(dataArray);
                    setImageSrc(e.target.result); // 保存图片源以便展示

                    // 使用 jsQR 解析二维码
                    const code = jsQR(dataArray, canvas.width, canvas.height);
                    if (code) {
                        setQrCode(code.data);
                    } else {
                        setCodeError(true);
                    }
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const saveConfig = async () => {
        const newItems = [...userConfigAtom, {
            ...parseOtpAuthUri(),
            remark: '',
            uuid: new Date().getTime()
        }];
        await setUserConfigAtom(newItems);
        backHome()
    }
    function parseOtpAuthUri() {
        // 使用 URL 对象解析 URI
        const url = new URL(qrCode);
        // 提取路径部分
        const accountName = url.pathname.substr(url.pathname.lastIndexOf('/') + 1); // 'Archery:005175'

        // 提取查询参数
        const params = new URLSearchParams(url.search);
        const secret = params.get('secret'); // 'PIZQ62WBCTGBTYTL2F2VO3ORE7F7QHZF'

        // 返回解析结果
        return {
            account: accountName,
            secret: secret,
        };
    }

    const backHome = () => {
        navigate("/", { replace: true })
    }

    const handleDrop = (event) => {
        event.preventDefault(); // 阻止默认行为
        const file = event.dataTransfer.files[0]; // 获取拖拽的文件
        handleFileChange(file); // 处理文件
    };

    const handleDragOver = (event) => {
        event.preventDefault(); // 阻止默认行为以允许拖放
    };


    const handlePasteImage = async () => {
        const image = await platform.readClipboardImage() // 从剪贴板读取图像
        if (!image.isEmpty()) {
            const imgData = image.toPNG()
            // 创建一个 Blob 对象
            const blob = new Blob([imgData], { type: 'image/png' });
            const url = URL.createObjectURL(blob);
            handleFileChange(blob)
        } else {
            alert('剪贴板中没有图像');
        }
    };

    return (
        <div className="qr-uploader">
            <div className="upload-area">
                <input
                    type="file"
                    accept="image/*"
                    className="file_input"
                    id="file-input"
                    onChange={(e) => handleFileChange(e.target.files[0])}
                />
                <div className='upload-btn'>
                    <label htmlFor="file-input" className="file_label">
                        上传图片
                    </label>
                    <button onClick={handlePasteImage} className="paste_button">
                        从剪贴板获取图片
                    </button>
                </div>
                <div
                    className="drop_area"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    拖拽图片到此区域
                </div>
            </div>
            {imageSrc && (
                <div>
                    <h3>上传的图片:</h3>
                    <img src={imageSrc} alt="Uploaded" style={{ maxWidth: '300px', maxHeight: '200px' }} />
                </div>
            )}
            {qrCode && (
                <>
                    <div>
                        <h3>二维码内容:</h3>
                        <p className='limited-paragraph'>{qrCode}</p>
                    </div>
                    <div className="config_line config_btn" style={{ width: '60%' }} onClick={saveConfig}>保存</div>
                </>
            )}
            {codeError && (
                <p className='limited-paragraph limited-paragraph-error'>解析错误</p>
            )}
        </div>
    );
};

export default QRImageUploader;
