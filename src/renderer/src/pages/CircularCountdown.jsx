import React, { useEffect, useState } from 'react';
import '../assets/CircularCountdown.css';


const CircularCountdown = ({ circleSeconds }) => {

    const radius = 20; // 圆的半径
    const circumference = 2 * Math.PI * radius; // 圆的周长
    const offset = ((30 - circleSeconds) / 30) * circumference; // 根据剩余时间计算偏移量

    return (
        <div className="countdown-container">
            <svg width="40" height="40" className='svg-circle'>
                {/* 背景圆，初始为绿色 */}
                <circle
                    cx="20"
                    cy="20"
                    r="21"
                    fill="rgba(76, 175, 80, 1)" // 背景圆的颜色
                />
                {/* 进度圆，使用白色 */}
                <circle
                    cx="20"
                    cy="20"
                    r={radius}
                    fill="none"
                    stroke="white" // 进度圆的颜色
                    strokeWidth={radius * 2} // 使用较大的宽度来实现扇形效果
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                />
            </svg>
        </div>
    );
};

export default CircularCountdown;

