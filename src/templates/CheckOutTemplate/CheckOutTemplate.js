import { Route, Redirect } from 'react-router-dom'
import { USER_LOGIN } from '../../utilities/settings/config';

const CheckOutTemplate = (props) => {

    const { Component, ...resProps } = props;

    if (!localStorage.getItem(USER_LOGIN)) {
        return <Redirect to='/login'></Redirect>
    }

    return (
        <Route {...resProps} render={(propRoute) => {
            return <>
             
                <Component {...propRoute} />
            </>
        }}>
        </Route>
    )
}

export default CheckOutTemplate