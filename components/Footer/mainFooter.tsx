import styles from "./mainFooter.module.css";
import { Button, Form, Input } from 'antd';
import Image from "next/image";
import Call from '../../images/call.png'
import Visit from '../../images/visit.png'
import Email from '../../images/email.png'
import axios from "axios";
import { textSendEmail } from '../../api/lenoApi'
import { useTranslation } from 'react-i18next'

export const MainFooter = () => {
    const { t } = useTranslation()
    const contact = [Call, Visit, Email]

    const sendEmail = (value: any) => {
        axios({
            method: "post",
            url: textSendEmail,
            data: {
                'userName': value.Name,
                'Email': value.Email,
                'Phone': value.Phone,
                'Message': value.Message
            }
        }).then((res) => {
            alert(res.data)
        }).catch(() => {
            alert('发送失败')
        })
    }

    return (<div className={`${styles.footer}`}>
        <div className={`container ${styles.from}`} style={{ marginBottom: '80px' }}>
            <h1 className='row' style={{ color: 'black', fontWeight: '900' }}>{t('contact')}</h1>
            <div className='row-col-1'>
                <div className={`${styles.line} col`}></div>
                <div className={`${styles.line} col`}></div>
            </div>

            <Form onFinish={sendEmail} name="nest-messages" size="large" className={`row mt-5 ${styles.formItem}`}>
                <Form.Item name={'Name'} rules={[{ required: true, message: 'Please input your name!' }]}>
                    <Input placeholder="Name" />
                </Form.Item>
                <Form.Item name={'Email'} rules={[{ type: 'email', required: true, message: 'Please input your email!' }]}>
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item name={'Phone'} rules={[{ required: true, message: 'Please input your phone number!' }]}>
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
                <p>© Beamy Int'l Holding(zh) Co., Ltd. All Rights Reserved.</p>
                <p>诸暨市来诺建材有限公司 版权所有</p>
                <p>浙ICP备11049707号</p>
            </div>
        </div>
    </div>
    )
}