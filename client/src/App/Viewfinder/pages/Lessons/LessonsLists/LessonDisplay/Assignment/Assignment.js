import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { connect } from "react-redux";

import { addImage, getImages } from "./../../.././../../../../redux/images.js";

import Examples from "../Examples/Examples.js";
import ImagesList from "./ImagesList/ImagesList.js";

class Assignment extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            isViewingExamples: false,
            input: {
                file: null,
                textNote: ""
            },
            isViewingNotes: false,
            notes: [],
            errMsgNotes: "",
            loadingNotes: true
        }
        this.state = this.initialState;
    };

    handleChange = (event) => {
        // console.log(event);
        const { value, name, type, files } = event.target;
        this.setState(prevState => {
            return {
                input: {
                    ...prevState.input,
                    [name]: type === "file" ? files[0] : value
                }
            }
        });
    }

    componentDidMount = () => {
        const { getImages } = this.props;
        getImages();
    }

    _genFormData = (raw) => {
        let formData = new FormData();
        for (let key in raw) {
            formData.append(key, raw[key]);
        }
        return formData;
    }

    handleSubmitUpload = (event) => {
        event.preventDefault();
        const { file } = this.state.input;
        // need userId later
        const { addImage, idAssignment, idLesson } = this.props;
        const imgUpload = {
            assignId: idAssignment,
            lessonId: idLesson,
            file,
            likes: 0
        }
        addImage(this._genFormData(imgUpload));
        this.setState({ ...this.state, input: this.initialState.input });
    }

    toggleViewingExamples = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                isViewingExamples: !prevState.isViewingExamples
            }
        });
    }
    toggleViewingNotes = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                isViewingNotes: !prevState.isViewingNotes
            }
        });
    }

    handleSubmitNote = (event) => {
        event.preventDefault();
        const { idAssignment } = this.props;
        axios.get(`/api/notes/?assignId=${idAssignment}`)
            .then(response => {
                console.log(response.data);
                const { data } = response;
                this.setState({
                    notes: data,
                    loadingNotes: false
                })
            })
            .catch(err => {
                this.setState({
                    errMsgNotes: "Data not available"
                })
            })
    }

    render = () => {
        // console.log(this.props);
        const { textNote, file } = this.state.input;
        const { isViewingExamples, isViewingNotes, notes, errMsgNotes, loadingNotes } = this.state;

        // loading, err, id
        const { data, loading, errMsg, loadingAssignment,
            errMsgAssignment, idAssignment,
            idLesson, toggleViewLesson } = this.props;

        const styleEx = {
            backgroundColor: "rgba(245, 245, 245)",
            maxWidth: "608px",
            border: "3px solid black"
        }

        // assignments
        const { title, shortDescription, exampleImgOneUrl
            , exampleImgTwoUrl, exampleImgThreeUrl, instructions
            , googleLink } = this.props.lessonId;

        const presentImages = data.filter(image => image.assignId._id === idAssignment).map((image, i) =>
            <ImagesList shortDescription={shortDescription} errMsg={errMsg} loading={loading} key={image._id + i} index={i} 
            idImage={image._id} {...image}
            idImageCloudinary={image.public_id} {...image}
                idAssignment={idAssignment}></ImagesList>
        );
        const presentNotes = notes.map((note, i) =>
            <li key={note._id + i} index={i}><p>note.textNote</p><h6>note.createdAt</h6></li>
        );

        const styleAssignment = {
            backgroundColor: "rgb(245, 245, 245, .01)",
            display: "flex",
            flexDirection: "column",
            position: "fixed"
        }
        const styleContain = {
            backgroundColor: "rgb(245, 245, 245)", display: "grid",
            gridTemplateColumns: "1fr",
            gridTemplateRows: ".1fr .9fr",
            lineHeight: "50px"
        }

        if (loadingAssignment) {
            return (
                <div style={{ color: "rgba(199, 2, 2, 0.63)", paddingLeft: "15px", fontSize: ".9em" }}>... loading Assignment</div>
            )
        } else if (errMsgAssignment) {
            return (
                <div style={{ color: "rgba(199, 2, 2, 0.63)", paddingLeft: "15px", fontSize: ".9em" }}>{errMsgAssignment}</div>
            )
        } else {
            return (
                <div style={styleAssignment} className="lessonsView">
                    <div className="singleItemOthers">
                        <div className="viewOneLesson">
                            <div>
                                <div className="viewOneLesson" style={styleContain}>
                                    <div style={{ paddingBottom: "15px" }} className="navRoom">
                                        <Link className="viewfinder" to="/"><span className="stubbornFour">Viewfinder</span></Link>
                                        <Link className="viewfinder" to="/lessons"><span className="stubbornThree">Lessons</span></Link>
                                        <div onClick={toggleViewLesson} className="viewfinder"><span className="stubbornTwo">Compositions</span></div>
                                        <div className="stubbornOne" style={{ color: "rgb(128, 128, 128)" }}>Progress: <span style={{
                                            color: "rgba(218, 38, 38, 0.952)", fontSize: "2em"
                                        }}>{presentImages.length / 10 * 100}%</span></div>
                                    </div>
                                    <div>
                                        <h2>Assignment {title}</h2>
                                        <div className="imgLessonWrap">
                                            <img className="imgLesson" src={exampleImgOneUrl} alt="Lesson for Composition" />
                                            <img className="imgLesson" src={exampleImgTwoUrl} alt="Lesson for Composition" />
                                            <img className="imgLesson" src={exampleImgThreeUrl} alt="Lesson for Composition" />
                                        </div>
                                        <span>{instructions}</span>
                                        <div style={{ lineHeight: "30px", width: "210px", margin: "0 auto", fontSize: "1.2em" }} onClick={this.toggleViewingExamples} className="exampleStudents" to="#">View Examples from Students</div>
                                        {isViewingExamples ?
                                            <div className="bigViewExample" style={styleEx} >
                                                <button onClick={this.toggleViewingExamples}>Close</button>
                                                <div>
                                                    <Examples shortDescription={shortDescription} key={idLesson} idLesson={idLesson}></Examples>
                                                </div>
                                            </div> : ""}
                                        {isViewingNotes ? 
                                        <ul className="viewNotes">{presentNotes}</ul> : "" }
                                        <Link style={{ width: "190px", margin: "0 auto", textDecoration: "none" }} to={googleLink} target="_blank">Examples from the Web</Link>
                                        <div style={{ margin: "auto", display: "flex", flexDirection: "row", width: "210px", justifyContent: "space-evenly" }}>
                                            <form onSubmit={this.handleSubmitUpload}>
                                                <input file={file} style={{ textAlign: "center" }} onChange={this.handleChange} name="file"
                                                    type="file" />
                                                <button style={{ height: "30px", width: "90px" }} disabled={!file}>Upload (10MB max)</button>
                                            </form>
                                            <form onSubmit={this.handleSubmitNote}>
                                                <input style={{ textAlign: "center" }} onChange={this.handleChange} name="textNote"
                                                    value={textNote} type="url" placeholder="Note" />
                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                    <button type="submit" style={{ height: "35px", width: "65px" }} disabled={!textNote}>Add Note</button>
                                                    <button onClick={this.toggleViewingNotes} style={{ height: "35px", width: "65px" }}>View Notes</button>
                                                </div>
                                            </form>
                                        </div>
                                        <div style={{ margin: "auto", display: "flex", flexWrap: "wrap" }}>
                                            {presentImages}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

function stateToProps(globalState) {
    return globalState.images;
}

export default connect(stateToProps, { addImage, getImages })(Assignment);