import React from "react";
import { Jumbotron } from "react-bootstrap";

//just the homepage with the README displayed
class Home extends React.Component {
  render() {
    return (
      <div className="px-5 py-3">
        <Jumbotron
          style={{
            paddingTop: 1,
            paddingBottom: 1
          }}
        >
          <h1>9toes.club</h1>
          <p>
            This is my independent study project from January 2020. It's my
            first attempt at a CRUD app and also my first time using JavaScript,
            React, and making an API.
          </p>
          <h2>About the Project</h2>
          <p>
            All of the front-end has been done using JavaScript and mainly using
            the React library. I've also created an API with Express that
            manages all of the communication with MongoDB Atlas where all
            account and recipe data is stored.
            <br />
            <br />
            The project is hosted on a Raspberry Pi that is configured to serve
            the React app to the domain name{" "}
            <a href="http://9toes.club">9toes.club</a>.
          </p>
          <h2>Setting Up the Raspberry Pi</h2>
          <p>
            For this project I'm using a Raspberry Pi 4 Model B 2019 Quad Core
            64 Bit WiFi Bluetooth (4GB). The operating system is Raspbian
            GNU/Linux 10 (buster). I'm using NGINX as reverse proxy to direct
            traffic to the React app and then for contact with the API.
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default Home;
