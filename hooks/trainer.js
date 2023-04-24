import { postCall } from "../helpers/apiCall";

const TrainingFilesUrl = "/api/trainingFiles";
const TrainingModelUrl = "/api/trainingmodel";
const ConverterUrl = "/api/converter";

const oldTrainingFileId = "file-4kjQHnYucILfywGFk5QnkDv2"
const TrainingFileId = "file-KwyZFLSRW44cTO3oWIHk3bHE"

export async function createOpenAiFile() {
    const params = { createOpenAiFile: true };
    return await postCall(TrainingFilesUrl, params);
}

export async function getFiles() {
    const params = { getFiles: true };
    return await postCall(TrainingFilesUrl, params);
}

export async function getFileInfo() {
    const params = { retrieveFile: true, FileId: TrainingFileId };
    return await postCall(TrainingFilesUrl, params);
}

export async function startTrainingModel() {
    const params = { newFineTune: true, FileId: TrainingFileId };
    return await postCall(TrainingModelUrl, params);
}

export async function getFineTunes() {
    const params = { ListFineTunes: true };
    return await postCall(TrainingModelUrl, params);
}

export async function deleteTrainingSet() {
    const params = { deleteTrainingSet: true };
    return await postCall(TrainingFilesUrl, params);
}

export async function deleteConversation() {
    const params = { deleteConversation: true };
    return await postCall(TrainingFilesUrl, params);
}

export async function conversationToTrainingFile() {
    const params = { conversationToTrainingFile: true };
    return await postCall(ConverterUrl, params);
}


export async function getModels() {
    const params = { getModels: true };
    return await postCall(TrainingFilesUrl, params);
}

export async function addFileToConversation(Folder) {

    Folder.folderFiles.map(async (file) => {
        const content = "File: " + file.content
        const params = { saveFile: true, FileName: file.filename, FileContent: content };
        return await postCall(TrainingFilesUrl, params);
    })

}