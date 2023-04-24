import { PineconeClient } from "@pinecone-database/pinecone";

export const pinecone = new PineconeClient();

export async function loadpineCone() {
    try {        
        await pinecone.init({
            environment: process.env.PINECONE_ENV,
            apiKey: process.env.PINECONE_API,
        });
        return pinecone
    } catch (error) {
        console.log(error);
    }
}

