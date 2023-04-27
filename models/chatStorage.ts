import { openai, promptHistory } from "../hooks/openAi/config";
import { CompletionResult, Conversation } from '../types/Convesations'
import { loadContext, updateLogs } from './documentStorage'
import { models } from "../types/Model";

export async function OpenAi_createCompletion(
    prompt: string,
    question: string,
    conversationId: string,
): Promise<CompletionResult> {

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
    console.log(completion.data.usage);

    const answer = completion.data.choices[0].message.content;
    console.log("Ai response", { question: prompt, answer: answer });
    const updated: any = await updateLogs(question, answer, conversationId);
    return {
        answer: answer,
        usage: completion.data.usage,
        isNew: updated.isNew,
        docname: updated.docname,
    };
}
