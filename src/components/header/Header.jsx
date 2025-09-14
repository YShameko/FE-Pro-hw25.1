import React from "react";
import './header.style.css';

export default class Header extends React.Component {
    render() {
        const {title} = this.props;
        return <h1 className="app-header">{title}</h1>
    }
}
