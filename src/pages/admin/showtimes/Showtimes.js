import React, { useState, useEffect } from 'react'
import { Form, Input, Select, DatePicker, Button, notification } from 'antd'
import { quanLyRapService } from '../../../service/QuanLyRapService'
import { STATUS_CODE } from '../../../utilities/settings/config'
import { useFormik } from 'formik'
import moment from 'moment'
import { quanLyDatVeService, QuanLyDatVeService } from '../../../service/QuanLyDatVeService'

export default function Showtimes(props) {

    const [state, setState] = useState({
        listOfTheaterSystems: [],
        listOfTheaterClusters: []
    })

    const film = JSON.parse(localStorage.getItem('film'))

    const formik = useFormik({
        initialValues:{
            maPhim: props.match.params.id,
            ngayChieuGioChieu:'',
            maRap:'',
            giaVe: 0
            
        },
        onSubmit:(values)=>{
            quanLyDatVeService.creatShowTimes(values)
            .then(result=>{

                const {data,status} = result;
                if(status === STATUS_CODE.SUCCESS){
                    notification['success']({
                        placement:'topRight',
                        message: 'Thêm Lịch Chiếu Thành Công'
                    })
                }
            })
            .catch(error => console.log(error.response?.data))
        }
    });


    useEffect(() => {
        quanLyRapService.getTheaterSystemList()
            .then(result => {
                const { data, status } = result;
                if (status === STATUS_CODE.SUCCESS) {
                    setState({
                        ...state,
                        listOfTheaterSystems: data.content
                    })
                }
            })
            .catch(error => console.log(error.response.data))

    }, [])

    const optionsTheaterSystem = () => {
        return state.listOfTheaterSystems.map((item, index) => {
            return { label: item.tenHeThongRap, value: item.maHeThongRap }
        })

    }

    const optionsTheaterClusters = () => {
        return state.listOfTheaterClusters.map((item, index) => {
            return { label: item.tenCumRap, value: item.maCumRap }
        })
    }
    const handleChangeTheaterCluster = (value)=>{
        
        formik.setFieldValue('maRap',value)
    }

    const handleChangeTheaterSystem = (value) => {

        quanLyRapService.getTheaterClustersByTheaterSystem(value)
            .then(result => {
                const { data, status } = result;
                if (status === STATUS_CODE.SUCCESS) {
                    setState({
                        ...state,
                        listOfTheaterClusters: data.content
                    })
                }
            })
            .catch(error => console.log(error.response.data))

    }

    const onOk = (value)=>{

        formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY HH:mm:ss'))
    }

    const handleChangeTicket = (value)=>{
        formik.setFieldValue('giaVe',value)
    }


    return (
        <div>
            <h3 className='text-center mb-12 text-2xl'>Tạo Lịch Chiếu Phim - {film.tenPhim}</h3>
            <div className='grid grid-cols-12 px-8'>
                <div className='col-span-4'>
                    <img src={film.hinhAnh} className='w-full object-cover' style={{height:'500px'}} alt={film.tenPhim}></img>
                </div>
                <div className='col-span-8'>
                    <Form
                        onSubmitCapture={formik.handleSubmit}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 8 }}
                    >
                        <Form.Item label='Mã Phim'>
                            <Input defaultValue={props.match.params.id} disabled={true}></Input>
                        </Form.Item>
                        <Form.Item label='Hệ Thống Rạp'>
                            <Select
                                showSearch
                                size='large'
                                onChange={handleChangeTheaterSystem}
                                onSearch={() => { }}
                                options={optionsTheaterSystem()}
                            ></Select>
                        </Form.Item>
                        <Form.Item label='Cụm Rạp'>
                            <Select
                                showSearch
                                size='large'
                                onChange={handleChangeTheaterCluster}
                                onSearch={() => { }}
                                options={optionsTheaterClusters()}
                            ></Select>
                        </Form.Item>
                       
                        <Form.Item label='Ngày Chiếu lịch chiếu'>
                            <DatePicker showTime onOk={onOk} />
                        </Form.Item>

                        <Form.Item label='Giá Vé'>
                            <Select
                                showSearch
                                size='large'
                                onChange={handleChangeTicket}
                                options={[{ label: '75000', value: 75000 }, { label: '150000', value: 150000 }]}
                            ></Select>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType='submit'>Tạo Lịch Chiếu</Button>
                        </Form.Item>

                    </Form>
                </div>
            </div>
        </div>
    )
}
