import React, { Fragment, useEffect,useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Tooltip, Input } from 'antd';
import { EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { deleFilmAction, getFilmInfoAction, getFilmsList } from '../../../redux/actions/quanLyPhimAction';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';
import { SHOW_DRAWER } from '../../../redux/types/drawerAntDesignType';

const { Search } = Input
export default function Film() {

    const dispatch = useDispatch();
    const { filmList } = useSelector(state => state.listFilmReducer)
    const ref =  useRef(null)

    useEffect(() => {

        dispatch(getFilmsList(''))

    }, [])
    const data = filmList.map((film, index) => {
        return { ...film, key: index }
    })

    const columns = [
        {
            title: 'Mã Phim',
            dataIndex: 'maPhim',
            key: 'maPhim',
            sorter: (a, b) => a.maPhim - b.maPhim,
            defaultSortOrder: ['descend'],
            render: (text, film, index) => {

                return <span>{film.maPhim}</span>
            }
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            key: 'hinhAnh',
            render: (text, film, index) => {

                return <Fragment>
                    <img style={
                        {
                            height: '75px',
                            width: '75px',
                            objectFit: 'cover',
                            boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px'
                        }
                    } src={film.hinhAnh} alt={film.tenPhim}></img>
                </Fragment>
            }
        },
        {
            title: 'Tên Phim',
            dataIndex: 'tenPhim',
            key: 'tenPhim',
        },
        {
            title: 'Nội dung ',
            dataIndex: 'moTa',
            key: 'moTa',
            render: (text, film, index) => {

                return <Fragment>
                    {film.moTa.length > 50 ? <p>{film.moTa.substring(0, 50) + '...'}</p> : <p>{film.moTa}</p>}
                </Fragment>
            }
        },
        {
            title: 'Chức năng ',
            key: 'chucNang',
            render: (text, film, index) => {

                const maPhim = film.maPhim
                return (
                    <div className='flex'>
                        <Tooltip placement="top" title='chỉnh sửa'>
                            <EditOutlined onClick={() => {
                                dispatch({
                                    type: SHOW_DRAWER
                                })
                                dispatch(getFilmInfoAction(maPhim))
                                dispatch({
                                    type: 'EDIT_IMG_SRC',
                                    imgUrl: film.hinhAnh
                                })

                            }} style={{ color: 'white' }} className='p-3 text-md rounded cursor-pointer bg-blue-500' />
                        </Tooltip>
                        <Tooltip placement='top' title='xóa phim'>
                            <DeleteOutlined onClick={() => {
                                dispatch(deleFilmAction(maPhim))
                            }} style={{ color: 'white' }} className='p-3 mx-3 text-md rounded cursor-pointer bg-red-500' />
                        </Tooltip>
                        <Tooltip placement='top' title='tạo lịch chiếu'>
                            <CalendarOutlined onClick={() => {
                                history.push(`/admin/showtimes/${maPhim}`)
                                localStorage.setItem('film', JSON.stringify(film))
                            }} style={{ color: 'white' }} className='p-3 text-md mr-3 rounded cursor-pointer bg-blue-500' />
                        </Tooltip>

                    </div>
                )

            }
        },

    ]

    return (
        <div className='px-6 py-3'>
            <div className='mb-5'>
                <h3 className='text-xl mb-0'>Quản Lý Phim</h3>
                <button onClick={() => { history.push('/admin/films/addfilm') }} className='py-2 px-3 my-3' style={{ background: '#F5F5F5' }}>Thêm Phim</button>
                <Search
                    placeholder="Tìm kiếm phim" enterButton={<i className="fa fa-search"></i>}
                    onChange={(e)=>{
                        const tenPhim = e.target.value;

                        if(ref.current !== null){
                            clearTimeout(ref.current)
                        }
                        ref.current = setTimeout(()=>{

                            dispatch(getFilmsList(tenPhim))
                        },700)
                    }}
                >

                </Search>
            </div>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}
