import { postCall } from "../../helpers/apiCall";

const VectorsUrl = "/api/vectors";

export async function getList() {
    const params = { method: "list" };
    return await postCall(VectorsUrl + "/check", params);
}

export async function createIndex(indexName) {
    const params = { method: "create", indexName: indexName };
    return await postCall(VectorsUrl + "/handle", params);
}

export async function deleteIndex(indexName) {
    const params = { method: "delete", indexName: indexName };
    return await postCall(VectorsUrl + "/handle", params);
}

export async function getVectors(question) {
    const params = { method: "getVectors", question: question };
    return await postCall(VectorsUrl + "/check", params);
}