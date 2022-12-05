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

const image = [floor1, floor2, floor3, floor4]
const tile_flag = [{
    title: '颜色',
    parameter: '深棕色'
},
{
    title: '最佳搭配风格',
    parameter: '轻奢、欧式、现代简约、新中式、北欧、...'
},
{
    title: '规格',
    parameter: '1383*193*8mm'
},
{
    title: '原产地',
    parameter: '奥地利萨尔斯堡'
},
{
    title: '环保等级',
    parameter: '欧盟E1等级'
},
{
    title: '基材',
    parameter: '阿尔卑斯云杉木质纤维压制的高密度基材...'
},
{
    title: '锁扣槽口',
    parameter: '4V槽口'
},
{
    title: '表面工艺',
    parameter: '独有PO超光面，完美光泽巧夺天工'
},
{
    title: '产品特色',
    parameter: 'KAINDL经典外观设计，简洁艺术浮雕面...'
},
{
    title: '适用空间',
    parameter: '除浴室、厨房外，可全屋铺装'
}]

const Cookies = () => <>

    <Head>
        <title>来诺建材</title>
    </Head>

    <main className={styles.main}>
        <BackgroundImg backgroundImg="/product.jpg" title="来诺产品" />
        <div className={styles.product}>

            <TitleBlock title='OUR PRODUCT' backgroundColor="#303030" />

            <div style={{ position: 'relative' }}>
                <div className={styles.tile}>产品图片</div>
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
                <span className={`${styles.flag} row-col-auto`}>产品介绍</span>
                <div className="row mt-5">
                    {
                        tile_flag.map((item, index) => {
                            return <div key={index} className='col-sm-6 col-lg-3 padding-bottom-20'>
                                <h3>{item.title}</h3>
                                <p>{item.parameter}</p>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    </main>
</>

export default Cookies