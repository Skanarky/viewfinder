import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import CompositionList from "./CompositionList/CompositionList.js";

class Lessons extends React.Component {

    render = () => {
        return (
            <section className="lessonsLandingWrap">
                <Link className="viewfinder" to="/"><span>Viewfinder</span></Link>
                <div className="centerTwo">
                    <Link className="composition" to="/lessons/composition"><span>Composition</span></Link>
                    <Link className="prism" to="/lessons/light"><span>Light</span></Link>
                    <Switch>
                        <Route path="/lessons/composition" component={CompositionList}></Route>
                        {/* <Route path="/lessons/light" component={Light}></Route> */}
                    </Switch>
                </div>
            </section>
        )
    }
}

export default Lessons;