import React from "react";
import './smiley.style.css';

export default class Smiley extends React.Component {
    render() {
        const {value, votes, onClick} = this.props;
        return <div className='each-smiley'>
        <span className='smiley' onClick={onClick}>{value}</span>
        <span className='smiley-votes'>{votes}</span>
        </div>
    }
}
