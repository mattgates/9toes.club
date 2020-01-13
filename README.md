# jterm-dis

This is my January term Directed Independent Study project. The end goal will be a CRUD app that should be capable of users registering, logging in/out, sharing recipes, and viewing recipes made by others.

## About the project

All of the front and backend has been done using JavaScript and mainly using the React library. I've also created an API with Express that manages all of the communication with MongoDB Atlas.

Another part of the project is doing my best to implement the application with security in mind. With only two weeks and essentially no budget it's not exactly feasible to implement best practices and use industry standard tools. Anyone registering will be made clear that this is not a site to trust sensitive data with. There is likely not going to be HTTPS and it's hosted on a Raspberry Pi on a commercial Wi-Fi network, which makes it inherently insecure in the end. That being said, everything from the API to React has been implemented in an effort to keep the site secure-ish and learn from the process.

The project will be running at 9toes.club as soon as the Raspberry Pi is all setup.

## Setting Up the Raspberry Pi

For this project I'm using a Raspberry Pi 4 Model B 2019 Quad Core 64 Bit WiFi Bluetooth (4GB).
The operating system is Raspbian GNU/Linux 10 (buster) which can be downloaded for free on the [Raspberry Pi](https://www.raspberrypi.org/downloads/) website.

A program called Nginx is being used as a reverse proxy in order to serve the website on the Pi. On the router in my apartment I've setup the firewall to only accept requests to port 80 and they are forwarded to the internal IP address of the Pi. From there, Nginx takes those requests and directs them to port 3000 where the React app is running. The Express API is running on a separate port and the requests from React to Express are sent through a proxy.

## Replicating the Project

In order to run the code from the github repository you'll need to make some changes and install a few libraries/frameworks.

For the Express API:
`npm install express mongoose jsonwebtoken dotenv bcryptjs @hapi/joi`

For the React App:
`npx create-react-app my-app`
`npm install js-sha256 js-cookie react-bootstrap react-router-dom`

There are a number of files that are included in the .gitignore for security reasons, but the main information that you'd have to replicate are the MongoDB communication string (DB_CONNECT) and the JWT (TOKEN_SECRET). These are located in a .env file and you can reference the [dotenv documentation](https://www.npmjs.com/package/dotenv). Any other files included in the .gitignore that you may need should be created when running `npx create-react-app my-app`
