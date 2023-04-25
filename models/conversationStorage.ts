// models/conversationStorage.ts
import fs from "fs";
import path from "path";

const conversationsDirectory = "./logs/conversations/";

export async function deleteConversation(conversationName: string): Promise<void> {
    const File = path.join(conversationsDirectory, conversationName);
    try {
        fs.unlinkSync(File);
    } catch (error) {
        console.error("Error on deleting file :", error);
    }
}

export async function createConversation(conversationName: string): Promise<{ fileName: string; content: any }> {
    if (conversationName == null || conversationName == "") {
        const date = new Date();
        conversationName = date
            .toDateString()
            .replace(/\s/g, "") +
            "-" +
            date
                .toLocaleTimeString()
                .replace(":", "-")
                .replace(/\s/g, "")
                .replace(":", "-")
                .replace(/\s/g, "");
    }

    try {
        if (!fs.existsSync(conversationsDirectory)) {
            fs.mkdirSync(conversationsDirectory, { recursive: true });
        }
        const filePath = path.join(conversationsDirectory, `${conversationName}.json`);
        const content = JSON.stringify([{ fileName: conversationName }], null, 2);
        fs.writeFileSync(filePath, content);
        console.log("Conversation file created successfully:", filePath);
        return {
            fileName: `${conversationName}.json`,
            content: JSON.parse(content),
        };
    } catch (error) {
        console.error("Error creating conversation file:", error);
        throw Error("Error creating file")
    }
}

export async function getConversation(conversationId: string): Promise<any> {
    try {
        const filePath = path.join(conversationsDirectory, conversationId);
        if (fs.existsSync(filePath)) {
            const rawData = fs.readFileSync(filePath, "utf8");
            return JSON.parse(rawData);
        } else {
            return undefined;
        }
    } catch (error) {
        console.log("Error reading conversation file:", error);
        return undefined;
    }
}

export async function setConversation(conversationId: string, conversation: any): Promise<void> {
    try {
        const filePath = path.join(conversationsDirectory, conversationId);
        fs.writeFileSync(filePath, JSON.stringify(conversation, null, 2));
    } catch (error) {
        console.error("Error writing conversation file:", error);
    }
}

export async function getAllConversations(): Promise<{ fileName: string; docname: string }[]> {
    try {
        const fileNames = fs.readdirSync(conversationsDirectory);
        const conversations = fileNames.map((fileName) => {
            const filePath = path.join(conversationsDirectory, fileName);
            const rawData = fs.readFileSync(filePath, "utf8");
            const content = JSON.parse(rawData);
            return {
                fileName: fileName,
                docname: content[0].fileName,
            };
        });
        return conversations;
    } catch (error) {
        console.error("Error reading all conversation files:", error);
        return [];
    }
}

export async function changeName(conversationName: string, newName: string): Promise<void> {
    
    try {
        const filePath = path.join(conversationsDirectory, conversationName);
        if (fs.existsSync(filePath)) {
            const rawData = fs.readFileSync(filePath, "utf8");
            let jsonData = JSON.parse(rawData);
            jsonData[0].fileName = newName;
            setConversation(conversationName, jsonData);
        } else {
            console.log("File not exist");
        }
    } catch (error) {
        console.log("Error reading conversation file", error);
    }
}
