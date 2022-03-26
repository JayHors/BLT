# **B**asic **L**ocation **T**racker

This is a basic location tracking backend. I plan on adding frontends at some point soon, but I'll be starting with this backend. Written with Node.js.

---

## Setup

This server uses MongoDB as a backend. Feel free to rewrite to use something else, but if you want to use your own MongoDB instance, you'll need 3 files in the root directory:

- `mongouser`, with the MongoDB username you're using for this app
- `mongopass`, with the password for stated MongoDB username
- `mongoroute`, with the URL to your MongoDB instance (usually anything that appears after the @ when creating a new connection with the Connect button on the web console)

Once you have these three files in place, everything should be set with a run of `npm install`. `npm start` will start a local instance of the server.

[Jay Horsfall](https://jayhorsfall.com)