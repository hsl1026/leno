import React from "react";
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import MaxLength from 'braft-extensions/dist/max-length'
import axios from 'axios'
import styles from './editor.module.css'
import { Spin, Form, Input, Button, Select, Modal } from 'antd';
import { compress, replacePath } from '../../until/compress'
import Link from "next/link";
import { text, textGetNewsTitle, textDeleteNew, textGetNewsContent, textSaveImg, textdeleteImgsFile } from '../../api/lenoApi'

const Option = Select.Option;

interface EditorState {
    editorState: any,
    loading: boolean,
    coverImg: any[],
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
            coverImg: [],
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
        const compressImgs: any = await compress(base64);
        const newImg: any = await compress(this.state.coverImg)

        var fd = new FormData();
        if (compressImgs) {
            for (let i = 0; i < compressImgs.length; i++) {
                fd.append('compressImgs', compressImgs[i]);
            }
        }
        fd.append('newImg', newImg[0]);

        await axios({
            method: "POST",
            url: textSaveImg,
            data: fd,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            const newCoverImg = res.data[0].shift()
            const contentsAfterReplacement = replacePath(htmlContent, base64, res.data[0])

            axios({
                method: "POST",
                url: text,
                data: {
                    'title': value.title,
                    'newImg': newCoverImg,
                    'content': contentsAfterReplacement,
                    'imgsFile': res.data[1]
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
        }).catch((err) => {
            console.log('错误' + err)
            this.setState({ loading: false })
        })
    }

    //获取新闻封面图
    uploadData = (e: any) => {
        this.setState({
            coverImg: [URL.createObjectURL(e.target.files[0])]
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
                editorState: BraftEditor.createEditorState(res.data[0].content),
            })
            this.formRef.current.setFieldsValue({
                title: res.data[0].title,
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
    deleteNews = async (index: number) => {
        this.setState({ loading: true, ifModalOpen: false })
        await axios({
            method: "get",
            url: textdeleteImgsFile,
            params: {
                'id': index
            }
        }).then(() => {
            axios({
                method: "post",
                url: textDeleteNew,
                params: {
                    'id': index
                }
            }).then((res) => {
                alert(res.data)
                this.setState({ loading: false })
                window.location.reload()
            }).catch((err) => {
                console.log('错误' + err)
                this.setState({ loading: false })
            })
        }).catch((err) => {
            console.log('错误' + err)
            this.setState({ loading: false })
        })
    }

    render() {
        const { loading, optionTitle, ifModalOpen, newId, coverImg } = this.state
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
                                        <Form.Item style={{ width: '30vw' }} name="title" rules={[{ required: true, message: '请输入标题!' }]}>
                                            <Input size="middle" placeholder="请输入标题" allowClear />
                                        </Form.Item>
                                        <Form.Item style={{ width: '20vw', marginLeft: '20px' }} name="newImg" label="封面图：" rules={[{ required: true, message: '请选择新闻封面图!' }]} >
                                            <Input size="middle" type="file" style={{ border: 'none' }} onChange={(e) => this.uploadData(e)} />
                                        </Form.Item>
                                        <Form.Item style={{ marginLeft: '20px' }}>
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
                                        <Form.Item style={{ width: '70px', position: 'absolute', right: '0', top: '0' }}>
                                            <Button size="middle" type="primary" htmlType="submit">提交</Button>
                                        </Form.Item>
                                    </div>
                                </div>
                                <Form.Item>
                                    <BraftEditor value={this.state.editorState} onChange={this.handleEditorChange} contentStyle={{ padding: '0 20vw' }} />
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
