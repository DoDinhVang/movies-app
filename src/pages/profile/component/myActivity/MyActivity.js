import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserAccountInfo } from '../../../../redux/actions/quanLyNguoiDungAction'
import moment from 'moment'
import './myActivity.css'
import _ from 'lodash'

export default function MyActivity() {

  const { userAccountInfo } = useSelector(state => state.quanLyNguoiDungReducer)
  const { thongTinDatVe } = userAccountInfo
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserAccountInfo())
  }, [])

  const renderMyActivity = () => {
    return thongTinDatVe.map((item, index) => {
      return <div key={index} className='card flex items-center'>
        <img className='card_img h-full w-48 object-cover mr-8' src={item.hinhAnh} alt={item.tenPhim}></img>
        <div>
          <div className="details">
            <div className='booking-date flex items-center'>
              <h6 className="primary-text mr-8">Ngày Đặt: </h6>
              <h6 className="secondary-text"> {moment(item.ngayDat).format(' DD/MM/YY')} </h6>
            </div>
            <div className="rating flex items-center">
              <h6 className="primary-text mr-8"> Tên Phim: </h6>
              <h6 className="secondary-text"> {item.tenPhim} </h6>
            </div>
            <div className="activity flex items-center">
              <h6 className="primary-text mr-8">Giá Vé:</h6>
              <h6 className="secondary-text"> {item.giaVe} </h6>
            </div>
            <div className="activity flex items-center">
              <h6 className="primary-text mr-8">Ghế Đặt</h6>
              {item.danhSachGhe.map((gheDat, index) => {
                return <span key={index} style={{ marginRight: '8px' }} className="secondary-text inline-block">{gheDat.tenGhe}</span>
              })}

            </div>
          </div>
          <div className="desc activity flex items-center">
            <h6 className="primary-text">{_.first(item.danhSachGhe).tenHeThongRap}</h6>
            <h6 className="secondary-text">{_.first(item.danhSachGhe).tenRap}</h6>
          </div>
        </div>
      </div>
    })
  }

  return (
    <div id='myActivity' className='text-white'>
      {renderMyActivity()}
    </div>
  )
}
