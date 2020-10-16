import React from 'react';

import Slider from 'react-slick';
import Article from './Article';

export default function News({ headlines }) {

    const news = headlines.map((article, index) => 
    <Article article={article} key={index} />)

    return <Slider
        lazyLoad={true}
        arrows={false} children={news}
        dots={true}
        speed={800}
        pauseOnDotsHover={false}
        pauseOnHover={false}
        pauseOnFocus={false}
        swipeToSlide={true}
        autoplaySpeed={10000}
        autoplay={true} />

}