import { useEffect } from 'react';
import { Route } from 'react-router-dom'
import Footer from './Layout/Footer/Footer';
import Header from './Layout/Header/Header';


export const HomeTemplate = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0)
    },[])
    const { Component,...resProps } = props;
    return (

        <Route {...resProps} render={(propRoute) => {
            return <>
                <Header {...propRoute} t = {resProps.t}/>

                <Component {...propRoute} />
                <Footer changeLanguage = {resProps.changeLanguage} t = {resProps.t} />
            </>
        }}>
        </Route>
    )
}