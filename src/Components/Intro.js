import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export default class Intro extends Component {
    render() {
        return (
            <div>
                <p>Welcome to Petful!</p>
                <p>We are a small animal shelter that strives to find a loving home for each and every pet that enters our doors.</p>
                <Link to='/adoption'>
                    <button>See Pets for adoption!</button>
                </Link>
            </div>
        )
    }
}