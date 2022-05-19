import React from 'react';
import Slider from 'react-slick';

const Testimonials = ({ testimonials }) => {
    var settings = {
        className: 'gallery-slider',
        centerPadding: '20px',
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 7600,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
    };

    return (
        <Slider {...settings}>
            {testimonials &&
                testimonials
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map((slide) => (
                        <div key={slide._id} className='banner'>
                            <div className='ht-item'>
                                <div
                                    className='content'
                                    dangerouslySetInnerHTML={{
                                        __html: slide.testimonialbody,
                                    }}
                                ></div>
                                <h6>{slide.testimonialtitle}</h6>
                            </div>
                        </div>
                    ))}
        </Slider>
    );
};

export default Testimonials;
