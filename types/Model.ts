
export const models = {
    GPT_3: "gpt-3.5-turbo",
    GPT_4: "gpt-4-32k",
    Davinci: "davinci",
    DavinciCode: "code-davinci-002",
    DavinciText: "text-davinci-003",
    Curie: "text-curie-001",
    Personal: "davinci:ft-onchain-solutions-2023-03-23-03-11-55"
}

export const ModelParameters = (prompt:string) => {
    return {
        model: models.GPT_4,
        prompt: prompt,
        max_tokens: 2048,
        temperature: 0.1,
        n: 1,
    }
}