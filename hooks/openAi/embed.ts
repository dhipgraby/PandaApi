import { loadConversation } from "../../pages/api/chat/chat_functions";
import { matchUserAndSystemContent, getChunksForEmebedding } from "../../helpers/context";
import { openai } from "./config";
import { insertVectors } from "../pinecone/functions";

export async function embedOpenAi(conversationId, userQuery = "How old am I?") {

    const conversationFile = "./logs/conversations/" + conversationId
    console.log('embeding please wait...');
    try {

        let conversation = await loadConversation(conversationFile);
        const usages = [];
        const chunks = await getChunksForEmebedding(conversation)
        const matchedContent = matchUserAndSystemContent(conversation);

        for (var i = 0; i < chunks.length; i++) {
            const embedData = await createEmbedding(chunks[i])
            matchedContent[i]['embedding'] = embedData.embeding
            usages.push(embedData.usage);
        }

        console.log(usages);

        const vectors = matchedContent.map((vector, i) => {
            return {
                id: `vect${i}`,
                metadata: {
                    question: vector.question,
                    answer: vector.answer,
                },
                values: vector.embedding
            }
        })

        let pineconeResults = await insertVectors(vectors)
        console.log('insert Success');
        return pineconeResults
    } catch (error) {
        console.log(error)
        return false;
    }
}

export async function createEmbedding(question) {
    try {
        const response = await openai.createEmbedding({
            model: "text-embedding-ada-002",
            input: question,
        });

        const embeddingResults = response.data.data[0].embedding
        const usage = response.data.usage
        return {
            embeding: embeddingResults,
            usage: usage
        }
    } catch (error) {
        console.log("createEmbedding error:", error);
    }

}

//AFTER UPDATE matchedContent ADDING EMBEDINGS
// const VectorsSearchResult = await getSimilarQuestions(matchedContent, userEmbedding, matchedContent.length)
// console.log(VectorsSearchResult);
