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
          <h1>jterm-dis</h1>
          <p>
            This is my January term Directed Independent Study project. The end
            product is a React CRUD app that allows users to submit, edit,
            delete, and view recipes. There is also register and login
            functionality.
          </p>
          <h2>About the Project</h2>
          <p>
            All of the front-end and back-end has been done using JavaScript and
            mainly using the React library. I've also created an API with
            Express that manages all of the communication with MongoDB Atlas.
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
            GNU/Linux 10 (buster) which can be downloaded for free on the{" "}
            <a href="https://www.raspberrypi.org/downloads/">Raspberry Pi</a>{" "}
            website.
            <br />
            <br />
            A program called Nginx is being used as a reverse proxy in order to
            serve the website on the Pi. On the router in my apartment I've
            setup the firewall to only accept requests to port 80 and they are
            forwarded to the internal IP address of the Pi. From there, Nginx
            takes those requests and directs them to the port where the React
            app is running. The Express API is running on a separate port and
            any request that go through 9toes.club/api are then proxied to the
            Express API port.
            <br />
            <br />
            In order to configure Nginx, the file located at
            /etc/nginx/sites-available/default must be configured properly. This
            directs all traffic from port 80 to port 5000 where the React app
            lives. Then it takes all /api traffic and proxies that to port 3000
            for the Express API.
            <br />
            <br />
            server {"{"} <br />
            listen 80 default_server;
            <br />
            listen [::]:80 default_server;
            <br />
            root /usr/share/nginx/html;
            <br />
            server_name 9toes.club;
            <br />
            <br />
            location / {"{"}
            <br />
            proxy_pass http://localhost:5000;
            <br />
            proxy_http_version 1.1;
            <br />
            proxy_set_header Upgrade $http_upgrade;
            <br />
            proxy_set_header Connection 'upgrade';
            <br />
            proxy_set_header Host $host;
            <br />
            proxy_cache_bypass $http_upgrade;
            <br />
            }<br />
            <br />
            location /api/ {"{"}
            <br />
            proxy_pass http://localhost:3000;
            <br />
            proxy_http_version 1.1;
            <br />
            proxy_set_header Upgrade $http_upgrade;
            <br />
            proxy_set_header Connection 'upgrade';
            <br />
            proxy_set_header Host $host;
            <br />
            proxy_cache_bypass $http_upgrade;
            <br />
            }<br />
            }
            <br />
            <br />
            After Nginx has been configured, the following command is used in
            terminal to check if the configuration is valid.
            <br />
            `sudo nginx -t`
            <br />
            <br />
            This last command restarts Nginx with the new settings.
            <br />
            `sudo systemctl restart -nginx`
          </p>
          <h2>Replicating the Project</h2>
          <p>
            In order to run the code from the github repository you'll need to
            make some changes and install a few libraries/frameworks.
            <br />
            <br />
            For the Express API:
            <br />
            `npm install express mongoose jsonwebtoken dotenv bcryptjs
            @hapi/joi`
            <br />
            <br />
            For the React App:
            <br />
            `npx create-react-app my-app`
            <br />
            `npm install js-sha256 js-cookie react-bootstrap react-router-dom
            formik yup`
            <br />
            <br />
            There are a number of files that are included in the .gitignore for
            security reasons, but the main information that you'd have to
            replicate is the MongoDB communication string (DB_CONNECT). This are
            located in a .env file and you can reference the{" "}
            <a href="https://www.npmjs.com/package/dotenv">
              dotenv documentation
            </a>
            . Any other files included in the .gitignore that you may need
            should be created when running
            <br />
            `npx create-react-app my-app`
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default Home;
