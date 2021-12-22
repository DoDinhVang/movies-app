import React ,{useEffect}from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from 'react-redux'
import Film from '../film/Film';
import "./MultipleFilms.css"
import { getFilmsList } from '../../redux/actions/quanLyPhimAction';


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        />
    );
}

export default function MultipleFilms(props) {

    const dispatch = useDispatch();

    const {filmListRender} = useSelector(state => state.listFilmReducer);
  

    const renderFilm = () => {
        return filmListRender?.map((film, index) => {
            return <div key = {index}>
                <Film film = {film} />
            </div>
        })
    }
    
    const settings = {
        className: "center variable-with",
        centerMode: true,
        infinite: true,
        slidesToShow: 2,
        speed: 500,
        rows: 2,
        slidesPerRow: 2,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />

    };
    useEffect(()=>{

        dispatch(getFilmsList(''))

    },[])
    return (
        <div className = 'mt-10'>
            <Slider {...settings} >
               {renderFilm()}
            </Slider>
        </div>
    )
}
