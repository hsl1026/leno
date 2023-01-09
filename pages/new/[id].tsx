import React, { useEffect, useState } from 'react';
import styles from '../commonModule/new.module.css'
import { TitleBlock } from '../../components/TitleBlock/titleBlock'
import Head from "next/head";
import { BackgroundImg } from '../../components/backgroundImg/backgroundImg'
import axios from 'axios';
import { textGetNewsContent } from '../../api/lenoApi'
import { useRouter } from "next/router";
import { useTranslation } from 'react-i18next'

const New = () => {
    const router = useRouter();
    const { t } = useTranslation()
    const [newsContent, setNewsContent]: any = useState({})

    useEffect(() => {
        (async function () {
            await axios({
                method: "get",
                url: textGetNewsContent,
                params: {
                    'id': router.query.id
                }
            }).then((res) => {
                setNewsContent(res.data[0])
            })

            document.body.scrollTop = 0;
        })()
    }, [router.query.id]);

    return (<>
        <Head>
            <title>来诺建材</title>
        </Head>
        <main>
            <BackgroundImg backgroundImg="/new.jpg" title={t('news.title')} />
            <TitleBlock title={newsContent?.title} backgroundColor="#303030" />
            <div className={styles.content}>
                <div dangerouslySetInnerHTML={{ __html: newsContent?.content }} />
            </div>
        </main>
    </>)
}

export default New