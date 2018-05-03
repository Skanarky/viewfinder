import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Link } from "react-router-dom";

import { getVideos } from "./../../../../redux/youtube.js";
import { getCourses } from "./../../../../redux/udemy.js";

import UdemyList from "./UdemyList/UdemyList.js";
import YoutubeList from "./YoutubeList/YoutubeList.js";

class Others extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            inputs: {
                searchWordYouTube: "",
                searchWordUdemy: ""
            }
        }
        this.state = this.initialState;
    };

    handleChange = (event) => {
        // console.log(event);
        const { value, name } = event.target;
        this.setState(prevState => {
            return {
                inputs: {
                    ...prevState.inputs,
                    [name]: value
                }
            }
        });
    }

    handleSubmitYouTube = (event) => {
        event.preventDefault();
        const { searchWordYouTube } = this.state.inputs;
        const searchWordYouTubeFixed = searchWordYouTube.toLowerCase().split(" ").join("+");
        const { getVideos } = this.props;
        getVideos(searchWordYouTubeFixed);
        this.setState({ ...this.initialState });
    }

    handleSubmitUdemy = (event) => {
        event.preventDefault();
        const { searchWordUdemy } = this.state.inputs;
        const searchWordUdemyFixed = searchWordUdemy.toLowerCase().split(" ").join("+");
        const { getCourses } = this.props;
        getCourses(searchWordUdemyFixed);
        this.setState({ ...this.initialState });
    }

    render = () => {
        const { searchWordYouTube, searchWordUdemy } = this.state.inputs;

        return (
            <section className="othersWrap">
                <Link className="viewfinder" to="/"><span>Viewfinder</span></Link>
                <div className="othersSearches">
                    <form className="othersForm">
                        <div>
                            <input onChange={this.handleChange} name="searchWordUdemy" value={searchWordUdemy} type="text" placeholder="Key Word" />
                        </div>
                        <button onClick={this.handleSubmitUdemy}><Link className="noLineTwo" to="/others/udemy">Udemy</Link></button>
                    </form>
                    <form className="othersForm">
                        <div>
                            <input onChange={this.handleChange} name="searchWordYouTube" value={searchWordYouTube} type="text" placeholder="Key Word" />
                        </div>
                        <button onClick={this.handleSubmitYouTube}><Link className="noLineTwo" to="/others/youtube">YouTube</Link></button>
                    </form>
                </div>
                <Switch>
                    <Route exact path="/others/udemy" component={UdemyList}></Route>
                    <Route exact path="/others/youtube" component={YoutubeList}></Route>
                </Switch>
            </section>
        )
    }
}

export default connect(null, { getVideos, getCourses })(Others);