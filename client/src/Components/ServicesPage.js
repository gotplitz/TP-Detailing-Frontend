import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// CSS
import './Services/Services.css';

// Parts
import ScrollToTop from './Extras/ScrollToTop';
import Spinning from './Extras/Spinning';
import PagesTitle from './Layout/PagesTitle';
import MainContent from './Services/MainContent';
import HomeGallery from './Home/HomeGallery';
import HomeContact from './Home/HomeContact';
import HelmetMetaData from './HelmetMetaData';

const ServicePage = ({ match }) => {
    const [servicecontent, setServicecontent] = useState({
        featuredimg: '',
        gallery: [],
        menuname: '',
        servicedetails: '',
        servicelink: '',
        servicestatus: true,
        servicesubt: '',
        servicetitle: '',
        extraboxes: [],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const GetData = async () => {
            await axios
                .get('https://admin.gettpd.com/api/services')
                .then((res) => {
                    res.data.map((rd) =>
                        rd.servicelink === match.params.servicelink
                            ? (setServicecontent(rd), setLoading(false))
                            : setLoading(false)
                    );
                });
        };

        return GetData();

        // eslint-disable-next-line
    }, [match.params.servicelink]);

    return (
        <div className='service-body service-us'>
            <ScrollToTop />
            <HelmetMetaData
                title={`${servicecontent.servicetitle} | ${servicecontent.servicesubt}`}
                description={servicecontent.servicedetails.substring(0, 150)}
                image={servicecontent.featuredimg}
            ></HelmetMetaData>

            {loading ? (
                <section>
                    <Spinning />
                </section>
            ) : (
                <Fragment>
                    {servicecontent.servicetitle === '' &&
                    servicecontent.servicedetails === '' ? (
                        <div className='page-body not-found'>
                            <ScrollToTop />
                            <section>
                                <h1>
                                    <i className='fas fa-exclamation-triangle'></i>{' '}
                                    404
                                </h1>
                                <p style={{ marginBottom: 50 }}>
                                    {' '}
                                    The page you are trying to access doesn't
                                    exist.
                                </p>
                                <div className='button-read-more'>
                                    <Link to='/'>Back to Home</Link>
                                </div>
                            </section>
                        </div>
                    ) : (
                        <Fragment>
                            <PagesTitle
                                img={servicecontent.featuredimg}
                                title={servicecontent.servicetitle}
                            />
                            <MainContent
                                box={servicecontent.extraboxes[0]}
                                subtitle={servicecontent.servicesubt}
                                content={servicecontent.servicedetails}
                            />
                            {servicecontent.gallery && (
                                <HomeGallery
                                    gallery={servicecontent.gallery}
                                    title={servicecontent.servicetitle}
                                />
                            )}
                            <HomeContact />
                        </Fragment>
                    )}
                </Fragment>
            )}
        </div>
    );
};

export default ServicePage;
