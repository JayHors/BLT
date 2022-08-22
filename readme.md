# **B**asic **L**ocation **T**racker

This is a basic location tracking backend. I plan on adding frontends at some point soon, but I'll be starting with this backend. Written with Node.js.

---

## Setup

This server uses MongoDB as a backend. Feel free to rewrite to use something else, but if you want to use your own MongoDB instance, you'll need 3 files in the root directory:

- `mongouser`, with the MongoDB username you're using for this app
- `mongopass`, with the password for stated MongoDB username
- `mongoroute`, with the URL to your MongoDB instance (usually anything that appears after the @ when creating a new connection with the Connect button on the web console)

Once you have these three files in place, everything should be set with a run of `npm install`. `npm start` will start a local instance of the server.

### Docker

Docker support is currently experimental, but I have included the docker file I'm using. I'm still learning docker lol


## Usage

The backend currently only accepts 4 parameters:

- `latitude`
- `longitude`
- `userId`
- `timestamp`

The current plan is for the frontend to be running on a GPS-enabled device, with a client returning where a user was at a certain time. My plans are to initially use this for my geospatial technology class to track data for my final project (a story map), but eventually I want it to be a simple location sharing service. 
[Jay Horsfall](https://jayhorsfall.com)