import React from "react";
import { Link } from "react-router-dom";

const About = (props) => {
    return (
        <section className="aboutWrap">
            <Link className="viewfinder" to="/"><span>Viewfinder</span></Link>
            <h3>Any camera, any condition, any type of photography</h3>
            <h5>“… The difference between the true photographer and just a ‘photographer’
                is the ‘camera’ behind the eyes. So the real question is - how do we
                    acquire that ‘camera’... how to be an Artist!"</h5>
            <ul>
                <li><h4>Pull out your phone or old camera and just follow the short
                     instructions in each lesson to take great pictures!</h4></li>
                <li><h4>No more long videos and super expensive tutorials!</h4></li>
                <li><h4>No expensive cameras or image-processing software required!</h4></li>
            </ul>
            <div>
                <p>A real photographer <span className="boldy">makes</span> the picture - he assembles it through his emotions, his eyes and his knowledge of arts and art compositions!</p>
                <p>In this web app you’ll learn how to use your emotions as a creative power, train your eyes, plan your shoots, and last, but not least - how to use the art compositions to get the most out of your pictures.</p>
                <p>We will focus more on making pictures and less on the camera.</p>
                <p>We will focus more on the artistic quality of each picture - and less on the quantity. Less is <span className="boldy">more</span>!</p>
                <p>Have fun - and start <span className="red">making</span> great pictures <span className="red">today</span>… your eyes are all you need!</p>
            </div>
        </section>
    )
}

export default About;