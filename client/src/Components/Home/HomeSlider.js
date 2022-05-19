import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import Spinning from '../Extras/Spinning';
import { Link } from 'react-router-dom';

const HomeSlider = () => {
    var settings = {
        className: 'banner-slider',
        dots: false,
        infinite: true,
        autoplay: true,
        fade: true,
        speed: 2000,
        autoplaySpeed: 7600,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
    };

    const [sliders, setSliders] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function GetData() {
            await axios
                .get('https://admin.gettpd.com/api/sliders')
                .then((res) => {
                    setSliders(res.data);
                    setLoading(false);
                });
        }

        return GetData();

        // eslint-disable-next-line
    }, []);

    return (
        <div className='banner-wrap'>
            {loading ? (
                <section>
                    <Spinning />
                </section>
            ) : (
                <Slider {...settings}>
                    {sliders.length > 0 &&
                        sliders
                            .sort((a, b) => new Date(a.date) - new Date(b.date))
                            .map((slide) => (
                                <div key={slide._id} className='banner'>
                                    <div className='container'>
                                        <section>
                                            <div className='main-title'>
                                                {slide.subtitle && (
                                                    <h4
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                slide.subtitle,
                                                        }}
                                                    ></h4>
                                                )}
                                                <h2
                                                    dangerouslySetInnerHTML={{
                                                        __html: slide.title,
                                                    }}
                                                ></h2>
                                                {slide.moredetails && (
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                slide.moredetails,
                                                        }}
                                                    ></div>
                                                )}
                                                {slide.btnlone !== '' && (
                                                    <Link
                                                        to={slide.btnlone}
                                                        className='fm-button'
                                                    >
                                                        <span>
                                                            {slide.btnone}
                                                        </span>
                                                    </Link>
                                                )}
                                            </div>
                                        </section>
                                    </div>

                                    <div className='banner-outer'>
                                        <picture>
                                            <source
                                                media='(max-width: 600px)'
                                                srcSet={`https://admin.gettpd.com/uploads/${slide.img.replace(
                                                    '.jpg',
                                                    ''
                                                )}.webp`}
                                                alt={slide.title}
                                                width='600'
                                                height='400'
                                            />
                                            <source
                                                srcSet={`https://admin.gettpd.com/uploads/${slide.img.replace(
                                                    '.jpg',
                                                    ''
                                                )}.webp`}
                                                type='image/webp'
                                            />
                                            <img
                                                src={`https://admin.gettpd.com/uploads/${slide.img}`}
                                                alt={slide.title}
                                                width='1500'
                                                height='1000'
                                            />
                                        </picture>
                                    </div>
                                </div>
                            ))}
                </Slider>
            )}
        </div>
    );
};

export default React.memo(HomeSlider);
