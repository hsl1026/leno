import React, { useEffect, useState } from 'react';
import styles from "./backgroundImg.module.css";
import { DownOutlined } from '@ant-design/icons';

interface BackgroundImg {
    backgroundImg: string;
    title: string;
}

export const BackgroundImg = ({ backgroundImg, title }: BackgroundImg) => {

    const scrollToAnchor = (anchorName: string) => {
        if (anchorName) {
            let anchorElement = document.getElementById(anchorName);
            if (anchorElement) {
                let scrollHeight = anchorElement.clientHeight - 80;
                window.scrollTo(0, scrollHeight);
            }
        }
        return false;
    };

    return (
        <div className={styles.backgroundImg} style={{ backgroundImage: `url(${backgroundImg})` }} id="mainNav">
            <div className={`${styles.title}`}>
                <p>{title}</p>
            </div>

            <div className="container-fluid">
                <div className="row justify-content-center" onClick={() => scrollToAnchor('mainNav')}>
                    <DownOutlined className={styles.icon} />
                </div>
            </div>
        </div>
    )

}