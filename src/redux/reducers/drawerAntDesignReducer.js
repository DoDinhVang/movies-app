import { HIDE_DRAWER, SHOW_DRAWER } from "../types/drawerAntDesignType"

const initialState = {
        visible: false
}

const drawrAntDesignReducer =  (state = initialState, action) => {
    switch (action.type) {

    case SHOW_DRAWER:
        return { ...state, visible: true }
    case HIDE_DRAWER:
        return {...state, visible: false}

    default:
        return {...state}
    }
}
export default drawrAntDesignReducer
