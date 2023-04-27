import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

interface Env {
  OPENAI_API_KEY: string;
}

const env = process.env as unknown as Env;

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);
//LOGS
export const promptHistory: boolean = true;
export const updateFiles: boolean = true;
//CONTEXT
export const onlyContext: boolean = false;
export const useEmbeddings: boolean = false;
export const saveEmbeddings: boolean = false;
export const max_return: number = 5;
