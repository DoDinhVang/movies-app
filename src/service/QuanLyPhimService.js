import { GROUPID } from "../utilities/settings/config";
import { BaseSevices } from "./BaseService"
export class QuanLyPhimService extends BaseSevices{
    
    getBannerList(){
        return this.get('api/QuanLyPhim/LayDanhSachBanner')
    }
    getFilmList(tenPhim){
        if(tenPhim !== ''){
            return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${tenPhim}`)
        }
        return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`)
    }
    getShowtimes(id){
        return this.get(`api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`)
    }

    addFilm(formData){
        return this.post('api/QuanLyPhim/ThemPhimUploadHinh',formData)
    }

    editFilm(formData){
        return this.post('api/QuanLyPhim/CapNhatPhimUpload',formData)
    }

    getFilmInfo(maPhim){
        return  this.get(`api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
    }

    deleFilm(maphim){
        return this.delete(`api/QuanLyPhim/XoaPhim?MaPhim=${maphim}`)
    }
}
export const quanLyPhimService = new QuanLyPhimService();