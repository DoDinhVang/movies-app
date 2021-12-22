import { HIDE_LOADING, SHOW_LOADING } from "../types/loadingType"

const initialState = {

        visible: 'none'
}

 const loadingReducer =  (state = initialState, action) => {
    switch (action.type) {

    case SHOW_LOADING:
        return { ...state, visible: 'block'}
    case HIDE_LOADING:
        return {...state, visible: 'none'}

    default:
        return state
    }
}
export default loadingReducer;