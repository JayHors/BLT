import * as mongo from './mongo.js';

export function onRequest(req, res){
    mongo.mongoWrite();
}