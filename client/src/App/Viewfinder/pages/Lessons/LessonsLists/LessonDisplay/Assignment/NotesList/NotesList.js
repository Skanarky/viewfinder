import React from "react";

class NotesList extends React.Component {

    render = () => {
        const months = ["Jan", "Feb", "Mar", "Apr",
            "May", "Jun", "July", "Aug",
            "Sep", "Oct", "Nov", "Dec"]
        const { note, errMsgNotes, loadingNotes, deleteNote } = this.props;
        // console.log(note);
        const date = new Date(note.createdAt);
        console.log(typeof date);

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
                    <h6>Added on {months[date.getMonth()]} {date.getDate()}, at {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}</h6>
                    <button style={{ height: "35px" }} onClick={() => deleteNote(note._id)}>Delete Note</button>
                </li>
            )
        }
    }
}

export default NotesList;