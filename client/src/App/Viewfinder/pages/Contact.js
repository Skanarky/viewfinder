import React from "react";
import { Link } from "react-router-dom";

function Contact() {
    return (
        <footer>
            <Link to="https://www.instagram.com/" target="_blank" className="fa fa-instagram"></Link>
            <Link to="https://twitter.com/" target="_blank" className="fa fa-twitter"></Link>
            <Link to="https://www.facebook.com/" target="_blank" className="fa fa-facebook"></Link>
            <Link to="mailto: kutkurov@gmail.com" target="_blank" className="fa fa-envelope"></Link>
        </footer>
    )
}

export default Contact;