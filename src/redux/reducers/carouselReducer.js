import { SET_CAROUSEL } from "../types/carouselType"

const initialState = {

    bannerList: [
        {
            maBanner: 1,
            maPhim: 1282,
            hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png"
        }
    ]
}

const carouselReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_CAROUSEL:
            return { ...state, bannerList: action.bannerList }

        default:
            return state
    }
}
export { carouselReducer }
