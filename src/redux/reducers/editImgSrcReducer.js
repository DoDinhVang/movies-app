const initialState = {
    imgUrl:''
}

const editImgSrcReducer = (state = initialState, action) => {
    switch (action.type) {

    case 'EDIT_IMG_SRC':
        return { ...state,imgUrl: action.imgUrl}

    default:
        return {...state}
    }
}

export {editImgSrcReducer}
