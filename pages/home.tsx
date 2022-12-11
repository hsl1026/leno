import React from 'react';
import Head from 'next/head'
import { MainFooter } from '../components/Company/company'
import { News } from '../components/News/news'
import { BackgroundImg } from '../components/backgroundImg/backgroundImg'
import { withRouter } from "next/router";

const Home = () =>
    <>
        <Head>
            <title>来诺建材</title>
        </Head>
        <BackgroundImg backgroundImg="/home-page.png" title="LENO" />
        <MainFooter />
        <News />
    </>

export default withRouter(Home)

