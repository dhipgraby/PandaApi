export async function FolderSelection(event) {
    const files = Array.from(event.target.files);

    const filePromises = files.map(async (file) => {
        const reader = new FileReader();
        return new Promise((resolve) => {
            reader.onload = (e) => {
                resolve({ filename: file.name, content: e.target.result });
            };
            reader.readAsText(file);
        });
    });

    const folderFiles = await Promise.all(filePromises);
    const fileDescriptions = folderFiles
        .map((file) => `File name: ${file.filename}\n\ File content: ${file.content}`)
        .join("\n\n");

    return {
        folderFiles: folderFiles,
        fileDescriptions: fileDescriptions
    }
}

export async function comprehendCode(descriptionChunk = null, question, conversationId) {

    const base64Content = (descriptionChunk != null) ? btoa(`${descriptionChunk}`) : null

    const response = await fetch("/api/comprehend", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            base64Content: base64Content,
            question: question,
            conversationId: conversationId
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to comprehend code");
    }

    return response.json();
}

export async function getAnswers(_question, conversationId) {

    const responses = [];
    let usage_data = { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }

    const response = await comprehendCode(null, _question, conversationId);
    responses.push(response.comprehensionResult);
    usage_data = updateUsage(response, usage_data)
    const answer = responses.join("\n");

    const data = {
        answer: answer,
        usage: usage_data,
        isNew: response.isNew,
        docname: response.docname
    }
    
    return data
}

function updateUsage(_res, usage_data) {
    usage_data.prompt_tokens += _res.usage.prompt_tokens
    usage_data.completion_tokens += _res.usage.completion_tokens
    usage_data.total_tokens += _res.usage.total_tokens
    return usage_data
}

export async function createChatContext(questions, userQuery) {
    const prompt = [
        'Hey Im Jingjing and you are my personal assistance Simona.',
        'I will be asking simple questions about me',
        'You have queried our database and found the 3 most relevant support questions and answers:',
        '',
        questions.matches
            .map((question) => {
                return [`Me: ${question.metadata.question}`, `You: ${question.metadata.answer}`].join('\n');
            })
            .join('\n'),
        'Using the above reference conversation material, analized it and make the best answer you can.',
        conversationRules(),
        `Me: ${userQuery}`,
        'You:',
    ].join('\n');

    console.log(prompt);
    return prompt;
}

export function conversationRules() {
    const rules = `
    Base your answer taking in count this rules:
    - Dont response with Base on previous conversations. Talk like you are sure about the answer
    - Simple and short answer if the question is not too complex.
    - If you dont think the above references give a good answer, symple tell me you dont know.
    `;
    return rules
}

// export async function documentToPrompt() {
// const chunkSize = 2048; // Adjust this value based on your needs
//     if (projectDescription.length > chunkSize) {
//         console.log('Code is too long :' + projectDescription.length)
//         return false
//     }

//     const code = projectDescription.replaceAll("\n", " ")
//         .replaceAll("  ", " ")
//         .replaceAll("   ", " ")
//         .replaceAll("\r", "");

//     const message = [
//         "Explain this code in less than 20 words. 3 most relevant points about it.",
//         "Tell me about this code in less than 15 words. Mention 2 important things about it.",
//         "What is this code doing? Explain in less than 30 words"
//     ]

//     const response = await comprehendCode(code, message[randomNumber], conversationId);
//     responses.push(response.comprehensionResult);
//     updateUsage(response)
// }
