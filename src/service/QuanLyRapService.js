import { GROUPID } from "../utilities/settings/config";
import { BaseSevices } from "./BaseService";

class QuanLyRapService extends BaseSevices {

    getShowtimes(id) {
        return this.get(`api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`)
    }
    getInfoOfTheaterSystem() {
        return this.get(`api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`)
    }

    getTheaterSystemList(){
        return this.get('api/QuanLyRap/LayThongTinHeThongRap')
    }
    getTheaterClustersByTheaterSystem(maHeThongRap){
        return this.get(`api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
    }
}
export const quanLyRapService = new QuanLyRapService()