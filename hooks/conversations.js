import { postCall } from "../helpers/apiCall";

const ConversationsUrl = "/api/conversations";

export async function getConversation(conversationId) {
    const params = { method: "getConversation", conversationId: conversationId };
    return await postCall(ConversationsUrl, params);
}

export async function setConversation(conversationId, conversation) {
    const params = { method: "setConversation", conversationId, conversation };
    return await postCall(ConversationsUrl, params);
}

export async function getAllConversations() {
    const params = { method: "getAll" };
    return await postCall(ConversationsUrl, params);
}

export async function createConversation(conversationName) {
    const params = { method: "createConversation", conversationName: conversationName };
    return await postCall(ConversationsUrl, params);
}

export async function updateConversationName(conversationName, newName) {
    const params = { method: "conversationName", conversationName: conversationName, newName: newName };
    return await postCall(ConversationsUrl, params);
}

export async function deteleConversation(conversationName) {
    const params = { method: "deleteConversation", conversationName: conversationName };
    return await postCall(ConversationsUrl, params);
}




