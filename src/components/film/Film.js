import React from 'react'
import { history } from '../../App';
import { Rate } from 'antd';
import './film.css'


export default function Film(props) {

    const { film } = props;

    return (
        <>
            <div id='film' style={{ height: "370px", cursor: 'pointer',boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }} className=" bg-gray-100  bg-opacity-75 m-2 rounded-lg overflow-hidden text-center relative">
                <div className='overflow-hidden w-full h-full film__img'>
                    <a href={film.trailer}><i className="fa fa-play film__iconPlay"></i></a>
                    <img src={film.hinhAnh} alt={film.tenPhim} className=" w-full h-full transition duration-500 object-cover" />

                    <div className='film__desc'>
                        <p className='film__name mb-0'>{film.tenPhim}</p>
                        <div className='film__rate mb-0'><Rate className='film__rate' allowHalf defaultValue={2.5} value={film.danhGia / 2} /></div>
                      
                    </div>
                    <button onClick = {()=>{  history.push(`/detail/${film.maPhim}`)}} className = 'film__bookingTicket'>đặt vé</button>
                    <div className='film__overplay'></div>
                </div>
                <div className='px-5 bg-white h-full'>
                    {/* <h2 className='text-base'>{film.tenPhim}</h2>
                    <p className="leading-relaxed mb-3">{film.moTa.slice(0, 50)}...</p> */}
                    {/* <button onClick={() => {
                        history.push(`/detail/${film.maPhim}`)
                    }} className="w-full inline-block absolute left-0 bottom-5 text-xl hover:text-blue-600 " >Đặt Vé
                    </button> */}
                </div>

            </div>
        </>
    )
}
