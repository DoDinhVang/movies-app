import React, { useState } from 'react';
import {
    Form,
    Input,
    DatePicker,
    InputNumber,
    Switch,
} from 'antd';

import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { addFilm } from '../../../../redux/actions/quanLyPhimAction';
import { GROUPID } from '../../../../utilities/settings/config';
const { TextArea } = Input

export default function AddFilm() {

    const [imgUrl, setImgUrl] = useState('');
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            sapChieu: false,
            dangChieu: false,
            hot: false,
            danhGia: '',
            hinhAnh: '',
            maNhom: GROUPID

        },
        onSubmit: (values) => {

            // tạo đối tượng formData
            const formData = new FormData();
            for (const key in values) {

                if (key !== 'hinhAnh') {
                    formData.append(key, values[key])
                } else {
                    formData.append('hinhAnh', values.hinhAnh, values.hinhAnh.name)
                }
            }

            dispatch(addFilm(formData))
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

    const readerFile = (e) => {

        const file = e.target.files[0];
        const reader = new FileReader();

        if (file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg" || file.type === "image/gif") {
            reader.readAsDataURL(file);
            reader.onloadend = function (e) {
                setImgUrl(e.target.result)
            };

        }
        formik.setFieldValue('hinhAnh', file)

    }


    return (
        <div>
             <h3 className='text-center mb-4 text-2xl'>Thêm Phim Mới</h3>
            <Form onSubmitCapture={formik.handleSubmit} className='bg-white ' style={{ padding: '12px 16px' }}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
            >
                <Form.Item label="Tên Phim">
                    <Input name='tenPhim' onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name='trailer' onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Mô Tả">
                    <TextArea rows={4} name='moTa' onChange={formik.handleChange} />
                </Form.Item>

                <Form.Item label="Ngày Khởi CHiếu" defaultValue={moment(new Date(), 'DD/MM/YYYY')}>
                    <DatePicker format='DD/MM/YYYY' onChange={handleChangeDatePickerAnt('ngayKhoiChieu')} />
                </Form.Item>
                <Form.Item label="Sắp Chiếu">
                    <Switch onChange={handelChangeInputAnt('sapChieu')} />
                </Form.Item>
                <Form.Item label="Đang chiếu">
                    <Switch onChange={handelChangeInputAnt('dangChieu')} />
                </Form.Item>
                <Form.Item label="Hot">
                    <Switch onChange={handelChangeInputAnt('hot')} />
                </Form.Item>
                <Form.Item label="Đánh giá">
                    <InputNumber onChange={handelChangeInputAnt('danhGia')} />
                </Form.Item>
                <Form.Item label="Hình ảnh">
                    <input type='file' onChange={(e) => {
                        readerFile(e)
                    }} name='hinhAnh' accept="image/png, image/jpeg, image/gif, image/jpg"></input>

                    {imgUrl === '' ? <img style={{ display: 'none' }} src={imgUrl} alt='hinhanh'></img> : <img src={imgUrl} alt='hinhanh'></img>}
                </Form.Item>
                <Form.Item label='Chức năng' >
                    <button className='bg-blue-500 text-white py-3 px-4 rounded' type='submit'>Thêm Phim</button>
                </Form.Item>

            </Form>
        </div>
    )
}
