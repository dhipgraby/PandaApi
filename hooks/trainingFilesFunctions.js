import { updateLogs } from "../pages/api/comprehend";

export async function getAvailableModels(res) {
    try {
        const response = await openai.listModels();
        console.log("response", response.data);
        return response.data;
    } catch (error) {
        console.error("Error on getting models :", error);
        res.status(500).json({ error: "Error on getting models: " });
    }
}

export async function saveFileToConversation(res, params) {
    try {
        const decodedContent = JSON.stringify(params.Filecontent);
        console.log(decodedContent);
        await updateLogs(params.FileName, decodedContent)
    } catch (error) {
        console.error("Error on saveFileToConversation: ", error);
        res.status(500).json({ error: "Error on saveFileToConversation" });
    }
}

export async function removeFile(res, File) {
    try {
        fs.unlink(File, function (err) {
            if (err) return console.log(err);
        });
    } catch (error) {
        console.error("Error on deleting file :", error);
        res.status(500).json({ error: "Error on deleting file: " });
    }
}

export async function handleOpenAiCreateFile(res, File) {
    try {
        const response = await openai.createFile(
            fs.createReadStream(File),
            "fine-tune"
        );
        console.log(response);
        res.status(200).json(response);
    } catch (error) {
        console.error("Error on training model :", error);
        res.status(500).json({ error: "Error on training model: " });
    }
}

export async function handleGetSingleFile(res, FileId) {
    try {
        const file = await openai.retrieveFile(FileId);
        const content = await openai.downloadFile(FileId);
        console.log(file);
        console.log(content);
    } catch (error) {
        console.error("Error on handleGetSingleFile model :", error);
        res.status(500).json({ error: "Error on handleGetSingleFile model: " });
    }
}

export async function getFilesIds(res) {
    try {
        const response = await openai.listFiles();        
        return response.data
    } catch (error) {
        console.error("Error on training model :", error);
        res.status(500).json({ error: "Error on training model: " });
    }
}

export async function handleDelete(res, FileId) {
    try {
        const response = await openai.deleteFile(FileId);        
        return response;
    } catch (error) {
        console.error("Error on training model :", error);
        res.status(500).json({ error: "Error on training model: " });
    }
}
