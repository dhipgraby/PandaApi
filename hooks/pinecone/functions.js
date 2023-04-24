import { pinecone } from "./config";
import { saveEmbeddings } from "../openAi/config";

export async function createIndex(indexName) {
    try {
        await pinecone.createIndex({
            createRequest: {
                name: indexName,
                dimension: 1024,
                metric: 'cosine'
            },
        });
        return true;
    } catch (error) {
        console.log(error);
        return false
    }
}

export async function deleteIndex(indexName) {
    try {
        await pinecone.deleteIndex({ indexName: indexName });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function indexDescription(indexName) {
    try {
        const indexDescription = await pinecone.describeIndex({
            indexName: indexName,
        });
        return indexDescription
    } catch (error) {
        console.log(error);
        return fasle
    }
}

export async function listIndexes() {
    try {
        return await pinecone.listIndexes();
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function insertVectors(vectors, indexName) {

    const index = pinecone.Index(indexName);

    let insertBatches = []

    while (vectors.length) {
        let batchedVectors = vectors.splice(0, 250);
        console.log(batchedVectors);
        const upsertRequest = {
            vectors: batchedVectors,
            namespace: namespace,
        };
        let result = await index.upsert({ upsertRequest });
        insertBatches.push(result)
    }

    console.log(insertBatches);
    return vectors;
}

export async function getVectors(vector, indexName) {

    const index = pinecone.Index(indexName);

    const queryRequest = {
        vector: vector,
        topK: 5,
        includeValues: false,
        includeMetadata: true,
        namespace: namespace,
    };

    const queryResponse = await index.query({ queryRequest });
    console.log(queryResponse);
    return queryResponse;
}

export async function updateVectors(question, answer, userEmbedding, indexName) {

    if (userEmbedding == null || saveEmbeddings == false) {
        console.log('save embedings set to false');
        return
    }

    console.log('updating embeddings');

    const index = pinecone.Index(indexName);

    const seconds = Math.floor(Date.now() / 1000)
    const vector = {
        id: `v${seconds}`,
        metadata: {
            question: question,
            answer: answer,
        },
        values: userEmbedding
    }
    const upsertRequest = {
        vectors: [vector],
        namespace: namespace,
    }

    await index.upsert({ upsertRequest });
    console.log('Embeddings updated!');
}