import { BaseSevices } from "./BaseService";

class QuanLyNguoiDungService extends BaseSevices {

    userLoginService(userLogin) {  // userLogin{taiKhoan,matKhau}

        return this.post('api/QuanLyNguoiDung/DangNhap', userLogin)
    }
    userAccountInfo() { // {thongTinCaNhanDangKy,thongTinDatVe[]}

        return this.post('api/QuanLyNguoiDung/ThongTinTaiKhoan')

    }
    signupAccount(thongTinDangKy) {
        return this.post('api/QuanLyNguoiDung/DangKy', thongTinDangKy)
    }

    getUserList(maNhom) {
        return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${maNhom}`)
    } values
    getUsersPerPage(maNhom, soTrang, soPhanTuTrenTrang,tuKhoa) {
        if(tuKhoa === ''){
            return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=${maNhom}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`)
        }

        return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=${maNhom}&tuKhoa=${tuKhoa}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`)
        
    }
    addUser(model){
        return this.post('api/QuanLyNguoiDung/ThemNguoiDung',model)
    }
    getUserType(){
        return this.get('api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung')
    }
    editUser(model){
        return this.post('api/QuanLyNguoiDung/CapNhatThongTinNguoiDung',model)
    }
    deleUser(taiKhoan){
        return this.delete(`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    }
    updateUserAccountInfo(values){
        return this.put('api/QuanLyNguoiDung/CapNhatThongTinNguoiDung',values)
    }
}
export const quanLyNguoiDungService = new QuanLyNguoiDungService()