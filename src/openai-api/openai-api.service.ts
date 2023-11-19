import OpenAI from 'openai';

export class OpenaiApiService {
    private openai: OpenAI;
    private MAX_TOKENS = 100;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    public async getResponse(text: string) {
        const response = await this.openai.completions.create({
            model: 'gpt-3.5-turbo-instruct',
            prompt: text,
            max_tokens: this.MAX_TOKENS
        });

        return response.choices[0].text;
    }
}