import { CHANGE_TABS_ANDT_DESIGN } from "../types/tabsAntDesignType"

const initialState = {

    visibleTabs: '1'
}

const tabsAntDesignReducer =  (state = initialState, action) => {
    switch (action.type) {

    case  CHANGE_TABS_ANDT_DESIGN:
        return {...state, visibleTabs: action.visibleTabs}

    default:
        return state
    }
}
export default tabsAntDesignReducer
