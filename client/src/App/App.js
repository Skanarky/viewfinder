import React from "react";

import Viewfinder from "./Viewfinder/Viewfinder.js";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            isOn: false
        }
        this.state = this.initialState;
    };

    toggleIsOn = () => {
        this.setState({ ...this.state, isOn: true });
    }

    render = () => {
        const { isOn } = this.state;

        // to be (isOn)
        if (isOn) {
            return <Viewfinder></Viewfinder>
        }
        return (
            <div className="welcome">
                <div className="centerOne">
                    <div onClick={this.toggleIsOn} className="phone">
                    </div>
                    <div onClick={this.toggleIsOn} className="oldCamera">
                    </div>
                    <div onClick={this.toggleIsOn} className="camera">
                    </div>
                </div>
            </div>
        )
    }
}

export default App;

