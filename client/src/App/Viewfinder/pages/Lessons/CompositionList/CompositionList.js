import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getLessons } from "./../../../../../redux/lessons.js";

import Composition from "./Composition/Composition.js";

class CompositionList extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            isBelow: false
        }
        this.state = this.initialState;
    };

    toggleViewBelow = (event) => {
        this.setState({ ...this.state, isBelow: !this.state.isBelow });
    }


    componentDidMount = () => {
        const { getLessons } = this.props;
        getLessons("composition");
        // getAssignments("composition");
    }

    render = () => {
        // console.log(this.props);
        const { data, loading, errMsg } = this.props;
        const { isBelow } = this.state;

        const presentCompositions = data.map((composition, i) => <Composition key={composition._id + i}
            idLessonComposition={composition._id} index={i} toggleViewBelow={this.toggleViewBelow} 
            {...composition}></Composition>);

        if (loading) {
            return (
                <div style={{ color: "rgba(199, 2, 2, 0.63)", paddingLeft: "15px", fontSize: ".9em" }}>... loading Lesson</div>
            )
        } else if (errMsg) {
            return (
                <div style={{ color: "rgba(199, 2, 2, 0.63)", paddingLeft: "15px", fontSize: ".9em" }}>{errMsg}</div>
            )
        } else {
            return (
                <div style={isBelow ? {background: "rgb(128, 128, 128, .5)"} : {backgroundColor: "rgb(245, 245, 245)"}} className="lessonsView">
                    <div className="topLeft"></div>
                    <div className="topRight"></div>
                    <div className="bottomLeft"></div>
                    <div className="bottomRight"></div>
                    <div className="lessonsArrangeWrap">
                        <div className="lessonsArrange">
                            <div className="navRoom">
                                <Link className="viewfinder" to="/"><span>Viewfinder</span></Link>
                                <Link className="viewfinder" to="/lessons"><span>Lessons</span></Link>
                            </div>
                            <div className="lessonsArrangeInside">
                                {presentCompositions}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

function stateToProps(globalState) {
    return globalState.lessons;
}

export default connect(stateToProps, { getLessons })(CompositionList);