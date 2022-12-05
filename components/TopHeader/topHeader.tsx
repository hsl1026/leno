/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from 'next/link'
import type { MenuProps } from 'antd';
import { Dropdown, Select } from 'antd';
import ArrowUp from '../../images/arrow-up.png'
import styles from "./topHeader.module.css";
import Image from 'next/image'
import Logo from '../../images/bondly.png'
import Btn from '../../images/btn.png'

interface IMyHeaderState {
    isCollapsed: boolean;
    scrollPos: String;
    showBackTop: boolean;
    changeColor: boolean;
    btnState: boolean;
}

class TopHeader extends React.Component<{}, IMyHeaderState> {
    constructor(props: {}, state: IMyHeaderState) {
        super(props);
        //show为true时回到顶部按钮显示，false时隐藏
        this.state = {
            isCollapsed: false,
            scrollPos: "",
            showBackTop: false,
            changeColor: false,
            btnState: false,
        };

        //将函数里的this指向绑定到当前组件，也就是组件ScrollToTop
        this.changeScrollTopShow = this.changeScrollTopShow.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
    }


    // hashPathname: any = window.location.hash;

    scrollToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    changeScrollTopShow = () => {
        if (window.pageYOffset < 400) {
            this.setState({
                showBackTop: false,
                changeColor: false
            });
        } else {
            this.setState({
                showBackTop: true,
                changeColor: true
            });
        }

        if (window.innerWidth < 900) {
            this.setState({
                btnState: true
            });
        } else {
            this.setState({
                btnState: false
            });
        }
    };

    //挂载事件监听
    componentDidMount() {
        window.addEventListener('load', this.changeScrollTopShow);
        window.addEventListener('resize', this.changeScrollTopShow);
        window.addEventListener("scroll", this.changeScrollTopShow);
    }

    //卸载事件监听
    componentWillUnmount() {
        window.removeEventListener('load', this.changeScrollTopShow);
        window.removeEventListener("scroll", this.changeScrollTopShow);
        window.removeEventListener('resize', this.changeScrollTopShow);
    }

    render() {
        const { showBackTop, changeColor, btnState } = this.state;
        const series = ['floor', 'Solid wood flooring', 'fence', 'Solid wood fence']
        const items: MenuProps['items'] = [
            {
                label: (
                    <Link href={'/product'}>{series[0]}</Link>
                ),
                key: '1',
            },
            {
                label: (
                    <Link href={'/product'}>{series[1]}</Link>
                ),
                key: '2',
            },
            {
                label: (
                    <Link href={'/product'}>{series[2]}</Link>
                ),
                key: '3',
            },
            {
                label: (
                    <Link href={'/product'}>{series[3]}</Link>
                ),
                key: '4',
            }
        ];

        return (
            <div>
                <nav className={`${styles.nav}  container ${changeColor ? styles.back_color : ''}`}>
                    <div className="row align-items-center justify-content-between" style={{ height: '80px' }}>
                        <Link href={'/'}><Image src={Logo} alt="" width={160} height={60} className='col-auto' /></Link>
                        <div className={`col-auto ${styles.series_select}`}>
                            {btnState ?
                                <Dropdown menu={{ items }} placement="bottom" className={styles.dropdown_trigger} getPopupContainer={(triggerNode: any) => triggerNode.parentNode}>
                                    <div style={{ marginRight: '20px' }}><Image src={Btn} width={40} height={40} alt="" objectFit='cover' /></div>
                                </Dropdown>
                                :
                                series.map((item, index) => {
                                    return <Link href={'/product'} key={index}><div className={styles.text}>{item}</div></Link>
                                })
                            }

                            <Select
                                defaultValue="CN"
                                className={styles.language_selector}
                                getPopupContainer={triggerNode => triggerNode.parentNode}
                                options={[
                                    {
                                        value: 'CN',
                                        label: 'CN',
                                    },
                                    {
                                        value: 'EN',
                                        label: 'EN',
                                    }
                                ]}
                            />
                        </div>
                    </div>
                </nav >
                {
                    showBackTop && (
                        <Link href={'/braftEditor'}>
                            <button className={`${styles.braft_editor}`}>
                                <span className={`${styles.braft_editor_span}`}>
                                    新闻编辑
                                </span>
                            </button>
                        </Link>
                    )
                }
                {
                    showBackTop && (
                        <button
                            onClick={this.scrollToTop}
                            id="back-top"
                            className={`${styles.back_top}`}
                            title="Back to top">
                            <span className={`${styles.back_top_span}`}>
                                {/* eslint-disable @next/next/no-img-element */}
                                <img
                                    className="bi bi-arrow-up-short"
                                    src={ArrowUp.src}
                                    style={{ width: "20px" }}
                                    alt="menu-arrow" />
                            </span>
                        </button>
                    )
                }
            </div >
        );
    }
}

export default TopHeader;
