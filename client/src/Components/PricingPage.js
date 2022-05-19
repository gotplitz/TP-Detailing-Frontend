import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

// css
import './Pricing/pricing.css';

// Parts
import ScrollToTop from './Extras/ScrollToTop';
import Spinning from './Extras/Spinning';
import PagesTitle from './Layout/PagesTitle';
import ServicesIntro from './Pricing/ServicesIntro';
import ServicesPrices from './Pricing/ServicesPrices';
import HomeContact from './Home/HomeContact';
import HelmetMetaData from './HelmetMetaData';

const PricingPage = () => {
    const [pricingcontent, setPricingcontent] = useState({
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
                            data.menuname === 'Pricing' &&
                            setPricingcontent(data),
                        setLoading(false)
                    );
                });
        };

        return GetData();

        // eslint-disable-next-line
    }, []);

    return (
        <div className='page-body pricing-us'>
            <ScrollToTop />
            <HelmetMetaData
                title={pricingcontent.pagetitle}
                description={pricingcontent.pagedetails.substring(0, 150)}
                image={pricingcontent.featuredimg}
            ></HelmetMetaData>

            {loading ? (
                <section>
                    <Spinning />
                </section>
            ) : (
                <Fragment>
                    <PagesTitle
                        img={pricingcontent.featuredimg}
                        title={pricingcontent.pagetitle}
                    />
                    <ServicesIntro
                        title={pricingcontent.pagesubt}
                        content={pricingcontent.pagedetails}
                    />
                    <ServicesPrices boxes={pricingcontent.extraboxes} />
                    <HomeContact />
                </Fragment>
            )}
        </div>
    );
};

export default PricingPage;
