import { updateFiles } from "../hooks/openAi/config";
import { Conversation } from "../types/Convesations";
import GPT3Tokenizer from 'gpt3-tokenizer';
import fs from "fs";

export async function loadConversation(File: string): Promise<any> {
    if (fs.existsSync(File)) {
        const rawData = fs.readFileSync(File, "utf-8");
        return JSON.parse(rawData);
    } else {
        return [{ fileName: newFileName() }];
    }
}


export async function loadContext(conversationId: string): Promise<Conversation[]> {
    const conversationFile = "./logs/conversations/" + conversationId;
    const context = await loadConversation(conversationFile);
    context.shift();

    const tokenizer = new GPT3Tokenizer({ type: 'gpt3' });
    let totalTokens = 0;

    for (let message of context) {
        const encoded = tokenizer.encode(message.content);
        totalTokens += encoded.bpe.length;
    }

    console.log('Total tokens:', totalTokens);

    const maxTokens = 2048;
    let reversedContext = [...context].reverse();
    let tokensToKeep = maxTokens;
    let lastMessages = [];

    for (let message of reversedContext) {
        const encoded = tokenizer.encode(message.content);
        if (tokensToKeep >= encoded.bpe.length) {
            lastMessages.push(message);
            tokensToKeep -= encoded.bpe.length;
        } else {
            break;
        }
    }

    const truncatedContext = lastMessages.reverse();
    let truncatedTokens = 0;

    for (let message of truncatedContext) {
        const encoded = tokenizer.encode(message.content);
        truncatedTokens += encoded.bpe.length;
    }

    console.log('Truncated tokens:', truncatedTokens);
    console.log('Truncated context:', truncatedContext);
    return truncatedContext;
}


export async function updateLogs(
    question: string,
    answer: string,
    conversationId: string
): Promise<any> {
    if (updateFiles === false) {
        console.log("updateFiles is set to false");
        return {
            isNew: true,
            docname: "newFile"
        };
    }
    return await updateConversation(question, answer, conversationId);
}

export async function updateConversation(
    question: string,
    answer: string,
    conversationId: string
): Promise<{ docname: string; isNew: boolean }> {
    const conversationFile = "./logs/conversations/" + conversationId;
    const conversation = await loadConversation(conversationFile);
    const isNew = !fs.existsSync(conversationFile);
    const FileName = (isNew) ? conversation[0].fileName : conversationId;
    //UPDATING DATASET  
    conversation.push({ role: "user", content: question });
    conversation.push({ role: "system", content: answer });
    //SAVING DATASET FILES 
    const conversationContent = JSON.stringify(conversation, null, 2);
    fs.writeFileSync("./logs/conversations/" + FileName, conversationContent);
    return {
        docname: conversation[0].fileName,
        isNew: isNew,
    };
}

function newFileName(): string {
    const date = new Date();
    let fileName = date.toDateString()
        .replace(/\s/g, "") + "-" +
        date.toLocaleTimeString()
            .replace(":", "-")
            .replace(/\s/g, "")
            .replace(":", "-")
            .replace(/\s/g, "");

    fileName = fileName + ".json";
    return fileName;
}