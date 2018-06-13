import React from "react";

class NotesList extends React.Component {

    render = () => {
        const { note, errMsgNotes, loadingNotes } = this.props;
        // console.log(note);

        if (loadingNotes) {
            return (
                <div style={{ color: "rgba(218, 238, 253, 0.95)" }}>... loading Notes</div>
            )
        } else if (errMsgNotes) {
            return (
                <div style={{ color: "rgba(218, 238, 253, 0.95)" }}>{errMsgNotes}</div>
            )
        } else {
            return (
                    <li className="oneNote">
                        <p>{note.textNote}</p>
                        <h6>Added on: {note.createdAt}.getDate()</h6>
                        <button style={{height: "35px"}} /*onClick={this.handleClick}*/>Delete Note</button>  
                    </li>
            )
        }
    }
}

export default NotesList;