import { postCall } from "../helpers/apiCall";

const EmbedingsUrl = "/api/embedings";

export async function embedData(conversationId) {
    const params = { method: "embed", conversationId: conversationId };
    return await postCall(EmbedingsUrl, params);
}