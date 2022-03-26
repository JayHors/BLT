//imports
import * as requests from './requests.js';
import * as http from 'http';

//port that the http server listens on
const port = process.env.PORT || process.env.NODE_PORT || 3500;

http.createServer(requests.onRequest).listen(port, () => { console.log(`Listening on localhost port ${port}`); });
