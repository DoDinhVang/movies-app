import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { carouselReducer } from './reducers/carouselReducer'
import { listFilmReducer } from './reducers/listFilmReducer'
import { quanLyRapReducer } from './reducers/quanLyRapReducer'
import quanLyDatVeReducer from './reducers/quanLyDatVeReducer'
import { quanLyNguoiDungReducer } from './reducers/quanLyNguoiDungReducer'
import loadingReducer from './reducers/loadingReducer'
import tabsAntDesignReducer from './reducers/tabsAntDesignReducer'
import drawrAntDesignReducer from './reducers/drawerAntDesignReducer'
import { quanLyPhimReducer } from './reducers/quanLyPhimReducer'
import { editImgSrcReducer } from './reducers/editImgSrcReducer'

const rootReducer = combineReducers({
    carouselReducer,
    listFilmReducer,
    quanLyRapReducer,
    quanLyDatVeReducer,
    quanLyNguoiDungReducer,
    loadingReducer,
    tabsAntDesignReducer,
    drawrAntDesignReducer,
    quanLyPhimReducer,
    editImgSrcReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))