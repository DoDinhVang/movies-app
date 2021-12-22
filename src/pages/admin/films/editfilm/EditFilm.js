import React, { useEffect, useState } from 'react'
import { Drawer, Button, Space, InputNumber, Switch, DatePicker, Input, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { HIDE_DRAWER } from '../../../../redux/types/drawerAntDesignType';
import moment from 'moment';
import { useFormik } from 'formik';
import { editFilmAction } from '../../../../redux/actions/quanLyPhimAction';
import { GROUPID } from '../../../../utilities/settings/config';

const { TextArea } = Input

export default function EditFilm() {

    const { visible } = useSelector(state => state.drawrAntDesignReducer)
    const { filmInfo } = useSelector(state => state.quanLyPhimReducer);
    const { imgUrl } = useSelector(state => state.editImgSrcReducer)
    const dispatch = useDispatch();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: filmInfo.maPhim,
            tenPhim: filmInfo.tenPhim,
            trailer: filmInfo.trailer,
            moTa: filmInfo.moTa,
            ngayKhoiChieu: moment(filmInfo.ngayKhoiChieu).format('DD/MM/YYYY'),
            sapChieu: filmInfo.sapChieu,
            dangChieu: filmInfo.dangChieu,
            hot: filmInfo.hot,
            danhGia: filmInfo.danhGia,
            hinhAnh: null,

        },
        onSubmit: (values) => {
            values.maNhom = GROUPID
            const formData = new FormData();
            for (const key in values) {

                if (key !== 'hinhAnh') {
                    formData.append(key, values[key])
                } else if (values[key] !== null) {
                    formData.append('hinhAnh', values.hinhAnh, values.hinhAnh.name)
                }
            }

            dispatch(editFilmAction(formData))


        }
    })

    const handelChangeInputAnt = (name) => { //Closures function
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    const handleChangeDatePickerAnt = (name) => { //Closures function
        return (value) => {
            formik.setFieldValue(name, moment(value).format('DD/MM/YYYY'))
        }
    }

    const readerFile = async (e) => {

        const file = e.target.files[0];
        const reader = new FileReader();
        if (file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg" || file.type === "image/gif") {

            await formik.setFieldValue('hinhAnh', file)

            reader.readAsDataURL(file);
            reader.onloadend = function (e) {

                dispatch({
                    type: 'EDIT_IMG_SRC',
                    imgUrl: e.target.result  // result: hinh base 64
                })


            };

        }


    }


    return (
        <Drawer
            title={`Cập Nhật Phim`}
            placement="right"
            size={'large'}
            onClose={() => { dispatch({ type: HIDE_DRAWER }) }}
            visible={visible}
            extra={
                <Space>
                    <Button onClick={() => {
                        dispatch({ type: HIDE_DRAWER })
                    }}>Cancel</Button>

                </Space>
            }
        >
            <Form onSubmitCapture={formik.handleSubmit} className='bg-white ' style={{ padding: '12px 0' }}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
            >
                <Form.Item label="Tên Phim">
                    <Input name='tenPhim' value={formik.values.tenPhim} onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name='trailer' value={formik.values.trailer} onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Mô Tả">
                    <TextArea rows={4} name='moTa' value={formik.values.moTa} onChange={formik.handleChange} />
                </Form.Item>

                <Form.Item label="Ngày Khởi CHiếu" defaultValue={moment(new Date(), 'DD/MM/YYYY')}>
                    <DatePicker format='DD/MM/YYYY' value={moment(formik.values.ngayKhoiChieu, 'DD/MM/YYYY')}
                        onChange={handleChangeDatePickerAnt('ngayKhoiChieu')} />
                </Form.Item>
                <Form.Item label="Sắp Chiếu">
                    <Switch onChange={handelChangeInputAnt('sapChieu')} checked={formik.values.sapChieu} />
                </Form.Item>
                <Form.Item label="Đang chiếu">
                    <Switch onChange={handelChangeInputAnt('dangChieu')} checked={formik.values.dangChieu} />
                </Form.Item>
                <Form.Item label="Hot">
                    <Switch onChange={handelChangeInputAnt('hot')} checked={formik.values.hot} />
                </Form.Item>
                <Form.Item label="Đánh giá">
                    <InputNumber min={0} max={10} onChange={handelChangeInputAnt('danhGia')} value={formik.values.danhGia} />
                </Form.Item>
                <Form.Item label="Hình ảnh">
                    <input type='file' onChange={(e) => {
                        readerFile(e)
                    }} name='hinhAnh' accept="image/png, image/jpeg, image/gif, image/jpg"></input>
                    <img className='mt-4' style={{ height: '150px', width: '100px', objectFit: 'cover' }} src={imgUrl} alt='hinhanh'></img>
                </Form.Item>
                <Form.Item >
                    <button className='bg-blue-500 text-white py-3 px-4 rounded' type='submit'>Lưu Thay Đổi</button>
                </Form.Item>

            </Form>
        </Drawer>
    )
}
