import React from "react";
import { Link } from "react-router-dom";

const About = (props) => {
    return (
        <section className="mastersWrap">
            <Link className="viewfinder" to="/"><span>Viewfinder</span></Link>
            <h3>Some masters of the camera</h3>
            <div>
                <Link to="http://platonphoto.com/" target="_blank" className="mastersPage">platon</Link>
                <Link to="http://rankin.co.uk/" target="_blank" className="mastersPage">RANKIN</Link>
                <Link to="http://fatali.com/" target="_blank" className="mastersPage fatali">Fatali</Link>
                <Link to="http://anseladams.com/" target="_blank" className="mastersPage">Ansel Adams</Link>
                <Link to="https://www.hasselblad.com/masters/" target="_blank" className="mastersPage">HASSELBLAD</Link>
            </div>
        </section>
    )
}

export default About;