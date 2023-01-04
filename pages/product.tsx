import React from "react";
import styles from './commonModule/product.module.css'
import { Carousel } from 'antd';
import Image from "next/image";
import { TitleBlock } from '../components/TitleBlock/titleBlock'
import { BackgroundImg } from '../components/backgroundImg/backgroundImg'
import backImg from '../images/home-page.webp'
import floor1 from '../images/floor1.jpg'
import floor2 from '../images/floor2.jpg'
import floor3 from '../images/floor3.jpg'
import floor4 from '../images/floor4.jpg'
import Head from "next/head";
import { useTranslation } from 'react-i18next'

const Cookies = () => {
    const { t } = useTranslation()

    const image = [floor1, floor2, floor3, floor4]
    const tile_flag = [{
        title: t('product.color'),
        parameter: t('product.product1.color')
    },
    {
        title: t('product.style'),
        parameter: t('product.product1.style')
    },
    {
        title: t('product.Specifications'),
        parameter: t('product.product1.Specifications')
    },
    {
        title: t('product.origin'),
        parameter: t('product.product1.origin')
    },
    {
        title: t('product.grade'),
        parameter: t('product.product1.grade')
    },
    {
        title: t('product.material'),
        parameter: t('product.product1.material')
    },
    {
        title: t('product.LatchNotch'),
        parameter: t('product.product1.LatchNotch')
    },
    {
        title: t('product.technology'),
        parameter: t('product.product1.technology')
    },
    {
        title: t('product.features'),
        parameter: t('product.product1.features')
    },
    {
        title: t('product.space'),
        parameter: t('product.product1.space')
    }]

    return (
        <>
            <Head>
                <title>来诺建材</title>
            </Head>
            <main className={styles.main}>
                <BackgroundImg backgroundImg="/product.jpg" title={t('product.productTitle')}/>
                <div className={styles.product}>

                    <TitleBlock title={t('product.title')} backgroundColor="#303030" />

                    <div style={{ position: 'relative' }}>
                        <div className={styles.tile}>{t('product.img')}</div>
                        <Carousel autoplay>
                            {
                                image.map((item, index) => {
                                    return <div className={styles.Carousel} key={index}>
                                        <Image src={item} alt='' layout="fill" objectFit="cover" />
                                    </div>
                                })
                            }
                        </Carousel>
                    </div>

                    <div className={`${styles.product_introduction} container`}>
                        <span className={`${styles.flag} row-col-auto`}>{t('product.introduction')}</span>
                        <div className="row mt-5">
                            {
                                tile_flag.map((item, index) => {
                                    return <div key={index} className='col-sm-6 col-lg-3 padding-bottom-20'>
                                        <h3>{item.title}</h3>
                                        <p style={{ fontSize: '12px' }}>{item.parameter}</p>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </main>
        </>)
}

export default Cookies