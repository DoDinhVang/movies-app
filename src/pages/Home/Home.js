import React, { useState, useEffect } from 'react'
import HomeMenu from './HomeMenu/HomeMenu'
import MultipleFilms from '../../components/reactSlick/MultipleFilms';
import { useSelector, useDispatch } from 'react-redux';
import { SET_LIST_FILM_COMING_SOON, SET_LIST_FILM_NOW_SHOWING } from '../../redux/types/listFilmType';
import { getInfoOfTheaterSystemAction } from '../../redux/actions/quanLyRapAction';
import HomeCarousel from './HomeCarousel/HomeCarousel';


export default function Home(props) {

    const dispatch = useDispatch();
    const { lstTheaterSystem } = useSelector(state => state.quanLyRapReducer)

    const [cssBtn, setCssBtn] = useState({
        btn1: 'black',
        btn2: 'black',
        borderBtn1: 'none',
        borderBtn2: 'none',
        disable: false
    });

    useEffect(() => {

        dispatch(getInfoOfTheaterSystemAction)
        setCssBtn({
            ...cssBtn,
            btn1: '#12A0D1',
            btn2: 'black',
            borderBtn1: '2px solid #12A0D1',
            borderBtn2: 'none',
            disable: false
        })

    }, [])

    return (
        <div style={{ backgroundColor: '#F5F8F7' }}>
            <HomeCarousel />

            {/* list film  */}
            <section className="text-gray-600 my-14 body-font">
                <div style={{ maxWidth: "80%", margin: '0 auto' }}>
                    <div className="text-center  mb-7">
                        <span style={{ color: `${cssBtn.btn1}`, borderBottom: `${cssBtn.borderBtn1}` }} className={` font-normal text-3xl px-4 scale-50 mr-6 cursor-pointer`} onClick={() => {
                            setCssBtn({
                                ...cssBtn,
                                btn1: '#12A0D1',
                                btn2: 'black',
                                borderBtn1: '2px solid #12A0D1',
                                borderBtn2: 'none',
                                disable: true
                            })
                            dispatch({
                                type: SET_LIST_FILM_NOW_SHOWING
                            })
                        }} >Đang chiếu</span>
                        <span style={{ color: `${cssBtn.btn2}`, borderBottom: `${cssBtn.borderBtn2}` }} className={` font-normal px-4  text-3xl mr-6 cursor-pointer`} onClick={() => {
                            setCssBtn({
                                ...cssBtn,
                                btn2: '#12A0D1',
                                btn1: 'black',
                                borderBtn2: '2px solid #12A0D1',
                                borderBtn1: 'none',
                                disable: true
                            })
                            dispatch({
                                type: SET_LIST_FILM_COMING_SOON
                            })

                        }}>Sắp chiếu</span>
                    </div>
                    <MultipleFilms />
                </div>
            </section >

            {/* cụm rạp */}
            <div className='container  pb-24 mx-auto' style={{ maxWidth: "85%", maxHeight: '1100px' }}>
                <HomeMenu lstTheaterSystem={lstTheaterSystem} />
            </div>

        </div>
    )
}
