
import DatVeModel from "../_core/modedels.js/QuanLyRap/DatVeModel";
import { BaseSevices } from "./BaseService";

export class QuanLyDatVeService extends BaseSevices{

    getCinemaRoomInfo(maLichChieu){
        return this.get(`api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
    }

    getBooKingTickets(ticketsList){

        return this.post(`api/QuanLyDatVe/DatVe`,ticketsList)
    }
    creatShowTimes(thongTinLichChieu){
        return this.post('api/QuanLyDatVe/TaoLichChieu',thongTinLichChieu)
    }
}

export const quanLyDatVeService =  new QuanLyDatVeService()