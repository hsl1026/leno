import styles from "./mainFooter.module.css";
import { Button, Form, Input } from 'antd';
import Image from "next/image";
import Call from '../../images/call.png'
import Visit from '../../images/visit.png'
import Email from '../../images/email.png'

export const MainFooter = () => {
    
    const contact = [Call, Visit, Email]

    return (<div className={`${styles.footer}`}>
        <div className={`container ${styles.from}`} style={{ marginBottom: '80px' }}>
            <h1 className='row' style={{ color: 'black', fontWeight: '900' }}>CONTACT US</h1>
            <div className='row-col-1'>
                <div className={`${styles.line} col`}></div>
                <div className={`${styles.line} col`}></div>
            </div>

            <Form name="nest-messages" size="large" className={`row mt-5 ${styles.formItem}`}>
                <Form.Item name={'Name'} rules={[{ required: true }]}>
                    <Input placeholder="Name" />
                </Form.Item>
                <Form.Item name={'Email'} rules={[{ type: 'email', required: true }]}>
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item name={'Phone'}>
                    <Input placeholder="Phone" />
                </Form.Item>
                <Form.Item name={'Message'}>
                    <Input.TextArea style={{ height: '100px' }} placeholder="Message" />
                </Form.Item>
                <Form.Item style={{ width: '100px', margin: '0 auto' }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>

        <div className={`container ${styles.bg_footer}`}>
            <div className={`row ${styles.image}`}>
                {contact.map((item, index) => {
                    return <div key={index} className={`col-auto ${styles.img}`}>
                        <Image src={item} alt="" layout="fill" objectFit="contain" />
                    </div>
                })}
            </div>

            <div className="row align-items-center justify-content-center mt-5 pt-5">
                <span className="iconfont icon-qq col-auto"></span>
                <span className="iconfont icon-weixin col-auto"></span>
                <span className="iconfont icon-xinlangweibo col-auto"></span>
            </div>

            <div className={styles.copyright}>
                <p>© Beamy Int'l Holding(HK) Co., Ltd. All Rights Reserved.</p>
                <p>诸暨市来诺建材有限公司 版权所有</p>
                <p>粤ICP备11049707号</p>
            </div>
        </div>
    </div>
    )
}