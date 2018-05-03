import React from "react";
import { Link, Route, Switch } from "react-router-dom";


import About from "./pages/About.js";
import Contact from "./pages/Contact.js";
import Masters from "./pages/Masters.js";
import Others from "./pages/Others/Others.js";
import Lessons from "./pages/Lessons/Lessons.js";

class Viewfinder extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            contactOn: false
        }
        this.state = this.initialState;
    };

    toggleContactView = (event) => {
        this.setState({ ...this.state, contactOn: !this.state.contactOn });
    }

    render = () => {
        const { contactOn } = this.state;
        return (
            <div className="wrapper">
                <div className="topLeft"></div>
                <div className="topRight"></div>
                <div className="bottomLeft"></div>
                <div className="bottomRight"></div>
                <Link className="login" to="/login"><span>Login</span></Link>
                <div className="circle">
                    <Link className="lessons" to="/lessons"><span>Course</span></Link>
                </div>
                <Link className="noLine others" to="/others"><span>Others</span></Link>
                <Link onClick={this.toggleContactView} className="noLine contact" to="#"><span>Contact</span></Link>
                {/* <Link className="noLine contact" to="/contact"><span>Contact</span></Link> */}
                <Link className="noLine about" to="/about"><span>About</span></Link>
                <Link className="noLine masters" to="/masters"><span>Masters</span></Link>
                {contactOn ? <Contact></Contact> : ""}
                <Switch>
                    <Route path="/about" component={About}></Route>
                    {/* <Route path="/contact" component={Contact}></Route> */}
                    <Route path="/masters" component={Masters}></Route>
                    <Route path="/others" component={Others}></Route>
                    <Route path="/lessons" component={Lessons}></Route>
                </Switch>
            </div>
        )
    }
}

export default Viewfinder;