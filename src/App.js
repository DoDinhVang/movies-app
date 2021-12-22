import { createBrowserHistory } from 'history'
import { Router, Switch } from "react-router";
import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home';
import News from './pages/News/News';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import Detail from './pages/Detail/Detail';
import CheckOut from './pages/CheckOut/CheckOut';
import Login from './components/Login/Login';
// import { lazy, Suspense } from 'react'
import LoginTemplate from './templates/UserTemplate/LoginTemplate';
import Loading from './components/loading/Loading';
import { AdMinTemplate } from './templates/AdminTemplate/AdminTemplate';
import DashBoard from './pages/admin/dashboard/DashBoard';
import Film from './pages/admin/films/Film';
import Showtimes, {} from './pages/admin/showtimes/Showtimes'
import AddFilm from './pages/admin/films/addFilm/AddFilm';
import EditFilm from './pages/admin/films/editfilm/EditFilm';
import Register from './components/register/Register';
import DashBoardForm from './pages/admin/dashboard/dashBoardForm/DashBoardForm';
import MainProfile from './pages/profile/MainProfile';
import CheckOutTemplate from './templates/CheckOutTemplate/CheckOutTemplate';
import {useTranslation} from 'react-i18next'
import i18n from './i18n';
export const history = createBrowserHistory();

// const CheckOutTemplateLazy = lazy(() => import('./templates/CheckOutTemplate/CheckOutTemplate'));

function App() {
    const {t} = useTranslation()
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    }
  return (
    <Router history={history}>
        <Loading/>
        <EditFilm/>
      <Switch>
        <HomeTemplate t = {t} changeLanguage = {changeLanguage} exact path='/' Component={Home}></HomeTemplate>
        <HomeTemplate t = {t} changeLanguage = {changeLanguage} exact path='/home' Component={Home}></HomeTemplate>
        <HomeTemplate t = {t} changeLanguage = {changeLanguage} exact path='/detail/:id' Component={Detail}></HomeTemplate>
        <HomeTemplate t = {t} changeLanguage = {changeLanguage} exact path='/contact' Component={Home}></HomeTemplate>
        <HomeTemplate t = {t} changeLanguage = {changeLanguage} exact path='/news' Component={Home}></HomeTemplate>
        <HomeTemplate t = {t} changeLanguage = {changeLanguage} exact path='/profile' Component={MainProfile}></HomeTemplate>


        <LoginTemplate exact path='/login' Component={Login} />
        <LoginTemplate exact path='/signup' Component={Register} />

        <AdMinTemplate exact path = '/admin' Component = {DashBoard}></AdMinTemplate>
        <AdMinTemplate exact path = '/admin/dashboard' Component = {DashBoard}></AdMinTemplate>
        <AdMinTemplate exact path = '/admin/dashboard/adduser' Component = {DashBoardForm}></AdMinTemplate>
        <AdMinTemplate exact path = '/admin/dashboard/edituser' Component = {DashBoardForm}></AdMinTemplate>
        <AdMinTemplate exact path = '/admin/films' Component = {Film}></AdMinTemplate>
        <AdMinTemplate exact path = '/admin/films/addfilm' Component = {AddFilm}></AdMinTemplate>
        <AdMinTemplate exact path = '/admin/showtimes/:id' Component = {Showtimes}></AdMinTemplate>
        
        {/* <Suspense fallback={<div>Loading...</div>}>
            <CheckOutTemplateLazy exact path = '/checkout/:id' Component = {CheckOut} />
        </Suspense> */}
        <CheckOutTemplate exact path = '/checkout/:id' Component = {CheckOut}/>
       

      </Switch>
    </Router>
  );
}

export default App;
