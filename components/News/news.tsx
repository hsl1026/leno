import React, { useEffect, useState } from 'react';
import styles from "./news.module.css";
import { TitleBlock } from '../TitleBlock/titleBlock'
import homePage from '../../images/home-page.jpg'
import Image from 'next/image'
import Link from 'next/link';
import axios from 'axios';
import { textNewsBox } from '../../api/lenoApi'

export const News = () => {
    const [newData, setNewData] = useState([])

    useEffect(() => {
        (async function () {
            await axios.get(textNewsBox).then((res) => {
                setNewData(res.data)
            })

        })()
    }, []);

    return (
        <div className={styles.news}>
            <TitleBlock title='OUR NEWS' backgroundColor="#303030" />
            <div className='container'>
                <div className={`row ${styles.new}`}>
                    {
                        newData.map((item: any, index: number) => (
                            <Link href={`/new/${item.id}`} key={index}>
                                <div className={styles.boxNew}>
                                    <div className={`${styles.newBox}`}>
                                        <div className={`col ${styles.new_img}`}><Image src={homePage} alt='' layout='fill' objectFit='cover' /></div>
                                        <div className={`col ${styles.content}`}>
                                            <p>{item.title}</p>
                                            <p className={styles.more} style={{ marginBottom: '2px', color: 'green' }}>阅读更多内容→</p>
                                            <span className={styles.more}>{item.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )

}
