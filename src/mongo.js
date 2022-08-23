import { MongoClient, ServerApiVersion } from "mongodb";
import * as fs from 'fs';

//mongo information, stored externally. Reads synchronously, as all are needed for server setup
const password = fs.readFileSync('./mongopass').toString();
const username = fs.readFileSync('./mongouser').toString();
const mongoRoute = fs.readFileSync('./mongoroute').toString();

//mongo setup for client
const uri = `mongodb+srv://${username}:${password}@${mongoRoute}`;



export async function mongoWrite(data){
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    try {
        await client.connect();
    
        await createTestData(client, data);
    }
    catch (e) {
        console.log(e);
    }
    finally {
        await client.close();
    }
}

export async function mongoRead(field){
    let results = [];
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    try {
        await client.connect();
    
        const resultCursor = await client.db().collection("testing").find(field);

        if(resultCursor.count === 0){
            return {"message":"No results found"};
        }

        resultCursor.forEach(results.push);

        return results;
    }
    catch (e) {
        console.log(e);
    }
    finally {
        await client.close();
    }
    

}

async function createTestData(client, data){
    
    const result = await client.db().collection("testing").insertOne(data);
    
}