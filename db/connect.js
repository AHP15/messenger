import { MongoClient } from "mongodb";

let isConnected = false;

async function connectDB(){
    const client = new MongoClient(process.env.CONNECTION_URL);
    if(isConnected) {
        console.log("database already connected");
        return client.db("chat");
    }

    try{
        await client.connect();
        isConnected = true;
        console.log("connected to database successfully");
    }catch(err){
        console.error(err);
    }
    
    return client.db("chat");
}

export default connectDB;