import React, { useEffect } from 'react'
import { Carousel } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { getCarouselAction } from '../../../redux/actions/quanLyPhimAction';
import "./homecarousel.css"

const contentStyle = {
    height: '700px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
};
export default function HomeCarousel() {

    const { bannerList } = useSelector(state => state.carouselReducer)

    const dispatch = useDispatch();
    const renderBanner = () => {
        return bannerList.map((banner, index) => {
            return <div key={index}>
                <div style={{ ...contentStyle, backgroundImage: `url(${banner.hinhAnh})` }}>

                </div>
            </div>
        })
    }
    useEffect(() => {
        dispatch(getCarouselAction) 
    }, [])


    return (
        <Carousel autoplay='true' effect="fade" className='absolute top-0 left-0'>
            {renderBanner()}
        </Carousel>
    )
}
