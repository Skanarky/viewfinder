
import React from "react";
import { connect } from "react-redux";
import UdemyCourse from "./UdemyCourse/UdemyCourse.js";

import { addFavorite } from "./../../../../../redux/favorites.js";

class UdemyList extends React.Component {

    render = () => {
        // console.log(this.props);
        const { data, loading, errMsg, addFavorite } = this.props;

        const presentCourses = data.map((course, i) => <UdemyCourse key={course.id} idCourse={course.id} index={i} addFavorite={addFavorite} courseFull={course} {...course}></UdemyCourse>);
        if (loading) {
            return (
                <div style={{ color: "rgba(199, 2, 2, 0.63)", paddingLeft: "15px", fontSize: ".9em" }}>... loading Udemy</div>
            )
        } else if (errMsg) {
            return (
                <div style={{ color: "rgba(199, 2, 2, 0.63)", paddingLeft: "15px", fontSize: ".9em" }}>{errMsg}</div>
            )
        } else {
            return (
                <div className="othersContain">
                    {presentCourses}
                </div>
            )
        }
    }
}

function stateToProps(globalState) {
    return globalState.courses;
}

export default connect(stateToProps, { addFavorite })(UdemyList);