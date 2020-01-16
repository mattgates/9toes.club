
# jterm-dis

This is my January term Directed Independent Study project. The end product is a React CRUD app that allows users to submit, edit, delete, and view recipes. There is also register and login functionality.  

## About the project

All of the front-end and back-end has been done using JavaScript and mainly using the React library. I've also created an API with Express that manages all of the communication with MongoDB Atlas.

The project is hosted on a Raspberry Pi that is configured to serve the React app to the domain name [9toes.club](http://9toes.club).

## Setting Up the Raspberry Pi

For this project I'm using a Raspberry Pi 4 Model B 2019 Quad Core 64 Bit WiFi Bluetooth (4GB). The operating system is Raspbian GNU/Linux 10 (buster) which can be downloaded for free on the [Raspberry Pi](https://www.raspberrypi.org/downloads/) website.

A program called Nginx is being used as a reverse proxy in order to serve the website on the Pi. On the router in my apartment I've setup the firewall to only accept requests to port 80 and they are forwarded to the internal IP address of the Pi. From there, Nginx takes those requests and directs them to the port where the React app is running. The Express API is running on a separate port and any request that go through 9toes.club/api are then proxied to the Express API port.
  
In order to configure Nginx, the file located at /etc/nginx/sites-available/default must be configured properly. This directs all traffic from port 80 to port 5000 where the React app lives. Then it takes all /api traffic and proxies that to port 3000 for the Express API.

```
server {
	listen 80 default_server;
	listen [::]:80 default_server;

	root /usr/share/nginx/html;

	server_name 9toes.club;

	location / {
            proxy_pass http://localhost:5000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
	}

	location /api/ {
	    proxy_pass http://localhost:3000;
	    proxy_http_version 1.1;
	    proxy_set_header Upgrade $http_upgrade;
	    proxy_set_header Connection 'upgrade';
	    proxy_set_header Host $host;
	    proxy_cache_bypass $http_upgrade;
	}
}
```

## Replicating the Project

In order to run the code from the github repository you'll need to make some changes and install a few libraries/frameworks.

For the Express API:

`npm install express mongoose dotenv bcryptjs @hapi/joi`

For the React App:

`npx create-react-app my-app`

`npm install js-sha256 js-cookie react-bootstrap react-router-dom formik yup`

There are a number of files that are included in the .gitignore for security reasons, but the main information that you'd have to replicate is the MongoDB communication string (DB_CONNECT). This are located in a .env file and you can reference the [dotenv documentation](https://www.npmjs.com/package/dotenv). Any other files included in the .gitignore that you may need should be created when running `npx create-react-app my-app`
