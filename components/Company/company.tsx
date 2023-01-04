import styles from './company.module.css'
import Image from 'next/image'
import { TitleBlock } from '../TitleBlock/titleBlock'
import homePage from '../../images/home-page.jpg'
import { useTranslation } from 'react-i18next'

export const MainFooter = () => {
    const { t } = useTranslation()
    return (
        <div className={`${styles.company}`} id='company'>
            <TitleBlock title={t('introduce.title')} backgroundColor="#303030" />
            <div className={`container ${styles.company_introduce}`}>
                <div className='row justify-content-between'>
                    <div className={`col-xl-6 ${styles.introduce}`}>
                        {t('introduce.content')}
                    </div>
                    <div className={styles.introduce_img}>
                        <Image src={homePage} alt='' className='col' layout='fill' objectFit='cover' />
                    </div>
                </div>

                <div className='row justify-content-center' style={{ height: '37vw', marginTop: '5vw' }}>
                    <video autoPlay loop muted style={{ padding: '0', width: '100%', height: '100%' }}>
                        <source src='https://server.myth.art/new-myth/videos/myth-pass.mp4' type="video/mp4" />
                    </video>
                </div>
            </div>
        </div >
    )
}