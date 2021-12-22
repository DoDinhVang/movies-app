import React, { Fragment, useEffect } from 'react'
import './checkOut.css'
import { useSelector, useDispatch } from 'react-redux'
import { getTicketsListAction, quanLyDatVeAction, selectingSeatsAction } from '../../redux/actions/quanLyDatVeAction';
import { USER_LOGIN } from '../../utilities/settings/config';
import { getUserAccountInfo } from '../../redux/actions/quanLyNguoiDungAction';
import _ from 'lodash'
import moment from 'moment';
import { Tabs } from 'antd';
import { CHANGE_TABS_ANDT_DESIGN } from '../../redux/types/tabsAntDesignType';
import { connecting } from '../../index';
import { SET_OTHER_USER_BOOKING } from '../../redux/types/QuanLyDatVeType';

const { TabPane } = Tabs;


function BookingTickets(props) {

    const maLichChieu = props.match.params.id;

    const { cinemaRoomInfo, bookingSeats, seatsOfOtherUserBooking } = useSelector(state => state.quanLyDatVeReducer);
    const { danhSachGhe, thongTinPhim } = cinemaRoomInfo;
    const user = JSON.parse(localStorage.getItem(USER_LOGIN))
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0,0)

        dispatch(quanLyDatVeAction(maLichChieu))

        //GỌI DANH SÁCH CÁC GHẾ NGUOI DÙNG KHÁC ĐANG ĐẶT
        connecting.invoke('loadDanhSachGhe', props.match.params.id) // hàm loadDanhSachGhe được định nghĩa từ bên backend với tham số đầu vào là mã lịch chiếu

        // lắng nghe sự kiện datVeThanhCong (datVeThanhCong là phương thưc được định nghĩa từ backend)
        connecting.on('datVeThanhCong', () => {
            dispatch(quanLyDatVeAction(maLichChieu))
        })


        //tự động load danh sach ghế dang dat từ sever KHI CÓ  TÍN HIỆU TỪ SERVER (TÍN HIEUJ Ở ĐÂY LÀ HÀM selectingSeatsAction và loadDanhSachGhe)
        connecting.on('loadDanhSachGheDaDat', (danhSachGheDangDat) => { //loadDanhSachGheDaDat là 1 hàm được định nghĩa từ bên backend

            // lây danh sach ghe, thông tin nguoi dung khac dang dat  TỪ SEVER
            let otherUserBooking = danhSachGheDangDat.filter(item => item.taiKhoan !== JSON.parse(localStorage.getItem(USER_LOGIN)).taiKhoan)
            // gộp danh dách các ghế của tất cả các user
            let chairsOfOtherUserBookkking = otherUserBooking.reduce((chairsList, item, index) => {

                const chairs = JSON.parse(item.danhSachGhe) // ở đây chairs là một cái mảng danh sách ghê
                // console.log('chairs', chairs)
                return [...chairsList, ...chairs] // ---chairs dc chuyển về 1  danh sách các đối tượng ghế
            }, [])
            // loại bỏ ghê mà dc đặt trùng nhau (yếu tố này xảy ra do tốc độ mạng load do mỗi user sử dụng là khác nhau)
            chairsOfOtherUserBookkking = _.uniqBy(chairsOfOtherUserBookkking, 'maGhe')

            dispatch({ // dispatch lên reducer đẻ load lai danh sach ghe nguoi dung khac dang dat
                type: SET_OTHER_USER_BOOKING,
                seatsOfOtherUserBooking: chairsOfOtherUserBookkking
            })

        })

    }, []);


    const renderSeats = () => {

        return danhSachGhe.map((ghe, index) => {

            const ghe_sold = ghe.daDat ? 'ghe_sold' : '';
            const ghe_vip = ghe.loaiGhe === 'Thuong' ? '' : 'ghe_vip';
            const ghe_booking = bookingSeats.findIndex(item => item.maGhe === ghe.maGhe) === -1 ? '' : 'ghe_booking';
            const ghe_other_user_booking = seatsOfOtherUserBooking.findIndex(seatsOfOtherUserBooking => seatsOfOtherUserBooking.maGhe === ghe.maGhe) === -1 ? '' : 'ghe_other_user_booking'

            return <Fragment key={index} >
                <button onClick={() => {

                    dispatch(selectingSeatsAction(ghe, props.match.params.id)) //props.match.param.id = mã lịch chiếu

                }} disabled={ghe.daDat || ghe_other_user_booking !== ''} className={`ghe ${ghe_sold} ${ghe_vip} ${ghe_booking} ${ghe_other_user_booking}`}>
                    {ghe.daDat || ghe_other_user_booking !== '' ? <i className="fa fa-times text-white"></i> : `${ghe.stt}`}
                </button>
                {++index % 16 === 0 ? <p> </p> : ''}
            </Fragment>
        })

    }

    return (
        <div className='checkOut_container grid grid-cols-12 p-7'>
            <div className='col-span-8'>
                <div className='screen '></div>
                <div className='flex items-center justify-center mt-9'>
                    <span className='flex items-center'><button disabled className='ghe' style={{
                        cursor: 'initial',
                        pointerEvents: 'none'
                    }}></button>Ghế Thường</span>
                    <span className='flex items-center mx-6'> <button disabled className='ghe ghe_vip' style={{
                        cursor: 'initial', pointerEvents: 'none'
                    }}></button>Ghế Vip</span>
                    <span className='flex items-center'><button disabled className='ghe ghe_sold' style={{
                        cursor: 'initial', pointerEvents: 'none'
                    }}><i className="fa fa-times text-white"></i></button>Đã Bán</span>
                    <span className='flex items-center'><button disabled className='ghe ghe_other_user_booking ml-6' style={{
                        cursor: 'initial', pointerEvents: 'none'
                    }}><i className="fa fa-times text-white"></i></button>Ghế Người khách hàng khác đang đặt</span>
                </div>
                <div className='seats mt-10 text-center'>
                    {renderSeats()}
                </div>

            </div>
            <div className='col-span-4 px-14 py-7' style={{
                boxShadow: ' rgba(0, 0, 0, 0.1) 0px 4px 12px'

            }}>

                <div className='checkOut__filmPoster mb-5'>

                    <img style={{
                        height: 350,
                        width: '100%',
                        objectFit: 'cover',
                    }} src={thongTinPhim.hinhAnh} alt={thongTinPhim.tenPhim} className='rounded-md'></img>

                </div>
                <div className='checkOut__mySelected'>
                    <h2 className='text-xl'>SELECTED SEATS</h2>
                    <div>
                        <div className='flex flex-wrap items-center'>
                            <span className='font-bold text-base mr-3'>Ghế : </span>


                            {_.sortBy(bookingSeats, ['stt']).map((ghe, index) => {

                                return <span key={index} className='text-yellow-600 font-bold mr-3'>{ghe.stt}</span>
                            })}


                        </div>

                    </div>
                    <div className='flex justify-between mr-5 text-xl'>
                        <p>Tài Khoản:</p>
                        <p>{user.taiKhoan}</p>
                    </div>
                    <div className='flex justify-between text-xl'>
                        <p className='mr-5'>email:</p>
                        <p>{user.email}</p>
                    </div>
                    <div className='flex justify-between mr-5 text-xl'>
                        <p>Điện Thoại:</p>
                        <p>{user.soDT}</p>
                    </div>
                </div>
                <div className='checkOut__total'>
                    <div className='flex items-center mb-2'>
                        <h1 className='mb-0 text-xl'>total:</h1>
                        <p className='ml-5 text-xl mb-0'>{

                            bookingSeats.reduce((total, item) => {
                                return total += item.giaVe
                            }, 0).toLocaleString()

                        }</p>
                    </div>
                    <button onClick={() => {
                        dispatch(getTicketsListAction({
                            maLichChieu,
                            danhSachVe: bookingSeats
                        }))
                    }} className='w-full bg-red-500 hover:bg-red-600  duration-500 text-white text-xl p-3 px-7 rounded-md'>Buy</button>
                </div>
            </div>

        </div>
    )
}

function TickedBookingHistory(props) {

    const dispatch = useDispatch();
    const { userAccountInfo } = useSelector(state => state.quanLyNguoiDungReducer);
    const { thongTinDatVe } = userAccountInfo;

    const renderMyActivity = () => {

        return _.reverse(thongTinDatVe).map((item, index) => {

            return <li key={index} className="flex flex-col py-6 px-7 sm:flex-row sm:justify-between" style={{ maxWidth: "750px" }}>
                <div className="flex w-full space-x-2 sm:space-x-4">
                    <img className="flex-shrink-0 object-cover w-20 h-20 border-transparent rounded outline-none sm:w-32 sm:h-32 bg-coolGray-500" src={item.hinhAnh} alt={item.tenPhim} />
                    <div className="flex flex-col justify-between w-full pb-4">
                        <div className="flex justify-between w-full pb-2 space-x-2">
                            <div className="space-y-1">
                                <h3 className="text-lg font-semibold leading-snug sm:pr-8">{item.tenPhim}</h3>
                                <p className="text-sm text-coolGray-600">Ngày Đặt: {moment(item.ngayDat).format('DD/MM/YYYY')} </p>
                                <p className="text-sm text-coolGray-600">thời lượng phim: {item.thoiLuongPhim} </p>
                                <p className="text-sm text-coolGray-600">Đia điểm: {_.first(item.danhSachGhe).tenHeThongRap}({_.first(item.danhSachGhe).tenCumRap})</p>
                                <p className="text-sm text-coolGray-600">
                                    <div className='flex flex-wrap'>
                                        Ghế đặt:
                                        {item.danhSachGhe.map((ghe, index) => {
                                            return <span className='font-bold text-base mx-2' key={index}>{ghe.tenGhe}</span>
                                        })}
                                    </div>
                                </p>

                            </div>
                            <div className="text-right">
                                <p className="text-lg font-semibold whitespace-nowrap">{(item.danhSachGhe.length * item.giaVe).toLocaleString()} vnd</p>
                            </div>
                        </div>
                        <div className="flex text-sm divide-x">
                            <button type="button" className="flex items-center px-2 py-1 pl-0 space-x-1">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fillCurrent">
                                    <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                                    <rect width="32" height="200" x="168" y="216"></rect>
                                    <rect width="32" height="200" x="240" y="216"></rect>
                                    <rect width="32" height="200" x="312" y="216"></rect>
                                    <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                                </svg>
                                <span>Remove</span>
                            </button>
                            <button type="button" className="flex items-center px-2 py-1 space-x-1">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fillCurrent">
                                    <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                                </svg>
                                <span>Add to favorites</span>
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        })

    }


    useEffect(() => {

        dispatch(getUserAccountInfo())

    }, [])



    return (
        <div className="flex items-center my_activity relative">
            <div className='flex w-2/3 m-auto flex-col p-6 space-y-4 sm:p-10 bg-coolGray-50 text-coolGray-800'>
                <h2 className="text-xl font-semibold text-center">Lịch Sử Dặt Vé</h2>
                <ul className="flex flex-col divide-y divide-coolGray-300  ">
                    {renderMyActivity()}
                </ul>
            </div>

        </div>
    )
}

export default function CheckOut(props) {

    const { visibleTabs } = useSelector(state => state.tabsAntDesignReducer)
    const dispatch = useDispatch();

    return <Tabs className='checkout_mainContainer' defaultActiveKey="1" activeKey={visibleTabs} style={{ padding: '0 46px', paddingTop: '40px' }} onChange={(key) => {
        dispatch({
            type: CHANGE_TABS_ANDT_DESIGN,
            visibleTabs: key
        })
    }}>

        <TabPane tab="01 CHỌN GHẾ VÀ THÀNH TOÁN" key="1">
            <BookingTickets {...props} />
        </TabPane>
        <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
            <TickedBookingHistory />
        </TabPane>


    </Tabs>
}
