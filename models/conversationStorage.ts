// models/conversationStorage.ts
import fs from "fs";
import path from "path";
import {
    createConversationDB,
    getConversationDB,
    getAllConversationsDB,
    updateConversationDB,
    deleteConversationDB
} from "./conversationStorageDB"
import { newConversationName } from "../helpers/conversations"

const conversationsDirectory = "./logs/conversations/";

export async function deleteConversation(conversationName: string, userId: number): Promise<void> {
    const conversation = await getConversationDB(conversationName, userId)
    if (conversation == null || !conversation.uniqueId) throw Error("Conversation not found in db")

    await deleteConversationDB(conversation.uniqueId)

    const File = path.join(conversationsDirectory, conversation.uniqueId + '.json');
    try {
        fs.unlinkSync(File);
    } catch (error) {
        console.error("Error on deleting file :", error);
        throw Error("Delete creating file")
    }
}

export async function createConversation(conversationName: string, userId: number): Promise<{ fileName: string; content: any }> {

    if (conversationName == null || conversationName == "") {
        conversationName = newConversationName()
    }

    try {

        const newConversation = await createConversationDB(userId);
        if (!newConversation.uniqueId) throw Error("Error creating conversation file in db")

        if (!fs.existsSync(conversationsDirectory)) {
            fs.mkdirSync(conversationsDirectory, { recursive: true });
        }
        const filePath = path.join(conversationsDirectory, `${newConversation.uniqueId}.json`);
        const content = JSON.stringify([{ fileName: conversationName }], null, 2);
        fs.writeFileSync(filePath, content);
        console.log("Conversation file created successfully:", filePath);
        return {
            fileName: `${conversationName}`,
            content: JSON.parse(content),
        };
    } catch (error) {
        console.error("Error creating conversation file:", error);
        throw Error("Error creating file")
    }
}

export async function getConversation(conversationId: string, userId: number): Promise<any> {
    try {
        const conversation = await getConversationDB(conversationId, userId)
        if (conversation == null || !conversation.uniqueId) throw Error("Conversation not found in db")

        const filePath = path.join(conversationsDirectory, conversation.uniqueId + '.json');

        if (fs.existsSync(filePath)) {
            const rawData = fs.readFileSync(filePath, "utf8");
            return JSON.parse(rawData);
        } else {
            console.log('no file');
            return undefined;
        }
    } catch (error) {
        console.log("Error reading conversation file:", error);
        return undefined;
    }
}

export async function setConversation(conversationId: string, conversation: any, userId: number): Promise<void> {
    try {
        const db_conversation = await getConversationDB(conversationId, userId)
        if (db_conversation == null || !db_conversation.uniqueId) throw Error("Conversation not found in db")

        await updateConversationDB(db_conversation.uniqueId, new Date())

        const filePath = path.join(conversationsDirectory, db_conversation.uniqueId + '.json');
        fs.writeFileSync(filePath, JSON.stringify(conversation, null, 2));
    } catch (error) {
        console.error("Error writing conversation file:", error);
    }
}

export async function getAllConversations(userId: number): Promise<{ fileName: string; docname: string }[]> {

    try {
        const fileNames = await getAllConversationsDB(userId)

        const conversations: any = fileNames.map((fileName) => {
            const filePath = path.join(conversationsDirectory, fileName.uniqueId + '.json');
            const rawData = fs.readFileSync(filePath, "utf8");
            const content = JSON.parse(rawData);
            return {
                fileName: fileName.uniqueId,
                docname: content[0].fileName,
            };
        });
        return conversations;
    } catch (error) {
        console.error("Error reading all conversation files:", error);
        return [];
    }
}

export async function changeName(conversationName: string, newName: string, userId: number): Promise<void> {

    const db_conversation = await getConversationDB(conversationName, userId)
    if (db_conversation == null || !db_conversation.uniqueId) throw Error("Conversation not found in db")

    await updateConversationDB(db_conversation.uniqueId, new Date())

    try {
        const filePath = path.join(conversationsDirectory, conversationName + '.json');

        if (fs.existsSync(filePath)) {
            const rawData = fs.readFileSync(filePath, "utf8");
            let jsonData = JSON.parse(rawData);
            jsonData[0].fileName = newName;
            setConversation(conversationName, jsonData, userId);
        } else {
            console.log("File not exist")
            throw Error("File not exist")
        }
    } catch (error) {
        console.log("Error reading conversation file", error);
    }
}
