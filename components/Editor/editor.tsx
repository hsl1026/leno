import React from "react";
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import MaxLength from 'braft-extensions/dist/max-length'
import axios from 'axios'
import styles from './editor.module.css'
import { text } from '../../api/lenoApi'
import { Spin, Form, Input, Button, Select, Modal } from 'antd';
import { compress, replacePath } from '../../until/compress'
import Link from "next/link";
import { textGetNewsTitle, textDeleteNew, textGetNewsContent } from '../../api/lenoApi'

const Option = Select.Option;

interface EditorState {
    editorState: any,
    loading: boolean,
    CoverImg: any[],
    optionTitle: any[],
    ifModalOpen: boolean,
    newId: number
}


class Editor extends React.Component<{}, EditorState> {
    formRef: any = React.createRef()
    constructor(props: {}, state: EditorState) {
        super(props);
        this.state = {
            editorState: BraftEditor.createEditorState(null),
            loading: false,
            CoverImg: [],
            optionTitle: [],
            ifModalOpen: false,
            newId: 0,
        };
    }

    //获取新闻标题列表
    componentDidMount() {
        axios.get(textGetNewsTitle).then((res) => {
            this.setState({
                optionTitle: res.data
            })
        })
    }

    handleEditorChange = (editorState: any) => {
        this.setState({ editorState })
    }

    //保存新闻内容到数据库
    handleSubmit = async (value: any) => {
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        this.setState({ loading: true })
        const htmlContent = this.state.editorState.toHTML()

        //获取到base64
        const base64 = htmlContent.match(/data:image\/\w+;base64,[\w/+=]*/g);

        //压缩并转换为blob格式
        const compressImgs = await compress(base64);
        //const a = await compress(this.state.CoverImg)


        //const ontentsAfterReplacement = replacePath(htmlContent, base64, compressImgs)
        //console.log(ontentsAfterReplacement);

        await axios({
            method: "POST",
            url: text,
            data: {
                'title': value.title,
                'newImg': '',
                'content': htmlContent
            },
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(() => {
            alert('添加成功')
            this.setState({ loading: false })
            window.location.reload()
        }).catch((err) => {
            console.log('错误' + err)
            this.setState({ loading: false })
        })
    }

    //获取新闻封面图
    uploadData = (e: any) => {
        this.setState({
            CoverImg: [URL.createObjectURL(e.target.files[0])]
        })
    }

    //修改功能，获得已有新闻
    editNews = async (index: number, e: any) => {
        e.preventDefault()
        await axios({
            method: "get",
            url: textGetNewsContent,
            params: {
                'id': index
            },
        }).then((res) => {
            this.setState({
                editorState: BraftEditor.createEditorState(res.data.content),
            })
            this.formRef.current.setFieldsValue({
                title: res.data.title
            })
        }).catch((err) => {
            console.log('错误' + err)
        })
    }

    //确认是否要删除
    ifDeleteNews = (index: number, e: any) => {
        e.stopPropagation()
        this.setState({
            ifModalOpen: true,
            newId: index
        })
    }

    //删除新闻
    deleteNews = (index: number) => {
        this.setState({ loading: true, ifModalOpen: false })
        axios({
            method: "POST",
            url: textDeleteNew,
            params: {
                'id': index
            },
        }).then((res) => {
            alert(res.data)
            this.setState({ loading: false })
            window.location.reload()
        }).catch((err) => {
            console.log('错误' + err)
            this.setState({ loading: false })
        })
    }

    render() {
        const { loading, optionTitle, ifModalOpen, newId } = this.state
        const { formRef } = this;
        //限制字数
        const LIMIT = 5000;
        const options = {
            defaultValue: LIMIT
        }
        BraftEditor.use(MaxLength(options))

        return (
            <>
                {
                    loading ? <Spin size="large" style={{ marginLeft: '50%', marginTop: '20%', transform: 'translateX(-50%)' }} /> :
                        <>
                            <Form onFinish={this.handleSubmit} ref={formRef}>
                                <div className={styles.btn}>
                                    <Link href={'/'}><button className={styles.home}>返回首页</button></Link>
                                    <div style={{ marginLeft: '30px', display: 'inline-flex', alignItems: 'center' }}>
                                        <Form.Item style={{ width: '30vw' }} name="title" rules={[{ required: true, message: 'Please input title!' }]}>
                                            <Input size="middle" placeholder="请输入标题" />
                                        </Form.Item>
                                        <Form.Item style={{ width: '20vw' }} name="newImg" label="封面图：">
                                            <Input size="middle" type="file" style={{ border: 'none' }} onChange={(e) => this.uploadData(e)} />
                                        </Form.Item>
                                        <Form.Item>
                                            <Select
                                                style={{ width: 300 }}
                                                allowClear
                                                placeholder="修改和删除新闻"
                                                optionLabelProp="label"
                                                showSearch
                                                getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
                                            >
                                                {
                                                    optionTitle.map((item, index) => {
                                                        return (
                                                            <Option value={item.title} label={item.title} key={index} className={styles.option}>
                                                                <div onClick={(e: any) => this.editNews(item.id, e)} className={styles.option_title}>{item.title}</div>
                                                                <div className={styles.delete} onClick={(e) => this.ifDeleteNews(item.id, e)}>删除新闻</div>
                                                            </Option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </Form.Item>
                                        <Form.Item style={{ width: '70px' }}>
                                            <Button size="middle" type="primary" htmlType="submit">提交</Button>
                                        </Form.Item>
                                    </div>
                                </div>
                                <Form.Item>
                                    <BraftEditor value={this.state.editorState} onChange={this.handleEditorChange} />
                                </Form.Item>
                            </Form>
                            <Modal title="确认删除" open={ifModalOpen} cancelText="取消" okText="确认" onOk={() => this.deleteNews(newId)} onCancel={() => this.setState({ ifModalOpen: false })} >
                                <p style={{ textAlign: 'center' }}>是否要删除该新闻</p>
                            </Modal>
                        </>
                }
            </>
        );
    }
}

export default Editor;
