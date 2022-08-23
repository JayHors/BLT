import * as mongo from './mongo.js';
import * as url from 'url';

const urlHandles = {
    GET: {
        notFound: notFound,
    },
    HEAD: {
        notFound: notFound,
    },
    POST: {
        '/newLocationData': addLocationLog,
    },
};

export async function onRequest(req, res) {
    const parsedUrl = new url.URL(req.url, 'https://http-api-2-jayhors.herokuapp.com/');
    if (urlHandles[req.method][parsedUrl.pathname]) {
        urlHandles[req.method][parsedUrl.pathname](req, res);
    } else {
        urlHandles.GET.notFound(req, res);
    }
}

function notFound(request, response) {
    responseBuilder(request, response, { message: 'The requested resource is not available.' }, 404);
}

function responseBuilder(request, response, message, statCode) {
    const headers = { 'Content-Type': 'application/json' };
    response.writeHead(statCode, headers);
    if (!isHead(request)) {
        const stringed = JSON.stringify(message);
        response.write(stringed);
    }
    response.end();
}

function isHead(request) {
    return (request.method === 'HEAD');
}

async function getLocationByUser(request, response) {
    let buffers = [];
    let data;
    request.on('data', chunk => {
        buffers.push(chunk);
    });
    request.on('end', async () => {
        data = Buffer.concat(buffers).toString();
        let jsonData = await JSON.parse(data);
        if(!jsonData.userId){
            responseBuilder(request, response, { message: 'You need to provide a user ID' }, 400);
        }
        else{
            
        }
    });
}

async function addLocationLog(request, response) {
    let buffers = [];
    let data;
    request.on('data', chunk => {
        buffers.push(chunk);
    });
    request.on('end', async () => {
        try {
            data = Buffer.concat(buffers).toString();
            let jsonData = await JSON.parse(data);
            if (validateRecievedData(jsonData)) {
                await mongo.mongoWrite(jsonData);
                responseBuilder(request, response, { message: 'Location logged!' }, 201);
            } else {
                responseBuilder(request, response, { message: 'The request is missing required parameters.' }, 400);
            }
        } catch (error) {
            responseBuilder(request, response, { message: 'An error occurred. Is your data formatted correctly?' }, 500);
        }

    });

}

function validateRecievedData(json) {
    console.log(json);
    if (json.latitude && json.longitude && json.userId && json.timestamp) {
        return true;
    }
    return false;
}