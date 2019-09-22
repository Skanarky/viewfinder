import React from "react";
import { Link } from "react-router-dom";

class FooterPrvcy extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            bannerOn: true
        }
        this.state = this.initialState;
    };
    clBanner = () => {
        this.setState({ bannerOn: false });
    };
    render = () => {
        if (this.state.bannerOn) {
            return (
                <div className="ftr-prvcy">
                    <button className="ftr-prvcy-btn-close" onClick={this.clBanner}>X</button>&nbsp;&nbsp;&nbsp; This application is using YouTube API Services. By using the application or closing this banner, you acknowledge that you have read and agree to &nbsp;
                    <Link to="http://www.google.com/policies/privacy" target="_blank">Google Privacy Policy</Link> and <Link to="https://www.youtube.com/static?template=terms" target="_blank">YuoTube Terms of Service</Link>&nbsp;
                    <button className="ftr-prvcy-btn-gotit" onClick={this.clBanner}>Got It!</button>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default FooterPrvcy;