import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default class LandingPage extends Component {
  render() {
    return (
      <div className="landing-div">
        <div>
          <h3>Welcome to Petful!</h3>
          <img
            className="landing-img"
            src={require("../pets.jpg")}
            alt="Cat and Dog on counch"
          />
        </div>
        <div className="petful-info">
          <p>
            We specialize in finding a home for EVERY pet by using our
            FIFO(First In First Out) method!
          </p>
          <p>
            This means we only allow the pets who have been here the longest to
            be up for adoption.
          </p>

          <h4>How to get started?</h4>
          <p>
            Easy! Once you get to the adoption page, you add your name to the
            list, wait your turn, and choose which cat or dog you would like to
            adopt!
          </p>
          <p>
            No pet should have to wait forever to find their forever home...
          </p>
          <Link to="/adoption">
            <button className="adoption-padge-button">I want to adopt!</button>
          </Link>
        </div>
      </div>
    );
  }
}
