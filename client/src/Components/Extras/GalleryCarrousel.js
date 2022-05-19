import React, { Fragment } from 'react';
import { useRef } from 'react';
import Slider from 'react-slick';

import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';

import { CustomGallery, Item, DefaultLayout } from 'react-photoswipe-gallery';
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';

import './Gallery.css';

const GalleryCarrousel = ({ gallery }) => {
    var settings = {
        className: 'gallery-slider',
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 7600,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 360,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                },
            },
        ],
    };
    const layoutRef = useRef();

    return (
        <Fragment>
            <CustomGallery layoutRef={layoutRef} ui={PhotoswipeUIDefault}>
                <Slider {...settings}>
                    {gallery &&
                        gallery.map((slide, index) => (
                            <div key={slide.src} className='banner'>
                                <div className='projectwrap'>
                                    <Item
                                        id={slide.src}
                                        original={slide.src}
                                        thumbnail={slide.src}
                                        width={slide.width}
                                        height={slide.height}
                                    >
                                        {({ ref, open }) => (
                                            <picture>
                                                <source
                                                    srcSet={`${
                                                        slide.src.includes(
                                                            '.jpg'
                                                        )
                                                            ? slide.src.replace(
                                                                  '.jpg',
                                                                  ''
                                                              )
                                                            : slide.src.replace(
                                                                  '.jpeg',
                                                                  ''
                                                              )
                                                    }.webp`}
                                                    type='image/webp'
                                                />
                                                <img
                                                    ref={ref}
                                                    onClick={open}
                                                    src={slide.src}
                                                    alt={`Galery item ${index}`}
                                                    width={slide.twidth}
                                                    height={slide.theight}
                                                />
                                            </picture>
                                        )}
                                    </Item>
                                </div>
                            </div>
                        ))}
                </Slider>
            </CustomGallery>
            <DefaultLayout
                fullscreenButton={false}
                zoomButton={false}
                ref={layoutRef}
            />
        </Fragment>
    );
};

export default GalleryCarrousel;
