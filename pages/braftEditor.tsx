import React, { useState, useEffect } from 'react';
import styles from './commonModule/common.module.css'
import Head from "next/head";
import dynamic from 'next/dynamic';
import { Button, Form, Input } from 'antd';

const BraftEditor = () => {
    const Editor = dynamic(() => import('../components/Editor/editor'), { ssr: false })
    const [ifFirst, setIfFirst] = useState(true)

    //将密码保存进localStorage
    const localStorageSet = (name: string, data: number) => {
        const obj = {
            data,
            expire: new Date().getTime() + 1000 * 60 * 60 * 24
        };
        localStorage.setItem(name, JSON.stringify(obj));
    };

    //从localStorage处获取密码
    const localStorageGet = (name: string) => {
        const storage = localStorage.getItem(name);
        const time = new Date().getTime();
        let result = null;
        if (storage) {
            const obj = JSON.parse(storage);
            if (time < obj.expire) {
                result = obj.data;
            } else {
                localStorage.removeItem(name);
            }
        }
        return result;
    };

    useEffect(() => {
        const result = localStorageGet('password')
        if (result === 123456) {
            setIfFirst(false)
            document.body.style.overflow = 'hidden'
        }
    }, []);

    //验证密码
    const verification = (value: any) => {
        if (Number(value.password) === 123456) {
            setIfFirst(false)
            localStorageSet('password', 123456)
        }
    }

    return (<>
        <Head>
            <title>来诺建材新闻提交</title>
        </Head>
        <main>
            {ifFirst ?
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 10 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    className={styles.form}
                    onFinish={verification}
                >
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{
                            required: true, message: 'Please input your password!'
                        }]}
                        messageVariables={{ value: 'good' }}
                    >
                        <Input.Password id='password' />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                :
                <div className={styles.editor}>
                    <Editor></Editor>
                </div>
            }
        </main>
    </>)
}

export default BraftEditor