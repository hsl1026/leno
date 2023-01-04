import React from 'react';
import Head from 'next/head'
import { MainFooter } from '../components/Company/company'
import { News } from '../components/News/news'
import { BackgroundImg } from '../components/backgroundImg/backgroundImg'
import { withRouter } from "next/router";
import { useTranslation } from 'react-i18next'

const Home = () => {
    const { t } = useTranslation()
    return (
        <>
            <Head>
                <title>来诺建材</title>
            </Head>
            <BackgroundImg backgroundImg="/home-page.jpg" title={t('logo')} />
            <MainFooter />
            <News />
        </>
    )
}

export default withRouter(Home)

