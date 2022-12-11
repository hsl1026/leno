import styles from './company.module.css'
import Image from 'next/image'
import { TitleBlock } from '../TitleBlock/titleBlock'
import homePage from '../../images/home-page.png'

export const MainFooter = () => <div className={`${styles.company}`} id='company'>
    <TitleBlock title='来诺建材介绍' backgroundColor="#303030" />
    <div className={`container ${styles.company_introduce}`}>
        <div className='row justify-content-between'>
            <div className={`col-xl-6 ${styles.introduce}`}>
                Der德尔地板是德尔未来科技控股集团（深交所上市企业，股票代码002631）旗下地面铺装材料产业的核心，也是中国领先的地板品牌。

                德尔拥有亚太区领先的生产规模，在江苏、四川、辽宁分别设立生产基地，实现“金三角”生产布局，并在印尼设立海外林木加工及生产制造基地。德尔采用德国、意大利、荷兰、日本等国际一流的生产线，并成立了行业内领先的木业研究院。当前掌握百余项关键性技术，并参与起草地板行业多项国家标准，在2020年度欧睿国际组织的调研结果显示，德尔无醛添加地板销量在中国处于领先地位。

                作为北京奥运会家装和公装地板供应商以及中国南北极科考站指定地板供应商， 德尔目前担任中国林产工业协会副理事长单位，中国质量万里行理事单位。产品通过ISO9000质量体系认证，ISO14001环境体系认证，中国环境标志认证。
            </div>
            <div className={styles.introduce_img}>
                <Image src={homePage} alt='' className='col' layout='fill' objectFit='cover' />
            </div>
        </div>

        <div className='row justify-content-center' style={{ height: '37vw', marginTop: '5vw' }}>
            <video autoPlay loop muted style={{ padding: '0' }}>
                <source src='/Little.mp4' />
            </video>
        </div>
    </div>
</div>