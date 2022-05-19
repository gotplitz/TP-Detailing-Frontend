import React, { useState, useEffect, Fragment, lazy } from 'react';
import LazyLoad from 'react-lazyload';
import axios from 'axios';

// CSS
import './Home/home.css';

// Parts
import ScrollToTop from './Extras/ScrollToTop';
import Spinning from './Extras/Spinning';
import HelmetMetaData from './HelmetMetaData';
const HomeSlider = lazy(() => import('./Home/HomeSlider'));
const HomeIntro = lazy(() => import('./Home/HomeIntro'));
const HomeServices = lazy(() => import('./Home/HomeServices'));
const HomeGallery = lazy(() => import('./Home/HomeGallery'));
const HomePricing = lazy(() => import('./Home/HomePricing'));
const HomeTestimonials = lazy(() => import('./Home/HomeTestimonials'));
const HomeContact = lazy(() => import('./Home/HomeContact'));
const HomePosts = lazy(() => import('./Home/HomePosts'));

const HomePage = () => {
    const [homecontent, setHomecontent] = useState({
        featuredimg: '',
        gallery: [],
        menuname: '',
        pagedetails: '',
        pagelink: '',
        pagestatus: true,
        pagesubt: '',
        pagetitle: '',
        extraboxes: [],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const GetData = async () => {
            await axios
                .get('https://admin.gettpd.com/api/pages')
                .then((res) => {
                    res.data.filter(
                        (data) =>
                            data.menuname === 'Home' && setHomecontent(data),
                        setLoading(false)
                    );
                });
        };

        return GetData();

        // eslint-disable-next-line
    }, []);

    return (
        <div className='home-body'>
            <ScrollToTop />
            <HelmetMetaData
                title={homecontent.pagetitle}
                description={homecontent.pagedetails.substring(0, 150)}
                image={homecontent.featuredimg}
            ></HelmetMetaData>
            <HomeSlider />
            {loading && homecontent !== {} ? (
                <section>
                    <Spinning />
                </section>
            ) : (
                <Fragment>
                    <HomeIntro
                        img={homecontent.featuredimg}
                        title={homecontent.pagetitle}
                        subtitle={homecontent.pagesubt}
                        content={homecontent.pagedetails}
                    />
                    <HomeServices />

                    <LazyLoad
                        height={575}
                        placeholder={<Spinning />}
                        debounce={true}
                        offset={100}
                    >
                        <HomeGallery gallery={homecontent.gallery} once />
                    </LazyLoad>

                    <HomePricing
                        box={homecontent.extraboxes[0]}
                        title={homecontent.pagetitle}
                    />
                    <HomeTestimonials />
                    <HomeContact />
                    <HomePosts />
                </Fragment>
            )}
        </div>
    );
};

export default HomePage;
