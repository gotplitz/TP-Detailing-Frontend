import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

// css
import './About/about.css';

// Parts
import ScrollToTop from './Extras/ScrollToTop';
import Spinning from './Extras/Spinning';
import PagesTitle from './Layout/PagesTitle';
import AboutIntro from './About/AboutIntro';
import WhyContent from './About/WhyContent';
import HomeTestimonials from './Home/HomeTestimonials';
import HomeContact from './Home/HomeContact';
import HelmetMetaData from './HelmetMetaData';

const AboutPage = () => {
    const [aboutcontent, setAboutcontent] = useState({
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
                            data.menuname === 'About Us' &&
                            setAboutcontent(data),
                        setLoading(false)
                    );
                });
        };

        return GetData();

        // eslint-disable-next-line
    }, []);

    return (
        <div className='page-body about-us'>
            <ScrollToTop />
            <HelmetMetaData
                title={aboutcontent.pagetitle}
                description={aboutcontent.pagedetails.substring(0, 150)}
                image={aboutcontent.featuredimg}
            ></HelmetMetaData>

            {loading ? (
                <section>
                    <Spinning />
                </section>
            ) : (
                <Fragment>
                    <PagesTitle
                        img={aboutcontent.featuredimg}
                        title={aboutcontent.pagetitle}
                    />
                    <AboutIntro
                        img={aboutcontent.gallery[0]}
                        subtitle={aboutcontent.pagesubt}
                        content={aboutcontent.pagedetails}
                    />
                    <WhyContent box={aboutcontent.extraboxes[0]} />
                    <HomeTestimonials />
                    <HomeContact />
                </Fragment>
            )}
        </div>
    );
};

export default AboutPage;
