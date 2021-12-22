import React, { Fragment, useEffect } from 'react'
import { Tabs } from 'antd';
import { NavLink } from 'react-router-dom'
import moment from 'moment';
import {useDispatch} from 'react-redux'
import { CHANGE_TABS_ANDT_DESIGN } from '../../../redux/types/tabsAntDesignType';
import { SHOW_LOADING } from '../../../redux/types/loadingType';

const { TabPane } = Tabs;

export default function HomeMenu(props) {

    const { lstTheaterSystem } = props
    const dispatch =  useDispatch();

    const renderInfoTheaterSystem = () => {
        return lstTheaterSystem.map((item, index) => {
            return <TabPane tab={<img className = 'object-cover' style={{ height: '50px', width: '50px' }} src={item.logo} alt={item.tenHeThongRap}></img>} key={index}>
                <Tabs tabPosition='left' id = 'homeMenu' >
                    {item.lstCumRap?.map((cumRap, index) => {
                        return <TabPane id ='hello' style={{ height: '100%' }} key={index} tab={
                            <div>
                                <div className='flex py-2 items-center leading-3' >
                                    <img className = 'object-cover' style={{ height: '60px', width: '60px' }} src={cumRap.hinhAnh} alt={cumRap.tenCumRap}></img>
                                    <div className='ml-2 text-left'>
                                        <span className=' font-bold  text-sm'>{item.tenHeThongRap}</span>
                                        <p style={{ width: '280px', whiteSpace: 'normal' }} className='m-0 text-black text-sm text-opacity-40 font-medium'>{cumRap.diaChi}</p>
                                        <button className='text-red-500 text-sm'>[chi tiết]</button>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        }>
                            <div className='overflow-y-auto' style={{ height: 600 }}>
                                {cumRap.danhSachPhim?.map((film, index) => {
                                    return <Fragment key={index}>
                                        <div className="mb-3">
                                            <div className='flex py-2 mt-4 text-black font-medium'>
                                                <img className='mr-2 object-cover' style={{ height: '55px', width: "55px" }} src={film.hinhAnh} alt={film.tenPhim}></img>
                                                <div>
                                                    <p className='mb-0'>{film.tenPhim}</p>
                                                    <p className='text-black opacity-50'>Rạp: {cumRap.tenCumRap}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-wrap'>
                                                {film.lstLichChieuTheoPhim.length > 10 ? film.lstLichChieuTheoPhim.slice(0, 10).map((showtimes, index) => {
                                                    return <NavLink key={index} to={`./checkout/${showtimes.maLichChieu}`} onClick={()=>{
                                                       
                                                        dispatch({
                                                            type: CHANGE_TABS_ANDT_DESIGN,
                                                            visibleTabs: '1'
                                                        })
                                                    }} className='bg-black rounded-md hover:text-red-500 bg-opacity-5 border font-bold  inline-block py-2 px-3 mt-2 mr-2'>
                                                        {moment(showtimes.ngayChieuGioChieu).format('hh:mm A')}
                                                    </NavLink>

                                                }) : film.lstLichChieuTheoPhim.map((showtimes, index) => {
                                                    return <NavLink key={index} to = {`./checkout/${showtimes.maLichChieu}`} onClick={()=>{
                                                        dispatch({
                                                            type: CHANGE_TABS_ANDT_DESIGN,
                                                            visibleTabs: '1'
                                                        })
                                                    }}
                                                    className=' hover:text-red-500 rounded-md bg-opacity-5 border font-bold  inline-block py-2 px-3 mt-2 mr-2'>
                                                        {moment(showtimes.ngayChieuGioChieu).format('hh:mm A')}
                                                    </NavLink>

                                                })}
                                            </div>

                                        </div>
                                        <hr />
                                    </Fragment>
                                })}
                            </div>

                        </TabPane>
                    })}

                </Tabs>

            </TabPane >
        })
    }

    return (
        <>
            <Tabs style={{
                height: 600,
              
            }} tabPosition='left' className='border border-black border-opacity-10 '>
                {renderInfoTheaterSystem()}
            </Tabs>
        </>
    )
}
