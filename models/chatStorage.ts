import { ChatCompletionRequestMessageRoleEnum } from "openai";
import { openai, promptHistory, updateFiles } from "../hooks/openAi/config";
import { models } from "../types/Model";
import fs from "fs";

interface CompletionResult {
    answer: string;
    usage: any;
    isNew: boolean;
    docname: string;
}

interface Conversation {
    role: ChatCompletionRequestMessageRoleEnum;
    content: string;
    messages?: Conversation[];
}

export async function OpenAi_createCompletion(
    prompt: string,
    question: string,
    conversationId: string,
): Promise<CompletionResult> {
    console.log("prompt length:", prompt.length);
    const context: Conversation[] = (promptHistory == true)
        ? await loadContext(conversationId)
        : [];
    const conversation: Conversation = {
        role: "user",
        content: prompt,
    };
    context.push(conversation);

    const completion: any = await openai.createChatCompletion({
        model: models.GPT_3,
        messages: context,
    });

    const answer = completion.data.choices[0].message.content;

    console.log("consoleReply", { question: prompt, answer: answer });
    //UPDATING CONVERSATIONS
    console.log(completion.data.usage);
    const updated: any = await updateLogs(question, answer, conversationId);
    return {
        answer: answer,
        usage: completion.data.usage,
        isNew: updated.isNew,
        docname: updated.docname,
    };
}

export async function loadConversation(File: string): Promise<any> {
    if (fs.existsSync(File)) {
        const rawData = fs.readFileSync(File, "utf-8");
        return JSON.parse(rawData);
    } else {
        return [{ fileName: newFileName() }];
    }
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

export async function loadContext(conversationId: string): Promise<Conversation[]> {
    const conversationFile = "./logs/conversations/" + conversationId;
    const context = await loadConversation(conversationFile);
    return context;
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

async function updateConversation(
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
        docname: FileName,
        isNew: isNew,
    };
}
