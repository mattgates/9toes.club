# 9toes.club

This is my independent study project from January 2020. It's my first attempt at a CRUD app and also my first time using JavaScript, React, and making an API.

## About the project

All of the front-end has been done using JavaScript and mainly using the React library. I've also created an API with Express that manages all of the communication with MongoDB Atlas where all account and recipe data is stored.

The project is hosted on a Raspberry Pi that is configured to serve the React app to the domain name [9toes.club](http://9toes.club).

## Setting Up the Raspberry Pi

For this project I'm using a Raspberry Pi 4 Model B 2019 Quad Core 64 Bit WiFi Bluetooth (4GB). The operating system is Raspbian GNU/Linux 10 (buster). I'm using NGINX as reverse proxy to direct traffic to the React app and then for contact with the API.
