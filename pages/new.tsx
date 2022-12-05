import React from 'react';
import styles from './commonModule/new.module.css'
import Image from "next/image";
import { TitleBlock } from '../components/TitleBlock/titleBlock'
import Head from "next/head";
import { BackgroundImg } from '../components/backgroundImg/backgroundImg'
import axios from 'axios';
import { textNewsBox } from '../api/lenoApi'

const New = ({ post }: any) => {
    return (<>
        <Head>
            <title>来诺建材</title>
        </Head>
        <main>
            <BackgroundImg backgroundImg="/new.jpg" title="新闻报道" />
            <TitleBlock title={post.title} backgroundColor="#303030" />
            <div className={styles.content}>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
        </main>
    </>)
}
export async function getStaticProps() {
    const data = await axios.get(textNewsBox)

    return {
        props: { post: data.data[0] },
    }
}

export default New