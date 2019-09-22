import React from "react";

import Viewfinder from "./Viewfinder/Viewfinder.js";
import FooterPrvcy from "./FooterPrvcy/FooterPrvcy";

class App extends React.Component {
        // USING session storage instead of STATE (fixing reload issues = bad UX)
    constructor(props) {
        super(props);
        this.initialState = {
            isOn: false
        }
        this.state = this.initialState;
    };

    toggleIsOn = () => {
        this.setState({ ...this.state, isOn: true });
        sessionStorage.setItem("appOnCount", true);
    }

    render = () => {
        const { isOn } = this.state;
        const appOnCount = sessionStorage.getItem("appOnCount");
        
        // console.log(typeof appOnCount)
        
        // to be (appOnCount || isOn)
        if (appOnCount || isOn) {
            return (
                <div>
                    <Viewfinder></Viewfinder>
                    <FooterPrvcy></FooterPrvcy>
                </div>
            )
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
                <FooterPrvcy></FooterPrvcy>
            </div>
        )
    }
}

export default App;

