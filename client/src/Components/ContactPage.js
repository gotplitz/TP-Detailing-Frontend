import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

// Parts
import ScrollToTop from './Extras/ScrollToTop';
import Spinning from './Extras/Spinning';
import PagesTitle from './Layout/PagesTitle';
import ServicesIntro from './Pricing/ServicesIntro';
import HomeContact from './Home/HomeContact';
import ContactInfo from './Contact/ContactInfo';
import HelmetMetaData from './HelmetMetaData';

const ContactPage = () => {
    const [contactContent, setContact] = useState({
        featuredimg: '',
        pagetitle: '',
        pagesubt: '',
        pagedetails: '',
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
                            data.menuname === 'Contact Us' &&
                            setContact({
                                featuredimg: data.featuredimg,
                                pagetitle: data.pagetitle,
                                pagedetails: data.pagedetails,
                                pagesubt: data.pagesubt,
                                extraboxes: data.extraboxes,
                            }),
                        setLoading(false)
                    );
                });
        };

        return GetData();

        // eslint-disable-next-line
    }, []);

    return (
        <div className='page-body gallery-page contact-us-page'>
            <ScrollToTop />
            <HelmetMetaData
                title={contactContent.pagetitle}
                description={contactContent.pagedetails.substring(0, 150)}
                image={contactContent.featuredimg}
            ></HelmetMetaData>

            {loading ? (
                <section>
                    <Spinning />
                </section>
            ) : (
                <Fragment>
                    <PagesTitle
                        img={contactContent.featuredimg}
                        title={contactContent.pagetitle}
                    />
                    <ServicesIntro
                        title={contactContent.pagesubt}
                        content={contactContent.pagedetails}
                    />
                    {contactContent.extraboxes &&
                        contactContent.extraboxes.length !== 0 && (
                            <ContactInfo boxes={contactContent.extraboxes} />
                        )}
                    <HomeContact />
                </Fragment>
            )}
        </div>
    );
};

export default ContactPage;
