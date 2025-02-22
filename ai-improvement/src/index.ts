import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from root .env
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

interface ImproveTextOptions {
  text: string;
  maxTokens?: number;
  temperature?: number;
}

class TextImprover {
  private openai: OpenAI;

  constructor() {
    const apiKey = process.env.GPT_API_KEY;
    
    if (!apiKey) {
      throw new Error('GPT_API_KEY is not set in environment variables');
    }

    this.openai = new OpenAI({
      apiKey,
    });
  }

  async improveText({
    text,
    maxTokens = 1000,
    temperature = 0.7
  }: ImproveTextOptions): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a professional editor who improves text while maintaining its original meaning.'
          },
          {
            role: 'user',
            content: `Please improve the following text while maintaining its core meaning. 
            Make it more professional, clear, and well-structured:

            ${text}`
          }
        ],
        max_tokens: maxTokens,
        temperature: temperature,
      });

      const improvedText = response.choices[0]?.message?.content;
      
      if (!improvedText) {
        throw new Error('No improved text was generated');
      }

      return improvedText;

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to improve text: ${error.message}`);
      }
      throw error;
    }
  }
}

// Example usage
const improveText = async (text: string): Promise<string> => {
  const improver = new TextImprover();
  return await improver.improveText({ text });
};

export { improveText, TextImprover, ImproveTextOptions }; 