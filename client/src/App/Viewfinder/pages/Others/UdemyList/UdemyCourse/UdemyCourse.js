import React from "react";
import { Link } from "react-router-dom";

class UdemyCourse extends React.Component {
    
    favoritize = (event) => {
        // console.log(event);
        const { addFavorite, courseFull } = this.props;
        const favoriteCourse = {courseInfo: courseFull};
        addFavorite(favoriteCourse);
    }
    
    render = () => {
        // console.log(this.props);
        const { /*idCourse*/ title, url, price, image_480x270 } = this.props;
        const urlUdemy = "https://www.udemy.com";
        const urlCourse = urlUdemy.concat(url)
        return (
            <div className="singleItemOthers">
                <Link to={urlCourse} target="_blank" className="noLineThree"><p>{title}; Price: {price}</p></Link>
                <Link to={urlCourse} target="_blank" className="noLineThree"><img src={image_480x270} alt="Udemy course" /></Link>
                <div>
                    <i onClick={this.favoritize} className="fa fa-star"></i>
                </div>
            </div>
        )
    }
}

export default UdemyCourse;