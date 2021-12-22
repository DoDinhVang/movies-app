import React, { useEffect } from 'react'
import './detail.css'
import { Progress, Rate } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { getShowtimes } from '../../redux/actions/quanLyRapAction';
import moment from 'moment';
import { Tabs } from 'antd';
import { history } from '../../App'
import { CHANGE_TABS_ANDT_DESIGN } from '../../redux/types/tabsAntDesignType';

const { TabPane } = Tabs;

const detailBackground = {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    with: "100%",
    height: "1000px"

}
export default function Detail(props) {

    const { showtimes } = useSelector(state => state.listFilmReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        const { id } = props.match.params;
        dispatch(getShowtimes(id))
        window.scrollTo(0, 0)

    }, [])

    return (
        <section id='detail' style={{ ...detailBackground, backgroundImage: `url(${showtimes.hinhAnh})` }}>
            <div className='detail_container'>
                <div className='detail_mainInfo  flex justify-between py-9 px-16'>
                    <div className='detail_filmPoster ' style={{ height: '380px' }}>
                        <img className='w-full h-full absolute top-0 left-0 object-cover rounded-md transition duration-500' src={showtimes.hinhAnh} alt={showtimes.tenPhim}></img>
                        <a href={showtimes.trailer} className='btnPlay inline-block'><i className="fa fa-play"></i></a>
                        <div className='overplay'></div>
                    </div>
                    <div className='detail_filmInfo flex items-center font-mono mx-8' style={{ width: '48%' }}>
                        <div>
                            <span className='text-sm'>{moment(showtimes.ngayKhoiChieu).format("DD-MM-YYYY")}</span>
                            <p>{showtimes.tenPhim}</p>
                            <p className='text-sm'>{(showtimes.moTa?.length > 100) ? showtimes.moTa.slice(0, 100) : showtimes.moTa}</p>
                        </div>
                    </div>
                    <div className='detail_circleStar text-center'>
                        <div>
                            <Progress className='text-white' type="circle" percent={showtimes.danhGia * 10} strokeColor='#4cd137' format={(percent) => `${percent / 10}`} />
                            <div className='mt-3 flex'>
                                <Rate allowHalf defaultValue={0} value={showtimes.danhGia / 2} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='detail_showingSession py-5 px-14'>
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="Lịch chiếu" key="1" className='bg-white'>
                            <Tabs tabPosition={'left'} id='showingMain'>
                                {showtimes.heThongRapChieu?.map((hethongRap, index) => {

                                    return <TabPane tab={<img style={{
                                        height: 50,
                                        width: 50,
                                        objectFit: 'cover'
                                    }} src={hethongRap.logo} alt={hethongRap.tenHeThongRap}></img>} key={index}>

                                        {hethongRap.cumRapChieu?.map((cumRap, index) => {
                                            return <div key={index} className='py-4'>
                                                <div className='flex'>
                                                    <img style={{
                                                        width: 60,
                                                        height: 60,
                                                        objectFit: 'cover'
                                                    }} className='mr-3' src={cumRap.hinhAnh} alt={cumRap.tenCumRap}></img>
                                                    <div>
                                                        <p>{cumRap.tenCumRap}</p>
                                                        <p>{cumRap.diaChi}</p>
                                                    </div>
                                                </div>
                                                <div className='grid grid-cols-6'>
                                                    {cumRap.lichChieuPhim?.map((lichChieu, index) => {
                                                        return <p key={index} onClick={() => {
                                                            history.push(`/checkout/${lichChieu.maLichChieu}`)
                                                            dispatch({
                                                                type: CHANGE_TABS_ANDT_DESIGN,
                                                                visibleTabs: '1'
                                                            })
                                                        }} style={{
                                                            color: 'white',
                                                            backgroundColor: '#09AFE4',
                                                            borderRadius: '5px',
                                                            cursor: 'pointer'
                                                        }} className='py-1 px-2 text-center mr-3'>{moment(lichChieu.ngayKhoiChieu).format('hh:mm A')}</p>
                                                    })}

                                                </div>
                                                <hr></hr>
                                            </div>
                                        })}


                                    </TabPane>
                                })
                                }

                            </Tabs>
                        </TabPane>

                        <TabPane tab="Thông tin" key="2" className='text-white text-sm'>
                            <div className='flex justify-around'>
                                <div className='flex justify-between'>
                                    <div className='mr-10'>
                                        <p>Ngày công chiếu</p>
                                        <p>Đạo diễn</p>
                                        <p>Diễn Viên</p>
                                        <p>Thể loại</p>
                                        <p>định dạng</p>
                                        <p>Quốc gia SX</p>
                                    </div>
                                    <div>
                                        <p>28/11/2021</p>
                                        <p>	Yamada Naoko</p>
                                        <p>	Irino Miyu, Hayami Saori, Yūkivv Aoi</p>
                                        <p>tâm lý, tình cảm, học đường</p>
                                        <p>2D/Digital</p>
                                        <p>Nhật Bản</p>
                                    </div>

                                </div>
                                <div>Nội Dung</div>
                            </div>
                        </TabPane>
                        <TabPane tab="Đánh giá" key="3">

                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </section>
    )
}
