import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

// Parts
import ScrollToTop from './Extras/ScrollToTop';
import Spinning from './Extras/Spinning';
import PagesTitle from './Layout/PagesTitle';
import ServicesIntro from './Pricing/ServicesIntro';
import MainGallery from './Gallery/MainGallery';
import HomeContact from './Home/HomeContact';
import HelmetMetaData from './HelmetMetaData';

const GalleryPage = () => {
    const [galContent, setGalcontent] = useState({
        featuredimg: '',
        pagetitle: '',
        pagesubt: '',
        pagedetails: '',
        gallery: [],
    });
    const [ImgDim, setImgDim] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const GetData = async () => {
            await axios
                .get('https://admin.gettpd.com/api/pages')
                .then((res) => {
                    res.data.filter(
                        (data) =>
                            data.menuname === 'Gallery' &&
                            setGalcontent({
                                featuredimg: data.featuredimg,
                                pagetitle: data.pagetitle,
                                pagedetails: data.pagedetails,
                                pagesubt: data.pagesubt,
                                gallery: data.gallery,
                            }),
                        setLoading(false)
                    );
                });
        };

        return GetData();

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        async function GetDims() {
            setImgDim([]);
            for (let i = 0; i < galContent.gallery.length; i++) {
                let img = new Image();
                img.src = `https://admin.gettpd.com/uploads/${galContent.gallery[i].fileName}`;
                img.onload = () => {
                    let ratioh = (350 * img.height) / img.width;
                    setImgDim((ImgDim) => [
                        ...ImgDim,
                        {
                            src: img.src,
                            width: img.width,
                            height: img.height,
                            twidth: 350,
                            theight: ratioh,
                        },
                    ]);
                };
            }
        }

        return GetDims();
    }, [galContent.gallery, galContent.pagetitle]);

    let newImageSet = ImgDim.sort((a, b) => a._id - b._id).map((img) => img);

    return (
        <div className='page-body gallery-page'>
            <ScrollToTop />
            <HelmetMetaData
                title={galContent.pagetitle}
                description={galContent.pagedetails.substring(0, 150)}
                image={galContent.featuredimg}
            ></HelmetMetaData>

            {loading ? (
                <section>
                    <Spinning />
                </section>
            ) : (
                <Fragment>
                    <PagesTitle
                        img={galContent.featuredimg}
                        title={galContent.pagetitle}
                    />
                    <ServicesIntro
                        title={galContent.pagesubt}
                        content={galContent.pagedetails}
                    />
                    <MainGallery gallery={newImageSet} />
                    <HomeContact />
                </Fragment>
            )}
        </div>
    );
};

export default GalleryPage;
